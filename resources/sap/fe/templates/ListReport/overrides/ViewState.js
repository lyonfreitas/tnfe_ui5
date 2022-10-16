/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/library","sap/fe/navigation/library","sap/fe/core/CommonUtils","sap/fe/core/helpers/KeepAliveHelper","sap/ui/fl/apply/api/ControlVariantApplyAPI","sap/ui/mdc/p13n/StateUtil","sap/ui/Device","sap/ui/mdc/enum/ConditionValidated","sap/base/Log"],function(C,N,a,K,b,S,D,c,L){"use strict";var d=N.NavType,V=C.VariantManagement,T=C.TemplateContentView,I=C.InitialLoadMode;return{applyInitialStateOnly:function(){return true;},onBeforeStateApplied:function(p){var v=this.getView(),o=v.getController(),f=o._getFilterBarControl(),t=o._getControls("table");f.setSuspendSelection(true);t.forEach(function(e){p.push(e.initialized());});p.push(f.initialized());delete this._bSearchTriggered;},onAfterStateApplied:function(){var v=this.getView(),o=v.getController();o._getFilterBarControl().setSuspendSelection(false);},adaptBindingRefreshControls:function(e){var v=this.getView(),o=v.getController(),f=o._getControls(),g=K.getControlsForRefresh(v,f);Array.prototype.push.apply(e,g);},adaptStateControls:function(s){var v=this.getView(),o=v.getController(),e=v.getViewData(),f=e.variantManagement===V.Control,t=this;if(o._isMultiMode()){s.push(o._getMultiModeControl());}var F=this._getFilterBarVM(v);if(F){s.push(F);}o._getControls("table").forEach(function(g){var q=g.getQuickFilter();if(q){s.push(q);}if(f){s.push(g.getVariant());}if(t.getView().getController().bTestAppState){s.push(g);}});if(o._hasMultiVisualizations()){s.push(o._getSegmentedButton(T.Chart));s.push(o._getSegmentedButton(T.Table));}s.push(o._getFilterBarControl());s.push(v.byId("fe::ListReport"));},adaptControlStateHandler:function(o,e){if(o.isA("sap.ui.fl.variants.VariantManagement")){e.push({retrieve:function(v){return{"variantId":v.getCurrentVariantKey()};},apply:function(v,f){if(f&&f.variantId!==undefined){v.setModified(true);}}});}},retrieveAdditionalStates:function(A){var v=this.getView(),o=v.getController(),p=v.getBindingContext("internal").getProperty("hasPendingFilters");A.dataLoaded=!p||!!this._bSearchTriggered;if(o._hasMultiVisualizations()){var s=v.getBindingContext("internal").getProperty("alpContentView");A.alpContentView=s;}delete this._bSearchTriggered;},applyAdditionalStates:function(A){var v=this.getView(),o=v.getController(),f=o._getFilterBarControl();if(A){if(A.dataLoaded===false){f._bSearchTriggered=false;}else if(A.dataLoaded===true){o._getFilterBarControl().triggerSearch();this._bSearchTriggered=true;}if(o._hasMultiVisualizations()){var i=v.getBindingContext("internal");if(!D.system.desktop&&A.alpContentView==T.Hybrid){A.alpContentView=T.Chart;}i.getModel().setProperty(i.getPath()+"/alpContentView",A.alpContentView);}}},applyNavigationParameters:function(n,r){var v=this.getView(),t=this,o=v.getController(),e=o.getOwnerComponent(),A=sap.ui.core.Component.getOwnerComponentFor(e),f=A.getComponentData(),s=(f&&f.startupParameters)||{},g=t.handleVariantIdPassedViaURLParams(s),F;g.then(function(h){if(h&&h.length>0){if(h[0]===true||h[1]===true){F=true;}}var R=t._applySelectionVariant(v,n,F).then(function(){var o=v.getController();var i=v.byId("fe::ListReport");var p=false;var j=t._getFilterBarVM(v);var k=o._getFilterBarControl();if((n.navigationType!==d.initial&&n.requiresStandardVariant)||(!j&&v.getViewData().initialLoad===I.Enabled)||o._shouldAutoTriggerSearch(j)){k.triggerSearch();}else{p=t._preventInitialSearch(j);}t._bSearchTriggered=!p;i.setHeaderExpanded(D.system.desktop||p);});r.push(R);}).catch(function(){L.error("Variant ID cannot be applied");});},handleVariantIdPassedViaURLParams:function(u){var p=u["sap-ui-fe-variant-id"],f=u["sap-ui-fe-filterbar-variant-id"],t=u["sap-ui-fe-table-variant-id"],v;if(p||f||t){v={sPageVariantId:p&&p[0],sFilterBarVariantId:f&&f[0],sTableVariantId:t&&t[0]};}return this._handleControlVariantId(v);},_handleControlVariantId:function(v){var o=this.getView(),p=[],t=this;var s=o.getViewData().variantManagement;if(v&&v.sPageVariantId&&s==="Page"){var e=o.byId("fe::PageVariantManagement");e.getVariants().forEach(function(h){if(h.key===v.sPageVariantId){p.push(t._applyControlVariant(e,v.sPageVariantId,true));}});}else if(v&&s==="Control"){if(v.sFilterBarVariantId){var e=o.byId(o.getContent()[0].data("filterBarVariantId"));e.getVariants().forEach(function(h){if(h.key===v.sFilterBarVariantId){p.push(t._applyControlVariant(e,v.sFilterBarVariantId,true));}});}if(v.sTableVariantId){var f=o.getController(),g=f._getControls("table");g.forEach(function(h){var i=h.getVariant();if(h&&i){i.getVariants().forEach(function(j){if(j.key===v.sTableVariantId){p.push(t._applyControlVariant(i,v.sTableVariantId));}});}});}}return Promise.all(p);},_applyControlVariant:function(v,s,f){var e=this._checkIfVariantIdIsAvailable(v,s)?s:v.getStandardVariantKey();var o=b.activateVariant({element:v,variantReference:e});return o.then(function(){return f;});},_getFilterBarVM:function(v){var o=v.getViewData();switch(o.variantManagement){case V.Page:return v.byId("fe::PageVariantManagement");case V.Control:return v.byId(v.getContent()[0].data("filterBarVariantId"));case V.None:return null;default:throw new Error("unhandled variant setting: "+o.variantManagement);}},_preventInitialSearch:function(v){if(!v){return true;}var e=v.getVariants();var o=e.find(function(i){return i.key===v.getCurrentVariantKey();});return!o.executeOnSelect;},_applySelectionVariant:function(v,n,f){var s=n.selectionVariant,o=n.selectionVariantDefaults;if(!s){return Promise.resolve();}var e={},m=v.getModel().getMetaModel(),g=v.getViewData(),h=g.contextPath||"/"+g.entitySet,F=v.byId(v.getContent()[0].data("filterBarId")),M=a.getMandatoryFilterFields(m,h),i,r=n.requiresStandardVariant;if(f){e=F.getConditions();}a.addDefaultDisplayCurrency(M,s,o);a.addSelectionVariantToConditions(s,e,m,h);switch(g.variantManagement){case V.Page:i=v.byId("fe::PageVariantManagement");break;case V.Control:i=v.byId(v.getContent()[0].data("filterBarVariantId"));break;case V.None:default:break;}return this._activateSelectionVariant(F,e,i,r,f);},_activateSelectionVariant:function(f,o,v,r,F){var t=this,p;if(v&&!F){var e=r?v.getStandardVariantKey():v.getDefaultVariantKey();if(e===null){e=v.getId();}p=b.activateVariant({element:v,variantReference:e}).then(function(){return r||v.getDefaultVariantKey()===v.getStandardVariantKey();});}else{p=Promise.resolve(true);}return p.then(function(g){if(g){if(t.getView().getController().bTestAppState){return t._fnApplyConditions(f,o);}return t._fnClearFilterAndReplaceWithAppState(f,o);}});},_fnApplyConditions:function(f,o){var F={},i=[],A=function(e){e.validated=c.Validated;if(e.operator==="Empty"){e.operator="EQ";e.values=[""];}else if(e.operator==="NotEmpty"){e.operator="NE";e.values=[""];}delete e.isEmpty;};return f.initialized().then(function(){f.getPropertyInfoSet().filter(function(p){return p.path!=="$editState"&&p.path!=="$search";}).forEach(function(p){if(p.path in o){F[p.path]=o[p.path];if(!p.hiddenFilter){i.push({name:p.path});}if(p.hasValueHelp){F[p.path].forEach(A);}else{F[p.path].forEach(function(e){e.validated=c.NotValidated;});}}else{F[p.path]=[];}});return S.applyExternalState(f,{filter:F,items:i});});},_fnClearFilterAndReplaceWithAppState:function(f,o){return this._fnApplyConditions(f,{}).then(this._fnApplyConditions.bind(this,f,o));}};});
