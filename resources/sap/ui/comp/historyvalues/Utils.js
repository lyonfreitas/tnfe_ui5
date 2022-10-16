/*
 * ! SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
 */
sap.ui.define(function(){"use strict";return{getAppInfo:function g(){var a=sap.ushell.Container.getService("AppLifeCycle"),c=a.getCurrentApplication(),C,m,M,A={};if(c){C=c.componentInstance;A.homePage=c.homePage;}if(C){m=C.getMetadata();}if(m){M=m.getManifest();}if(M){A.id=M["sap.app"].id;}return A;}};});
