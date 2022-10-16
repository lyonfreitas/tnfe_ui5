// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";var S=function(d){this._oData=d;};S.prototype.getAlias=function(){return this._oData.alias;};S.prototype.getBaseUrl=function(){return this._oData.baseUrl;};S.prototype.getClient=function(){return this._oData.client;};S.prototype.getClientRole=function(){return this._oData.clientRole;};S.prototype.getName=function(){return this._oData.system;};S.prototype.getPlatform=function(){return this._oData.platform;};S.prototype.getProductVersion=function(){return this._oData.productVersion;};S.prototype.getProductName=function(){return this._oData.productName;};S.prototype.getSystemName=function(){return this._oData.systemName;};S.prototype.getSystemRole=function(){return this._oData.systemRole;};S.prototype.getTenantRole=function(){return this._oData.tenantRole;};S.prototype.isTrial=function(){return!!this._oData.isTrialSystem;};S.prototype.adjustUrl=function(u){if(u.indexOf("/")!==0||u==="/"){throw new Error("Invalid URL: "+u);}if(this._oData.baseUrl===";o="){if(this._oData.alias){u=u+";o="+this._oData.alias;}}else if(this._oData.baseUrl){u=this._oData.baseUrl.replace(/\/$/,"")+u;}if(this._oData.client){u+=(u.indexOf("?")>=0?"&":"?")+"sap-client="+this._oData.client;}return u;};S.prototype.toString=function(){return JSON.stringify(this._oData);};return S;},true);