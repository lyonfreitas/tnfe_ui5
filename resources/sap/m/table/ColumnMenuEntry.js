/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element"],function(E){"use strict";var C=E.extend("sap.m.table.ColumnMenuEntry",{metadata:{"abstract":true,library:"sap.m",properties:{visible:{type:"boolean",defaultValue:true}}}});C.prototype.getMenu=function(){var e=this.getParent();while(e){if(e.isA("sap.m.table.ColumnMenu")){return e;}e=e.getMenu();}return undefined;};C.prototype.getLabel=function(){if(this.getMetadata().hasProperty("label")){return this.getProperty("label");}throw new Error(this+" does not implement #getLabel");};C.prototype.getContent=function(){if(this.getMetadata().hasAggregation("content")){return this.getAggregation("content");}throw new Error(this+" does not implement #getContent");};C.prototype.setVisible=function(v){if(this.getVisible()==v){return this;}this.setProperty("visible",v);this.getMenu()&&this.getMenu()._setItemVisibility(this,v);return this;};return C;});
