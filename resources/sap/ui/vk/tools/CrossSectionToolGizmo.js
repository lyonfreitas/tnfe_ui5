/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../getResourceBundle","../thirdparty/three","./Gizmo","./AxisColours","../threejs/ThreeUtils","sap/base/assert"],function(g,t,G,A,T,a){"use strict";var C=G.extend("sap.ui.vk.tools.CrossSectionToolGizmo",{metadata:{library:"sap.ui.vk"}});C.prototype.init=function(){if(G.prototype.init){G.prototype.init.apply(this);}this._createEditingForm(g().getText("TOOL_UNITS_MM"),84);this._handleIndex=-1;this._viewport=null;this._tool=null;this._position=new THREE.Vector3(0,0,0);this._plane=new THREE.Plane(new THREE.Vector3(0,0,1),0);this._flip=false;this._matViewProj=new THREE.Matrix4();this._gizmoSize=144;this._firstShowPress=true;this.setAxis(0);};C.prototype.hasDomElement=function(){return true;};C.prototype.show=function(v,b){this._viewport=v;this._tool=b;if(this._firstShowPress){var c=v._scene?v._scene._computeBoundingBox(true,true):new THREE.Box3();c.getCenter(this._position);this._firstShowPress=false;}this._plane.constant=-this._plane.normal.dot(this._position);v.setClippingPlanes([this._plane]);};C.prototype.hide=function(){if(this._viewport){this._viewport.setClippingPlanes([]);this._viewport=null;}this._handleIndex=-1;this._tool=null;this._updateEditingForm(false,-1);};C.prototype._getOffset=function(){return this._position.getComponent(this._axis);};C.prototype.getAxis=function(){return this._axis;};C.prototype.setAxis=function(i){this._handleIndex=-1;this._axis=i;var d=new THREE.Vector3().setComponent(i,1);this._plane.normal.set(0,0,0).setComponent(i,this._flip?-1:1);this._plane.constant=-this._plane.normal.dot(this._position);var b=new THREE.BufferGeometry();var v=new Array(15);var c=new THREE.Vector3(d.y,d.z,d.x),e=new THREE.Vector3(d.z,d.x,d.y),p=new THREE.Vector3();p.sub(c).sub(e).multiplyScalar(0.5).toArray(v,0);p.toArray(v,12);p.add(c).toArray(v,3);p.add(e).toArray(v,6);p.sub(c).toArray(v,9);b.setAttribute("position",new THREE.Float32BufferAttribute(v,3));this._gizmoPlane=new THREE.Line(b,new THREE.LineBasicMaterial({color:0x404040,transparent:true,linewidth:window.devicePixelRatio}));var f=144,l=window.devicePixelRatio*0.5,h=32,j=6,k=48;d=this._plane.normal.clone().multiplyScalar(1/f);var n=0;switch(i){case 0:n=A.x;break;case 1:n=A.y;break;case 2:n=A.z;break;default:break;}var o=new THREE.CylinderBufferGeometry(l,l,f-h,4);var m=new THREE.Matrix4().makeBasis(new THREE.Vector3(d.y,d.z,d.x),d,new THREE.Vector3(d.z,d.x,d.y));m.setPosition(d.clone().multiplyScalar((f-h)*0.5));o.applyMatrix4(m);this._gizmoArrow=new THREE.Mesh(o,new THREE.MeshBasicMaterial({color:n}));this._gizmoArrow.userData.color=n;var q=new THREE.CylinderBufferGeometry(0,j,h,12,1);m.setPosition(d.clone().multiplyScalar(f-h*0.5));q.applyMatrix4(m);var r=new THREE.Mesh(q,new THREE.MeshBasicMaterial({color:n}));r.matrixAutoUpdate=false;this._gizmoArrow.add(r);var u=new THREE.CylinderGeometry(k*0.5,k*0.5,f,12,1);m.setPosition(d.clone().multiplyScalar(f*0.5));u.applyMatrix4(m);this._touchMesh=new THREE.Mesh(u,new THREE.MeshBasicMaterial({visible:false,side:THREE.DoubleSide}));this._gizmoArrow.add(this._touchMesh);if(this._viewport){this._viewport.setShouldRenderFrame();}return this;};C.prototype.setFlip=function(f){this._flip=!!f;var h=this._handleIndex;this.setAxis(this._axis);this._handleIndex=h;return this;};C.prototype.getTouchObject=function(){return this._touchMesh;};var s=new THREE.Vector3();C.prototype._getDelta=function(){var b=this._viewport._scene._computeBoundingBox(true,true);b.getSize(s);return Math.max(s.x,s.y,s.z);};C.prototype._setOffset=function(o){var b=this._viewport._scene._computeBoundingBox(true,true);o=THREE.Math.clamp(o,b.min.getComponent(this._axis),b.max.getComponent(this._axis));this._position.setComponent(this._axis,o);this._plane.constant=-this._plane.normal.dot(this._position);this._viewport.setShouldRenderFrame();};C.prototype.getValue=function(){return this._position.getComponent(this._handleIndex);};C.prototype.setValue=function(v){if(this._handleIndex>=0){this._position.setComponent(this._handleIndex,v);this._plane.constant=v;this._viewport.setShouldRenderFrame();}};C.prototype.highlightArrowHandle=function(h){var c=h?0xFFFF00:this._gizmoArrow.userData.color;this._gizmoArrow.material.color.setHex(c);this._gizmoArrow.children[0].material.color.setHex(c);};C.prototype.selectHandle=function(i){this._handleIndex=i;this._viewport.setShouldRenderFrame();};C.prototype._adjustBoundingBox=function(b){b.getSize(s);var d=Math.max(s.x,s.y,s.z)*0.2;b.expandByScalar(d);};C.prototype._updateGizmo=function(b){var i=this._axis;var o=THREE.Math.clamp(this._position.getComponent(i),b.min.getComponent(i),b.max.getComponent(i));this._position.setComponent(i,o);this._plane.constant=-this._plane.normal.dot(this._position);this._adjustBoundingBox(b);b.getCenter(this._gizmoPlane.position);this._gizmoPlane.position.setComponent(i,o);b.getSize(this._gizmoPlane.scale);this._gizmoPlane.updateMatrixWorld(true);var c=this._viewport.getCamera().getCameraRef();this._gizmoArrow.position.copy(this._gizmoPlane.position);this._matViewProj.multiplyMatrices(c.projectionMatrix,c.matrixWorldInverse);this._gizmoArrow.scale.setScalar(this._gizmoSize*this._getGizmoScale(this._gizmoArrow.position));this._gizmoArrow.updateMatrixWorld(true);};C.prototype.expandBoundingBox=function(b){if(this._viewport){var c=this._viewport._scene._computeBoundingBox(true,true);this._updateGizmo(c);b.min.min(c.min);b.max.max(c.max);b.expandByPoint(this._plane.normal.clone().multiply(this._gizmoArrow.scale).add(this._gizmoArrow.position));}};C.prototype._getEditingFormPosition=function(){return this._plane.normal.clone().applyMatrix4(this._gizmoArrow.matrixWorld).applyMatrix4(this._matViewProj);};C.prototype.render=function(){a(this._viewport&&this._viewport.getMetadata().getName()==="sap.ui.vk.threejs.Viewport","Can't render gizmo without sap.ui.vk.threejs.Viewport");var b=this._viewport._scene._computeBoundingBox(true,true);this._updateGizmo(b);var r=this._viewport.getRenderer(),c=this._viewport.getCamera().getCameraRef();r.render(this._gizmoPlane,c);r.clearDepth();r.render(this._gizmoArrow,c);this._gizmo=this._gizmoArrow;this._updateEditingForm(this._handleIndex>=0,this._handleIndex);};C.prototype.exit=function(){if(this._gizmoArrow){T.disposeObject(this._gizmoArrow);this._gizmoArrow=null;}if(this._gizmoPlane){T.disposeObject(this._gizmoPlane);this._gizmoPlane=null;}if(this._touchMesh){T.disposeObject(this._touchMesh);this._touchMesh=null;}G.prototype.exit.call(this);};return C;});