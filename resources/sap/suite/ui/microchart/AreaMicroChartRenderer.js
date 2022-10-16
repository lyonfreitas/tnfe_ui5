/*!
* SAPUI5
 * (c) Copyright 2009-2021 SAP SE. All rights reserved.
*/
sap.ui.define(["./library","sap/suite/ui/microchart/MicroChartRenderUtils"],function(l,M){"use strict";var A=l.AreaMicroChartViewType;var a={apiVersion:2};a.render=function(r,c){if(!c._bThemeApplied){return;}if(c._hasData()){var w=c.getView()===A.Wide;var s=c.getShowLabel();var S=(s&&((!w&&(c.getFirstYLabel()||c.getLastYLabel()))||c.getMaxLabel()));var b=(s&&((!w&&(c.getFirstXLabel()||c.getLastXLabel()))||c.getMinLabel()));var d=(s&&w&&(c.getFirstYLabel()||c.getFirstXLabel()));var e=(s&&w&&(c.getLastYLabel()||c.getLastXLabel()));r.openStart("div",c);this._writeMainProperties(r,c);if(w){r.class("sapSuiteAMCWideMode");}r.openEnd();r.openStart("div");r.class("sapSuiteAMCVerticalAlignmentContainer");r.openEnd();if(S){r.openStart("div",c.getId()+"-top-labels");r.class("sapSuiteAMCLabels");r.class("sapSuiteAMCPositionTop");r.openEnd();if(!w){this._writeLabel(r,c,c.getFirstYLabel(),"-top-left-lbl","sapSuiteAMCPositionLeft");}this._writeLabel(r,c,c.getMaxLabel(),"-top-center-lbl","sapSuiteAMCPositionCenter");if(!w){this._writeLabel(r,c,c.getLastYLabel(),"-top-right-lbl","sapSuiteAMCPositionRight");}r.close("div");}if(w){r.openStart("div");r.class("sapSuiteAMCHorizontalContainer");r.openEnd();}if(d){r.openStart("div",c.getId()+"-left-labels");r.class("sapSuiteAMCSideLabels");r.class("sapSuiteAMCPositionLeft");r.openEnd();this._writeLabel(r,c,c.getFirstYLabel(),"-top-left-lbl","sapSuiteAMCPositionLeft");this._writeLabel(r,c,c.getFirstXLabel(),"-btm-left-lbl","sapSuiteAMCPositionLeft");r.close("div");}r.openStart("div",c.getId()+"-canvas-cont");r.class("sapSuiteAMCCanvasContainer");r.openEnd();r.openStart("canvas",c.getId()+"-canvas");r.class("sapSuiteAMCCanvas");r.openEnd();r.close("canvas");r.close("div");if(e){r.openStart("div",c.getId()+"-right-labels");r.class("sapSuiteAMCSideLabels");r.class("sapSuiteAMCPositionRight");r.openEnd();this._writeLabel(r,c,c.getLastYLabel(),"-top-right-lbl","sapSuiteAMCPositionRight");this._writeLabel(r,c,c.getLastXLabel(),"-btm-right-lbl","sapSuiteAMCPositionRight");r.close("div");}if(w){r.close("div");}if(b){r.openStart("div",c.getId()+"-bottom-labels");r.class("sapSuiteAMCLabels");r.class("sapSuiteAMCPositionBtm");r.openEnd();if(!w){this._writeLabel(r,c,c.getFirstXLabel(),"-btm-left-lbl","sapSuiteAMCPositionLeft");}this._writeLabel(r,c,c.getMinLabel(),"-btm-center-lbl","sapSuiteAMCPositionCenter");if(!w){this._writeLabel(r,c,c.getLastXLabel(),"-btm-right-lbl","sapSuiteAMCPositionRight");}r.close("div");}r.openStart("div",c.getId()+"-css-helper");r.style("display","none");r.openEnd();r.close("div");r.close("div");r.close("div");}else{this._renderNoData(r,c);}};a._writeMainProperties=function(r,c){var i=c.hasListeners("press");this._renderActiveProperties(r,c);var s=c.getTooltip_AsString(i);r.attr("role","figure");if(c.getAriaLabelledBy().length){r.accessibilityState(c);}else{r.attr("aria-label",s);}r.class("sapSuiteAMC");r.class("sapSuiteAMCSize"+c.getSize());r.style("width",c.getWidth());r.style("height",c.getHeight());};a._writeLabel=function(r,c,L,i,C){if(!L){return;}var s=L?L.getLabel():"";r.openStart("div",c.getId()+i);r.class("sapSuiteAMCSemanticColor"+L.getColor());r.class("sapSuiteAMCLbl");r.class(C);r.openEnd();r.text(s);r.close("div");};M.extendMicroChartRenderer(a);return a;},true);