sap.ui.define(["sap/ui/base/EventProvider","../thirdparty/three"],function(E,t){"use strict";var P=E.extend("sap.ui.vk.tools.PoiToolHandler",{metadata:{},constructor:function(a){this._priority=30;this._tool=a;this._gizmo=a.getGizmo();this._rect=null;this._poiIndex=-1;this._mouse=new THREE.Vector2();}});P.prototype._updateMouse=function(e){var s=this.getViewport().getRenderer().getSize(new THREE.Vector2());this._mouse.x=((e.x-this._rect.x)/s.width)*2-1;this._mouse.y=((e.y-this._rect.y)/s.height)*-2+1;};P.prototype._updateActivePOI=function(e){this._poiIndex=-1;if(e.n===1||(e.event&&e.event.type==="contextmenu")){var v=this._tool._viewport.getDomRef().getBoundingClientRect();var h=this._tool._viewport.hitTest(e.x-v.left,e.y-v.top);if(h&&h.object){this._poiZ=new THREE.Vector3().setFromMatrixPosition(h.object.matrixWorld).project(this.getViewport().getCamera().getCameraRef()).z;for(var i=0,l=this._gizmo.getPOICount();i<l;i++){if(this._gizmo.getPOI(i)===h.object){this._poiIndex=i;break;}}}}};P.prototype._getDragPosition=function(){return new THREE.Vector3(this._mouse.x,this._mouse.y,this._poiZ).unproject(this.getViewport().getCamera().getCameraRef());};P.prototype.click=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateActivePOI(e,true);this._gizmo.selectPOI(this._poiIndex);e.handled|=this._poiIndex>=0;}};P.prototype.beginGesture=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateActivePOI(e);if(this._poiIndex>=0){this._gesture=true;e.handled=true;this._gizmo.selectPOI(this._poiIndex);this._gizmo.beginGesture();this._dragOrigin=this._getDragPosition();}}};P.prototype._setOffset=function(o){if(isFinite(o.x)&&isFinite(o.y)&&isFinite(o.z)){this._gizmo._setOffset(o,this._poiIndex);}};P.prototype.move=function(e){if(this._gesture){e.handled=true;this._updateMouse(e);if(isFinite(this._dragOrigin.x)&&isFinite(this._dragOrigin.y)&&isFinite(this._dragOrigin.z)){this._setOffset(this._getDragPosition().sub(this._dragOrigin));}}};P.prototype.endGesture=function(e){if(this._gesture){this._gesture=false;e.handled=true;this._updateMouse(e);this._gizmo.endGesture();this._dragOrigin=undefined;this._updateActivePOI(e);this.getViewport().setShouldRenderFrame();}};P.prototype.getViewport=function(){return this._tool._viewport;};P.prototype._getOffset=function(o){var r=o.getBoundingClientRect();var p={x:r.left+window.pageXOffset,y:r.top+window.pageYOffset};return p;};P.prototype._inside=function(e){if(this._rect===null||true){var i=this._tool._viewport.getIdForLabel();var d=document.getElementById(i);if(d===null){return false;}var o=this._getOffset(d);this._rect={x:o.x,y:o.y,w:d.offsetWidth,h:d.offsetHeight};}return(e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h);};return P;});
