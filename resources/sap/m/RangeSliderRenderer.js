/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./SliderRenderer","sap/ui/core/InvisibleText"],function(R,S,I){"use strict";var a=R.extend(S);a.apiVersion=2;a.renderHandles=function(r,c,s){this.renderHandle(r,c,{id:c.getId()+"-handle1",position:"start",forwardedLabels:s});this.renderHandle(r,c,{id:c.getId()+"-handle2",position:"end",forwardedLabels:s});r.renderControl(c._mHandleTooltip.start.label);r.renderControl(c._mHandleTooltip.end.label);r.renderControl(c.getAggregation("_handlesLabels")[2]);};a.renderHandle=function(r,c,o){var v,b=c.getRange(),e=c.getEnabled(),d=sap.ui.getCore().getConfiguration().getRTL();r.openStart("span",o&&o.id);if(o&&(o.position!==undefined)){v=b[o.position==="start"?0:1];r.attr("data-range-val",o.position);r.attr("aria-labelledby",(o.forwardedLabels+" "+c._mHandleTooltip[o.position].label.getId()).trim());if(c.getInputsAsTooltips()){r.attr("aria-describedby",I.getStaticId("sap.m","SLIDER_INPUT_TOOLTIP"));e&&r.attr("aria-keyshortcuts","F2");}}if(c.getShowHandleTooltip()&&!c.getShowAdvancedTooltip()){this.writeHandleTooltip(r,c);}r.class(S.CSS_CLASS+"Handle");if(o&&(o.id!==undefined)&&o.id===(c.getId()+"-handle1")){r.style(d?"right":"left",b[0]);}if(o&&(o.id!==undefined)&&o.id===(c.getId()+"-handle2")){r.style(d?"right":"left",b[1]);}this.writeAccessibilityState(r,c,v);if(e){r.attr("tabindex","0");}r.openEnd().close("span");};a.writeAccessibilityState=function(r,s,v){var n=s._isElementsFormatterNotNumerical(v),b=s._formatValueByCustomElement(v),V;if(s._getUsedScale()&&!n){V=b;}else{V=s.toFixed(v);}r.accessibilityState(s,{role:"slider",orientation:"horizontal",valuemin:s.toFixed(s.getMin()),valuemax:s.toFixed(s.getMax()),valuenow:V});if(n){r.accessibilityState(s,{valuetext:b});}};a.renderStartLabel=function(r,c){r.openStart("div").class(S.CSS_CLASS+"RangeLabel").openEnd().text(c.getMin()).close("div");};a.renderEndLabel=function(r,c){r.openStart("div").class(S.CSS_CLASS+"RangeLabel").style("width",c._getMaxTooltipWidth()+"px").openEnd().text(c.getMax()).close("div");};a.renderLabels=function(r,c){if(!c.getEnableTickmarks()){r.openStart("div").class(S.CSS_CLASS+"Labels").openEnd();this.renderStartLabel(r,c);this.renderEndLabel(r,c);r.close("div");}};a.renderProgressIndicator=function(r,s,f){var b=s.getRange();b[0]=s.toFixed(b[0],s._iDecimalPrecision);b[1]=s.toFixed(b[1],s._iDecimalPrecision);var v=Math.abs(b[1]-b[0]);r.openStart("div",s.getId()+"-progress");if(s.getEnabled()){r.attr("tabindex","0");}this.addProgressIndicatorClass(r,s);r.style("width",s._sProgressValue);r.accessibilityState(s,{role:"slider",orientation:"horizontal",valuemin:s.toFixed(s.getMin()),valuemax:s.toFixed(s.getMax()),valuenow:v,valuetext:s._oResourceBundle.getText('RANGE_SLIDER_RANGE_ANNOUNCEMENT',b.map(s._formatValueByCustomElement,s)),labelledby:(f+" "+s.getAggregation("_handlesLabels")[2].getId()).trim()}).openEnd().close("div");};a.addClass=function(r,s){S.addClass(r,s);r.class("sapMRangeSlider");};return a;},true);