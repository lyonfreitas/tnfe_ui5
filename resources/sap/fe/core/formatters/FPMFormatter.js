/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([],function(){"use strict";var c=function(v,m,s){var _=this;var e=v.getController().getExtensionAPI();var p=m.split(".");var a=p.pop();var b=p.join("/");return new Promise(function(r){sap.ui.require([b],function(d){r(d[a].bind(e)(_.getBindingContext(),s||[]));});});};c.__functionName="sap.fe.core.formatters.FPMFormatter#customIsEnabledCheck";var f=function(n){if(f.hasOwnProperty(n)){for(var _=arguments.length,a=new Array(_>1?_-1:0),b=1;b<_;b++){a[b-1]=arguments[b];}return f[n].apply(this,a);}else{return"";}};f.customIsEnabledCheck=c;return f;},true);
