sap.ui.define(["sap/ui/base/Object","sap/ui/generic/app/navigation/service/SelectionVariant","sap/ui/Device","sap/ui/comp/state/UIState","sap/suite/ui/generic/template/listTemplates/listUtils","sap/ui/core/mvc/ControllerExtension","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/base/util/deepEqual","sap/base/util/extend","sap/base/util/deepExtend","sap/suite/ui/generic/template/genericUtilities/FeError","sap/suite/ui/generic/template/listTemplates/semanticDateRangeTypeHelper"],function(B,S,D,U,l,C,F,d,e,a,b,s){"use strict";var c="listTemplates.controller.IappStateHandler";var L=new F(c).getLogger();function g(o,f,t){var n=t.oServices.oApplication.getNavigationHandler();var h="sap.suite.ui.generic.template.customData";var j="sap.suite.ui.generic.template.genericData";var k="sap.suite.ui.generic.template.extensionData";var m="visual";var p="compact";var P;var I=false,q=false,_=null,r;var u=null;var v=t.oComponentUtils.getSettings();var A=null;var R={appStateKey:"",urlParams:{}};var w={};var x="sap-iapp-state";if(!o.oSmartFilterbar.isLiveMode()){o.oSmartFilterbar.setSuppressSelection(true);}var y=f.byId("template::Page");var z=t.oCommonUtils.getControlStateWrapper(y);z.attachStateChanged(function(){h1();});var E,G;G=o.oSmartChart&&t.oCommonUtils.getControlStateWrapper(o.oSmartChart);E=o.oSmartTable&&t.oCommonUtils.getControlStateWrapper(o.oSmartTable);function H(){return P.then(function(){if(R.appStateKey){return{"sap-iapp-state":[R.appStateKey]};}return R.urlParams;});}function J(i){if(i&&i.editStateFilter!==undefined){var u1=f.byId("editStateFilter");if(u1){u1.setSelectedKey((i.editStateFilter===null)?0:i.editStateFilter);}}var v1=o.oController.getOwnerComponent().getModel("_templPriv");if(i.chartVariantId&&o.oSmartChart){o.oSmartChart.setCurrentVariantId(i.chartVariantId);}if(i.filterMode){v1.setProperty('/alp/filterMode',i.filterMode);o.filterBarController.handleFilterSwitch(i.filterMode);}else{Q();}if(i.contentView){var w1=v1.getProperty('/alp/enableHybridMode');if(w1===false&&i.contentView==='charttable'){v1.setProperty('/alp/contentView','chart');}else{((D.system.phone||D.system.tablet&&!D.system.desktop)&&i.contentView==="charttable")?v1.setProperty('/alp/contentView',"chart"):v1.setProperty('/alp/contentView',i.contentView);}}if(i.autoHide){v1.setProperty('/alp/autoHide',i.autoHide);}}function K(i){if(!i){return;}var u1=true;var v1=function(w1){if(!(w1 instanceof C)){throw new b(c,"State must always be retrieved with respect to a ControllerExtension");}var x1=w1.getMetadata().getNamespace();if(!u1){throw new b(c,"State must always be restored synchronously");}return i[x1];};f.templateBaseExtension.restoreExtensionAppStateData(v1);u1=false;}function M(i){i=i||{};if(i.hasOwnProperty(h)&&i.hasOwnProperty(j)){J(i[j]);d1(i[h]);K(i[k]);}else{if(i._editStateFilter!==undefined){J({editStateFilter:i._editStateFilter});delete i._editStateFilter;}Q();d1(i);}if(i[j]){if(i[j].variantDirty===undefined){i[j].variantDirty=true;}f.byId('template::PageVariant')&&f.byId('template::PageVariant').currentVariantSetModified(i[j].variantDirty);}}function N(){var i=t.oComponentUtils.getTemplatePrivateModel();return i.getProperty("/generic/bDataAreShownInTable");}function O(i){if(o.oSmartFilterbar.isPending()){var u1=function(v1){var w1=v1.getParameters();if(!w1.pendingValue){o.oSmartFilterbar.detachPendingChange(u1);M(i);}};o.oSmartFilterbar.attachPendingChange(u1);}else{M(i);}}function Q(){var i=o.oController.getOwnerComponent().getModel("_templPriv"),u1=o.oSmartFilterbar.isCurrentVariantStandard()?o.oController.getOwnerComponent().getDefaultFilterMode():i.getProperty('/alp/filterMode');if(!(u1===m||u1===p)){L.error("Defaulting to Visual filter due to incorrect value of defaultFilterMode in App descriptor");u1=m;}if(u1===m&&o.hideVisualFilter){L.error("Visual filter is hidden defaulting to compact");u1=p;}o.filterBarController.setDefaultFilter(u1);}function T(i){var u1=o.oController.getOwnerComponent().getProperty('smartVariantManagement');if(u1){var v1=i['sap-ui-fe-variant-id'];if(v1&&v1[0]){o.oSmartFilterbar.getSmartVariant().setCurrentVariantId(v1[0]);}}else{var w1=i['sap-ui-fe-variant-id'],x1=i['sap-ui-fe-filterbar-variant-id'],y1=i['sap-ui-fe-chart-variant-id'],z1=i['sap-ui-fe-table-variant-id'];V(x1&&x1[0],y1&&y1[0],z1&&z1[0],w1&&w1[0]);}}function V(i,u1,v1,w1){if(i||w1){o.oSmartFilterbar.getSmartVariant().setCurrentVariantId(i||w1);}if(o.oSmartChart&&(u1||w1)){o.oSmartChart.attachAfterVariantInitialise(function(x1){o.oSmartChart.setCurrentVariantId(u1||w1);});o.oSmartChart.setCurrentVariantId(u1||w1);}if(o.oSmartTable&&(v1||w1)){o.oSmartTable.attachAfterVariantInitialise(function(x1){o.oSmartTable.setCurrentVariantId(v1||w1);});o.oSmartTable.setCurrentVariantId(v1||w1);}}function W(i,u1,v1){o.oSmartFilterbar.setSuppressSelection(false);var w1=i.appStateKey||"";if(I){return;}A=w1;I=true;o.sNavType=v1;var x1=(!w1&&u1)||{};o.oSmartFilterbar.resumeSetFilterData();T(x1);if(v1!==sap.ui.generic.app.navigation.service.NavType.iAppState&&i.presentationVariant!==undefined){X(i.presentationVariant);}if(v1!==sap.ui.generic.app.navigation.service.NavType.initial){var y1=i&&i.bNavSelVarHasDefaultsOnly;var z1=new S(i.selectionVariant);var A1=i.semanticDates;w=JSON.parse(i.selectionVariant);if((z1.getSelectOptionsPropertyNames().indexOf("DisplayCurrency")===-1)&&(z1.getSelectOptionsPropertyNames().indexOf("P_DisplayCurrency")===-1)&&(z1.getParameterNames().indexOf("P_DisplayCurrency")===-1)){$(z1,i);}if((!y1||o.oSmartFilterbar.isCurrentVariantStandard())){var B1={selectionVariant:z1,semanticDates:A1};if(v1!==sap.ui.generic.app.navigation.service.NavType.iAppState){o.oController.modifyStartupExtension(B1);if(o.oSmartFilterbar.isCurrentVariantStandard()){s.setSemanticDateRangeDefaultValue(v,o.oSmartFilterbar,B1.semanticDates,B1.urlParameters||{});}}if(y1){var C1=l.getMergedVariants([new S(JSON.stringify(o.oSmartFilterbar.getUiState().getSelectionVariant())),B1.selectionVariant]);B1.selectionVariant=C1;}g1(B1.selectionVariant);f1(B1);}else{var D1=new S(JSON.stringify(o.oSmartFilterbar.getUiState().getSelectionVariant())),E1=D1.getSelectOption("sap.suite.ui.generic.template.customData"),F1=D1.getSelectOption("sap.suite.ui.generic.template.genericData");J1=o.oSmartFilterbar.getUiState().getSemanticDates();Z(D1,E1,F1,true);var B1={selectionVariant:D1,semanticDates:J1};o.oController.modifyStartupExtension(B1);if(o.oSmartFilterbar.isCurrentVariantStandard()){s.setSemanticDateRangeDefaultValue(v,o.oSmartFilterbar,B1.semanticDates,B1.urlParameters||{});}Z(B1.selectionVariant,E1,F1,false);if(!d(B1.selectionVariant,new S(JSON.stringify(o.oSmartFilterbar.getUiState().getSelectionVariant())))){g1(B1.selectionVariant);f1(B1);}}if(i.tableVariantId&&o.oSmartTable){o.oSmartTable.setCurrentVariantId(i.tableVariantId);}var G1=o.oController.getOwnerComponent().getModel("_templPriv");if(v1===sap.ui.generic.app.navigation.service.NavType.xAppState&&G1.getProperty('/alp/filterMode')===m){e1();}if(i.customData){var H1=i.customData;O(H1);if(H1.hasOwnProperty(j)){var I1=H1[j];t1(I1.controlStates);}}else{Q();}if(!y1){o.oSmartFilterbar.checkSearchAllowed(o);if(o.oController.getView().getModel("_templPriv").getProperty("/alp/searchable")){q=true;o.oSmartFilterbar.search();}}R={appStateKey:w1,urlParams:x1};}else{var z1=new S(JSON.stringify(o.oSmartFilterbar.getUiState().getSelectionVariant())),E1=z1.getSelectOption("sap.suite.ui.generic.template.customData"),F1=z1.getSelectOption("sap.suite.ui.generic.template.genericData"),J1=o.oSmartFilterbar.getUiState().getSemanticDates();Z(z1,E1,F1,true);var B1={selectionVariant:z1,semanticDates:J1};o.oController.modifyStartupExtension(B1);s.setSemanticDateRangeDefaultValue(v,o.oSmartFilterbar,B1.semanticDates,B1.urlParameters||{});Z(B1.selectionVariant,E1,F1,false);if(!d(B1.selectionVariant,new S(JSON.stringify(o.oSmartFilterbar.getUiState().getSelectionVariant())))){g1(B1.selectionVariant);f1(B1);}if(o.oSmartFilterbar.isLiveMode()||o.oSmartFilterbar.isCurrentVariantExecuteOnSelectEnabled()){o.oSmartFilterbar.checkSearchAllowed(o);if(o.oController.getView().getModel("_templPriv").getProperty("/alp/searchable")){q=true;}}Q();}k1();u=null;if(!o.oSmartFilterbar.isLiveMode()){var K1=s1();if(!K1||!Y()){t.oComponentUtils.hidePlaceholder();}}else{if(!Y()){t.oComponentUtils.hidePlaceholder();}}if(!q){o1();}else{I=false;}if(o.oSmartFilterbar.isCurrentVariantStandard()&&i.bNavSelVarHasDefaultsOnly!==false&&f.byId('template::PageVariant')){f.byId('template::PageVariant').currentVariantSetModified(false);}}function X(i){var u1=typeof i==="string"?JSON.parse(i):i;var v1=u1&&u1.SortOrder;if(o.oSmartTable){var w1=o.oTemplateUtils.oServices.oPresentationControlHandlerFactory.getPresentationControlHandler(o.oSmartTable);w1.applyNavigationSortOrder(v1);}if(o.oSmartChart){var x1=o.oTemplateUtils.oServices.oPresentationControlHandlerFactory.getPresentationControlHandler(o.oSmartChart);x1.applyNavigationSortOrder(v1);}}function Y(){var i=o.oSmartFilterbar.determineMandatoryFilterItems();var u1=o.oSmartFilterbar.getFiltersWithValues();return i.every(function(v1){return u1.includes(v1);});}function Z(i,u1,v1,w1){if(w1){if(u1){i.removeSelectOption("sap.suite.ui.generic.template.customData");}if(v1){i.removeSelectOption("sap.suite.ui.generic.template.genericData");}}else{if(u1){i.massAddSelectOption("sap.suite.ui.generic.template.customData",u1);}if(v1){i.massAddSelectOption("sap.suite.ui.generic.template.genericData",v1);}}}function $(i,u1){var v1=o.oSmartFilterbar.determineMandatoryFilterItems(),w1;for(var x1=0;x1<v1.length;x1++){if(v1[x1].getName().indexOf("P_DisplayCurrency")!==-1){if(u1.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")&&u1.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")[0].Low){w1=u1.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")[0].Low;}if(w1){i.addParameter("P_DisplayCurrency",w1);}if(o.alr_visualFilterBar&&w1){o.alr_visualFilterBar.setDisplayCurrency(w1);}break;}}}function a1(){var i={};i[h]={};var u1=o.oController.getOwnerComponent().getModel("_templPriv");var v1=o.chartController&&e({},o.chartController._chartInfo);if(v1&&v1.chartSelection){delete v1.chartSelection;}var w1={};if(G){w1[o.oSmartChart.getId()]=G.getState();}if(E){w1[o.oSmartTable.getId()]=E.getState();}w1[y.getId()]=z.getState();i[j]={chartVariantId:o.oSmartChart&&o.oSmartChart.getCurrentVariantId(),filterMode:u1.getProperty('/alp/filterMode'),contentView:u1.getProperty('/alp/contentView'),autoHide:u1.getProperty('/alp/autoHide'),chartInfo:v1,variantDirty:f.byId('template::PageVariant')&&f.byId('template::PageVariant').currentVariantGetModified(),controlStates:w1};var x1=f.byId("editStateFilter");if(x1){i[j].editStateFilter=x1.getSelectedKey();}f.getCustomAppStateDataExtension(i[h]);var y1;var z1=true;var A1=function(B1,C1){if(!(B1 instanceof C)){throw new b(c,"State must always be set with respect to a ControllerExtension");}if(!z1){throw new b(c,"State must always be provided synchronously");}if(C1){y1=y1||Object.create(null);var D1=B1.getMetadata().getNamespace();y1[D1]=C1;}};f.templateBaseExtension.provideExtensionAppStateData(A1);z1=false;if(y1){i[k]=y1;}return i;}function b1(){return w;}function c1(){var u1=o.oSmartFilterbar.getUiState(),v1=u1.getSelectionVariant(),w1=u1.getSemanticDates(),x1=f.getVisibleSelectionsWithDefaults();for(var i=0;i<x1.length;i++){if(!v1.getValue(x1[i])){v1.addSelectOption(x1[i],"I","EQ","");}}if(o.oController.byId('template::PageVariant').currentVariantGetModified()&&v1.SelectionVariantID){v1.SelectionVariantID="";}return{selectionVariant:JSON.stringify(v1),semanticDates:w1,tableVariantId:o.oSmartTable&&o.oSmartTable.getCurrentVariantId(),customData:a1()};}function d1(i){f.restoreCustomAppStateDataExtension(i||{});}function e1(){var i=a({},o.oSmartFilterbar.getFilterData(true)),u1=o.oController.getOwnerComponent().getModel("_filter");u1.setData(i);o.filterBarController._updateFilterLink();}function f1(i){o.oSmartFilterbar.clearVariantSelection();o.oSmartFilterbar.clear();r=i.selectionVariant;l1(i.selectionVariant.toJSONObject(),i.semanticDates,true,false);}function g1(u1){var v1=u1.getParameterNames().concat(u1.getSelectOptionsPropertyNames());for(var i=0;i<v1.length;i++){o.oSmartFilterbar.addFieldToAdvancedArea(v1[i]);}if(o.alr_visualFilterBar&&o.bVisualFilterInitialised){o.alr_visualFilterBar.addVisualFiltersToBasicArea(v1);}}function h1(){if(o._bIsStartingUp){return;}if(I){return;}var i=c1();try{u=n.storeInnerAppStateWithImmediateReturn(i,true);}catch(u1){L.error("AnalyticalListPage.fnStoreCurrentAppStateAndAdjustURL: "+u1);}if(u instanceof sap.ui.generic.app.navigation.service.NavError){u=null;return;}if(o.oTemplateUtils.oComponentUtils.isComponentActive()&&u){o.oTemplateUtils.oServices.oApplication.navigateByExchangingQueryParam(x,u.appStateKey);}if(u&&A!==u.appStateKey){R.appStateKey=u.appStateKey;u=null;}}function i1(){var i=o.oController.getOwnerComponent().getModel("_templPriv");if(i.getProperty('/alp/filterMode')===m){if(o.alr_visualFilterBar&&o.alr_visualFilterBar.bIsInitialised&&i.getProperty("/alp/searchable")===false){o.oSmartFilterbar.showAdaptFilterDialog("group");}}}function j1(){if(o.oSmartFilterbar.isInitialised()){o.oSmartFilterbar.checkSearchAllowed(o);}}function k1(){var i=o.oController.getOwnerComponent().getModel("_filter");i.setData(a({},o.oSmartFilterbar.getFilterData(true)));o.filterBarController._updateFilterLink();}function l1(i,u1,v1,w1){var x1=new U({selectionVariant:i,semanticDates:u1});o.oSmartFilterbar.setUiState(x1,{replace:v1,strictMode:w1});}function m1(i){P=n.parseNavigation();}function n1(){try{var i=new Promise(function(v1){_=v1;P.done(W);P.fail(function(w1,x1,y1){L.warning(w1.getErrorCode()+"app state could not be parsed - continuing with empty state");W({},x1,sap.ui.generic.app.navigation.service.NavType.initial);v1();});});return i;}catch(u1){r1();}}function o1(){I=false;_();}function p1(){return r;}function q1(i){if(!i){var u1=o.oIappStateHandler.fnGetStartUpSelectionVariant();if(u1){var v1=u1.getParameterNames().concat(u1.getSelectOptionsPropertyNames());o.alr_visualFilterBar.addVisualFiltersToBasicArea(v1);}}o.alr_visualFilterBar.updateVisualFilterBindings(true);if(o.oSmartFilterbar.isCurrentVariantStandard()){o.oIappStateHandler.fnCheckMandatory();o.oIappStateHandler.fnCheckToLaunchDialog();}}function r1(){Q();k1();if(o.alr_visualFilterBar&&o.alr_visualFilterBar.bIsInitialised){o.oIappStateHandler.fnUpdateVisualFilterBar(true);}}function s1(){var i=false;if(o.oSmartFilterbar.isCurrentVariantStandard()){o.oSmartFilterbar.checkSearchAllowed(o);if(o.oController.getView().getModel("_templPriv").getProperty("/alp/searchable")){var u1=o.oController.getOwnerComponent();var v1=u1.getDataLoadSettings();var w1=v1?v1.loadDataOnAppLaunch:"ifAnyFilterExist";if(w1==="ifAnyFilterExist"){var x1=o.oSmartFilterbar.getFiltersWithValues();i=x1.length?true:false;}else if(w1==="always"){i=true;}else if(w1==="never"){i=false;}if(i){o.oSmartFilterbar.getSmartVariant().setExecuteOnStandard(true);i=o.oSmartFilterbar.getSmartVariant().getExecuteOnStandard();}}}var y1=o.oSmartFilterbar.isCurrentVariantExecuteOnSelectEnabled();if(y1||i){o.oSmartFilterbar.search();}return i;}function t1(i){if(G){G.setState(i&&i[o.oSmartChart.getId()]);}if(E){E.setState(i&&i[o.oSmartTable.getId()]);}z.setState(i&&i[y.getId()]);}return{areDataShownInTable:N,getFilterState:a1,fnCheckMandatory:j1,fnCheckToLaunchDialog:i1,getCurrentAppState:c1,fnUpdateSVFB:k1,fnSetDefaultFilter:Q,fnRestoreFilterState:O,getUrlParameterInfo:H,onSmartFilterBarInitialise:m1,onSmartFilterBarInitialized:n1,fnStoreCurrentAppStateAndAdjustURL:h1,fnSetFiltersUsingUIState:l1,fnResolveStartUpPromise:o1,fnGetStartUpSelectionVariant:p1,fnUpdateVisualFilterBar:q1,fnOnError:r1,getInitialNavigationContext:b1};}return B.extend("sap.suite.ui.generic.template.listTemplates.controller.IappStateHandler",{constructor:function(o,f,t){e(this,g(o,f,t));}});});
