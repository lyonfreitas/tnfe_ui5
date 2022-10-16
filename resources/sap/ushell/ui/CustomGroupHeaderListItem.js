// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/GroupHeaderListItem","sap/m/Text"],function(G,T){"use strict";var C=G.extend("sap.ushell.ui.CustomGroupHeaderListItem",{metadata:{library:"sap.ushell",properties:{description:{type:"string",group:"Data",defaultValue:null}},aggregations:{_titleText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_descriptionText:{type:"sap.m.Text",multiple:false,visibility:"hidden"}}}});C.prototype.setTitle=function(t){this.setProperty("title",t);var o=this.getAggregation("_titleText");if(o){o.setText(t);}else{this.setAggregation("_titleText",new T({text:t}),true);}};C.prototype.setDescription=function(d){this.setProperty("description",d);var D=this.getAggregation("_descriptionText");if(D){D.setText(d);}else{this.setAggregation("_descriptionText",new T({text:d}),true);}};C.prototype.getContentAnnouncement=function(){return this.getTitle()+", "+this.getDescription();};C.prototype.setCount=function(){return this;};return C;});
