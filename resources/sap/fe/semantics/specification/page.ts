import { PagesBase, PageBase, PageTypeV4, SapUiGenericAppPageSettings } from "./common";
import { FlexibleColumnLayoutAggregations } from ".";

export interface Pages extends PagesBase {
	[key: string]: Page;
}

export interface Page extends PageBase {
	view?: PageView;
	controlAggregation?: FlexibleColumnLayoutAggregations;
	pageType?: PageTypeV4;
	options?: {
		settings?: SapUiGenericAppPageSettings;
	};
}

export interface PageView {
	id: string;
	name: string;
	viewLevel?: number;
	title?: string;
}
