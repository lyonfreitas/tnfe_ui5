/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/integration/util/ServiceDataProvider","sap/ui/integration/util/RequestDataProvider","sap/ui/integration/util/CacheAndRequestDataProvider","sap/ui/integration/util/DataProvider","sap/ui/integration/util/ExtensionDataProvider","sap/ui/integration/util/JSONBindingHelper","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/CsrfTokenHandler"],function(B,S,R,C,D,E,J,a,b){"use strict";var c=B.extend("sap.ui.integration.util.DataProviderFactory",{constructor:function(s){B.call(this);s=s||{};this._oDestinations=s.destinations;this._oExtension=s.extension;this._oCsrfTokenHandler=s.csrfTokenHandler;this._oCard=s.card;this._oEditor=s.editor;this._oHost=s.host;if(s.csrfTokensConfig){this._oCsrfTokenHandler=new b({host:s.host,configuration:s.csrfTokensConfig});}this._aDataProviders=[];this._aFiltersProviders=[];}});c.prototype.destroy=function(){B.prototype.destroy.apply(this,arguments);if(this._aDataProviders){this._aDataProviders.forEach(function(d){if(!d.bIsDestroyed){d.destroy();}});this._aDataProviders=null;this._aFiltersProviders=null;}if(this._oCsrfTokenHandler){this._oCsrfTokenHandler.destroy();this._oCsrfTokenHandler=null;}this._oCard=null;this._oExtension=null;this._bIsDestroyed=true;};c.prototype.isDestroyed=function(){return this._bIsDestroyed;};c.prototype.create=function(d,s,i){var o=this._oCard,e=this._oEditor,h=this._oHost||(o&&o.getHostInstance())||(e&&e.getHostInstance()),u=h&&h.bUseExperimentalCaching,f,g;if(!d){return null;}if(o){f={"baseRuntimeUrl":o.getRuntimeUrl("/"),"settingsJson":J.createJsonWithBindingInfos(d,o.getBindingNamespaces())};}else if(e){f={"baseRuntimeUrl":e.getRuntimeUrl("/"),"settingsJson":J.createJsonWithBindingInfos(d,e.getBindingNamespaces())};}else{f={"settingsJson":J.createJsonWithBindingInfos(d,{})};}if(d.request&&u){g=new C(f);g.setCard(o);g.setHost(h);}else if(d.request){g=new R(f);}else if(d.service){g=new S(f);}else if(d.json){g=new D(f);}else if(d.extension){g=new E(f,this._oExtension);}else{return null;}if(o){a.propagateModels(o,g);}else if(e){a.propagateModels(e,g);}g.bindObject("/");g.setDestinations(this._oDestinations);if(this._oCsrfTokenHandler){g.setCsrfTokenHandler(this._oCsrfTokenHandler);this._oCsrfTokenHandler.setDataProviderFactory(this);}if(g.isA("sap.ui.integration.util.IServiceDataProvider")){g.createServiceInstances(s);}this._aDataProviders.push(g);if(i){this._aFiltersProviders.push(g);}else{g.setDependencies(this._aFiltersProviders);}return g;};c.prototype.remove=function(d){var p=this._aDataProviders.indexOf(d);if(p>-1){this._aDataProviders.splice(p,1);}if(d&&!d.bDestroyed&&d._bIsDestroyed){d.destroy();}};c.prototype.setHost=function(h){this._oHost=h;if(this._oCsrfTokenHandler){this._oCsrfTokenHandler.setHost(h);}};return c;});