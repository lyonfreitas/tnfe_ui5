// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/components/applicationIntegration/application/BlueBoxesCache","sap/ushell/components/applicationIntegration/application/Application","sap/ushell/components/container/ApplicationContainer","sap/ui/thirdparty/URI","sap/ui/thirdparty/jquery","sap/base/Log","sap/base/util/UriParameters","sap/base/security/encodeXML"],function(B,A,a,U,q,L,b,e){"use strict";function c(){var t=this,d,C={isStateful:{handler:function(g,i){if(g&&(g.enabled===true||g===true)){return true;}return false;}},isGUI:{handler:function(g,i){if(g&&g.protocol==="GUI"){return true;}return false;}},isGUIStateful:{handler:function(g,i){return t.isCapUT(i,"isGUI")&&t.isCapUT(i,"isStateful");}},isFLP:{handler:function(g,i){return!t.isCapUT(i,"isGUI")&&t.isCapUT(i,"isStateful");}}},o={},s={},h={setup:function(T,S){},create:function(i,u,S,T){var D=new q.Deferred(),F,p;function g(){if(F){F["sap-flp-url"]=sap.ushell.Container.getFLPUrl(true);F["system-alias"]=i.getSystemAlias();p["sap-flp-params"]=F;}sap.ui.getCore().getEventBus().publish("launchpad","appOpening",T);A.postMessageToIframeApp(i,"sap.ushell.services.appLifeCycle","create",p,true).then(function(){o[i].currentAppTarget=T;sap.ui.getCore().getEventBus().publish("sap.ushell","appOpened",T);D.resolve();});}u=a.prototype._checkNwbcUrlAdjustment(i,T.applicationType,u);u=a.prototype._adjustURLForIsolationOpeningWithoutURLTemplate(u);p={sCacheId:S,sUrl:u,sHash:window.hasher.getHash()};if(u.indexOf("sap-iframe-hint=GUI")>0||u.indexOf("sap-iframe-hint=WDA")>0){var I=[];var k=a.prototype._getParamKeys(u,I);if(k.length>0){sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then(function(j){j.getAppStateData(k).then(function(l){F={};I.forEach(function(m,n){if(l[n][0]){F[m]=l[n][0];}});g();},function(){g();});});}else{F={};g();}}else{g();}return D.promise();},destroy:function(i,S){var p;p=A.postMessageToIframeApp(i,"sap.ushell.services.appLifeCycle","destroy",{sCacheId:S},true);p.then(function(){sap.ui.getCore().getEventBus().publish("sap.ushell","appClosed",o[i].currentAppTarget);o[i].currentAppTarget=undefined;});return p;},store:function(i,S){var p;p=A.postMessageToIframeApp(i,"sap.ushell.services.appLifeCycle","store",{sCacheId:S},true);p.then(function(){sap.ui.getCore().getEventBus().publish("sap.ushell","appClosed",o[i].currentAppTarget);o[i].currentAppTarget=undefined;});return p;},restore:function(i,S,T){var p;sap.ui.getCore().getEventBus().publish("launchpad","appOpening",T);p=A.postMessageToIframeApp(i,"sap.ushell.services.appLifeCycle","restore",{sCacheId:S,sUrl:T.url,sHash:window.hasher.getHash()},true);p.then(function(){o[i].currentAppTarget=T;sap.ui.getCore().getEventBus().publish("sap.ushell","appOpened",T);});return p;}},f=[{service:"sap.ushell.services.appLifeCycle",action:"create"},{service:"sap.ushell.services.appLifeCycle",action:"destroy"}];this.init=function(S,i,g){B.init();A.init(this);d=g;if(i){s=q.extend(true,s,i.supportedTypes);}};this.isStatefulContainerSupported=function(g){var i=this.isCapabilitySupported(g,"sap.ushell.services.appLifeCycle","create")&&this.isCapabilitySupported(g,"sap.ushell.services.appLifeCycle","destroy");return i;};this.isKeepAliveSupported=function(g){var i=this.isCapabilitySupported(g,"sap.ushell.services.appLifeCycle","store")&&this.isCapabilitySupported(g,"sap.ushell.services.appLifeCycle","restore");return i;};this.mapCapabilities=function(g,i){this.setCapabilities(g,i);};this.getCapabilities=function(g){return o[g].oCapMap;};this.isCapabilitySupported=function(g,S,i){if(o[g]&&o[g].oCapMap&&o[g].oCapMap[S]){return!!o[g].oCapMap[S][i];}return false;};this.setCapabilities=function(g,i){var j;if(!o[g]){this.initBlueBoxBD(g);}if(!o[g].oCapMap){o[g].oCapMap={};}j=o[g].oCapMap;Object.keys(i).forEach(function(k){var l=i[k],m;if(!j[l.service]){j[l.service]={};}m=j[l.service];m[l.action]=true;});if(!g.getIsStateful()&&this.isStatefulContainerSupported(g)){g.setIsStateful(true);}};this.removeCapabilities=function(g){if(o[g]){o[g].oCapMap={};g.setIsStateful(false);}};this.hasIFrame=function(g){if(g&&g._getIFrame){return true;}return false;};this.initBlueBoxBD=function(g){o[g]={BlueBox:g};};this.setAppCapabilities=function(g,T){if(!o[g]){this.initBlueBoxBD(g);}o[g].currentAppTarget=T;o[g].appCapabilities=T.appCapabilities;if(T.appCapabilities&&T.appCapabilities.statefulContainer===true){this.setCapabilities(g,f);}};this.forEach=function(g){var k;for(k in o){if(o.hasOwnProperty(k)){g(o[k].BlueBox);}}};this.isCapByTarget=function(T,g){if(T.appCapabilities===undefined){return false;}if(C[g]&&T&&T.appCapabilities){return C[g].handler(T.appCapabilities);}return T.appCapabilities[g]||false;};this.isCapUT=function(g,i){var j=o[g];if(j===undefined||j.appCapabilities===undefined){return false;}if(C[i]&&j){return C[i].handler(j.appCapabilities,g);}return j.appCapabilities[i]||false;};this.setStorageKey=function(g,i){if(!o[g]){this.initBlueBoxBD(g);}o[g].sStorageKey=i;};this.getStorageKey=function(g){if(!o[g]){return undefined;}return o[g].sStorageKey;};this.getHandler=function(){return h;};this._getBlueBoxCacheKey=function(u){return B.getBlueBoxCacheKey(u);};this.deleteStateFul=function(u){return this.delete(u);};this.getStateFul=function(u){return B.get(u);};this.destroyApp=function(g){d.postMessageToIframeApp("sap.ushell.services.appLifeCycle","destroy",{appId:g});};this.openApp=function(g){d.postMessageToIframeApp("sap.ushell.services.appLifeCycle","create",{appId:g,sHash:window.hasher.getHash()});};this.storeApp=function(g){d.postMessageToIframeApp("sap.ushell.services.appLifeCycle","store",{appId:g,sHash:window.hasher.getHash()});};this.restoreApp=function(g){d.postMessageToIframeApp("sap.ushell.services.appLifeCycle","restore",{appId:g,sHash:window.hasher.getHash()});};this.delete=function(u){B.remove(u);};this.get=function(u){return B.get(u);};this.getById=function(i){return B.getById(i);};this.set=function(u,i){B.add(u,i);};}return new c();},true);