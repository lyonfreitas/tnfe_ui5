import { Application, FlexibleColumnLayout, PageTypeV4, PageBase } from "./common";
import { Pages, PageView } from "./page";
import { FlexibleColumnLayoutAggregations } from ".";

export interface AppSettings {
	/**
	 * To change the application header, in your project artifacts, change i18n property file for your app under webapp/i18n/i18n.properties ->appTitle. Then, refer to the title as {{appTitle}} in the sap.app section of the manifest file.
	 */
	title?: string;
	/**
	 * To change the application header, in your project artifacts, change i18n property file for your app under webapp/i18n/i18n.properties ->appDescription. Then, refer to the description as {{appDescription}} in the sap.app section of the manifest file.
	 */
	description?: string;
	/**
	 * The flexible column layout allows users to see more details on the page, and to expand and collapse the screen areas. For the overview page, this layout is not relevant.
	 */
	flexibleColumnLayout?: FlexibleColumnLayoutV4;
}

export interface PagesV4 extends Pages {
	[key: string]: PageV4;
}

export interface PageV4 extends PageBase {
	pageType?: PageTypeV4;
	view?: PageView;
	controlAggregation?: FlexibleColumnLayoutAggregations;
}

export interface ApplicationV4 extends Application {
	settings?: AppSettings;
	pages?: PagesV4;
}

export interface FlexibleColumnLayoutV4 extends FlexibleColumnLayout {
	/**
	 * To limit Flexible Column Layout to two columns. The third level will be displayed in full screen and not in a third column.
	 */
	limitFCLToTwoColumns?: boolean;
}
