/*!
 * Copyright (c) 2009-2020 SAP SE, All Rights Reserved
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Control","sap/ui/Device","sap/ui/thirdparty/jquery","sap/ui/util/Storage","sap/ushell/Config","sap/ushell/library","sap/ushell/ui/shell/ToolArea","sap/ushell/ui/shell/ShellLayoutRenderer"],function(L,C,D,q,S,a){"use strict";var b=C.extend("sap.ushell.ui.shell.ShellLayout",{metadata:{library:"sap.ushell",properties:{headerHiding:{type:"boolean",group:"Appearance",defaultValue:false},headerVisible:{type:"boolean",group:"Appearance",defaultValue:true},toolAreaVisible:{type:"boolean",group:"Appearance",defaultValue:false},floatingContainerVisible:{type:"boolean",group:"Appearance",defaultValue:false},backgroundColorForce:{type:"boolean",group:"Appearance",defaultValue:true},showBrandLine:{type:"boolean",group:"Appearance",defaultValue:true},showAnimation:{type:"boolean",group:"Appearance",defaultValue:true},enableCanvasShapes:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{toolArea:{type:"sap.ushell.ui.shell.ToolArea",multiple:false},rightFloatingContainer:{type:"sap.ushell.ui.shell.RightFloatingContainer",multiple:false},canvasSplitContainer:{type:"sap.ushell.ui.shell.SplitContainer",multiple:false},floatingActionsContainer:{type:"sap.ushell.ui.shell.ShellFloatingActions",multiple:false},footer:{type:"sap.ui.core.Control",multiple:false}},associations:{header:{type:"sap.ushell.ui.shell.ShellHeader",multiple:false},floatingContainer:{type:"sap.ushell.ui.shell.FloatingContainer",multiple:false}}}});b._SIDEPANE_WIDTH_PHONE=13;b._SIDEPANE_WIDTH_TABLET=13;b._SIDEPANE_WIDTH_DESKTOP=15;b.prototype.getHeader=function(){return sap.ui.getCore().byId(this.getAssociation("header"));};b.prototype.init=function(){this._rtl=sap.ui.getCore().getConfiguration().getRTL();this._showHeader=true;this._useStrongBG=false;D.media.attachHandler(this._handleMediaChange,this,D.media.RANGESETS.SAP_STANDARD);this._oDoable=a.on("/core/shellHeader/headerVisible").do(this.setHeaderVisible.bind(this));this._oStorage=new S(S.Type.local,"com.sap.ushell.adapters.local.FloatingContainer");};b.prototype.destroy=function(){D.media.detachHandler(this._handleMediaChange,this,D.media.RANGESETS.SAP_STANDARD);if(this._oDoable){this._oDoable.off();this._oDoable=null;}if(this._oRm){this._oRm.destroy();this._oRm=null;}C.prototype.destroy.apply(this,arguments);};b.prototype.onAfterRendering=function(){this._setSidePaneWidth();if(this.getEnableCanvasShapes()){sap.ui.require(["sap/ushell/CanvasShapesManager"],function(c){if(sap.ui.getCore().isThemeApplied()){c.drawShapes();}});}};b.prototype.renderFloatingContainerWrapper=function(){this._oFloatingContainerWrapper=document.getElementById("sapUshellFloatingContainerWrapper");if(!this._oFloatingContainerWrapper){this._oFloatingContainerWrapper=document.createElement("DIV");this._oFloatingContainerWrapper.setAttribute("id","sapUshellFloatingContainerWrapper");this._oFloatingContainerWrapper.classList.add("sapUshellShellFloatingContainerWrapper");this._oFloatingContainerWrapper.classList.add("sapUshellShellHidden");window.document.body.appendChild(this._oFloatingContainerWrapper);}if(this._oStorage&&this._oStorage.get("floatingContainerStyle")){this._oFloatingContainerWrapper.style.cssText=this._oStorage.get("floatingContainerStyle");}};b.prototype.renderFloatingContainer=function(f){this.renderFloatingContainerWrapper();if(f&&!f.getDomRef()){if(!this._oFloatingContainerWrapper.classList.contains("sapUshellShellHidden")){this._oFloatingContainerWrapper.classList.add("sapUshellShellHidden");}f.placeAt("sapUshellFloatingContainerWrapper");}};b.prototype.onThemeChanged=function(){return!!this.getDomRef();};b.prototype.setToolAreaVisible=function(v){this.setProperty("toolAreaVisible",!!v,true);if(this.getToolArea()){this.getToolArea().toggleStyleClass("sapUshellShellHidden",!v);this.applySplitContainerSecondaryContentSize();return this;}if(v){sap.ui.require(["sap/ushell/EventHub"],function(E){E.emit("CreateToolArea");});return this;}L.debug("Tool area not created but visibility updated",null,"sap.ushell.ShellLayout");return this;};b.prototype.getToolAreaSize=function(){if(this.getToolAreaVisible()){if(this.getToolArea().hasItemsWithText()){return"15rem";}return"3.0625rem";}return"0";};b.prototype.setFooter=function(f){this.setAggregation("footer",f,true);this._renderFooter(f);};b.prototype.applySplitContainerSecondaryContentSize=function(){var t=this.getToolAreaSize();this.getCanvasSplitContainer().applySecondaryContentSize(t);};b.prototype.setFloatingContainer=function(c){this.setAssociation("floatingContainer",c,true);this.renderFloatingContainer(c);};b.prototype.setFloatingContainerVisible=function(v){this.setProperty("floatingContainerVisible",!!v,true);if(this.getDomRef()){var f=window.document.getElementById("sapUshellFloatingContainerWrapper");if(v&&this._oStorage&&!this._oStorage.get("floatingContainerStyle")){var e=q(".sapUshellShellHeadItm").position()?q(".sapUshellShellHeadItm").position().left:0;var l=(q(window).width()-q("#shell-floatingContainer").width()-e)*100/q(window).width();var t=q(".sapUshellShellHeader").height()*100/q(window).height();f.style.left=l+"%";f.style.top=t+"%";f.style.position="absolute";this._oStorage.put("floatingContainerStyle",f.style.cssText);}var s=window.document.querySelector(".sapUshellShellFloatingContainerWrapper");if(s&&v===s.classList.contains("sapUshellShellHidden")){s.classList.toggle("sapUshellShellHidden");}}return this;};b.prototype.setFloatingActionsContainer=function(c){this.setAggregation("floatingActionsContainer",c,true);};b.prototype._setStrongBackground=function(){};b.prototype._setSidePaneWidth=function(r){var s=this.getCanvasSplitContainer();if(s){if(!r){r=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name;}var w=b["_SIDEPANE_WIDTH_"+r.toUpperCase()]+"rem";s.setSecondaryContentSize(w);}};b.prototype._hideFooter=function(d,f){d.classList.remove("sapUshellShellFooterVisible");f.classList.add("sapUiHidden");};b.prototype._showFooter=function(d,f,c){if(c._applyContextClassFor){c._applyContextClassFor("footer");}this._oRm=this._oRm||sap.ui.getCore().createRenderManager();d.classList.add("sapUshellShellFooterVisible");f.classList.remove("sapUiHidden");this._oRm.render(c,f);};b.prototype._renderFooter=function(f){var d=this.getDomRef();if(!d){return;}var F=d.querySelector("#"+this.getId()+"-footer");F.innerHTML="";if(!f){this._hideFooter(d,F);return;}this._showFooter(d,F,f);};b.prototype._handleMediaChange=function(p){if(!this.getDomRef()){return;}this._setSidePaneWidth(p.name);};return b;},true);
