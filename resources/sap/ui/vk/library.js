/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/Core","sap/base/util/ObjectPath","sap/ui/core/library","./BillboardBorderLineStyle","./BillboardCoordinateSpace","./BillboardHorizontalAlignment","./BillboardStyle","./BillboardTextEncoding","./CameraFOVBindingType","./CameraProjectionType","./ContentResourceSourceCategory","./ContentResourceSourceTypeToCategoryMap","./DetailViewShape","./DetailViewType","./DvlException","./IncludeUsageIdType","./LeaderLineMarkStyle","./MapContainerButtonType","./Redline","./RenderMode","./SelectionMode","./TransformationMatrix","./VisibilityMode","./ZoomTo","./abgrToColor","./colorToABGR","./cssColorToColor","./colorToCSSColor","./getResourceBundle","./utf8ArrayBufferToString","./dvl/GraphicsCoreApi","./dvl/checkResult","./dvl/getJSONObject","./dvl/getPointer","./tools/AxisColours","./tools/CoordinateSystem","./tools/HitTestClickType","./tools/HitTestIdMode","./tools/PredefinedView"],function(c,O){"use strict";c.initLibrary({name:"sap.ui.vk",dependencies:["sap.ui.core"],interfaces:["sap.ui.vk.AuthorizationHandler","sap.ui.vk.DecryptionHandler","sap.ui.vk.IPlaybackCollection"],types:[],controls:["sap.ui.vk.AnimationTimeSlider","sap.ui.vk.ContainerBase","sap.ui.vk.ContainerContent","sap.ui.vk.DrawerToolbar","sap.ui.vk.FlexibleControl","sap.ui.vk.LegendItem","sap.ui.vk.ListPanel","sap.ui.vk.ListPanelStack","sap.ui.vk.MapContainer","sap.ui.vk.NativeViewport","sap.ui.vk.Notifications","sap.ui.vk.Overlay","sap.ui.vk.ProgressIndicator","sap.ui.vk.RedlineDesign","sap.ui.vk.RedlineSurface","sap.ui.vk.SceneTree","sap.ui.vk.StepNavigation","sap.ui.vk.Toolbar","sap.ui.vk.Viewer","sap.ui.vk.ViewGallery","sap.ui.vk.Viewport","sap.ui.vk.ViewportBase","sap.ui.vk.dvl.Viewport","sap.ui.vk.threejs.Viewport","sap.ui.vk.svg.Viewport","sap.ui.vk.tools.AnchorPointToolGizmo","sap.ui.vk.tools.CrossSectionToolGizmo","sap.ui.vk.tools.Gizmo","sap.ui.vk.tools.MoveToolGizmo","sap.ui.vk.tools.RotateToolGizmo","sap.ui.vk.tools.ScaleToolGizmo","sap.ui.vk.tools.SceneOrientationToolGizmo","sap.ui.vk.tools.TooltipToolGizmo"],elements:["sap.ui.vk.ContentConnector","sap.ui.vk.FlexibleControlLayoutData","sap.ui.vk.OverlayArea","sap.ui.vk.RedlineElement","sap.ui.vk.RedlineElementEllipse","sap.ui.vk.RedlineElementFreehand","sap.ui.vk.RedlineElementLine","sap.ui.vk.RedlineElementRectangle","sap.ui.vk.RedlineElementText","sap.ui.vk.ViewStateManager","sap.ui.vk.ViewStateManagerBase","sap.ui.vk.dvl.ViewStateManager","sap.ui.vk.threejs.NodesTransitionHelper","sap.ui.vk.threejs.ViewStateManager","sap.ui.vk.svg.ViewStateManager","sap.ui.vk.tools.AnchorPointTool","sap.ui.vk.tools.CrossSectionTool","sap.ui.vk.tools.HitTestTool","sap.ui.vk.tools.MoveTool","sap.ui.vk.tools.RectSelectTool","sap.ui.vk.tools.RotateOrbitTool","sap.ui.vk.tools.RotateTool","sap.ui.vk.tools.RotateTurntableTool","sap.ui.vk.tools.ScaleTool","sap.ui.vk.tools.SceneOrientationTool","sap.ui.vk.tools.Tool","sap.ui.vk.tools.TooltipTool","sap.ui.vk.tools.PoiManipulationTool"],noLibraryCSS:false,version:"1.97.0",designtime:"sap/ui/vk/designtime/library.designtime"});var v=O.get("sap.ui.vk");var s={};s["sap/ui/vk/thirdparty/three"]={exports:"THREE",amd:true};s["sap/ui/vk/thirdparty/html2canvas"]={exports:"html2canvas",amd:true};s["sap/ui/vk/thirdparty/gl-matrix"]={exports:"glMatrix",amd:true};sap.ui.loader.config({shim:s});var l=function(a,b){var m="new extend getMetadata";if(b){m+=" "+b;}sap.ui.lazyRequire("sap.ui.vk."+a,m);};l("AnimationPlayback");l("AnimationSequence");l("BaseNodeProxy");l("Camera");l("ContentConnector","registerSourceType");l("ContentManager");l("ContentResource");l("Core");l("DownloadManager");l("ImageContentManager");l("LayerProxy");l("Loco");l("Material");l("NodeHierarchy");l("NodeProxy");l("OrthographicCamera");l("PerspectiveCamera");l("RedlineDesignHandler");l("RedlineGesturesHandler");l("Scene");l("Smart2DHandler");l("Texture");l("View");l("ViewportHandler");l("dvl.BaseNodeProxy");l("dvl.ContentManager","getRuntimeSettings setRuntimeSettings getWebGLContextAttributes setWebGLContextAttributes getDecryptionHandler setDecryptionHandler");l("dvl.GraphicsCore");l("dvl.LayerProxy");l("dvl.NodeHierarchy");l("dvl.NodeProxy");l("dvl.Scene");l("helpers.RotateOrbitHelperDvl");l("helpers.RotateOrbitHelperThree");l("helpers.RotateTurntableHelperDvl");l("helpers.RotateTurntableHelperThree");l("Highlight");l("svg.BaseNodeProxy");l("svg.ContentManager","registerLoader");l("svg.NodeHierarchy");l("svg.NodeProxy");l("svg.Scene");l("threejs.AnimationSequence");l("threejs.BaseNodeProxy");l("threejs.Billboard");l("threejs.Callout");l("threejs.ContentDeliveryService");l("threejs.ContentManager","registerLoader");l("threejs.DetailView");l("threejs.LayerProxy");l("threejs.Material");l("threejs.NodeHierarchy");l("threejs.NodeProxy");l("threejs.OrthographicCamera");l("threejs.PerspectiveCamera");l("threejs.Scene");l("threejs.Texture");l("threejs.Thrustline");l("threejs.ViewportGestureHandler");l("tools.AnchorPointToolHandler");l("tools.CrossSectionToolHandler");l("tools.HitTestToolHandler");l("tools.MoveToolHandler");l("tools.RectSelectToolHandler");l("tools.RotateToolHandler");l("tools.ScaleToolHandler");l("tools.TooltipToolHandler");return v;});
