import { EntitySet } from "@sap-ux/annotation-converter";
import { NavigationPropertyPath } from "@sap-ux/vocabularies-types";

export const isEntitySet = function(dataObject: any): dataObject is EntitySet {
	return dataObject && dataObject.hasOwnProperty("_type") && dataObject._type === "EntitySet";
};

export const getFilterExpressionRestrictions = function(entitySet: EntitySet) {
	return entitySet.annotations?.Capabilities?.FilterRestrictions?.FilterExpressionRestrictions || [];
};

/**
 * Reads all SortRestrictions of the main entity and the (first level) navigation restrictions.
 * This does not work for more than one level of navigation.
 *
 * @param {EntitySet} entitySet Entity set to be analyzed
 * @returns {string[]} Array containing the property names of all non-sortable properties
 */
export const getNonSortablePropertiesRestrictions = function(entitySet: EntitySet | undefined): string[] {
	let nonSortableProperties = [];
	// Check annotations for main entity
	if (entitySet?.annotations?.Capabilities?.SortRestrictions?.Sortable === false) {
		// add all properties of the entity to the nonSortableProperties
		nonSortableProperties.push(...entitySet.entityType.entityProperties.map(property => property.name));
	} else {
		nonSortableProperties =
			entitySet?.annotations?.Capabilities?.SortRestrictions?.NonSortableProperties?.map(property => property.value) || [];
	}
	// Check for every navigationRestriction if it has sortRestrictions
	entitySet?.annotations?.Capabilities?.NavigationRestrictions?.RestrictedProperties?.forEach(navigationRestriction => {
		if (navigationRestriction?.SortRestrictions?.Sortable === false) {
			// find correct navigation property
			const navigationProperty = entitySet?.entityType?.navigationProperties?.filter(
				navigationProperty =>
					navigationProperty.name == (navigationRestriction?.NavigationProperty as NavigationPropertyPath)?.value
			);
			if (navigationProperty[0]) {
				// add all properties of the navigation property to the nonSortableProperties
				nonSortableProperties.push(
					...navigationProperty[0].targetType?.entityProperties.map(property => navigationProperty[0].name + "/" + property.name)
				);
			}
		} else {
			const nonSortableNavigationProperties = navigationRestriction?.SortRestrictions?.NonSortableProperties?.map(
				property => (navigationRestriction?.NavigationProperty as NavigationPropertyPath)?.value + "/" + property.value
			);
			if (nonSortableNavigationProperties) {
				nonSortableProperties.push(...nonSortableNavigationProperties);
			}
		}
	});
	return nonSortableProperties;
};

export const isStickySessionSupported = function(entitySet: EntitySet): boolean {
	return !!entitySet.annotations.Session?.StickySessionSupported;
};
