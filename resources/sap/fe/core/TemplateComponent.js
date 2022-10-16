/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/UIComponent","sap/fe/core/CommonUtils","sap/base/Log"],function(U,C,L){"use strict";var T=U.extend("sap.fe.core.TemplateComponent",{metadata:{interfaces:["sap.ui.core.IAsyncContentCreation"],properties:{entitySet:{type:"string",defaultValue:null},contextPath:{type:"string",defaultValue:null},bindingContextPattern:{type:"string"},navigation:{type:"object"},enhanceI18n:{type:"string[]"},controlConfiguration:{type:"object"},content:{type:"object"},allowDeepLinking:{type:"boolean"},refreshStrategyOnAppRestore:{type:"object"}},events:{containerDefined:{container:{type:"sap.ui.base.ManagedObject"}},heroesBatchReceived:{element:{type:"sap.ui.base.ManagedObject"}},workersBatchReceived:{element:{type:"sap.ui.base.ManagedObject"}}},library:"sap.fe.core"},setContainer:function(c){U.prototype.setContainer.apply(this,arguments);this.fireContainerDefined({container:c});},init:function(){this.oAppComponent=C.getAppComponent(this);U.prototype.init.apply(this,arguments);},getExtensionComponent:function(){return this.oAppComponent;},onPageReady:function(p){if(this.getRootControl()&&this.getRootControl().getController()&&this.getRootControl().getController().onPageReady){this.getRootControl().getController().onPageReady(p);}},getNavigationConfiguration:function(t){var n=this.getNavigation();return n[t];},getViewData:function(){var p=this.getMetadata().getAllProperties();var v=Object.keys(p).reduce(function(V,P){V[P]=p[P].get(this);return V;}.bind(this),{});v.fclEnabled=this.oAppComponent._isFclEnabled();return v;},_getPageTitleInformation:function(){if(this.getRootControl()&&this.getRootControl().getController()&&this.getRootControl().getController()._getPageTitleInformation){return this.getRootControl().getController()._getPageTitleInformation();}else{return Promise.resolve({});}},getExtensionAPI:function(){return this.getRootControl().getController().getExtensionAPI();}});return T;},true);
