/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element','sap/ui/core/IconPool','./TabStripItem','./library'],function(E,I,T,l){"use strict";var a=l.ImageHelper;var b=E.extend("sap.m.TabContainerItem",{metadata:{properties:{name:{type:"string",group:"Misc",defaultValue:""},additionalText:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconTooltip:{type:"string",group:"Accessibility",defaultValue:null},key:{type:"string",group:"Data",defaultValue:null},modified:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,defaultValue:null},_image:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{itemPropertyChanged:{parameters:{itemChanged:{type:"sap.m.TabContainerItem"},propertyKey:{type:"string"},propertyValue:{type:"any"}}}},dnd:{draggable:true,droppable:false}}});b.prototype.setProperty=function(n,v,s){this.fireItemPropertyChanged({itemChanged:this,propertyKey:n,propertyValue:v});return E.prototype.setProperty.call(this,n,v,s);};b.prototype.setIcon=function(i,s){var p,c=['sapMTabContIcon'],o=this.getAggregation("_image"),d=this.getId()+"-img",D=!!(this.getName()||this.getAdditionalText());if(!i){this.setProperty("icon",i,s);if(o){this.destroyAggregation("_image");}return this;}if(this.getIcon()!==i){this.setProperty("icon",i,s);p={src:i,id:d,decorative:D,tooltip:this.getIconTooltip()};o=a.getImageControl(d,o,undefined,p,c);this.setAggregation("_image",o,s);}return this;};b.prototype._getImage=function(){return this.getAggregation("_image");};return b;});
