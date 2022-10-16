/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../Core","../ViewportBase","sap/ui/core/ResizeHandler","sap/ui/events/KeyCodes","../Loco","../thirdparty/three","../ViewStateManager","./ViewportGestureHandler","./OrthographicCamera","./PerspectiveCamera","./NodesTransitionHelper","../Messages","sap/ui/base/ManagedObjectObserver","./ViewportRenderer","../CameraProjectionType","../CameraFOVBindingType","../VisibilityMode","../ZoomTo","../SelectionMode","../RenderMode","../getResourceBundle","../cssColorToColor","../ViewStateManager","./ViewStateManager","./HitTester","./Scene","./ContentDeliveryService","../SafeArea","../Annotation","../NodeContentType","sap/base/Log","sap/ui/core/Core"],function(v,V,R,K,L,t,c,d,O,P,N,M,e,f,C,g,h,Z,S,j,k,m,o,T,H,p,q,r,A,s,u,w){"use strict";var B=V.extend("sap.ui.vk.threejs.Viewport",{metadata:{library:"sap.ui.vk",events:{cameraChanged:{parameters:{position:"float[]",quaternion:"float[]",zoom:"float"},enableEventBubbling:true},frameRenderingFinished:{}}}});var D=B.getMetadata().getParent().getClass().prototype;THREE.PropertyBinding.prototype.GetterByBindingType[0]=function(b,a){b[a]=this.targetObject[this.propertyName];};B.prototype.init=function(){if(D.init){D.init.call(this);}this._resizeListenerId=null;this._renderLoopRequestId=0;this._renderLoopFunction=this._renderLoop.bind(this);this._shouldRenderFrame=true;this._clippingPlanes=[];this._renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});this._renderer.setPixelRatio(window.devicePixelRatio);this._renderer.setSize(1,1);this._renderer.shadowMap.enabled=true;this._hitTester=new H();this._scene=null;this._camera=new P();this._upAxis=2;var b=new THREE.Vector4();var a=new THREE.Vector4();this._updateColor(b,this.getBackgroundColorTop());this._updateColor(a,this.getBackgroundColorBottom());this._checkBackgroundColor();this._backgroundMaterial=new THREE.ShaderMaterial({uniforms:{topColor:{value:b},bottomColor:{value:a}},vertexShader:["varying float vPos;","void main() {","	gl_Position = vec4(position, 1.0);","	vPos = position.y * -0.5 + 0.5;","}"].join("\n"),fragmentShader:["uniform vec4 topColor;","uniform vec4 bottomColor;","varying float vPos;","void main() {","	gl_FragColor = mix(topColor, bottomColor, vPos);","}"].join("\n"),side:THREE.DoubleSide,depthTest:false,depthWrite:false,blending:THREE.NoBlending});var i=new THREE.Geometry();i.vertices.push(new THREE.Vector3(-1,1,0),new THREE.Vector3(1,1,0),new THREE.Vector3(-1,-1,0),new THREE.Vector3(1,-1,0));i.faces.push(new THREE.Face3(0,2,1),new THREE.Face3(1,2,3));this._backgroundCamera=new THREE.Camera();this._backgroundScene=new THREE.Scene();this._backgroundScene.add(new THREE.Mesh(i,this._backgroundMaterial));this._underlayGroup=new THREE.Group();this._overlayGroup=new THREE.Group();this._xrayColor1=new THREE.Vector4(0,0.75,1,0.45);this._xrayColor2=new THREE.Vector4(0,0,1,0);this._xrayMaterial=new THREE.ShaderMaterial({uniforms:{color1:{value:this._xrayColor1},color2:{value:this._xrayColor2}},vertexShader:["#include <clipping_planes_pars_vertex>","varying vec3 vNormal;","void main() {","#include <begin_vertex>","#include <project_vertex>","#include <clipping_planes_vertex>","#include <beginnormal_vertex>","#include <defaultnormal_vertex>","	vNormal = normalize( transformedNormal );","}"].join("\n"),fragmentShader:["#include <clipping_planes_pars_fragment>","uniform vec4 color1;","uniform vec4 color2;","varying vec3 vNormal;","void main() {","#include <clipping_planes_fragment>","	gl_FragColor = mix(color1, color2, abs(normalize(vNormal).z));","}"].join("\n"),side:THREE.DoubleSide,depthWrite:false,depthFunc:THREE.LessDepth,blending:THREE.NormalBlending,clipping:true,transparent:true});this._viewportGestureHandler=new d(this);this._loco=new L(this);this._loco.addHandler(this._viewportGestureHandler,-1);this._zoomedObject=null;this._cdsLoader=null;this.attachCameraChanged(function(l){this.setShouldRenderFrame();});this._sceneObserver=new e(this.setShouldRenderFrame.bind(this));this._currentViewIndex=0;this._currentView=null;v.getEventBus().subscribe("sap.ui.vk","viewStateApplied",this._onViewStateApplied,this);};B.prototype.cameraUpdateCompleted=function(a){this.fireViewFinished({viewIndex:this._currentViewIndex});};B.prototype.exit=function(){v.getEventBus().unsubscribe("sap.ui.vk","viewStateApplied",this._onViewStateApplied,this);this._loco.removeHandler(this._viewportGestureHandler);this._viewportGestureHandler.destroy();if(this._resizeListenerId){R.deregister(this._resizeListenerId);this._resizeListenerId=null;}this._stopRenderLoop();var a=this.getTools();for(var i=0;i<a.length;i++){var b=w.byId(a[i]);if(b){b.setActive(false);}}this.setScene(null);this.setCamera(null);this._renderer.renderLists.dispose();this._renderer.dispose();this._renderer=null;this._backgroundCamera=null;this._backgroundMaterial=null;this._backgroundScene=null;this._loco=null;this._viewportGestureHandler=null;this._eyePointLight=null;this._hitTester=null;if(this._cdsLoader){this._cdsLoader.detachSceneUpdated(this._handleCdsSceneUpdate,this);}if(D.exit){D.exit.call(this);}};B.prototype.onSetViewStateManager=function(a){this._viewStateManager=a;a.attachVisibilityChanged(this.setShouldRenderFrame,this);a.attachOpacityChanged(this.setShouldRenderFrame,this);a.attachTintColorChanged(this.setShouldRenderFrame,this);a.attachHighlightColorChanged(this.setShouldRenderFrame,this);a.attachTransformationChanged(this.setShouldRenderFrame,this);a.attachOutlineColorChanged(this.setShouldRenderFrame,this);a.attachOutlineWidthChanged(this.setShouldRenderFrame,this);a.attachOutliningChanged(this._onOutliningOrSelectionChanged,this);a.attachSelectionChanged(this._onOutliningOrSelectionChanged,this);};B.prototype.onUnsetViewStateManager=function(a){a.detachOutliningChanged(this._onOutliningOrSelectionChanged,this);a.detachSelectionChanged(this._onOutliningOrSelectionChanged,this);a.detachVisibilityChanged(this.setShouldRenderFrame,this);a.detachOpacityChanged(this.setShouldRenderFrame,this);a.detachTintColorChanged(this.setShouldRenderFrame,this);a.detachHighlightColorChanged(this.setShouldRenderFrame,this);a.detachTransformationChanged(this.setShouldRenderFrame,this);a.detachOutlineColorChanged(this.setShouldRenderFrame,this);a.detachOutlineWidthChanged(this.setShouldRenderFrame,this);this._viewStateManager=null;};B.prototype._startRenderLoop=function(){if(!this._renderLoopRequestId){this._renderLoopRequestId=window.requestAnimationFrame(this._renderLoopFunction);}return this;};B.prototype._stopRenderLoop=function(){if(this._renderLoopRequestId){window.cancelAnimationFrame(this._renderLoopRequestId);this._renderLoopRequestId=0;}return this;};B.prototype.setBackgroundColorTop=function(a){D.setBackgroundColorTop.call(this,a);if(this._backgroundMaterial!==null){this._updateColor(this._backgroundMaterial.uniforms.topColor.value,a);this._checkBackgroundColor();}return this;};B.prototype.setBackgroundColorBottom=function(a){D.setBackgroundColorBottom.call(this,a);if(this._backgroundMaterial!==null){this._updateColor(this._backgroundMaterial.uniforms.bottomColor.value,a);this._checkBackgroundColor();}return this;};B.prototype.setClippingPlanes=function(a){this._clippingPlanes=a;return this;};B.prototype.onBeforeRendering=function(){if(this._resizeListenerId){R.deregister(this._resizeListenerId);this._resizeListenerId=null;}this._stopRenderLoop();};B.prototype.onAfterRendering=function(){var a=this.getDomRef();a.appendChild(this._renderer.domElement);this._resizeListenerId=R.register(this,this._handleResize.bind(this));this._handleResize({size:{width:a.clientWidth,height:a.clientHeight}});this._startRenderLoop();};B.prototype._handleResize=function(a){if(!this._camera||!this._renderer){return false;}if(this.getSafeArea()){this.getSafeArea().resize();}var b=a.size.width;var i=a.size.height;if(this._camera){this._camera.update(b,i);}this._renderer.setSize(b,i);this.fireResize({size:{width:b,height:i}});this.setShouldRenderFrame();return true;};B.prototype.setScene=function(a){if(this._scene){var n=this._scene.getDefaultNodeHierarchy();n.detachChanged(this._clearAnnotations,this);n.detachNodeCreated(this._nodeCreatedHandler,this);}this._scene=a;this._homeCamera=null;this._currentViewIndex=0;this._currentView=null;this._sceneObserver.disconnect();var b=this._getNativeScene();if(b){this._sceneObserver.observe(this._scene,{properties:["doubleSided"]});var l;for(var i=0;i<b.children.length;i++){l=b.children[i];if(l.private&&l.name==="DefaultLights"&&l.children.length){if(l.children[0]instanceof THREE.PointLight){this._eyePointLight=l.children[0];}}}}if(this._scene){this._scene.getDefaultNodeHierarchy().attachChanged(this._clearAnnotations,this);this._scene.getDefaultNodeHierarchy().attachNodeCreated(this._nodeCreatedHandler,this);}if(this._scene){var x=this._scene.getInitialView();if(x&&this._getViewStateManagerThreeJS()){this.activateView(x,false,true);}}this._clearAnnotations(true);this.setShouldRenderFrame();return this;};B.prototype.getScene=function(){return this._scene;};B.prototype._getNativeScene=function(){return this._scene?this._scene.getSceneRef():null;};B.prototype._getNativeCamera=function(){return this._camera?this._camera.getCameraRef():null;};B.prototype._clearAnnotations=function(a){if(a){this.destroyAnnotations();}else{this.getAnnotations().forEach(function(b){if(b.autoGenerated){this.removeAnnotation(b);}},this);}this._annotationsLoaded=false;};B.prototype._nodeCreatedHandler=function(a){var n=a.getParameter("nodeRef");if(n._vkGetNodeContentType()==s.Annotation){var b=this.getCurrentView();if(b){b.getNodeInfos().push({target:n,visible:true});}}};var E=new THREE.Vector2();B.prototype.setCamera=function(a){if(D.setCamera){D.setCamera.call(this,a);}var b=this.getCamera();if(b&&this._renderer){this._renderer.getSize(E);b.update(E.x,E.y);if(!this._homeCamera&&b.getCameraRef()){this._homeCamera=b.getCameraRef().clone();}}this.setShouldRenderFrame();return this;};B.prototype.getRenderer=function(){return this._renderer;};B.prototype._getViewStateManagerThreeJS=function(){if(this._viewStateManager){if(this._viewStateManager instanceof T){return this._viewStateManager;}if(this._viewStateManager instanceof o&&this._viewStateManager._implementation instanceof T){return this._viewStateManager._implementation;}}return null;};B.prototype._updateBoundingBoxesIfNeeded=function(){var a=this._getViewStateManagerThreeJS();if(a){a._updateBoundingBoxesIfNeeded();}};B.prototype._updateColor=function(a,b){var i=m(b);a.color=new THREE.Color(i.red/255,i.green/255,i.blue/255);a.alpha=i.alpha;a.x=a.color.r*a.alpha;a.y=a.color.g*a.alpha;a.z=a.color.b*a.alpha;a.w=a.alpha;};B.prototype._checkBackgroundColor=function(){var a=this.getBackgroundColorTop();if(a===this.getBackgroundColorBottom()){if(this._backgroundColor===null){this._backgroundColor=new THREE.Vector4();}this._updateColor(this._backgroundColor,a);}else{this._backgroundColor=null;}this.setShouldRenderFrame();};B.prototype._handleCdsSceneUpdate=function(){this.setShouldRenderFrame();};B.prototype._handleLoadingFinished=function(){this._clearAnnotations();this.getAnnotations();this.setShouldRenderFrame();};B.prototype.setShouldRenderFrame=function(){this._shouldRenderFrame=true;return this;};B.prototype.shouldRenderFrame=function(){return this._shouldRenderFrame;};B.prototype.setRenderMode=function(a){this.setProperty("renderMode",a,true);if(this._scene){switch(a){case j.LineIllustration:case j.ShadedIllustration:case j.SolidOutline:this._scene._createOutlineGeometry(a);break;default:this._scene._hideOutlineGeometry();break;}}this.setShouldRenderFrame();return this;};B.prototype.hitTest=function(x,y){var n=this._getNativeScene();var a=this._getNativeCamera();if(!a||!n){return null;}var b=this._renderer.domElement;return this._hitTester.hitTest(x-b.clientLeft,y-b.clientTop,b.clientWidth,b.clientHeight,this._renderer,n,a,this._clippingPlanes);};B.prototype._isRedlineActivated=function(){var n=this._getNativeCamera();return n?n.userData.isRedlineActivated:false;};B.prototype._isPanoramicActivated=function(){return this._backgroundProjection==="spherical"||(this._viewStateManager&&this._viewStateManager.getBackgroundImageType())==="360Image";};B.prototype.tap=function(x,y,i){if(!i){if(this._viewStateManager){var a=this.hitTest(x,y);var n=a&&a.object;this.tapObject(n);if(n!==null){this.fireNodeClicked({nodeRef:n,x:x,y:y},true,true);}}}else if(!this.getFreezeCamera()&&!this._isRedlineActivated()){var b=this.hitTest(x,y);if(b&&(this._zoomedObject===null||this._zoomedObject!==b.object)){this._zoomedObject=b.object;this._viewportGestureHandler.zoomObject(this._zoomedObject,true);}else{this._viewportGestureHandler.zoomObject(this._zoomedObject,false);this._zoomedObject=null;}}return this;};B.prototype.tapObject=function(n){var a={picked:n?[n]:[]};this.fireNodesPicked(a);if(n&&n._vkGetNodeContentType()===s.Background){this.exclusiveSelectionHandler([]);return this;}if(this.getSelectionMode()===S.Exclusive){this.exclusiveSelectionHandler(a.picked);}else if(this.getSelectionMode()===S.Sticky){this.stickySelectionHandler(a.picked);}return this;};var F={x:-2,y:-2};var G=2;var I=5;B.prototype.onkeydown=function(a){if(!a.isMarked()){var b;switch(a.keyCode){case K.ARROW_LEFT:case K.ARROW_RIGHT:case K.ARROW_UP:case K.ARROW_DOWN:if(a.ctrlKey||a.altKey||a.metaKey){break;}var i={x:0,y:0};switch(a.keyCode){case K.ARROW_LEFT:i.x=-1;break;case K.ARROW_RIGHT:i.x=+1;break;case K.ARROW_UP:i.y=-1;break;case K.ARROW_DOWN:i.y=+1;break;default:break;}b=this._viewportGestureHandler._cameraController;b.beginGesture(F.x,F.y);if(a.shiftKey){b.pan(I*i.x,I*i.y);}else{b.rotate(G*i.x,G*i.y,true);}b.endGesture();this.setShouldRenderFrame();a.preventDefault();a.stopPropagation();break;case 189:case K.PLUS:case K.NUMPAD_MINUS:case K.NUMPAD_PLUS:b=this._viewportGestureHandler._cameraController;b.beginGesture(this.$().width()/2,this.$().height()/2);b.zoom(a.keyCode===K.PLUS||a.keyCode===K.NUMPAD_PLUS?1.02:0.98);b.endGesture();this.setShouldRenderFrame();a.preventDefault();a.stopPropagation();break;default:break;}}};B.prototype._onOutliningOrSelectionChanged=function(a){var b=this.getTools();for(var i=0;i<b.length;i++){var l=w.byId(b[i]);var n=l.getGizmoForContainer(this);if(n&&n.handleSelectionChanged){n.handleSelectionChanged(a);}}this.setShouldRenderFrame();};B.prototype.setSelectionRect=function(a){this.setShouldRenderFrame();if(!a){this._selectionRect=null;return;}this._renderer.getSize(E);var x=(a.x1/E.x)*2-1,y=(a.y1/E.y)*-2+1,b=(a.x2/E.x)*2-1,i=(a.y2/E.y)*-2+1;if(!this._selectionRect){var l=new THREE.Geometry();l.vertices.push(new THREE.Vector3(x,i,-1),new THREE.Vector3(b,i,-1),new THREE.Vector3(b,y,-1),new THREE.Vector3(x,y,-1));this._selectionRect=new THREE.LineLoop(l,new THREE.LineBasicMaterial({color:0xC0C000,linewidth:window.devicePixelRatio}));}else{var n=this._selectionRect.geometry.vertices;n[0].set(x,i,-1);n[1].set(b,i,-1);n[2].set(b,y,-1);n[3].set(x,y,-1);this._selectionRect.geometry.verticesNeedUpdate=true;}};B.prototype._renderLoop=function(){if(!this._renderer||!this.getDomRef()){this._renderLoopRequestId=0;return;}if(this._viewportGestureHandler){this._viewportGestureHandler.animateCameraUpdate();}if(this.getCamera()){if(this.getCamera().getIsModified()){this.getCamera().setIsModified(false);this._shouldRenderFrame=true;}}var a=this._getViewStateManagerThreeJS();if(a){this._shouldRenderFrame|=a._playTransition();this._shouldRenderFrame|=a._playHighlight();}if(this._shouldRenderFrame){this._shouldRenderFrame=false;if(a){a._setJointNodeMatrix();}this.render();var b=this.getAnnotations();if(b){b.forEach(function(i){i.update();});}}this._renderLoopRequestId=window.requestAnimationFrame(this._renderLoopFunction);};function _(a,b,i){a.getSize(E);i.children.forEach(function(l){if(l.userData._vkDynamicObjects){l.userData._vkDynamicObjects.forEach(function(n){if(n.parent){n._vkUpdate(a,b,E);}});}});}function J(i,l,n,x,y){n.children.forEach(function(z){if(z.userData._vkDetailViews){z.userData._vkDetailViews.sort(function(a,b){return a.renderOrder-b.renderOrder;});z.userData._vkDetailViews.forEach(function(a){if(a.node.visible){a.detailView._render(i,l,n,x,y);}});}});}B.prototype._updateWorldMatrixRecursive=function(n,a){if(n.visible===false){return;}if(n.userData.renderStage){(n.userData.renderStage<0?this._underlayGroup:this._overlayGroup).children.push(n);}n.matrixAutoUpdate=false;if(n.matrixWorldNeedsUpdate||a){if(n.parent===null){n.matrixWorld.copy(n.matrix);}else{n.matrixWorld.multiplyMatrices(n.parent.matrixWorld,n.matrix);}n.matrixWorldNeedsUpdate=true;a=true;}var b=n.children;for(var i=0,l=b.length;i<l;i++){this._updateWorldMatrixRecursive(b[i],a);}};function Q(n,a){n.children.forEach(function(b){b.visible=a;});}B.prototype.render=function(){var a=this._renderer;if(!a){return;}var n=this._getNativeScene();var b=this._getNativeCamera();if(!n||!b){return;}if(this._eyePointLight){this._eyePointLight.position.copy(b.position);this._eyePointLight.updateMatrix();}this._underlayGroup.children.length=0;this._overlayGroup.children.length=0;this._updateWorldMatrixRecursive(n,false);n.autoUpdate=false;var l=this.getTools();var x=this._getViewStateManagerThreeJS();var i,y,z,U;if(this._camera.getUsingDefaultClipPlanes()||(b.isOrthographicCamera&&b.zoom<=0)){U=this._scene._computeBoundingBox(true,false,true);if(x){x._selectedNodes.forEach(function(Y){Y._expandBoundingBox(U,false,false,false);});}if(!U.isEmpty()){if(b.isOrthographicCamera&&b.zoom<=0){this._camera.adjustZoom(U);}if(this._camera.getUsingDefaultClipPlanes()){for(i=0;i<l.length;i++){y=w.byId(l[i]);z=y.getGizmoForContainer(this);if(z&&z.expandBoundingBox){z.expandBoundingBox(U);}}this._camera.adjustClipPlanes(U);}}}_(a,b,n);a.autoClear=false;if(this._backgroundColor!==null){a.setClearColor(this._backgroundColor.color,this._backgroundColor.alpha);a.clear(true,true,false);}else{a.render(this._backgroundScene,this._backgroundCamera);a.clearDepth();}if(this._underlayGroup.children.length>0){a.render(this._underlayGroup,b);a.clearDepth();Q(this._underlayGroup,false);}Q(this._overlayGroup,false);a.clippingPlanes=this._clippingPlanes;switch(this.getRenderMode()){case j.XRay:if(x){var W=n.children[n.children.length-1].clone();x._selectedNodes.forEach(function(Y){if(Y.visible){Y.add(W);a.render(Y,b);Y.remove(W);}});}n.overrideMaterial=this._xrayMaterial;break;case j.LineIllustration:case j.ShadedIllustration:case j.SolidOutline:this._scene._outlineMaterial.linewidth=this._renderer.getPixelRatio();break;default:break;}a.render(n,b);a.clippingPlanes=[];n.overrideMaterial=null;if(this._overlayGroup.children.length>0){Q(this._overlayGroup,true);a.clearDepth();a.render(this._overlayGroup,b);}Q(this._underlayGroup,true);J(a,b,n,U,this._eyePointLight);if(this.getShowSelectionBoundingBoxes()&&x){var X=x._boundingBoxesScene;if(X){x._updateBoundingBoxes();a.render(X,b);}}if(x){x._renderOutline(a,n,b);}for(i=0;i<l.length;i++){y=w.byId(l[i]);z=y.getGizmoForContainer(this);if(z&&z.render){z.render(this);}}if(this._selectionRect){a.render(this._selectionRect,this._backgroundCamera);}this.fireFrameRenderingFinished();};B.prototype.getImage=function(a,b,i,l,n){var x=this._getNativeScene();if(!x){return null;}a=Math.min(a||16,2048);b=Math.min(b||16,2048);this._imageCanvas=this._imageCanvas||document.createElementNS("http://www.w3.org/1999/xhtml","canvas");var y=new THREE.WebGLRenderer({canvas:this._imageCanvas,preserveDrawingBuffer:true,antialias:true,alpha:true});y.setSize(a,b);var z=this.getBackgroundColorTop();var U=this.getBackgroundColorBottom();if(i&&!l){y.setClearColor(i,1);}else if(!i&&l){y.setClearColor(l,1);}else{if(i&&l){this.setBackgroundColorTop(i);this.setBackgroundColorBottom(l);}y.render(this._backgroundScene,this._backgroundCamera);y.autoClear=false;}document.body.appendChild(y.domElement);var W=this.getCamera();var X=W instanceof P?new P():new O();X.getCameraRef().copy(W.getCameraRef());X.update(a,b);var Y=[];var $=this._getViewStateManagerThreeJS();if(!n){if($!==null){$.enumerateSelection(function(b1){Y.push(b1);});$.setSelectionState(Y,false,false,true);}}y.render(x,X.getCameraRef());var a1=y.getContext().canvas.toDataURL();if($!==null&&Y.length>0){$.setSelectionState(Y,true,false,true);}document.body.removeChild(y.domElement);y.dispose();if(U&&i){this.setBackgroundColorBottom(U);}if(z&&l){this.setBackgroundColorTop(z);}return a1;};B.prototype.getMaterialImage=function(a,b,l,n,x,y){b=THREE.Math.clamp(b||256,8,2048);l=THREE.Math.clamp(l||256,8,2048);this._imageCanvas=this._imageCanvas||document.createElementNS("http://www.w3.org/1999/xhtml","canvas");var z=new THREE.WebGLRenderer({canvas:this._imageCanvas,preserveDrawingBuffer:true,antialias:true,alpha:true});z.setSize(b,l);var U=this.getBackgroundColorTop();var W=this.getBackgroundColorBottom();if(n&&!x){z.setClearColor(n,1);}else if(!n&&x){z.setClearColor(x,1);}else if(n&&x){this.setBackgroundColorTop(n);this.setBackgroundColorBottom(x);z.render(this._backgroundScene,this._backgroundCamera);z.autoClear=false;}else{z.setClearColor("#000000",0);}document.body.appendChild(z.domElement);var X=new O();var Y=X.getCameraRef();X.update(b,l);var $=new THREE.SphereGeometry(1,64,32);var a1=new THREE.Mesh($);var b1=new THREE.Box3();a1._expandBoundingBox(b1,false,false,false);Y._vkZoomTo(b1,y);X.adjustClipPlanes(b1);var c1=new THREE.PointLight();c1.position.copy(Y.position);c1.position.y=-1;c1.updateMatrix();c1.updateMatrixWorld(true);a1.add(c1);var d1=Array.isArray(a)?a:[a];var e1=[];for(var i in d1){a1.material=d1[i];z.render(a1,Y);e1.push(z.getContext().canvas.toDataURL());}a1.remove(c1);document.body.removeChild(z.domElement);z.dispose();if(W&&n){this.setBackgroundColorBottom(W);}if(U&&x){this.setBackgroundColorTop(U);}return Array.isArray(a)?e1:e1[0];};B.prototype.getObjectImage=function(n,a,b,i,l,x,y){a=THREE.Math.clamp(a||256,8,2048);b=THREE.Math.clamp(b||256,8,2048);this._imageCanvas=this._imageCanvas||document.createElementNS("http://www.w3.org/1999/xhtml","canvas");var z=new THREE.WebGLRenderer({canvas:this._imageCanvas,preserveDrawingBuffer:true,antialias:true,alpha:true});z.setSize(a,b);var U=this.getBackgroundColorTop();var W=this.getBackgroundColorBottom();if(i&&!l){z.setClearColor(i,1);}else if(!i&&l){z.setClearColor(l,1);}else{if(i&&l){this.setBackgroundColorTop(i);this.setBackgroundColorBottom(l);}z.render(this._backgroundScene,this._backgroundCamera);z.autoClear=false;}document.body.appendChild(z.domElement);var X=this.getCamera();var Y=X instanceof P?new P():new O();var $=Y.getCameraRef();$.copy(X.getCameraRef());if(x){$.quaternion.copy(x);$.updateMatrixWorld();$.up.setFromMatrixColumn($.matrixWorld,1).normalize();}Y.update(a,b);n.getWorldPosition($.position);$.position.sub($.getWorldDirection(new THREE.Vector3()).multiplyScalar(1000));$.updateMatrixWorld();z.getSize(E);n.traverse(function(f1){if(f1._vkUpdate){f1._vkUpdate(z,$,E);}});var a1=new THREE.Box3();n._expandBoundingBox(a1,false,false,false);$._vkZoomTo(a1,y);Y.adjustClipPlanes(a1);var b1=this._getNativeScene();var c1=b1.children[b1.children.length-1].clone();var d1=c1.children[0];d1.position.copy($.position);d1.updateMatrix();d1.updateMatrixWorld(true);n.add(c1);z.render(n,$);n.remove(c1);var e1=z.getContext().canvas.toDataURL();document.body.removeChild(z.domElement);z.dispose();if(W&&i){this.setBackgroundColorBottom(W);}if(U&&l){this.setBackgroundColorTop(U);}return e1;};B.prototype._setContent=function(a){var b=null;var l;var n;if(a){b=a;if(!(b instanceof p)){b=null;}l=a.camera;if(l instanceof O){n=b._computeBoundingBox(true,true);var x=new THREE.Vector3();n.getCenter(x);var y=l.getTargetDirection();var z=l.getPosition();var U=[x.x-z[0],x.y-z[1],x.z-z[2]];var W=U[0]*y[0]+U[1]*y[1]+U[2]*y[2];if(W<0){var X=n.getSize().length()/2;X-=W;z[0]-=y[0]*X;z[1]-=y[1]*X;z[2]-=y[2]*X;l.setPosition(z);}}else if(!(l instanceof P)){l=new P();if(a.builders&&a.builders.length>0){n=b._computeBoundingBox(true,true);if(!n.isEmpty()){l.setFov(14.27);var Y;if(a.upAxis===4){Y=new THREE.Euler(THREE.Math.degToRad(90-30),0,THREE.Math.degToRad(55-90),"ZXY");}else{Y=new THREE.Euler(THREE.Math.degToRad(-30),THREE.Math.degToRad(55-90),0,"YXZ");}this.setCamera(l);this._viewportGestureHandler.zoomTo(n,new THREE.Quaternion().setFromEuler(Y),0,0,null,false);}}}var i;if(a.loaders){for(i=0;i<a.loaders.length;i++){if(a.loaders[i]instanceof q){this._cdsLoader=a.loaders[i];this._cdsLoader.getSceneBuilder()._fireSceneUpdated=this.setShouldRenderFrame.bind(this);this._cdsLoader.attachSceneUpdated(this._handleCdsSceneUpdate,this);this._cdsLoader.attachLoadingFinished(this._handleLoadingFinished,this);this._cdsLoader.attachInitialViewCompleted(this.setShouldRenderFrame,this);break;}}}if(a.builders){for(i=0;i<a.builders.length;i++){a.builders[i]._fireSceneUpdated=this.setShouldRenderFrame.bind(this);a.builders[i]._fireLoadingFinished=function($){this.setRenderMode(this.getRenderMode());}.bind(this);}}}else if(this._cdsLoader){this._cdsLoader.detachSceneUpdated(this._handleCdsSceneUpdate,this);this._cdsLoader.detachLoadingFinished(this._handleLoadingFinished,this);this._cdsLoader.detachInitialViewCompleted(this.setShouldRenderFrame,this);this._cdsLoader=null;}this.setScene(b);if(l){this.setCamera(l);}if(a){if(a.backgroundTopColor!==undefined){this.setBackgroundColorTop(new THREE.Color(a.backgroundTopColor).getStyle());}if(a.backgroundBottomColor!==undefined){this.setBackgroundColorBottom(new THREE.Color(a.backgroundBottomColor).getStyle());}if(a.renderMode!==undefined){this.setRenderMode(a.renderMode);}this._upAxis=a.upAxis||2;}return this;};B.prototype.getCurrentView=function(){return this._currentView;};B.prototype._onViewStateApplied=function(a,b,i){if(i.source!=this._getViewStateManagerThreeJS()||!this._scene){return;}this._ignoreAnimationPosition=i.ignoreAnimationPosition;this.activateView(i.view,i.playViewGroup,i.notAnimateCameraChange);};B.prototype._activateSingleView=function(a,b,n){var i=this._scene.getViewGroups();var l=this;if(i){i.forEach(function(j1){j1.getViews().forEach(function(k1){if(k1===a){l._currentViewIndex=j1.getViews().indexOf(k1);}});});}this.fireViewActivated({viewIndex:this._currentViewIndex,view:a});v.getEventBus().publish("sap.ui.vk","viewActivated",{source:this,view:a,viewIndex:this._currentViewIndex});this._currentView=a;if(a.topColor!==undefined){this.setBackgroundColorTop(new THREE.Color(a.topColor).getStyle());}if(a.bottomColor!==undefined){this.setBackgroundColorBottom(new THREE.Color(a.bottomColor).getStyle());}if(a.renderMode!==undefined){this.setRenderMode(a.renderMode);}this._backgroundProjection=a.userData&&a.userData.viewInfo&&a.userData.viewInfo.backgroundProjection;var x=a.getCamera();var y=this._getNativeScene();if(x){var z=x.getCameraRef();if(z.type==="OrthographicCamera"&&y){var U=x.getPosition();var W=this.getScene();if(W){var X=new THREE.Box3();if(y){y._expandBoundingBox(X,true,true);}var Y=new THREE.Vector3();X.getCenter(Y);var $=x.getTargetDirection();var a1=[Y.x-U[0],Y.y-U[1],Y.z-U[2]];var b1=a1[0]*$[0]+a1[1]*$[1]+a1[2]*$[2];if(b1<0){var c1=X.getSize().length()/2;c1-=b1;U[0]-=$[0]*c1;U[1]-=$[1]*c1;U[2]-=$[2]*c1;}}x.setPosition(U);}}var d1=this._getViewStateManagerThreeJS();var e1=a.flyToTime!=null?a.flyToTime:2000;var f1;if(d1&&d1._fadeOutBackground&&d1._fadeInBackground&&d1._fadeOutBackground!==d1._fadeInBackground&&d1._fadeOutBackground.name==="sphere"){f1="zoomIn";x=x||this.getCamera();}var g1=0;if(x){var h1=b&&!a.hasAnimation();g1=this._viewportGestureHandler.activateCamera(x.getCameraRef(),n?0:e1,h1,f1);}else{this.cameraUpdateCompleted();}var i1=0;if(!n){i1=d1._startTransition(g1>0?g1:e1,a);}if(this.getSafeArea()){this.getSafeArea().resize();}setTimeout(function(){if(d1){d1.fireReadyForAnimation({view:a,ignoreAnimationPosition:this._ignoreAnimationPosition});v.getEventBus().publish("sap.ui.vk","readyForAnimation",{source:d1,view:a,ignoreAnimationPosition:this._ignoreAnimationPosition});d1._startHighlight();}}.bind(this),Math.max(i1,g1)+100);};B.prototype.resetCurrentView=function(){if(!this._currentView){return this;}this._getViewStateManagerThreeJS()._resetNodesMaterialAndOpacityByCurrenView(this._currentView);this._getViewStateManagerThreeJS()._resetNodesStatusByCurrentView(this._currentView,true,true);this.setShouldRenderFrame();return this;};B.prototype.activateView=function(a,b,n){if(this._isRedlineActivated()){u.error("activateView() method is disabled when Redlining is activated");return this;}this._clearAnnotations();this._activateSingleView(a,b,n);return this;};B.prototype.zoomTo=function(a,n,b,i){var l=this._getNativeScene();var x=this._getNativeCamera();if(!x||!l){return this;}i=i||0;var y=new THREE.Box3();var z=null;var U=null;(Array.isArray(a)?a:[a]).forEach(function(a){switch(a){case Z.All:l._expandBoundingBox(y,false,true);break;case Z.Visible:l._expandBoundingBox(y,true,true);break;case Z.Selected:var W=this._getViewStateManagerThreeJS();if(W){W.enumerateSelection(function(n){n._expandBoundingBox(y,false,true);});}break;case Z.Node:if(!n){return this;}U=n;if(Array.isArray(n)){n.forEach(function(n){n._expandBoundingBox(y,false,true);});}else{n._expandBoundingBox(y,false,true);}break;case Z.Restore:u.error(k().getText("VIEWPORT_MSG_RESTORENOTIMPLEMENTED"));return this;case Z.NodeSetIsolation:u.error(k().getText("VIEWPORT_MSG_NODESETISOLATIONNOTIMPLEMENTED"));return this;case Z.RestoreRemoveIsolation:u.error(k().getText("VIEWPORT_MSG_RESTOREREMOVEISOLATIONNOTIMPLEMENTED"));return this;case Z.ViewLeft:z=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),-Math.PI/2);break;case Z.ViewRight:z=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI/2);break;case Z.ViewTop:z=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-Math.PI/2);break;case Z.ViewBottom:z=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2);break;case Z.ViewBack:z=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI);break;case Z.ViewFront:z=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),0);break;default:break;}}.bind(this));if(!y.isEmpty()){this._viewportGestureHandler.zoomTo(y,z,i,b*1000,U,U!==null);}return this;};B.prototype.pan=function(a,b){this._viewportGestureHandler._cameraController.pan(a,b);};B.prototype.rotate=function(a,b,i){this._viewportGestureHandler._cameraController.rotate(a,b,i);};B.prototype.zoom=function(a){this._viewportGestureHandler._cameraController.zoom(a);};B.prototype.getViewInfo=function(a){var b={};if(a==null){a={};}if(a.camera==null){a.camera=true;}var n=this._getNativeCamera();if(a.camera&&n){var i=n.rotation.clone();i.reorder("YXZ");b.camera={rotation:{yaw:THREE.Math.radToDeg(i.y),pitch:THREE.Math.radToDeg(i.x),roll:THREE.Math.radToDeg(i.z)},position:{x:n.position.x,y:n.position.y,z:n.position.z},projectionType:n.isOrthographicCamera?C.Orthographic:C.Perspective,bindingType:g.Vertical};var l=n.view;if(l&&l.enabled){b.camera.view={fullWidth:l.fullWidth,fullHeight:l.fullHeight,offsetX:l.offsetX,offsetY:l.offsetY,width:l.width,height:l.height};}if(b.camera.projectionType===C.Perspective){b.camera.fieldOfView=n.fov;}else if(b.camera.projectionType===C.Orthographic){b.camera.zoomFactor=n.zoom;}if(a.camera.matrices){b.camera.matrices={view:n.matrixWorldInverse.elements.slice(),projection:n.projectionMatrix.elements.slice()};}}if(a.visibility&&this._viewStateManager){var x=a.visibility.mode==null?h.Complete:a.visibility.mode;b.visibility={mode:x};if(x===h.Complete){var y=this._viewStateManager.getVisibilityComplete();b.visibility.visible=y.visible;b.visibility.hidden=y.hidden;}else if(this._viewStateManager.getShouldTrackVisibilityChanges()){b.visibility.changes=this._viewStateManager.getVisibilityChanges();}else{u.warning(k().getText(M.VIT32.summary),M.VIT32.code,"sap.ui.vk.threejs.Viewport");}}var z=this._getViewStateManagerThreeJS();if(a.selection&&z){b.selection=z._getSelectionComplete();}return b;};B.prototype.setViewInfo=function(a,b){var n=this._getNativeCamera();if(a.camera&&n){var i=a.camera;var l=i.projectionType===C.Orthographic?new THREE.OrthographicCamera():new THREE.PerspectiveCamera();l.userData=n.userData;l.aspect=n.aspect;l.position.copy(i.position);var x=i.rotation;l.quaternion.setFromEuler(new THREE.Euler(THREE.Math.degToRad(x.pitch),THREE.Math.degToRad(x.yaw),THREE.Math.degToRad(x.roll),"YXZ"));l.fov=i.fieldOfView||l.fov;l.zoom=i.zoomFactor||l.zoom;if(n.view&&n.view.enabled){var y=i.view||n.view;l.setViewOffset(y.fullWidth,y.fullHeight,y.offsetX,y.offsetY,y.width,y.height);l.aspect=y.fullWidth/y.fullHeight;l.zoom=Math.min(l.aspect,1);}this._viewportGestureHandler.activateCamera(l,(b||0)*1000);}var z=new Map();if(a.visibility||a.selection){var U=this._viewStateManager.getNodeHierarchy();if(U){var W=U.findNodesByName();W.forEach(function(g1){var h1=U.createNodeProxy(g1);var i1=h1.getVeId();U.destroyNodeProxy(h1);if(i1){z.set(i1,g1);}});}}if(a.visibility){switch(a.visibility.mode){case h.Complete:var X=a.visibility.visible,Y=a.visibility.hidden;X.forEach(function(g1){this._viewStateManager.setVisibilityState(z.get(g1),true,false);},this);Y.forEach(function(g1){this._viewStateManager.setVisibilityState(z.get(g1),false,false);},this);break;case h.Differences:this._viewStateManager.resetVisibility();a.visibility.changes.forEach(function(g1){var h1=z.get(g1);if(h1){this._viewStateManager.setVisibilityState(h1,!this._viewStateManager.getVisibilityState(h1),false);}},this);break;default:u.error(k().getText(M.VIT28.summary),M.VIT28.code,"sap.ui.vk.threejs.Viewport");break;}}var $=this._getViewStateManagerThreeJS();var a1=a.selection;if(a1&&$){var b1=$._getSelectionComplete();if(Array.isArray(a1.selected)){var c1=[];var d1=[];a1.selected.forEach(function(g1){var h1=z.get(g1);if(h1){c1.push(h1);}});b1.selected.forEach(function(g1){var h1=z.get(g1);if(h1&&a1.selected.indexOf(g1)<0){d1.push(h1);}});$.setSelectionStates(c1,d1,false,false);}if(Array.isArray(a1.outlined)){var e1=[];var f1=[];a1.outlined.forEach(function(g1){var h1=z.get(g1);if(h1){e1.push(h1);}});b1.outlined.forEach(function(g1){var h1=z.get(g1);if(h1&&a1.outlined.indexOf(g1)<0){f1.push(h1);}});$.setOutliningStates(e1,f1,false,false);}}this.setShouldRenderFrame();return this;};B.prototype.queueCommand=function(a){if(this instanceof B){a();}return this;};B.prototype.getOutputSize=function(){var b=this.getDomRef().getBoundingClientRect();var a=b.width;var i=b.height;var l;l=Math.min(a,i);return{left:(a-l)/2,top:(i-l)/2,sideLength:l};};B.prototype.projectToScreen=function(x,y,z,a){var b=this.getDomRef().getBoundingClientRect();var i=b.width/2;var l=b.height/2;var n=new THREE.Vector3(x,y,z).project(a.getCameraRef());return{x:n.x*i+i,y:n.y*l+l,depth:n.z};};B.prototype.getAnnotations=function(){if(this.getScene()==null||this._annotationsLoaded){return this.getAggregation("annotations")||[];}if(this.getScene().annotations){var a=[];var b=this.getCurrentView();if(b){b.getNodeInfos().forEach(function(n){if(n.target._vkGetNodeContentType()===s.Annotation){a.push(n);}});}this.getScene().annotations.forEach(function(x){var y=null;if(b){for(var n=0;n<a.length;n++){var z=a[n];if(z.target._vkPersistentId()===x.node._vkPersistentId()&&(z.annotationId===x.annotation.id||z.annotationId===undefined)){x.node.visible=z.visible;y=A.createAnnotation(x,this);y.autoGenerated=true;this.addAnnotation(y);break;}}}else{y=A.createAnnotation(x,this);y.autoGenerated=true;this.addAnnotation(y);}if(y){var U=this._viewStateManager.getVisibilityState(x.node);y.setDisplay(U);}}.bind(this));var i=this.getAggregation("annotations")||[];var l=0;i.forEach(function(n){if(n.getAnimate()&&n.getAnimationDelay()===-1){n.setAnimationDelay(l++);}});}this._annotationsLoaded=true;return this.getAggregation("annotations")||[];};B.prototype.setBackgroundNode=function(a){var n=this._viewStateManager.getNodeHierarchy();var b;var i=n.findNodesByName().reduce(function(W,X){if(X._vkGetNodeContentType()===s.Background){if(this._viewStateManager.getVisibilityState(X)){b=X;}W.push(X);}return W;}.bind(this),[]);if(!a){this._viewStateManager.setVisibilityState(i,true,false);this._viewStateManager.setVisibilityState(b,false,false);this._viewportGestureHandler.setView(null,1000);}else{var l=a.parametricContent;var x=l.materialId;var y=a.sceneId;var z=n.createNode(b&&b.parent,l.type,null,s.Background,{parametricContent:l});this._viewStateManager.setVisibilityState(i,false,false);i.push(z);if(this._cdsLoader){this._cdsLoader.assignMaterialToNodes(y,x,z.children);}var U=l.type==="plane"?(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),0)):null;this._viewportGestureHandler.setView(U,1000);}return i;};B.prototype.normalizeRectangle=function(x,y,a,b){var i=window.getComputedStyle(this.getSafeArea().getDomRef());var l=parseFloat(i.width);var n=parseFloat(i.left);var z=(((x-n))/l)-0.5;var U=parseFloat(i.height);var W=parseFloat(i.top);var X=(((y-W))/U)-0.5;return{x:z,y:X,width:a/l,height:b/U};};B.prototype.deNormalizeRectangle=function(x,y,a,b){var i=window.getComputedStyle(this.getSafeArea().getDomRef());var l=parseFloat(i.width);var n=parseFloat(i.left);var z=l/2;var U=n+z;var W=Math.abs(x)*2;if(x<0){W=1-W;W*=z;W+=n;}else if(x>0){W*=z;W+=U;}else{W=U;}var X=Math.abs(a)*2*z;var Y=parseFloat(i.height);var $=parseFloat(i.top);var a1=Y/2;var b1=$+a1;var c1=Math.abs(y)*2;if(y<0){c1=1-c1;c1*=a1;c1+=$;}else if(y>0){c1*=a1;c1+=b1;}else{c1=b1;}var d1=Math.abs(b)*2*a1;return{x:W,y:c1,width:X,height:d1};};return B;});