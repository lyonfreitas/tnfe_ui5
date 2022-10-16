// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/services/Ui5ComponentHandle","sap/ushell/services/_Ui5ComponentLoader/utils","sap/ushell/EventHub","sap/ui/thirdparty/jquery"],function(u,U,o,e,q){"use strict";function a(A,c,p,C){this._oConfig=(C&&C.config)||{};this._oAdapter=A;this._logStackTrace=function(b,E){var s=JSON.stringify(b,null,4);o.logInstantiateComponentError(b.name,E+"",E.status,E.stack,s);return Promise.reject(E);};this.modifyComponentProperties=function(d,s){if(!this._oAdapter.modifyComponentProperties){return Promise.resolve(d);}return this._oAdapter.modifyComponentProperties(d.componentProperties,s).then(function(b){d.componentProperties=b;return d;});};this.createComponent=function(b,P,w,s){var d=new q.Deferred(),t=this;this.createComponentData(b,P,w).then(function(f){return t.modifyComponentProperties(f,s);}).then(function(D){t.instantiateComponent(D).then(d.resolve,d.reject);},function(){d.resolve(b);});return d.promise();};this.createComponentData=function(b,P,w){var t=this;return new Promise(function(r,R){var d={},f=b||{},l=o.shouldLoadCoreExt(f),g=o.shouldUseAmendedLoading(t._oConfig),L=o.shouldLoadDefaultDependencies(f,t._oConfig,g),n=u.getParameterValueBoolean("sap-ushell-nocb"),h=f.applicationDependencies||{};o.logAnyApplicationDependenciesMessages(h.name,h.messages);if(!f.ui5ComponentName){R();return;}delete f.loadCoreExt;delete f.loadDefaultDependencies;var i=o.createComponentData(f.componentData||{},f.url,f.applicationConfiguration,f.reservedParameters);if(f.getExtensions){i.getExtensions=f.getExtensions;delete f.getExtensions;}if(f.oPostMessageInterface){i.oPostMessageInterface=f.oPostMessageInterface;delete f.oPostMessageInterface;}var s=o.constructAppComponentId(P||{}),j=l&&g,k=o.prepareBundle(t._oConfig.coreResourcesComplement),m=o.createComponentProperties(j,L,n,w,f.applicationDependencies||{},f.ui5ComponentName,f.url,s,k);d.componentData=i;d.componentProperties=m;d.appPropertiesSafe=f;d.loadCoreExt=l;r(d);});};this.instantiateComponent=function(d){var b=d.componentProperties,f=d.componentData,g=d.appPropertiesSafe,l=d.loadCoreExt;U.onBeforeApplicationInstanceCreated.call(null,b);var D=new q.Deferred();o.createUi5Component(b,f).then(function(h){var i=new U(h);g.componentHandle=i;var j=l;if(j){g.coreResourcesFullyLoaded=j;e.emit("CoreResourcesComplementLoaded",{status:"success"});}D.resolve(g);}).fail(this._logStackTrace.bind(this,b)).catch(D.reject);return D.promise();};this.loadCoreResourcesComplement=function(){if(this.loadCoreResourcesComplementPromise){return this.loadCoreResourcesComplementPromise.promise();}var b=o.prepareBundle(this._oConfig.coreResourcesComplement),d=new q.Deferred();o.loadBundle(b).done(function(){e.emit("CoreResourcesComplementLoaded",{status:"success"});this.loadCoreResourcesComplementPromise=d;d.resolve();}.bind(this)).fail(function(){e.emit("CoreResourcesComplementLoaded",{status:"failed"});d.reject();});return d.promise();};e.once("loadCoreResourcesComplement").do(function(){this.loadCoreResourcesComplement();}.bind(this));}a.hasNoAdapter=false;return a;},true);