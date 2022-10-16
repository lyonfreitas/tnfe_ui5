/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/PageController","sap/fe/core/controllerextensions/SideEffects","sap/fe/core/controllerextensions/EditFlow","sap/base/Log","sap/base/util/ObjectPath","sap/fe/core/CommonUtils","sap/ui/mdc/p13n/StateUtil","sap/fe/macros/table/Utils","sap/fe/core/controllerextensions/InternalRouting","sap/ui/Device","sap/fe/core/controllerextensions/IntentBasedNavigation","./overrides/IntentBasedNavigation","sap/fe/core/controllerextensions/InternalIntentBasedNavigation","sap/fe/macros/chart/ChartRuntime","sap/fe/templates/ListReport/ExtensionAPI","sap/fe/macros/filter/FilterUtils","sap/fe/macros/chart/ChartUtils","sap/fe/macros/DelegateUtil","sap/ui/core/mvc/OverrideExecution","sap/fe/core/controllerextensions/ViewState","./overrides/ViewState","sap/fe/templates/RootContainer/overrides/EditFlow","sap/fe/core/helpers/EditState","sap/fe/core/library","sap/fe/core/controllerextensions/Share","./overrides/Share","sap/fe/macros/CommonHelper","sap/fe/core/controllerextensions/KPIManagement","sap/fe/templates/TableScroller","sap/fe/core/controllerextensions/Placeholder","sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(P,S,E,L,O,C,a,T,I,D,b,c,d,e,f,F,g,h,i,V,j,l,m,n,o,p,q,K,r,s,t){"use strict";var u=n.TemplateContentView,v=n.InitialLoadMode;return P.extend("sap.fe.templates.ListReport.ListReportController",{metadata:{methods:{getExtensionAPI:{"public":true,"final":true},onPageReady:{"public":false,"final":false,overrideExecution:i.After},onViewNeedsRefresh:{"public":true,"final":false,overrideExecution:i.After},onPendingFilters:{"public":true,"final":false,overrideExecution:i.After}}},_routing:I.override({onAfterBinding:function(k,w){this.getView().getController()._onAfterBinding(k,w);}}),_intentBasedNavigation:d.override({getEntitySet:function(){return this.base.getCurrentEntitySet();}}),sideEffects:S,intentBasedNavigation:b.override(c),share:o.override(p),editFlow:E.override(l),viewState:V.override(j),kpiManagement:K,placeholder:s,getExtensionAPI:function(){if(!this.extensionAPI){this.extensionAPI=new f(this);}return this.extensionAPI;},onInit:function(){P.prototype.onInit.apply(this);var k=this;var w=this._getControls();var x=this.getView().getBindingContext("internal");if(k._isMultiMode()){var M=k._getMultiModeControl();x.setProperty("tabs",{selected:M.getSelectedKey()||M.getItems()[0].getKey()});w.forEach(function(A){var B=function(){k._updateCounts();};C.addEventToBindingInfo(A,"dataRequested",B);});}var U=sap.ushell&&sap.ushell.Container.getService("URLParsing");var y=U&&U.parseParameters(window.location.search);if(y&&y["sap-fe-test-appState"]){this.bTestAppState=true;}x.setProperty("hasPendingFilters",true);x.setProperty("appliedFilters","");x.setProperty("hideDraftInfo",false);x.setProperty("uom",{});x.setProperty("scalefactor",{});x.setProperty("scalefactorNumber",{});x.setProperty("currency",{});if(this._hasMultiVisualizations()){var z=this._getDefaultPath();if(!D.system.desktop&&z===u.Hybrid){z=u.Chart;}x.setProperty("alpContentView",z);}this.filterBarConditions={};this.getAppComponent().getRouterProxy().waitForRouteMatchBeforeNavigation();this._isMultiMode()&&this._updateMultiControlHiddenStatus();F.attachConditionHandling(this._getFilterBarControl());},onExit:function(){F.detachConditionHandling(this._getFilterBarControl());delete this._sEntitySet;delete this.filterBarConditions;delete this._oListReportControl;delete this._bMultiMode;this.extensionAPI&&this.extensionAPI.destroy();delete this.extensionAPI;},_onAfterBinding:function(){var k=this._getControls("table");var w=this;if(m.isEditStateDirty()){var x=this._getTableBinding();if(x){if(!this.sUpdateTimer){this.sUpdateTimer=setTimeout(function(){x.refresh();delete w.sUpdateTimer;},0);}var U=function(){w._updateTableActions(k);x.detachDataReceived(U);};x.attachDataReceived(U);}m.setEditStateProcessed();}if(!this.sUpdateTimer){this._updateTableActions(k);}this.pageReady.waitFor(this.getAppComponent().getAppStateHandler().applyAppState());},onBeforeRendering:function(){P.prototype.onBeforeRendering.apply(this);},onAfterRendering:function(k){var w=this;this.getView().getModel("sap.fe.i18n").getResourceBundle().then(function(x){w.oResourceBundle=x;var y=w._getControls();var z=w.getView().getViewData().entitySet;var A=C.getTranslatedText("T_OP_TABLE_AND_CHART_NO_DATA_TEXT",w.oResourceBundle,undefined,z);y.forEach(function(B){B.setNoDataText(A);});}).catch(function(x){L.error("Error while retrieving the resource bundle",x);});},onPageReady:function(k){if(k.forceFocus){var w=this._getFilterBarControl();if(w&&!w.getShowMessages()){w.setShowMessages(true);w.setFocusOnFirstErroneousField();}}},onViewNeedsRefresh:function(k){},onPendingFilters:function(){},getCurrentEntitySet:function(){if(!this._sEntitySet){var k=(this._isMultiMode()&&this._getCurrentControl())||this._getTable();this._sEntitySet=k.data("targetCollectionPath").slice(1);}return this._sEntitySet;},_updateTableActions:function(k){var w=[];k.forEach(function(x){w=C.getIBNActions(x,w);var y=x.getBindingContext("internal"),A=JSON.parse(q.parseCustomData(h.getCustomData(x,"operationAvailableMap"))),z=x.getSelectedContexts();C.setActionEnablement(y,A,z);});C.updateDataFieldForIBNButtonsVisibility(w,this.getView());},_scrollTablesToRow:function(R){this._getControls("table").forEach(function(k){r.scrollTableToRow(k,R);});},_getPageTitleInformation:function(){var k=this;return new Promise(function(w,x){var y={title:"",subtitle:"",intent:"",icon:""};y.title=k.getView().getContent()[0].data().ListReportTitle;y.subtitle=k.getView().getContent()[0].data().ListReportSubtitle;w(y);});},_getFilterBarControl:function(){return this.getView().byId(this._getFilterBarControlId());},_getSegmentedButton:function(k){return this.getView().byId(this._getSegmentedButtonId(k));},_getSegmentedButtonId:function(k){if(k==="Chart"){return this._getChart().data("segmentedButtonId");}else{return this._getTable().data("segmentedButtonId");}},_getFilterBarControlId:function(){return this.getView().getContent()[0].data("filterBarId");},_getChartControlId:function(){return this.getView().getContent()[0].data("singleChartId");},getChartControl:function(){return this.getView().byId(this._getChartControlId());},_getVisualFilterBarControl:function(){return this.getView().byId(this._getVisualFilterBarControlId());},_getVisualFilterBarControlId:function(){return this.getView().getContent()[0].data("visualFilterBarId");},_getMultiModeControl:function(){return this.getView().byId("fe::TabMultipleMode");},_getTableControlId:function(){return this.getView().getContent()[0].data("singleTableId");},_getCurrentControl:function(){if(!this._oListReportControl){var M=this._getMultiModeControl();this._oListReportControl=this.getView().byId(M.getSelectedKey()||M.getItems()[0].getKey());}return this._oListReportControl;},_getTable:function(){if(this._isMultiMode()){var k=this._getCurrentControl();return k&&k.isA("sap.ui.mdc.Table")?k:undefined;}return this.getView().byId(this._getTableControlId());},_getChart:function(){return this.getView().byId(this._getChartControlId());},_getTableBinding:function(k){var w=k?this.getView().byId(k):this._getTable(),B=w&&w._getRowBinding();return B;},_getControls:function(k){var w=this;if(this._isMultiMode()){var x=[];var y=this._getMultiModeControl();y.getItems().forEach(function(z){var A=w.getView().byId(z.getKey());if(k){if(z.getKey().indexOf("fe::"+k)>-1){A&&x.push(A);}}else{A&&x.push(A);}});return x;}return k==="Chart"?[this._getChart()]:[this._getTable()];},_getDefaultPath:function(){var k=this.getView().getContent()[0].data("defaultPath");switch(k){case"primary":return u.Chart;case"secondary":return u.Table;case"both":default:return u.Hybrid;}},_isMultiMode:function(){if(!this._oListReportControl){this._bMultiMode=!!this._getMultiModeControl();}return this._bMultiMode;},_isMultiEntitySets:function(){return(this.getView().getContent()[0].data("isMultiEntitySets")==="true");},_hasMultiVisualizations:function(){return(this.getView().getContent()[0].data("hasMultiVisualizations")==="true");},_setShareModel:function(){var G=O.get("sap.ushell.Container.getUser");var k={bookmarkTitle:document.title,bookmarkCustomUrl:function(){var H=window.hasher.getHash();return H?"#"+H:window.location.href;},isShareInJamActive:!!G&&G().isJamActive()};var w=this.getOwnerComponent().getModel("_templPriv");w.setProperty("/listReport/share",k);},_updateMultiControlHiddenStatus:function(){var k=this._getCurrentControl();if(this._isMultiMode()&&k){var w=k.getId();var x=this._getControls();x.forEach(function(y){var z=y.getId();y.data("controlHidden",z!==w);});}},_updateMultiNotApplicableFields:function(k,w){var x={};var y={},z=this._getControls("table"),A=this._getControls("Chart");z.forEach(function(B){var G=B.data("targetCollectionPath"),H=G.slice(1),J=B.getParent().getParent().getKey(),M=H+(B.data("enableAnalytics")==="true"?"Analytical":"Regular");if(!x[M]){x[M]=F.getNotApplicableFilters(w,B);}y[J]=x[M];});A.forEach(function(B){var G=B.data("targetCollectionPath"),H=G.slice(1),J=B.getParent().getParent().getKey(),M=H+"Chart";if(!x[M]){x[M]=F.getNotApplicableFilters(w,B);}y[J]=x[M];});k.setProperty("tabs/ignoredFields",y);},_updateMultiModeSelectedControl:function(){this._sEntitySet=undefined;this._oListReportControl=undefined;this._getCurrentControl();},_updateCounts:function(){this._updateMultiModeCounts();},_isCustomTab:function(){var M=this._getMultiModeControl();return M&&M.getSelectedKey().indexOf("::CustomTab::")>-1;},_updateMultiModeCounts:function(){var w=this;var B=[];var M=this._getMultiModeControl();if(M&&M.data("showCounts")==="true"&&!this._isCustomTab()){var x=this._getCurrentControl();var y=x.getId();var z=[];var A=M.getItems();A.forEach(function(k){var G=w.getView().byId(k.getKey());if(G&&!G.isA("sap.ui.mdc.ChartNew")&&(k.data("outdatedCounts")||G.getId()===y)){z.push({control:G,item:k});}});B=z.map(function(k){k.item.setCount("...");var G=k.control;var H=T.getFiltersInfoForSV(G,k.item.data("selectionVariant"));return T.getListBindingForCount(G,w.getView().getBindingContext(),{batchGroupId:G.getId()===y?G.data("batchGroupId"):"$auto",additionalFilters:H.filters});});Promise.all(B).then(function(G){for(var k in G){var H=z[k].item;H.setCount(T.getCountFormatted(G[k]));H.data("outdatedCounts",false);}}).catch(function(k){L.error("Error while retrieving the values for the icon tab bar",k);});}},_shouldAutoTriggerSearch:function(k){if(this.getView().getViewData().initialLoad===v.Auto&&(!k||k.getStandardVariantKey()===k.getCurrentVariantKey())){var w=this._getFilterBarControl(),x=w.getConditions();for(var y in x){if(!y.startsWith("$")&&Array.isArray(x[y])&&x[y].length){return true;}}}return false;},_updateTable:function(k){if(!k.isTableBound()||this.hasPendingChartChanges){k.rebindTable();this.hasPendingChartChanges=false;}},_updateChart:function(k){var w=k.getControlDelegate()._getChart(k);if(!(w&&w.isBound("data"))||this.hasPendingTableChanges){k.getControlDelegate().rebindChart(k,w.getBindingInfo("data"));this.hasPendingTableChanges=false;}},handlers:{onTabMultiModeChange:function(k){if(k&&k.mParameters&&k.mParameters.previousKey!=k.mParameters.selectedKey){this._updateMultiModeSelectedControl();this._updateMultiControlHiddenStatus();var w=this._getFilterBarControl();var x=this.getView().getBindingContext("internal");var y=this._getCurrentControl();var M=this._getMultiModeControl();var z=M.getSelectedKey();x.setProperty("tabs/selected",z);if(w&&x.getProperty("hasPendingFilters")!==true){if(this._isCustomTab()){var A=w.getFilterConditions();this.onViewNeedsRefresh({filterConditions:A,currentTabId:z,refreshCause:"tabChanged"});}else if(!y.isA("sap.ui.mdc.ChartNew")&&(!y.getRowBinding()||y.data("outdatedRows")===true)){y.rebindTable();y.data("outdatedRows",false);}else if(y.isA("sap.ui.mdc.ChartNew")&&(!y.getControlDelegate()._getChart(y).getBinding("data")||y.data("outdatedRows")===true)){var B=y.getControlDelegate()._getChart(y);y.getControlDelegate().rebindChart(y,B.getBindingInfo("data"));y.data("outdatedRows",false);}}this.getExtensionAPI().updateAppState();}},onFiltersChanged:function(k){var w=this._getFilterBarControl(),x=this.getView().getBindingContext("internal");this.onPendingFilters();x.setProperty("appliedFilters",w.getAssignedFiltersText().filtersText);x.setProperty("hasPendingFilters",true);if(k.getParameter("conditionsBased")){this.getExtensionAPI().updateAppState();}},onVariantSelected:function(k){var w=this,x=k.getSource();setTimeout(function(){if(w._isMultiMode()){w.handlers.onTabMultiModeChange.apply(w);}if(w._shouldAutoTriggerSearch(x)){return w._getFilterBarControl().triggerSearch();}else{w.getExtensionAPI().updateAppState();}},0);},onVariantSaved:function(k){var w=this;setTimeout(function(){w.getExtensionAPI().updateAppState();},1000);},onSearch:function(k){var w=this;var x=this._getFilterBarControl();var y=this.getView().getBindingContext("internal");var M=this.getChartControl();var H=F.getEditStateIsHideDraft(x.getConditions());y.setProperty("hasPendingFilters",false);y.setProperty("hideDraftInfo",H);if(this._isMultiMode()){var z=this._getControls(),A=this._getMultiModeControl();if(A&&A.data("showCounts")==="true"){var B=A.getItems();B.forEach(function(R){if(!R.getKey().indexOf("fe::Chart")>-1){R.data("outdatedCounts",true);}});}if(!this._isCustomTab()){var G=this._getCurrentControl().getId();this._updateMultiNotApplicableFields(y,x);z.forEach(function(R){R.data("outdatedRows",R.getId()!==G);});}else{var J=x.getFilterConditions();this.onViewNeedsRefresh({filterConditions:J,currentTabId:A.getSelectedKey(),refreshCause:"search"});}}if(M){M.getBindingContext("internal").setProperty("",{});var N=M.getBindingContext("pageInternal");var Q=N.getProperty(N.getPath()+"/alpContentView");if(Q===u.Chart){this.hasPendingChartChanges=true;}if(Q===u.Table){this.hasPendingTableChanges=true;}}a.retrieveExternalState(x).then(function(R){w.filterBarConditions=R.filter;}).catch(function(R){L.error("Error while retrieving the external state",R);});if(this.getView().getViewData().liveMode===false){this.getExtensionAPI().updateAppState();}},onChevronPressNavigateOutBound:function(k,w,x,y){return k._intentBasedNavigation.onChevronPressNavigateOutBound(k,w,x,y);},onChartSelectionChanged:function(k){var M=k.getSource().getContent(),w=this._getTable(),x=k.getParameter("data"),y=this.getView().getBindingContext("internal");if(x){e.fnUpdateChart(k);g.setChartFilters(M);}var z=y.getProperty(y.getPath()+"/alpContentView");if(z===u.Chart){this.hasPendingChartChanges=true;}else{w&&w.rebindTable();this.hasPendingChartChanges=false;}},onSegmentedButtonPressed:function(k){var w=k.mParameters.key?k.mParameters.key:null;var x=this.getView().getBindingContext("internal");x.setProperty("alpContentView",w);var y;var z=this._getChart();var A=this._getTable();var B={onAfterRendering:function(){var G=y.getItems();G.forEach(function(H){if(H.getKey()===w){H.focus();}});y.removeEventDelegate(B);}};y=w===u.Table?this._getSegmentedButton("Table"):this._getSegmentedButton("Chart");if(y!==k.getSource()){y.addEventDelegate(B);}switch(w){case u.Table:this._updateTable(A);break;case u.Chart:this._updateChart(z);break;case u.Hybrid:this._updateTable(A);this._updateChart(z);break;default:break;}this.getExtensionAPI().updateAppState();},onFiltersSegmentedButtonPressed:function(k){if(k.getParameter("key")==="Compact"){this._getFilterBarControl().setVisible(true);this.getView().byId(this.getView().getContent()[0].data("visualFilterBarId")).setVisible(false);}else{this._getFilterBarControl().setVisible(false);this.getView().byId(this.getView().getContent()[0].data("visualFilterBarId")).setVisible(true);}},onTableStateChanged:function(k){if(this.bTestAppState){this.getExtensionAPI().updateAppState();}}},formatters:{isDraftIndicatorVisible:function(k,w,H,x,y){if(x!==undefined&&H!==undefined&&(!x||H)&&!y){return k===w;}else{return false;}},setTabMessageStrip:function(k,w){var x="";if(Array.isArray(k)&&k.length>0&&w){var y=this._getFilterBarControl(),z=y.data("entityType"),M=this.getView().getModel().getMetaModel(),R=sap.ui.getCore().getLibraryResourceBundle("sap.fe.templates"),A=k.map(function(H){if(H==="$search"){var J=sap.ui.getCore().getLibraryResourceBundle("sap.fe.macros");return J?J.getText("M_FILTERBAR_SEARCH"):"";}var N=M.getObject(z+H+"@com.sap.vocabularies.Common.v1.Label");return h.getLocalizedText(N,y);});if(R){var B="C_LR_MULTITABLES_"+(A.length===1?"SINGLE":"MULTI")+"_IGNORED_FILTER_"+(D.system.desktop?"LARGE":"SMALL"),G=h.getLocalizedText(w,y);x=R.getText(B,[A.join(", "),G]);}}return x;}}});});