import { PageConfig } from "../common/page";
import { ObjectPageLayout, ObjectPageHeader, GenericSections, CustomSections } from "../controls";

export enum VariantManagementTypeObjectPage {
	None = "None",
	Control = "Control"
}

export interface ObjectPageConfig extends PageConfig {
	header?: ObjectPageHeader;
	layout?: ObjectPageLayout;
	/**
	 * variantManagement defines how the variant management of page personalizations is controlled.
	 * - None - No variant management by default.
	 * - Control - Individual personalizations for each control.
	 */
	variantManagement?: VariantManagementTypeObjectPage;

	sections?: GenericSections | CustomSections;
}
