/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/connectors/BaseConnector","sap/ui/fl/initial/_internal/connectors/BackendConnector","sap/ui/fl/initial/_internal/connectors/Utils","sap/ui/fl/write/_internal/connectors/Utils","sap/base/util/restricted/_pick"],function(m,B,I,a,W,_){"use strict";function b(p){var P={};if(p.parentVersion!==undefined){P.parentVersion=p.parentVersion;}if(this.isLanguageInfoRequired){a.addLanguageInfo(P);}var w=a.getUrl(this.ROUTES.CHANGES,p,P);delete p.fileName;delete P["sap-language"];var t=a.getUrl(this.ROUTES.TOKEN,p,P);var r=W.getRequestOptions(this.initialConnector,t,p.flexObjects||p.flexObject,"application/json; charset=utf-8","json");return W.sendRequest(w,p.method,r);}function c(p){p.fileName=p.flexObject.fileName;return b.call(this,p);}var d=m({},B,{xsrfToken:null,reset:function(p){var P=["reference","generator"];var e=_(p,P);if(p.selectorIds){e.selector=p.selectorIds;}if(p.changeTypes){e.changeType=p.changeTypes;}delete p.reference;var r=a.getUrl(this.ROUTES.CHANGES,p,e);var t=a.getUrl(this.ROUTES.TOKEN,p);var R=W.getRequestOptions(this.initialConnector,t);return W.sendRequest(r,"DELETE",R);},write:function(p){p.method="POST";return b.call(this,p).then(function(r){if(r.response&&!Array.isArray(r.response)){r.response=[r.response];}return r;});},update:function(p){p.method="PUT";return c.call(this,p);},remove:function(p){var P={namespace:p.flexObject.namespace};p.fileName=p.flexObject.fileName;var D=a.getUrl(this.ROUTES.CHANGES,p,P);delete p.fileName;var t=a.getUrl(this.ROUTES.TOKEN,p);var r=W.getRequestOptions(this.initialConnector,t,undefined,"application/json; charset=utf-8","json");return W.sendRequest(D,"DELETE",r);},loadFeatures:function(p){if(this.initialConnector.settings){return Promise.resolve({response:this.initialConnector.settings});}var f=a.getUrl(this.ROUTES.SETTINGS,p);return a.sendRequest(f).then(function(r){return r.response;});}});d.initialConnector=I;return d;});