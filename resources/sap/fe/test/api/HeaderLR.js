/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./BaseAPI","sap/fe/test/Utils","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/fe/test/builder/OverflowToolbarBuilder","sap/fe/core/helpers/StableIdHelper"],function(B,U,O,F,a,S){"use strict";var H=function(h,v){if(!U.isOfType(h,F)){throw new Error("oHeaderBuilder parameter must be a FEBuilder instance");}this._sPageId=v.id;return B.call(this,h,v);};H.prototype=Object.create(B.prototype);H.prototype.constructor=H;H.prototype.createOverflowToolbarBuilder=function(p){return a.create(this.getOpaInstance()).hasType("sap.m.OverflowToolbar").has(function(o){return(o.getParent().getMetadata().getName()==="sap.f.DynamicPageTitle"&&o.getParent().getParent().getMetadata().getName()==="sap.f.DynamicPage"&&o.getParent().getParent().getId().endsWith(p));});};return H;});
