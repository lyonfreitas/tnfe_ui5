import { FlexibleColumnLayoutType } from "../common/types";

export enum PageType {
	ObjectPage = "ObjectPage",
	ListReport = "ListReport",
	OverviewPage = "OverviewPage",
	CustomPage = "CustomPage",
	AnalyticalListPage = "AnalyticalListPage"
}

export enum PageTypeV4 {
	ObjectPage = "ObjectPage",
	FormPage = "FormPage",
	ListReport = "ListReport",
	CustomPage = "CustomPage",
	AnalyticalListPage = "AnalyticalListPage"
}

export interface PageConfig {
	$schema?: string;
}

export interface PageBase {
	name?: string;
	entitySet?: string;
	navigationProperty?: string;
	config?: PageConfig;
	navigation?: { [property: string]: string };
	variantManagement?: string;
	defaultLayoutType?: FlexibleColumnLayoutType;
}

export enum FioriElementsVersion {
	v2 = "v2",
	v4 = "v4"
}
export enum OdataVersion {
	v2 = "v2",
	v4 = "v4"
}
export interface Target {
	fioriElements: FioriElementsVersion;
	odata: OdataVersion;
}

export interface PagesBase {
	[key: string]: PageBase;
}

export interface SapUiGenericAppPageSettings {
	[key: string]: boolean | number | string | object;
}
