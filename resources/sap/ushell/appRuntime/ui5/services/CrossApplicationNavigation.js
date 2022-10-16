// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/CrossApplicationNavigation","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/ushell/services/_AppState/AppState","sap/ui/thirdparty/jquery","sap/base/Log"],function(C,A,a,q,L){"use strict";function b(c,p,s){C.call(this,c,p,s);this.backToPreviousApp=function(){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.backToPreviousApp");};this.expandCompactHash=function(h){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.expandCompactHash",{sHashFragment:h});};this.getDistinctSemanticObjects=function(){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getDistinctSemanticObjects");};this.getLinks=function(v){if(Array.isArray(v)){v.forEach(function(e){if(e[0]){delete e[0].ui5Component;}});}else{delete v.ui5Component;}return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getLinks",v);};this.getPrimaryIntent=function(S,P){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getPrimaryIntent",{sSemanticObject:S,mParameters:P});};this.getSemanticObjectLinks=function(S,P,i,o,d,e){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getSemanticObjectLinks",{sSemanticObject:S,mParameters:P,bIgnoreFormFactor:i,sAppStateKey:d,bCompactIntents:e});};this.historyBack=function(S){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.historyBack",{iSteps:S});};this.isIntentSupported=function(i,o){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isIntentSupported",{aIntents:i});};this.isNavigationSupported=function(i,o){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isNavigationSupported",{aIntents:i});};this.toExternal=function(o,d){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.toExternal",{oArgs:o});};this.getAppState=function(o,d){var D=new q.Deferred();A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getAppState",{sAppStateKey:d}).done(function(S){sap.ushell.Container.getServiceAsync("AppState").then(function(e){var f=new a(e,S._sKey,S._bModifiable,S._sData,S._sAppName,S._sACHComponent,S._bTransient);D.resolve(f);});});return D.promise();};this.resolveIntent=function(h){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.resolveIntent",{sHashFragment:h});};this.hrefForExternalAsync=function(o){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.hrefForExternal",{oArgs:o});};this.hrefForAppSpecificHashAsync=function(d){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.hrefForAppSpecificHash",{sAppHash:d});};this.isInitialNavigation=function(){L.error("'AppRuntime' does not support the 'CrossApplicationNavigation.isInitialNavigation' api. Please use 'isInitialNavigationAsync' instead");};this.isInitialNavigationAsync=function(){return A.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.isInitialNavigation",{});};}b.prototype=C.prototype;b.hasNoAdapter=C.hasNoAdapter;return b;},true);
