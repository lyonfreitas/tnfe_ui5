/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ElementMetadata","sap/base/Log","sap/base/util/isEmptyObject"],function(E,L,i){"use strict";var B=function(c,C){E.apply(this,arguments);this._mViews=C.metadata.views||{};};B.prototype=Object.create(E.prototype);B.prototype.constructor=B;B.prototype.applySettings=function(c){var r=c.hasOwnProperty("renderer")?(c.renderer||""):undefined;E.prototype.applySettings.call(this,c);if(r==null){this._sRendererName=null;}};B.prototype.getRendererName=function(){if(!this._sBlockRenderer){this._sBlockRenderer=this._resolveRendererName();L.debug("BlockBaseMetadata :: "+this.getName()+" is renderer with "+this._sBlockRenderer);}return this._sBlockRenderer;};B.prototype._resolveRendererName=function(){var c=E.prototype.getRendererName.call(this);if(c==null){var p=this.getParent();if(p){c=B.prototype._resolveRendererName.apply(p);}else{throw new Error("BlockBaseMetadata :: no renderer found for "+this.getName());}}return c;};B.prototype.getView=function(v){return this._mViews[v];};B.prototype.getViews=function(){return this._mViews;};B.prototype.setView=function(v,V){this._mViews[v]=V;return this;};B.prototype.hasViews=function(){return!i(this._mViews);};return B;},true);
