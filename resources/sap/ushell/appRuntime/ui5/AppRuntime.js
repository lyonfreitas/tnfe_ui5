// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
prepareModules();sap.ui.define(["sap/ui/Device","sap/ushell/resources","sap/base/util/LoaderExtensions","sap/ushell/appRuntime/ui5/AppRuntimePostMessageAPI","sap/ushell/appRuntime/ui5/AppCommunicationMgr","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/ui/thirdparty/URI","sap/ushell/appRuntime/ui5/SessionHandlerAgent","sap/ushell/appRuntime/ui5/services/AppLifeCycleAgent","sap/ushell/appRuntime/ui5/services/ShellUIService","sap/ushell/ui5service/UserStatus","sap/ushell/appRuntime/ui5/services/AppConfiguration","sap/ui/core/Popup","sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject","sap/base/Log","sap/ui/core/ComponentContainer","sap/ushell/appRuntime/ui5/renderers/fiori2/AccessKeysAgent","sap/ui/core/BusyIndicator","sap/ushell/UI5ComponentType","sap/ushell/iconfonts","sap/ushell/utils/WindowUtils","sap/ushell/utils/UrlParsing","sap/ushell/appRuntime/ui5/performance/FesrEnhancer","sap/ui/core/routing/History","sap/ushell/EventHub"],function(D,r,L,A,a,b,U,S,c,d,f,g,P,q,i,h,C,j,B,k,I,W,u,F,H,E){"use strict";F.init();var _,p=new U().search(true),o,l=false,O,m=false,n=false,s=false,t=false,G=false,v;function w(){this.main=function(){a.init();this.getPageConfig();c.getURLParameters(_._getURI()).then(function(e){var K=e["sap-ui-app-id"];_.setModulePaths();_.init();var M=new Promise(function(R){sap.ui.require(["sap/ushell/appRuntime/ui5/services/UserInfo"],R);});Promise.all([_.initServicesContainer(),_.getAppInfo(K),M]).then(function(N){var Q=N[1];S.init();j.init();_._setInitialAppRoute();_.createApplication(K,e,Q).then(function(R){_.renderApplication(R);});});});};this._setInitialAppRoute=function(){var e=u.parseShellHash(window.hasher.getHash());if(e&&e.appSpecificRoute&&e.appSpecificRoute.length>0){b.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.setInnerAppRoute",{appSpecificRoute:decodeURIComponent(e.appSpecificRoute)});}};this._getURI=function(){return new U().query(true);};this.init=function(){I.registerFiori2IconFont();G=this._getURIParams()["sap-manifest-width"];g.setFullWidthFromManifest(G);A.registerCommHandlers({"sap.ushell.appRuntime":{oServiceCalls:{"hashChange":{executeServiceCallFn:function(e){var K=e.oMessageData.body.sHash;if(K&&K.length>0){window.hasher.replaceHash(K);}return new q.Deferred().resolve().promise();}},"setDirtyFlag":{executeServiceCallFn:function(e){var K=e.oMessageData.body.bIsDirty;if(K!==sap.ushell.Container.getDirtyFlag()){sap.ushell.Container.setDirtyFlag(K);}return new q.Deferred().resolve().promise();}},"getDirtyFlag":{executeServiceCallFn:function(e){return new q.Deferred().resolve(sap.ushell.Container.getDirtyFlag()).promise();}},"themeChange":{executeServiceCallFn:function(e){var K=e.oMessageData.body.currentThemeId;sap.ushell.Container.getUser().setTheme(K);return new q.Deferred().resolve().promise();}},"buttonClick":{executeServiceCallFn:function(e){sap.ushell.renderers.fiori2.Renderer.handleHeaderButtonClick(e.oMessageData.body.buttonId);return new q.Deferred().resolve().promise();}},"uiDensityChange":{executeServiceCallFn:function(e){var K=e.oMessageData.body.isTouch;q("body").toggleClass("sapUiSizeCompact",(K==="0")).toggleClass("sapUiSizeCozy",(K==="1"));return new q.Deferred().resolve().promise();}}}}});};this.handleLinkElementOpen=function(e,K){if(e.target&&e.target.tagName==="A"&&e.target.target==="_blank"&&e.target.href&&e.target.href.indexOf('#')>0){var N=_.rebuildNewAppUrl(e.target.href,K);if(N!==e.target.href){W.openURL(N);return false;}}};this.rebuildNewAppUrl=function(T,e){var K=T.split('#');if(K[0].length===0||K[0]===document.URL.split('#')[0]){return e+"#"+K[1];}return T;};this.getPageConfig=function(){var e,K={};t=(p["sap-spaces"]==="true");e=q("meta[name='sap.ushellConfig.ui5appruntime']")[0];if(e!==undefined){K=JSON.parse(e.content);if(t===true){K.ushell=K.ushell||{};K.ushell.spaces={"enabled":true};}}window["sap-ushell-config"]=q.extend(true,{},x(),K);};this.setModulePaths=function(){if(window["sap-ushell-config"].modulePaths){var e=Object.keys(window["sap-ushell-config"].modulePaths);for(var K in e){(function(){var M={};M[e[K].replace(/\./g,"/")]=window["sap-ushell-config"].modulePaths[e[K]];sap.ui.loader.config({paths:M});}());}}};this.initServicesContainer=function(){return new Promise(function(R){sap.ui.require(["sap/ushell/appRuntime/ui5/services/Container"],function(K){K.bootstrap("apprt",{apprt:"sap.ushell.appRuntime.ui5.services.adapters"}).then(function(){window.onbeforeunload=function(){if(sap.ushell.Container&&sap.ushell.Container.getDirtyFlag()){if(!r.browserI18n){r.browserI18n=r.getTranslationModel(window.navigator.language).getResourceBundle();}return r.browserI18n.getText("dataLossExternalMessage");}return undefined;};sap.ushell.Container.getFLPUrlAsync().then(function(M){window.onclick=function(e){return _.handleLinkElementOpen(e,M);};window.onkeydown=function(e){if(e.code==='Enter'){return _.handleLinkElementOpen(event,M);}};});sap.ushell.Container.getServiceAsync("ShellNavigation").then(function(e){v=e;v.init(function(){});R();});});});});};this._getURIParams=function(){return p;};this.getAppInfo=function(e){var K=window["sap-ushell-config"].ui5appruntime.config.appIndex.data,M=window["sap-ushell-config"].ui5appruntime.config.appIndex.module,N=window["sap-ushell-config"].ui5appruntime.config.appIndex.enableCache;return new Promise(function(R){if(K&&!i(K)){c.init(M,_.createApplication.bind(_),_.renderApplication.bind(_),N,e,K);R(K);}else{c.init(M,_.createApplication.bind(_),_.renderApplication.bind(_),N);c.getAppInfo(e,document.URL).then(function(Q){R(Q);});}});};this.setApplicationParameters=function(e,K){var M,N,Q,R=new q.Deferred();function T(V,X){var Y="";if(V&&V.length>0){Y=(V.startsWith("?")?"":"?")+V;}if(X&&X.length>0){Y+=(Y.length>0?"&":"?")+X;}return Y;}if(K.hasOwnProperty("sap-startup-params")){M=(new U("?"+K["sap-startup-params"])).query(true);if(M.hasOwnProperty("sap-intent-param")){N=M["sap-intent-param"];delete M["sap-intent-param"];}Q=(new U("?")).query(M).toString();if(N){b.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getAppStateData",{"sAppStateKey":N}).then(function(V){e.url+=T(Q,V);R.resolve();},function(V){e.url+=T(Q);R.resolve();});}else{e.url+=T(Q);R.resolve();}}else{R.resolve();}return R.promise();};this.setHashChangedCallback=function(){if(n===true){return;}function e(K){if(window.hasher.disableCFLPUpdate===true){return;}if(K&&typeof K==="string"&&K.length>0){b.sendMessageToOuterShell("sap.ushell.appRuntime.hashChange",{"newHash":K,"direction":H.getInstance().getDirection()});}}window.hasher.changed.add(e.bind(this),this);n=true;};this.createApplication=function(e,K,M){var N=u.getHash(window.location.href),Q=u.parseShellHash(N);return new Promise(function(R){var T="";if(K.hasOwnProperty("sap-history-dir")){T=K["sap-history-dir"];v.hashChanger.fireEvent("hashReplaced",{hash:v.hashChanger.getHash(),direction:T});h.debug("AppRuntime.createApplication :: Informed by the FLP, to change the History direction "+"property in the Iframe to: "+T);}o=new C({id:e+"-content",width:"100%",height:"100%"});var V="0";if(p.hasOwnProperty("sap-touch")){V=p["sap-touch"];if(V!=="0"&&V!=="1"){V="0";}}q("body").toggleClass("sapUiSizeCompact",(V==="0")).toggleClass("sapUiSizeCozy",(V==="1"));c.setComponent(o);new d({scopeObject:o,scopeType:"component"});new f({scopeObject:o,scopeType:"component"});if(s===false){sap.ushell.renderers.fiori2.utils.init();if(P.attachBlockLayerStateChange){P.attachBlockLayerStateChange(function(X){b.sendMessageToOuterShell("sap.ushell.services.ShellUIService.showShellUIBlocker",{"bShow":X.getParameters().visible});});}s=true;}_.setApplicationParameters(M,K).done(function(){_.setHashChangedCallback();sap.ushell.Container.getServiceAsync("Ui5ComponentLoader").then(function(X){if(M.asyncHints&&Array.isArray(M.asyncHints.libs)){M.asyncHints.libs=M.asyncHints.libs.filter(function(Y){return Y.name!=="sap.ushell";});}X.createComponent({ui5ComponentName:e,applicationDependencies:M,url:M.url},Q,[],k.Application).then(function(Y){F.setAppShortId(Y.componentHandle);sap.ushell.Container.getServiceAsync("AppLifeCycle").then(function(Z){Z.prepareCurrentAppObject("UI5",Y.componentHandle.getInstance(),false,undefined);});_.considerChangingTheDefaultFullWidthVal(Y);_.overrideUrlHelperFuncs();_.loadPlugins();R(Y);});});});});};this.considerChangingTheDefaultFullWidthVal=function(R){if(G===true||G==="true"){E.emit("appWidthChange",false);var e=R.componentHandle.getInstance();var K=e.getMetadata();if(K){var M=e.getMetadata().getManifestEntry("/sap.ui/fullWidth");if(M===true||M==="true"){E.emit("appWidthChange",true);}}}};this.overrideUrlHelperFuncs=function(){if(l===true){return;}l=true;if(sap.m&&sap.m.URLHelper){sap.m.URLHelper.triggerEmail=function(T,e,K,M,N){b.sendMessageToOuterShell("sap.ushell.services.ShellUIService.sendEmail",{sTo:T,sSubject:e,sBody:K,sCc:M,sBcc:N,sIFrameURL:document.URL,bSetAppStateToPublic:true});};O=sap.m.URLHelper.redirect;sap.m.URLHelper.redirect=function(e,N){if(e&&N===true&&e.indexOf('#')>=0){sap.ushell.Container.getFLPUrlAsync().then(function(K){var M=_.rebuildNewAppUrl(e,K);O.call(sap.m.URLHelper,M,N);});}else{O.call(sap.m.URLHelper,e,N);}};}};this.loadPlugins=function(){if(m===true){return;}m=true;sap.ushell.Container.getServiceAsync("PluginManager").then(function(e){z(e);J(e);e.loadPlugins("RendererExtensions");});};function z(e){e.registerPlugins({RTAPluginAgent:{component:"sap.ushell.appRuntime.ui5.plugins.rtaAgent",url:sap.ui.require.toUrl("sap/ushell/appRuntime/ui5/plugins/rtaAgent"),config:{"sap-plugin-agent":true}}});}function J(e){var K;if(p.hasOwnProperty("sap-wa-debug")&&p["sap-wa-debug"]=="dev"){K="https://education3.hana.ondemand.com/education3/web_assistant/framework/FioriAgent.js";}else if(p.hasOwnProperty("sap-wa-debug")&&p["sap-wa-debug"]=="prev"){K="https://webassistant-outlook.enable-now.cloud.sap/web_assistant/framework/FioriAgent.js";}else{K="https://webassistant.enable-now.cloud.sap/web_assistant/framework/FioriAgent.js";}e.registerPlugins({WAPluginAgent:{component:"sap.ushell.appRuntime.ui5.plugins.scriptAgent",url:sap.ui.require.toUrl("sap/ushell/appRuntime/ui5/plugins/scriptAgent"),config:{"sap-plugin-agent":true,"url":K}}});}this.renderApplication=function(R){o.setComponent(R.componentHandle.getInstance()).placeAt("content");B.hide();};}function x(){return{services:{CrossApplicationNavigation:{module:"sap.ushell.appRuntime.ui5.services.CrossApplicationNavigation",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},NavTargetResolution:{module:"sap.ushell.appRuntime.ui5.services.NavTargetResolution",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},ShellNavigation:{module:"sap.ushell.appRuntime.ui5.services.ShellNavigation",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},AppConfiguration:{module:"sap.ushell.appRuntime.ui5.services.AppConfiguration"},Bookmark:{module:"sap.ushell.appRuntime.ui5.services.Bookmark",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},LaunchPage:{module:"sap.ushell.appRuntime.ui5.services.LaunchPage",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},UserInfo:{module:"sap.ushell.appRuntime.ui5.services.UserInfo",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},AppState:{module:"sap.ushell.appRuntime.ui5.services.AppState",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},PluginManager:{config:{isBlueBox:true}},Menu:{module:"sap.ushell.appRuntime.ui5.services.Menu",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},CommonDataModel:{module:"sap.ushell.appRuntime.ui5.services.CommonDataModel",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},Ui5ComponentLoader:{config:{amendedLoading:false}}}};}var y=new w();_=y;y.main();return y;});
function prepareModules(){"use strict";sap.ui.require(["sap/ui/core/BusyIndicator"],function(B){try{if(apprtBIdiv){apprtBIdiv.parentNode.removeChild(apprtBIdiv);}B.show(0);}catch(e){B.show(0);}});if(document.URL.indexOf("ui5appruntime")>0){sap.ui.define("sap/ushell/ApplicationType",[],function(){return{URL:{type:"URL"},WDA:{type:"WDA"},TR:{type:"TR"},NWBC:{type:"NWBC"},WCF:{type:"WCF"},SAPUI5:{type:"SAPUI5"}};});sap.ui.define("sap/ushell/components/applicationIntegration/AppLifeCycle",[],function(){return{};});sap.ui.define("sap/ushell/services/_AppState/WindowAdapter",[],function(){return function(){};});sap.ui.define("sap/ushell/services/_AppState/SequentializingAdapter",[],function(){return function(){};});sap.ui.define("sap/ushell/services/_AppState/Sequentializer",[],function(){return function(){};});sap.ui.define("sap/ushell/services/Configuration",[],function(){function C(){this.attachSizeBehaviorUpdate=function(){};this.hasNoAdapter=true;}C.hasNoAdapter=true;return C;});sap.ui.define("sap/ushell/services/_PluginManager/Extensions",[],function(){return function(){};});sap.ui.define("sap/ushell/TechnicalParameters",[],function(){return{getParameterValue:function(){return Promise.resolve([]);},getParameterValueSync:function(){return[];},getParameters:function(){return[];},getParameterNames:function(){return[];},isTechnicalParameter:function(){return false;}};});sap.ui.define("sap/ushell/AppInfoParameters",[],function(){return{getInfo:function(){return Promise.resolve({});}};});}}
