/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./BaseAPI","sap/fe/test/Utils","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder"],function(B,U,O){"use strict";var A=function(b,c){return B.call(this,b,c);};A.prototype=Object.create(B.prototype);A.prototype.constructor=A;A.prototype.isAction=true;A.prototype.iSelectItems=function(i,c){if(typeof c==="boolean"){c=c;}else{c=true;}return O.create(this).hasType("sap.chart.Chart").check(function(C){var r;var v=C[0]._getVizFrame();if(v){var d=i?[{data:i}]:[];r=v.vizSelection(d,{clearSelection:c});}return r;},true).description("Do not see the First Column Expand Button").execute();};A.prototype.iChangeChartType=function(t){return O.create(this).hasType("sap.ui.core.Icon").hasProperties({src:"sap-icon://vertical-bar-chart"}).doPress().success(function(){return O.create(this).hasType("sap.m.StandardListItem").hasProperties({icon:"sap-icon://horizontal-bar-chart"}).doPress().description("blablabla").execute();}).description("Opened the Dialog").execute();};A.prototype.iDrillDown=function(d){return O.create(this).hasType("sap.m.Button").hasProperties({tooltip:"View By"}).doPress().success(function(){return O.create(this).hasType("sap.m.StandardListItem").hasProperties({title:d}).doPress().description("blablabla").execute();}).description("Opened the Dialog").execute();};A.prototype.iExecuteActionWithText=function(t){return O.create(this).hasType("sap.m.Button").hasProperties({text:t}).doPress().description("Clicked on button"+t).execute();};return A;});
