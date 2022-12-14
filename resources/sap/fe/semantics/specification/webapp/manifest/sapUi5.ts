import { SapUi5RootView, SapUi5OdataModel, SapUi5ResourceModel, SapUi5RoutingRoute } from "../../common/webapp/manifest/sapUi5";
import { FlexibleColumnLayoutV4 } from "../../ApplicationV4";
import { SapUiGenericAppPageSettings } from "../../common/page";

export interface SapUi5V4 {
	flexEnabled?: boolean;
	resources?: object;
	dependencies?: SapUi5DependenciesV4;
	models?: { [key: string]: SapUi5OdataModel | SapUi5ResourceModel };
	routing?: SapUi5RoutingV4;
	extends?: object;
	//[key: string]: string | object | boolean;
	rootView?: SapUi5RootView;
}

export interface SapUi5RoutingV4 {
	config?: SapUi5RoutingConfig;
	routes?: SapUi5RoutingRoute[];
	targets: SapUi5RoutingTargetsV4;
}

export interface SapUi5RoutingTargetsV4 {
	[key: string]: SapUi5RoutingTargetV4 | SapUi5RoutingTargetCustomPageV4;
}

export interface SapUi5RoutingTargetBaseV4 {
	options?: {
		settings: SapUi5RoutingTargetSettingsV4;
	};
	controlAggregation?: FlexibleColumnLayoutAggregations;
	contextPattern?: string;
}

export interface SapUi5RoutingTargetV4 extends SapUi5RoutingTargetBaseV4 {
	type: string;
	id: string;
	name: string;
}

export interface SapUi5RoutingTargetCustomPageV4 extends SapUi5RoutingTargetBaseV4 {
	viewId: string;
	viewName: string;
	viewLevel?: number;
	title?: string;
	controlConfiguration?: SapUiGenericAppPageSettings;
}

export interface SapUi5RoutingTargetNavigationV4 {
	detail: {
		route: string;
	};
}
export interface SapUi5RoutingTargetSettingsV4 {
	entitySet?: string;
	navigation?: { [key: string]: SapUi5RoutingTargetNavigationV4 };
	variantManagement?: string;
	content?: {
		header?: {
			facets?: {};
		};
		body?: {
			sections?: {};
		};
	};
	controlConfiguration?: object;
}

export const FIORI_FCL_ROUTER_CLASS = "sap.f.routing.Router";
export type RouterClass = typeof FIORI_FCL_ROUTER_CLASS | string;
export interface SapUi5RoutingConfig {
	routerClass?: RouterClass;
	flexibleColumnLayout?: FlexibleColumnLayoutV4;
}

export const enum FlexibleColumnLayoutAggregations {
	BeginColumnPages = "beginColumnPages",
	MidColumnPages = "midColumnPages",
	EndColumnPages = "endColumnPages"
}

export interface SapUi5DependenciesV4 {
	minUI5Version?: string;
	incompatibleLimitation?: boolean;
	libs?: SapUi5DependenciesLibV4;
}

export const enum SAPUI5_DEPENDENCY_LIB {
	SAP_F = "sap.f"
}
export interface SapUi5DependenciesLibV4 {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	[SAPUI5_DEPENDENCY_LIB.SAP_F]?: SapUi5DependencyLibV4;
	[key: string]: SapUi5DependencyLibV4;
}

export interface SapUi5DependencyLibV4 {
	minVersion?: string;
	lazy?: boolean;
}
