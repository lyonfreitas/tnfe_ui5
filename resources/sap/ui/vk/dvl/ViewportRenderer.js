/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define([],function(){"use strict";var V={};V.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapVizKitViewport");r.writeClasses();r.writeAttribute("tabindex",0);r.writeAttribute("aria-label","Image");r.writeAttribute("role","figure");var a=false;var w=c.getWidth();if(w){r.addStyle("width",w);a=true;}var h=c.getHeight();if(h){r.addStyle("height",h);a=true;}if(a){r.writeStyles();}r.write(">");c.renderTools(r);c.renderContent(r);r.write("</div>");};return V;},true);
