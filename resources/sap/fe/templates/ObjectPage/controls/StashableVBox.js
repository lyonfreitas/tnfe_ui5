/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/m/VBox","sap/m/VBoxRenderer","sap/ui/core/StashedControlSupport"],function(V,a,S){"use strict";var b=V.extend("sap.fe.templates.ObjectPage.controls.StashableVBox",{metadata:{designtime:"sap/fe/templates/ObjectPage/designtime/StashableVBox.designtime"},renderer:{render:function(r,c){a.render.apply(this,[r,c]);}}});S.mixInto(b);return b;},true);
