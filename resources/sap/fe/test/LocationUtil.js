/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/test/OpaBuilder","sap/ui/test/Opa5","sap/fe/test/Utils"],function(O,a,U){"use strict";var g=function(r){if(!(typeof r.getController().getRouter==="function")){var w=a.getWindow();return w.window.location.hash;}return r.getController().getRouter().getHashChanger().getHash();};var b=function(f){return new RegExp(U.formatMessage("^application-{0}-component---app(RootView)?$",f));};return{create:function(f){return{actions:{},assertions:{iCheckCurrentHashStartsWith:function(h){return O.create(this).hasId(b(f)).check(function(r){var c=g(r[0]);return c.indexOf(h)===0;}).description("Checking hash starts with "+h).execute();},iCheckCurrentHashDoesNotContain:function(p){return O.create(this).hasId(b(f)).check(function(r){var c=g(r[0]);return c.indexOf(p)===-1;}).description("Checking hash doesn't contain "+p).execute();}}};}};});
