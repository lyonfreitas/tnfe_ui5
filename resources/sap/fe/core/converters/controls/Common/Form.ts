import {
	AnnotationTerm,
	CollectionFacetTypes,
	CommunicationAnnotationTerms,
	DataFieldAbstractTypes,
	FacetTypes,
	FieldGroup,
	Identification,
	PartOfPreview,
	ReferenceFacetTypes,
	UIAnnotationTerms,
	UIAnnotationTypes
} from "@sap-ux/vocabularies-types";
import { BindingExpression } from "sap/fe/core/helpers/BindingExpression";
import { ConfigurableObject, CustomElement, insertCustomElements, Placement } from "../../helpers/ConfigurableObject";
import { FormID, FormStandardActionButtonID } from "../../helpers/ID";
import { KeyHelper } from "../../helpers/Key";
import { ActionType, FormatOptionsType, FormManifestConfiguration } from "../../ManifestSettings";
import { getSemanticObjectPath } from "sap/fe/core/converters/annotations/DataField";
import { getTargetEntitySetPath, getTargetObjectPath } from "sap/fe/core/templating/DataModelPathHelper";
import { generate } from "../../../helpers/StableIdHelper";
import ConverterContext from "../../ConverterContext";
import { BaseAction, ConverterAction } from "sap/fe/core/converters/controls/Common/Action";

export type FormDefinition = {
	id: string;
	useFormContainerLabels: boolean;
	hasFacetsNotPartOfPreview: boolean;
};

export enum FormElementType {
	Default = "Default",
	Annotation = "Annotation"
}

export type BaseFormElement = ConfigurableObject & {
	id?: string;
	type: FormElementType;
	label?: string;
	visible?: BindingExpression<boolean>;
	formatOptions?: FormatOptionsType;
};

export type AnnotationFormElement = BaseFormElement & {
	idPrefix?: string;
	annotationPath?: string;
	isValueMultilineText?: boolean;
	semanticObjectPath?: string;
	isPartOfPreview?: boolean;
};

export type CustomFormElement = CustomElement<
	BaseFormElement & {
		type: FormElementType.Default;
		template: string;
	}
>;

export type FormElement = CustomFormElement | AnnotationFormElement;

type FormContainer = {
	id?: string;
	formElements: FormElement[];
	annotationPath: string;
	entitySet?: string;
	actions?: ConverterAction[] | BaseAction[];
};

/**
 * Returns default format options for text fields on a form.
 *
 * @returns {FormatOptionsType} Collection of format options with default values
 */
function getDefaultFormatOptionsForForm(): FormatOptionsType {
	return {
		textLinesEdit: 4
	};
}

function isFieldPartOfPreview(field: DataFieldAbstractTypes, formPartOfPreview: PartOfPreview | undefined): boolean {
	// Both each form and field can have the PartOfPreview annotation. Only if the form is not hidden (not partOfPreview) we allow toggling on field level
	return (
		formPartOfPreview === false || field.annotations?.UI?.PartOfPreview === undefined || field.annotations?.UI?.PartOfPreview === true
	);
}

function getFormElementsFromAnnotations(facetDefinition: ReferenceFacetTypes, converterContext: ConverterContext): AnnotationFormElement[] {
	const formElements: AnnotationFormElement[] = [];
	const resolvedTarget = converterContext.getEntityTypeAnnotation(facetDefinition.Target.value);
	const formAnnotation: AnnotationTerm<Identification> | AnnotationTerm<FieldGroup> = resolvedTarget.annotation as
		| AnnotationTerm<Identification>
		| AnnotationTerm<FieldGroup>;
	converterContext = resolvedTarget.converterContext;

	function getDataFieldsFromAnnotations(field: DataFieldAbstractTypes, formPartOfPreview: PartOfPreview | undefined) {
		const semanticObjectAnnotationPath = getSemanticObjectPath(converterContext, field);
		if (
			field.$Type !== UIAnnotationTypes.DataFieldForAction &&
			field.$Type !== UIAnnotationTypes.DataFieldForIntentBasedNavigation &&
			field.annotations?.UI?.Hidden?.valueOf() !== true
		) {
			formElements.push({
				key: KeyHelper.generateKeyFromDataField(field),
				type: FormElementType.Annotation,
				annotationPath: converterContext.getEntitySetBasedAnnotationPath(field.fullyQualifiedName) + "/",
				semanticObjectPath: semanticObjectAnnotationPath,
				formatOptions: getDefaultFormatOptionsForForm(),
				isPartOfPreview: isFieldPartOfPreview(field, formPartOfPreview)
			});
		}
	}

	switch (formAnnotation?.term) {
		case UIAnnotationTerms.FieldGroup:
			(formAnnotation as AnnotationTerm<FieldGroup>).Data.forEach(field =>
				getDataFieldsFromAnnotations(field, facetDefinition.annotations?.UI?.PartOfPreview)
			);
			break;
		case UIAnnotationTerms.Identification:
			(formAnnotation as AnnotationTerm<Identification>).forEach(field =>
				getDataFieldsFromAnnotations(field, facetDefinition.annotations?.UI?.PartOfPreview)
			);
			break;
		case UIAnnotationTerms.DataPoint:
			formElements.push({
				// key: KeyHelper.generateKeyFromDataField(formAnnotation),
				key: "DataPoint::" + (formAnnotation.qualifier ? formAnnotation.qualifier : ""),
				type: FormElementType.Annotation,
				annotationPath: converterContext.getEntitySetBasedAnnotationPath(formAnnotation.fullyQualifiedName) + "/"
			});
			break;
		case CommunicationAnnotationTerms.Contact:
			formElements.push({
				// key: KeyHelper.generateKeyFromDataField(formAnnotation),
				key: "Contact::" + (formAnnotation.qualifier ? formAnnotation.qualifier : ""),
				type: FormElementType.Annotation,
				annotationPath: converterContext.getEntitySetBasedAnnotationPath(formAnnotation.fullyQualifiedName) + "/"
			});
			break;
		default:
			break;
	}
	return formElements;
}

export function getFormElementsFromManifest(
	facetDefinition: ReferenceFacetTypes,
	converterContext: ConverterContext
): Record<string, CustomFormElement> {
	const manifestWrapper = converterContext.getManifestWrapper();
	const manifestFormContainer: FormManifestConfiguration = manifestWrapper.getFormContainer(facetDefinition.Target.value);
	const formElements: Record<string, CustomFormElement> = {};
	if (manifestFormContainer?.fields) {
		Object.keys(manifestFormContainer?.fields).forEach(fieldId => {
			formElements[fieldId] = {
				key: fieldId,
				id: "CustomFormElement::" + fieldId,
				type: FormElementType.Default,
				template: manifestFormContainer.fields[fieldId].template,
				label: manifestFormContainer.fields[fieldId].label,
				position: manifestFormContainer.fields[fieldId].position || {
					placement: Placement.After
				},
				formatOptions: {
					...getDefaultFormatOptionsForForm(),
					...manifestFormContainer.fields[fieldId].formatOptions
				}
			};
		});
	}
	return formElements;
}

export function getFormContainer(
	facetDefinition: ReferenceFacetTypes,
	converterContext: ConverterContext,
	actions: BaseAction[] | ConverterAction[] | undefined
): FormContainer {
	//TODO form container id
	const sFormContainerId = generate([{ Facet: facetDefinition }]);
	const sAnnotationPath = "/" + facetDefinition.fullyQualifiedName;
	const resolvedTarget = converterContext.getEntityTypeAnnotation(facetDefinition.Target.value);
	let sEntitySetPath!: string;
	// resolvedTarget doesn't have a entitySet in case Containments and Paramterized services.
	if (
		resolvedTarget.converterContext.getEntitySet() &&
		resolvedTarget.converterContext.getEntitySet() !== converterContext.getEntitySet()
	) {
		sEntitySetPath = getTargetEntitySetPath(resolvedTarget.converterContext.getDataModelObjectPath());
	} else if (resolvedTarget.converterContext.getDataModelObjectPath().targetObject?.containsTarget === true) {
		sEntitySetPath = getTargetObjectPath(resolvedTarget.converterContext.getDataModelObjectPath(), false);
	}
	const aFormElements = insertCustomElements(
		getFormElementsFromAnnotations(facetDefinition, converterContext),
		getFormElementsFromManifest(facetDefinition, converterContext),
		{ formatOptions: "overwrite" }
	);

	actions = actions !== undefined ? actions.filter(action => action.facetName == facetDefinition.fullyQualifiedName) : [];
	if (actions.length === 0) {
		actions = undefined;
	}

	const oActionShowDetails: BaseAction = {
		id: FormStandardActionButtonID(sFormContainerId, "ShowHideDetails"),
		key: "StandardAction::ShowHideDetails",
		text: "{sap.fe.i18n>T_COMMON_OBJECT_PAGE_SHOW_FORM_CONTAINER_DETAILS}",
		type: ActionType.ShowFormDetails,
		press: "FormContainerRuntime.toggleDetails"
	};

	if (
		facetDefinition.annotations?.UI?.PartOfPreview !== false &&
		aFormElements.some(oFormElement => oFormElement.isPartOfPreview === false)
	) {
		if (actions !== undefined) {
			actions.push(oActionShowDetails);
		} else {
			actions = [oActionShowDetails];
		}
	}

	return {
		id: sFormContainerId,
		formElements: aFormElements,
		annotationPath: sAnnotationPath,
		entitySet: sEntitySetPath,
		actions: actions
	};
}

function getFormContainersForCollection(
	facetDefinition: CollectionFacetTypes,
	converterContext: ConverterContext,
	actions: BaseAction[] | ConverterAction[]
): FormContainer[] {
	const formContainers: FormContainer[] = [];
	//TODO coll facet inside coll facet?
	facetDefinition.Facets?.forEach(facet => {
		// Ignore level 3 collection facet
		if (facet.$Type === UIAnnotationTypes.CollectionFacet) {
			return;
		}
		formContainers.push(getFormContainer(facet as ReferenceFacetTypes, converterContext, actions));
	});
	return formContainers;
}

export function isReferenceFacet(facetDefinition: FacetTypes): facetDefinition is ReferenceFacetTypes {
	return facetDefinition.$Type === UIAnnotationTypes.ReferenceFacet;
}

export function createFormDefinition(
	facetDefinition: FacetTypes,
	converterContext: ConverterContext,
	actions: BaseAction[] | ConverterAction[]
): FormDefinition {
	switch (facetDefinition.$Type) {
		case UIAnnotationTypes.CollectionFacet:
			// Keep only valid children
			const formCollectionDefinition = {
				id: FormID({ Facet: facetDefinition }),
				useFormContainerLabels: true,
				hasFacetsNotPartOfPreview: facetDefinition.Facets.some(
					childFacet => childFacet.annotations?.UI?.PartOfPreview?.valueOf() === false
				),
				formContainers: getFormContainersForCollection(facetDefinition, converterContext, actions)
			};
			return formCollectionDefinition;
		case UIAnnotationTypes.ReferenceFacet:
			const formDefinition = {
				id: FormID({ Facet: facetDefinition }),
				useFormContainerLabels: false,
				hasFacetsNotPartOfPreview: facetDefinition.annotations?.UI?.PartOfPreview?.valueOf() === false,
				formContainers: [getFormContainer(facetDefinition, converterContext, actions)]
			};
			return formDefinition;
		default:
			throw new Error("Cannot create form based on ReferenceURLFacet");
	}
}
