/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["../OrthographicCamera"],function(O){"use strict";var S=O.extend("sap.ui.vk.svg.OrthographicCamera",{metadata:{}});var b=O.getMetadata().getParent().getClass().prototype;S.prototype.init=function(){if(b.init){b.init.call(this);}this.zoom=1;this.offsetX=0;this.offsetY=0;this._width=0;this._height=0;this.zoomedObject=null;};S._MIN_ZOOM=1e-15;S.prototype.update=function(w,h,r,a){if(this._width!==w||this._height!==h){if(this._width>0&&this._height>0){var z=Math.min(w,h)/Math.min(this._width,this._height);z=Math.max(z,S._MIN_ZOOM/this.zoom);this.zoom*=z;if(!a){this.offsetX=(this.offsetX-this._width*0.5)*z+w*0.5;this.offsetY=(this.offsetY-this._height*0.5)*z+h*0.5;}}else{r=true;}this._width=w;this._height=h;if(r){this.reset();}}};S.prototype.reset=function(){if(this._initialZoom){this.setZoomFactor(this._initialZoom);}if(this._initialPosition){this.setPosition(this._initialPosition);}};S.prototype._getViewBox=function(){var s=this.zoom>0?1/this.zoom:1;return[-this.offsetX*s,-this.offsetY*s,this._width*s,this._height*s];};S.prototype._setViewBox=function(v,w,h){this.zoom=Math.max(w/v[2],S._MIN_ZOOM);this.offsetX=w*0.5-(v[0]+v[2]*0.5)*this.zoom;this.offsetY=h*0.5-(v[1]+v[3]*0.5)*this.zoom;this._width=w;this._height=h;};S.prototype._zoomTo=function(a,w,h,m){var z=Math.min(w/(a.max.x-a.min.x),h/(a.max.y-a.min.y))/(1+(m||0));z=Math.max(z,S._MIN_ZOOM);this.zoom=z;this.offsetX=(w-(a.min.x+a.max.x)*z)*0.5;this.offsetY=(h-(a.min.y+a.max.y)*z)*0.5;this._width=w;this._height=h;};S.prototype._screenToWorld=function(x,y){return{x:(x-this.offsetX)/this.zoom,y:(y-this.offsetY)/this.zoom};};S.prototype._worldToScreen=function(x,y){return{x:x*this.zoom+this.offsetX,y:y*this.zoom+this.offsetY};};S.prototype._transformRect=function(r){var p=this._screenToWorld(r.x1,r.y1);var a=this._screenToWorld(r.x2,r.y2);return{x1:Math.min(p.x,a.x),y1:Math.min(p.y,a.y),x2:Math.max(p.x,a.x),y2:Math.max(p.y,a.y)};};S.prototype._getYSign=function(){return this.getUpDirection()[1]>=0?-1:1;};S.prototype.getPosition=function(){var i=this.zoom>0?1/this.zoom:1;return[(this._width*0.5-this.offsetX)*i,(this._height*0.5-this.offsetY)*i*this._getYSign(),0];};S.prototype.setPosition=function(v){if(Array.isArray(v)&&v.length>=2){if(!this._initialPosition){this._initialPosition=v.slice();}if(this._width>0&&this._height>0){this.offsetX=this._width*0.5-v[0]*this.zoom;this.offsetY=this._height*0.5-v[1]*this._getYSign()*this.zoom;}}};S.prototype.getZoomFactor=function(){return this.zoom*2/Math.min(this._width,this._height);};S.prototype.setZoomFactor=function(v){if(this._initialZoom==null){this._initialZoom=v;}if(this._width>0&&this._height>0){var n=v*0.5*Math.min(this._width,this._height);n=Math.max(n,S._MIN_ZOOM);this.offsetX+=(this._width*0.5-this.offsetX)*(this.zoom-n)/this.zoom;this.offsetY+=(this._height*0.5-this.offsetY)*(this.zoom-n)/this.zoom;this.zoom=n;}};return S;});
