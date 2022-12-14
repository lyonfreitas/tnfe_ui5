import { FilterBar, Table } from "../controls";
import { PageConfig } from "../common/page";
import { VariantManagementTypeListReport } from "./ListReportConfig";

export interface AnalyticalListPageConfig extends PageConfig {
	table?: Table;
	/**
	 * variantManagement defines how the variant management of page personalizations is controlled.
	 * - None - No variant management by default.
	 * - Control - Individual personalizations for each control.
	 */
	variantManagement?: VariantManagementTypeListReport;
	filterBar?: FilterBar;
}
