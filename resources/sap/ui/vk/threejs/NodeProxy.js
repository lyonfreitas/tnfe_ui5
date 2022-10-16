/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../NodeProxy","./Material","../cssColorToColor","../colorToCSSColor","../abgrToColor","../colorToABGR","../TransformationMatrix","./ThreeExtensions","../ObjectType"],function(N,M,a,b,d,e,T,f,O){"use strict";var g=N.extend("sap.ui.vk.threejs.NodeProxy",{metadata:{},constructor:function(n,o){N.call(this);this._object3D=o;this._nodeHierarchy=n;}});g.prototype.destroy=function(){this._object3D=null;N.prototype.destroy.call(this);};g.prototype.getNodeHierarchy=function(){return this._nodeHierarchy;};g.prototype.getNodeRef=function(){return this._object3D;};g.prototype.getNodeId=function(){return this._object3D;};g.prototype.getVeIds=function(){return this._object3D.userData.veids||[];};g.prototype.getVeId=function(){return this._object3D.userData.treeNode?this._object3D.userData.treeNode.sid:null;};g.prototype.getMaterialId=function(){var r=this._object3D;if(this._object3D&&!this._object3D.geometry){if(this._object3D.children.length===1&&this._object3D.children[0].geometry&&(this._object3D.children[0].name===""||this._object3D.children[0].name===undefined)){r=this._object3D.children[0];}}if(r.material!==undefined&&r.material.userData!==undefined&&r.material.userData.materialId!==undefined){return r.material.userData.materialId;}else if(r.userData.originalMaterial!==undefined&&r.userData.originalMaterial.userData!==undefined&&r.userData.originalMaterial.userData.materialId!==undefined){return r.userData.originalMaterial.userData.materialId;}return undefined;};g.prototype.getName=function(){return this._object3D.name||("<"+this._object3D.type+">");};g.prototype._updateAncestorsBoundingBox=function(){var p=this._object3D.parent;while(p){if(p.userData.boundingBox!==undefined){p._vkCalculateObjectOrientedBoundingBox();}p=p.parent;}};g.prototype.getLocalMatrix=function(){return T.convertTo4x3(this._object3D.matrix.elements);};g.prototype.setLocalMatrix=function(v){if(v){var o=this._object3D;o.matrix.fromArray(T.convertTo4x4(v));o.matrix.decompose(o.position,o.quaternion,o.scale);o.updateMatrixWorld(true);this._updateAncestorsBoundingBox();}this.setProperty("localMatrix",v,true);return this;};g.prototype.setLocalMatrixNotUpdatingBBox=function(v){if(v){var o=this._object3D;o.matrix.fromArray(T.convertTo4x4(v));o.matrix.decompose(o.position,o.quaternion,o.scale);o.updateMatrixWorld(true);}this.setProperty("localMatrix",v,true);return this;};g.prototype.getWorldMatrix=function(){return T.convertTo4x3(this._object3D.matrixWorld.elements);};g.prototype.setWorldMatrix=function(v){if(v){var o=this._object3D;o.matrixWorld.fromArray(T.convertTo4x4(v));if(o.parent){o.matrix.multiplyMatrices(new THREE.Matrix4().getInverse(o.parent.matrixWorld),o.matrixWorld);}else{o.matrix.copy(o.matrixWorld);}o.matrix.decompose(o.position,o.quaternion,o.scale);o.updateMatrixWorld(true);this._updateAncestorsBoundingBox();}this.setProperty("worldMatrix",v,true);return this;};g.prototype.getOpacity=function(){return this._object3D.userData.opacity;};g.prototype.setOpacity=function(v){var c=this._nodeHierarchy.getScene().getViewStateManager();if(c){c.setOpacity(this._object3D,v);}else{this._object3D._vkSetOpacity(v);}this.setProperty("opacity",v,true);return this;};g.prototype.getTintColorABGR=function(){return this._object3D.userData.tintColor;};g.prototype.setTintColorABGR=function(v){var c=this._nodeHierarchy.getScene().getViewStateManager();if(c){c.setTintColor(this._object3D,v);}else{this._object3D._vkSetTintColor(v);}this.setProperty("tintColorABGR",v,true);this.setProperty("tintColor",b(d(v)),true);return this;};g.prototype.getTintColor=function(){return b(d(this._object3D.userData.tintColor));};g.prototype.setTintColor=function(v){var c=e(a(v));var h=this._nodeHierarchy.getScene().getViewStateManager();if(h){h.setTintColor(this._object3D,c);}else{this._object3D._vkSetTintColor(c);}this.setProperty("tintColorABGR",c,true);this.setProperty("tintColor",v,true);return this;};g.prototype.getNodeMetadata=function(){return this._object3D.userData.metadata||{};};g.prototype.getHasChildren=function(){return this._object3D.children.length>0;};g.prototype.getClosed=function(){return!!this._object3D.userData.closed;};g.prototype.getBoundingBox=function(){return this._object3D.userData.boundingBox;};g.prototype.assignMaterial=function(v){var s=function(m,n){var h;if(m.userData){h=m.userData.materialId;n.userData.materialId=h;}if(n.material!==undefined){if(n.userData.highlightColor!==undefined){if(n.userData.originalMaterial.side){m.side=n.userData.originalMaterial.side;}n.userData.originalMaterial=m;m.userData.materialUsed++;n.material=m.clone();var c=d(n.userData.highlightColor);n.material.color.lerp(new THREE.Color(c.red/255.0,c.green/255.0,c.blue/255.0),c.alpha);if(m.userData.defaultHighlightingEmissive&&n.userData.highlightColor!==0){n.material.emissive.copy(m.userData.defaultHighlightingEmissive);}if(m.userData.defaultHighlightingSpecular&&n.userData.highlightColor!==0){n.material.specular.copy(m.userData.defaultHighlightingSpecular);}}else{if(n.material.side){m.side=n.material.side;}n.material=m;m.userData.materialUsed++;delete n.userData.originalMaterial;}n._vkUpdateMaterialOpacity();}};s(v.getMaterialRef(),this._object3D);if(!this._object3D.children){return this;}this._object3D.children.forEach(function(c){if(!c||c.userData.objectType===O.PMI||c.userData.objectType===O.Hotspot){return;}s(v.getMaterialRef(),c);});return this;};g.prototype.enumerateMaterials=function(r){var c=function(n,l,r){if(n){if(n.userData.originalMaterial){l.add(n.userData.originalMaterial);}else if(n.material){l.add(n.material);}if(n.children){n.children.forEach(function(o){if(o){if(r){c(o,l,r);}else if(o.userData.originalMaterial){l.add(o.userData.originalMaterial);}else if(o.material){l.add(o.material);}}});}}};var m=new Set();c(this._object3D,m,r);var h=[];m.forEach(function(v){h.push(v);});var j=[];for(var i=0;i<h.length;i++){var k=new M();k.setMaterialRef(h[i]);j.push(k);}return j;};g.prototype.replaceMaterial=function(m,c){var h=(typeof m.getMaterialRef==="function")?m.getMaterialRef():m;var i=(typeof c.getMaterialRef==="function")?c.getMaterialRef():c;if(this._object3D.userData.originalMaterial&&this._object3D.userData.originalMaterial===h){this._object3D.userData.originalMaterial=i;this._object3D._vkUpdateMaterialColor();}else if(this._object3D.material&&this._object3D.material===h){this._object3D.material=i;}if(!this._object3D.children){return this;}this._object3D.children.forEach(function(j){if(j&&j.userData.originalMaterial&&j.userData.originalMaterial===h){j.userData.originalMaterial=i;j._vkUpdateMaterialColor();}else if(j&&j.material&&j.material===h){j.material=i;}});return this;};g.prototype.getLocalTranslate=function(){var o=this._object3D;return[o.position.x,o.position.y,o.position.z];};g.prototype.getLocalScale=function(){var o=this._object3D;return[o.scale.x,o.scale.y,o.scale.z];};g.prototype.getLocalRotationInQuaternion=function(){var o=this._object3D;return[o.quaternion.x,o.quaternion.y,o.quaternion.z,o.quaternion.w];};g.prototype.getLocalRotationInAngleAxis=function(){var o=this._object3D;var q=o.quaternion;if(q.w>1){q.normalise();}var c=2*Math.acos(q.w);var s=Math.sqrt(1-q.w*q.w);var x,y,z;if(s<0.001){x=q.x;y=q.y;z=q.z;}else{x=q.x/s;y=q.y/s;z=q.z/s;}return[x,y,z,c];};g.prototype.getLocalRotationInEuler=function(){var o=this._object3D;var q=o.quaternion;if(q.w>1){q.normalise();}var c=26;var t=q.x*q.y+q.z*q.w;var h,i,j;if(t>0.499){h=2*Math.atan2(q.x,q.w);i=Math.PI/2;j=0;}if(t<-0.499){h=-2*Math.atan2(q.x,q.w);i=-Math.PI/2;j=0;}else{var s=q.x*q.x;var k=q.y*q.y;var l=q.z*q.z;h=Math.atan2(2*q.y*q.w-2*q.x*q.z,1-2*k-2*l);i=Math.asin(2*t);j=Math.atan2(2*q.x*q.w-2*q.y*q.z,1-2*s-2*l);}return[h,i,j,c];};return g;});
