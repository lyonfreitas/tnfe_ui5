/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Tool","./RectSelectToolHandler","../SelectionDisplayMode","../Loco"],function(T,R,S,L){"use strict";var a=T.extend("sap.ui.vk.tools.RectSelectTool",{metadata:{properties:{subtractMode:{type:"boolean",defaultValue:false}}},constructor:function(i,s){if(a._instance){return a._instance;}T.apply(this,arguments);this._viewport=null;this._handler=new R(this);this._loco=null;a._instance=this;}});a.prototype.init=function(){if(T.prototype.init){T.prototype.init.call(this);}this.setFootprint(["sap.ui.vk.dvl.Viewport","sap.ui.vk.threejs.Viewport","sap.ui.vk.svg.Viewport"]);};a.prototype.setActive=function(v,b,g){T.prototype.setActive.call(this,v,b,g);if(this._viewport){if(v){if(this._prepare()){this._handler.activate(this._viewport);}}else{this._handler.deactivate();}}return this;};a.prototype._prepare=function(){if(this.isViewportType("sap.ui.vk.dvl.Viewport")&&this._viewport._dvl){return true;}else if(this.isViewportType("sap.ui.vk.threejs.Viewport")&&this._viewport._scene&&this._viewport._scene.getSceneRef()){return true;}else if(this.isViewportType("sap.ui.vk.svg.Viewport")&&this._viewport._scene){return true;}else{return false;}};a.prototype.queueCommand=function(b){if(this._prepare()){if(this.isViewportType("sap.ui.vk.threejs.Viewport")||this.isViewportType("sap.ui.vk.svg.Viewport")){b();}}return this;};function c(b,d,v){var m=b.elements;var i=m[15]===1;var r=2/m[0];var t=2/m[5];var e,f;if(i){e=-m[12]*r;f=-m[13]*t;}else{e=m[8]*r;f=m[9]*t;}var g=(r+e)*0.5;var l=e-g;var h=(t+f)*0.5;var j=f-h;var k=THREE.Math.lerp(l,g,Math.min(d.x1,d.x2)/v.width);var n=THREE.Math.lerp(l,g,Math.max(d.x1,d.x2)/v.width);var o=THREE.Math.lerp(h,j,Math.min(d.y1,d.y2)/v.height);var p=THREE.Math.lerp(h,j,Math.max(d.y1,d.y2)/v.height);m[0]=2/(n-k);m[5]=2/(o-p);if(i){m[12]=-(n+k)/(n-k);m[13]=-(o+p)/(o-p);}else{m[8]=(n+k)/(n-k);m[9]=(o+p)/(o-p);}}a.prototype.select=function(x,y,b,d,s,e){if(!this._prepare()){return[];}return this._select(x,y,b,d,this._viewport,s,e);};a.prototype._select=function(x,y,b,d,v,s,e){var n=[];var f=v.getMetadata().getName();if(f==="sap.ui.vk.svg.Viewport"){if(x===b||y===d){return n;}n=v._select({x1:x,y1:y,x2:b,y2:d});if(n.length>0){v.fireNodesPicked({picked:n});if(v.getSelectionDisplayMode()===S.Outline){if(this.getSubtractMode()){v._viewStateManager.setOutliningStates([],n);}else{v._viewStateManager.setOutliningStates(n,[]);}}else if(this.getSubtractMode()){v._viewStateManager.setSelectionStates([],n);}else{v._viewStateManager.setSelectionStates(n,[]);}}return n;}if(f==="sap.ui.vk.dvl.Viewport"){n=v.rectSelect(x,y,b,d);if(n.length>0){var p={picked:n};v.fireNodesPicked(p);if(v.getSelectionDisplayMode()===S.Outline){if(this.getSubtractMode()){v._viewStateManager.setOutliningStates([],n);}else{v._viewStateManager.setOutliningStates(n,[]);}}else if(this.getSubtractMode()){v._viewStateManager.setSelectionStates([],n);}else{v._viewStateManager.setSelectionStates(n,[]);}}return n;}if(f!=="sap.ui.vk.threejs.Viewport"){return n;}var g=s?s.getSceneRef():undefined;var h=e?e.getCameraRef():undefined;var j=v._getViewStateManagerThreeJS();if(!h||!g||!j||x===b||y===d){return n;}var r={x1:x,y1:y,x2:b,y2:d};var m=h.projectionMatrix.clone();c(m,r,v._renderer.getSize(new THREE.Vector2()));var k=new THREE.Matrix4().multiplyMatrices(m,h.matrixWorldInverse);var o=new THREE.Frustum().setFromProjectionMatrix(k);var q=new THREE.Vector3();function t(z){var A=z.geometry;if(A!==undefined&&o.intersectsObject(z)){var i,l=0;if(A.isGeometry){var B=A.vertices;for(i=0,l=B.length;i<l;i++){q.copy(B[i]).applyMatrix4(z.matrixWorld);if(!o.containsPoint(q)){break;}}}else if(A.isBufferGeometry){var C=A.attributes.position;if(C!==undefined){for(i=0,l=C.count;i<l;i++){q.fromBufferAttribute(C,i).applyMatrix4(z.matrixWorld);if(!o.containsPoint(q)){break;}}}}return l>0&&i===l;}return false;}function u(z,A,B){if(!z.visible){return;}var C=B||z.userData.skipIt?A:{totalCount:0,passedCount:0};if(C&&z.geometry!==undefined){C.totalCount++;if(t(z)){C.passedCount++;}}var D=z.children;for(var i=0,l=D.length;i<l;i++){u(D[i],C,B||z.userData.closed);}if(C!==A&&C.passedCount>0&&C.totalCount===C.passedCount){n.push(z);}}u(g);if(n.length>0){var w={picked:n};v.fireNodesPicked(w);if(v.getSelectionDisplayMode()===S.Outline){if(this.getSubtractMode()){j.setOutliningStates([],n);}else{j.setOutliningStates(n,[]);}}else if(this.getSubtractMode()){j.setSelectionStates([],n);}else{j.setSelectionStates(n,[]);}}return n;};return a;});
