import { TableColumn, TableCustomColumn } from "./../webapp/manifest/ManifestSettings";

export enum SelectionMode {
	Multi = "Multi",
	None = "None",
	Single = "Single",
	Auto = "Auto"
}

export enum TableTypeV4 {
	ResponsiveTable = "ResponsiveTable",
	GridTable = "GridTable"
	/* Not supported yet:
    AnalyticalTable = "AnalyticalTable",
    TreeTable = "TreeTable"*/
}

export enum TableCreationModeType {
	NewPage = "NewPage",
	Inline = "Inline",
	CreationRow = "CreationRow"
}

export enum InitialLoadType {
	Disabled = "Disabled",
	Enabled = "Enabled",
	Auto = "Auto"
}

export interface TableCreationMode {
	/**
	 * The name property of TableCreationMode defines the creation mode; possible values are:
	 * - NewPage: The create action leads to a new page.
	 * - Inline: The create action leads to a new row at the table.
	 * - CreationRow: No create button will be rendered, an empty row is directly given.
	 * The default is "NewPage".
	 */
	name?: TableCreationModeType;
	/**
	 * In case of inline creation mode you can decide if the new row will be created at the end of the table, or direcly after the currently selected table. The default value is "true"
	 */
	createAtEnd?: boolean;
}

export interface PersonalizationType {
	/**
	 * Defines whether the user can add and remove columns to a given table.
	 */
	column?: boolean;
	/**
	 * Defines whether the user can sort a given table.
	 */
	sort?: boolean;
	/**
	 * Defines whether the user can filter data of a given table.
	 */
	filter?: boolean;
}

export interface AnnotationPathAsObject {
	annotationPath: string;
}

export interface AnnotationPathWithKey {
	key: string;
	annotationPath: string;
}

export interface QuickVariantSelectionV4 {
	/**
	 * List of annotation paths referring to SelectionVariant annotations
	 */
	paths: AnnotationPathAsObject[];
	/**
	 * You can hide the table and display only the titles of the tabs. To do so, add the hideTableTitle option and set it to true.
	 */
	hideTableTitle?: boolean;
	/**
	 * You can show the counts of entries of each view. To do so, add the showCounts option and set it to true.
	 */
	showCounts?: boolean;
}

export interface MultiTableModeV4 {
	/**
	 * List of annotation paths referring to SelectionVariant annotations
	 */
	paths: AnnotationPathWithKey[];
	/**
	 * You can show the counts of entries of each view. To do so, add the showCounts option and set it to true.
	 */
	showCounts?: boolean;
}

/**
 * Custom Columns
 * @isViewNode true
 */
export type TableCustomColumns = Array<TableCustomColumn>;

export interface GenericColumns {
	[key: string]: TableColumn | TableCustomColumns;
}

// Note: TableSettings are reused by OP: LR only properties must not be added here.
export interface TableSettings<COLS = GenericColumns> {
	/**
	 * Use type to define the table type. Note: Grid tables, analytical tables, and tree tables cannot be rendered on smartphones. Instead, responsive tables always show on smartphones.
	 */
	type?: TableTypeV4;
	/**
	 * Defines the page behavior when a new record is created.
	 */
	creationMode?: TableCreationMode;
	/**
	 * Defines the personalization mode, currently only effective if variant management on page is either set to Page or Control.
	 * By default all table settings are enabled. You can change this for the different parts of the table by setting the properties "Column", "Sort" and "Filter" accordingly.
	 * Omitting a property is treated as false, this allows apps to avoid getting new features like grouping in upcoming releases.
	 */
	personalization?: PersonalizationType;
	/**
	 * Applications can influence whether the table rows are selectable or not, and whether it allows for single selection or multiple selection. It can take the following values:
	 * - "Auto": This is the default value. In this mode, Fiori Elements first checks if there are any custom actions or IBN buttons in the table toolbar that require a context. If no such buttons are found, then no table selection is allowed in display mode. In edit mode too a selection is not allowed unless there is a Delete button in the table toolbar in which case multiple row selection will be allowed.
	 * - "Multi": This will allow end users to select multiple table records (in both display and edit mode)
	 * - "Single" This will allow end user to select only a single table record (in both display and edit mode)
	 * - "None": This will not allow the end user to select any table record in display mode. This will also be the case in edit mode unless the table has a delete button enabled, in which multiple selection is allowed in delete mode.
	 */
	selectionMode?: SelectionMode;
	/**
	 * The selectAll configuration overrides the selectionLimit and allows the user to select all the items. When set to true, the select all feature is enabled: a checkbox in the table header is displayed which selects all items when clicked.
	 */
	selectAll?: boolean;
	/**
	 * With the selectionLimit you can define how many items can be selected at a time,
	 */
	selectionLimit?: number;
	/**
	 * The exporting of the table to an Excel file is enabled in List Report tables by default. In Object Page, the export to Excel is available by default if the copy/paste feature is also available; otherwise it is disabled.
	 * To disable the export in List Report or to enable it in Object Page, use the "enableExport" property and set it to false or true.
	 */
	enableExport?: boolean;
	/**
	 * With quickVariantSelection you can switch on the multiple view feature (single table mode). It links to SelectionVariant (filters) or SelectionPresentationVariant (filters and sorters) you must have added to your annotations beforehand.
	 */
	quickVariantSelection?: QuickVariantSelectionV4;
	/**
	 * You can set the content density to condensed for ui.table on the list report and object page applications.
	 */
	condensedTableLayout?: boolean;
	columns?: COLS;
}
/**
 * Table
 * @isViewNode true
 */
export interface Table extends TableSettings {
	/**
	 * initialLoad defines whether or not the data in the table is automatically loaded.
	 * - Disabled - Data is never loaded when opening the app without an app state.
	 * - Enabled - Data is always loaded when opening the app.
	 * - Auto - Data is only loaded, if initial/preset filters are available (e.g. defined by "SelectionVariant" definition, URL parameters or user defaults).
	 */
	initialLoad?: InitialLoadType;
	/**
	 * With the views property you can switch on the multiple view feature. Contrary to quickVariantSelection, each view will be rendered in a different instance of table). It links to SelectionVariant (filters) or SelectionPresentationVariant (filters and sorters) you must have added to your annotations beforehand.
	 */
	views?: MultiTableModeV4;
}
