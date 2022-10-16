/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dt/OverlayRegistry","sap/ui/dt/ElementUtil","sap/ui/core/UIArea"],function(O,E,U){"use strict";var c={};c.isInTargetZoneAggregation=function(e){var a=e.getParent();return!!a&&a.isTargetZone();};c.getParentInformation=function(e){var p=e.getParentElementOverlay();if(p){var P=p.getElement();var s=e.getParentAggregationOverlay().getAggregationName();var C=E.getAggregation(P,s);var o=e.getElement();var i=C.indexOf(o);return{parent:P,aggregation:s,index:i};}return{parent:null,aggregation:"",index:-1};};c.getClosestOverlayFor=function(e){if(!e){return null;}var p=e;var P=O.getOverlay(p);while(p&&!P){p=p.getParent();P=O.getOverlay(p);}return P;};c.getGeometry=function(g){var m;var a;var b;var d;g.forEach(function(e){if(e&&e.visible){if(!m||e.position.left<m){m=e.position.left;}if(!b||e.position.top<b){b=e.position.top;}var r=e.position.left+e.size.width;if(!a||r>a){a=r;}var B=e.position.top+e.size.height;if(!d||B>d){d=B;}}});if(typeof m==="number"){return{size:{width:a-m,height:d-b},position:{left:m,top:b},visible:true};}};c.getFirstDescendantByCondition=function(o,C){if(!C){throw new Error("expected condition is 'undefined' or not a function");}var a=c.getAllChildOverlays(o);for(var i=0,n=a.length;i<n;i++){var b=a[i];if(C(b)){return b;}var d=this.getFirstDescendantByCondition(b,C);if(d){return d;}}return undefined;};c.getLastDescendantByCondition=function(o,C){if(!C){throw new Error("expected condition is 'undefined' or not a function");}var a=c.getAllChildOverlays(o);for(var i=a.length-1,n=-1;i>n;i--){var b=a[i];if(C(b)){return b;}var d=this.getLastDescendantByCondition(b,C);if(d){return d;}}return undefined;};c.getAllChildOverlays=function(e){var C=[];var a=[];if(!e){return C;}var A=e.getChildren();for(var i=0;i<A.length;i++){a=A[i].getChildren();if(a&&a.length>0){C=C.concat(a);}}return C;};c.getFirstChildOverlay=function(o){var C=this.getAllChildOverlays(o);if(C.length){return C[0];}return undefined;};c.getLastChildOverlay=function(o){var C=this.getAllChildOverlays(o);if(C.length){return C[C.length-1];}return undefined;};c.getNextSiblingOverlay=function(o){if(!o){return undefined;}var p=o.getParentAggregationOverlay();if(p){var a=p.getChildren();var i=a.indexOf(o);if(i!==a.length-1){return a[i+1];}else if(i===a.length-1){var P=o.getParentElementOverlay();a=P.getAggregationOverlays();for(i=a.indexOf(p)+1;i<a.length;i++){var b=a[i].getChildren();if(b.length){return b[0];}}}}};c.getPreviousSiblingOverlay=function(o){if(!o){return undefined;}var p=o.getParentAggregationOverlay();if(p){var a=p.getChildren();var i=a.indexOf(o);if(i>0){return a[i-1];}else if(i===0){var P=o.getParentElementOverlay();a=P.getAggregationOverlays();for(i=a.indexOf(p)-1;i>=0;i--){var b=a[i].getChildren();if(b.length){return b[b.length-1];}}}}};c.getNextOverlay=function(o){if(!o){return undefined;}var F=this.getFirstChildOverlay(o);if(F){return F;}var n=this.getNextSiblingOverlay(o);if(n){return n;}do{o=o.getParentElementOverlay();n=this.getNextSiblingOverlay(o);}while(o&&!n);return n;};c.getPreviousOverlay=function(o){if(!o){return undefined;}var p=o.getParentAggregationOverlay();if(!p){return undefined;}var P=this.getPreviousSiblingOverlay(o);if(P){var l=P;do{P=l;l=this.getLastChildOverlay(P);}while(l);return P;}return o.getParentElementOverlay();};c.iterateOverlayElementTree=function(e,C){C(e);e.getAggregationOverlays().forEach(function(a){a.getChildren().forEach(function(o){this.iterateOverlayElementTree(o,C);},this);},this);};c.getClosestOverlayForNode=function(n){var e=E.getClosestElementForNode(n);return c.getClosestOverlayFor(e);};c.findAllSiblingOverlaysInContainer=function(o,r){var p=o.getParentElementOverlay();var R=[];if(p){if(p!==r){var P=c.findAllSiblingOverlaysInContainer(p,r);R=P.map(function(p){var A=p.getAggregationOverlay(o.getParentAggregationOverlay().getAggregationName());return A?A.getChildren():[];}).reduce(function(F,C){return F.concat(C);},[]);}else{var a=o.getParentAggregationOverlay().getAggregationName();var A=p.getAggregationOverlay(a);R=(A&&A.getChildren())||[];}}R=R.filter(function(o){return o.getDesignTimeMetadata();});return R;};c.findAllOverlaysInContainer=function(o,i){var r=o.getRelevantContainer()||o.getElement();var R=O.getOverlay(r);var a=[];if(!R){return a;}var m=c._findAllSiblingsAndParents(o,R,0,i);if(m[0]){for(var l in m){a=a.concat(m[l]);}var C=[];var b=i?a:m[0];b.forEach(function(o){C=C.concat(c._findAllChildrenInContainer(o,r));});a=a.concat(C);}else{a=c._findAllChildrenInContainer(o,r);}a.push(R);a=a.filter(function(o){return o.getDesignTimeMetadata();});return a;};c._findAllSiblingsAndParents=function(o,r,l,i){var p=o.getParentElementOverlay();if(!p){return[];}function g(p){var a=p.getAggregationNames();var A=[];a.forEach(function(b){var e=p.getAggregationOverlay(b);var h=e?e.getChildren():[];A=h.concat(A);});return A;}if(p!==r){var P;var d;P=c._findAllSiblingsAndParents(p,r,l+1,i);if(i){var A=[];P[l+1].forEach(function(a){A.concat(g(a));});P[l]=A;return P;}d=P[l+1].map(function(a){var s=o.getParentAggregationOverlay().getAggregationName();var b=a.getAggregationOverlay(s);return b?b.getChildren():[];}).reduce(function(a,b){return a.concat(b);},[]);P[l]=d;return P;}var C=[];if(i){C=g(p);}else{var s=o.getParentAggregationOverlay().getAggregationName();C=o.getParentElementOverlay().getAggregationOverlay(s).getChildren();}var R={};R[l]=C;return R;};c._findAllChildrenInContainer=function(e,r,_){_=_||[];if(e.getChildren().length>0){e.getChildren().forEach(function(a){a.getChildren().forEach(function(C){if(C.getRelevantContainer()===r){_.push(C);c._findAllChildrenInContainer(C,r,_);}});});}return _;};c.findAllUniqueAggregationOverlaysInContainer=function(o,r){var a=c.findAllSiblingOverlaysInContainer(o,r);return a.map(function(o){return o.getParentAggregationOverlay();}).filter(function(o,p,A){return A.indexOf(o)===p;});};c.getIndexInAggregation=function(e,p,a){var b=E.getAggregation(p,a).filter(function(C){return!!O.getOverlay(C)||C===e;});return b.indexOf(e);};function f(o,s){var a;var i;var p=o.getParent();var b=false;if(o.isA("sap.ui.dt.ElementOverlay")){var P=o.getParentElementOverlay();if(p){a=p.getAggregationName();i=p.getChildren().indexOf(o);b=P&&P.getAggregationOverlay(a,"AggregationBindingTemplateOverlays");}else{i=-1;}s.push({overlayId:o.getId(),aggregation:a,index:i});if(b){return{overlayId:P.getId(),aggregation:a,stack:s};}}if(!p||p instanceof U){return{overlayId:undefined,aggregation:undefined,stack:s};}return f(p,s);}c.getClosestBoundControl=function(e){return f(e,[]);};return c;},true);
