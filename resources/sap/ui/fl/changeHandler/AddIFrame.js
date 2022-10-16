/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/common/revertAddedControls","sap/ui/fl/changeHandler/common/getTargetAggregationIndex","sap/ui/fl/changeHandler/common/createIFrame"],function(r,g,c){"use strict";var A={};A.applyChange=function(C,o,p){var m=p.modifier;var a=C.getDefinition();var v=p.view;var s=a.content.targetAggregation;var i;var I;return Promise.resolve().then(m.findAggregation.bind(m,o,s)).then(function(b){if(!b){throw new Error("The given Aggregation is not available in the given control: "+m.getId(o));}return g(C,o,p);}).then(function(R){i=R;return c(C,p,a.content.selector);}).then(function(b){I=b;return m.insertAggregation(o,s,I,i,v);}).then(function(){C.setRevertData([m.getId(I)]);});};A.revertChange=r;A.completeChangeContent=function(C,s,p){var o=C.getDefinition();var m=p.modifier;var a=p.appComponent;["targetAggregation","baseId","url"].forEach(function(R){if(!Object.prototype.hasOwnProperty.call(s.content,R)){throw new Error("Attribute missing from the change specific content '"+R+"'");}});o.content=Object.assign(o.content||{},s.content);o.content.selector=m.getSelector(o.content.baseId,a);};A.getChangeVisualizationInfo=function(C){return{affectedControls:[C.getContent().selector]};};return A;},true);
