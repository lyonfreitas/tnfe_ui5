/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","./library","sap/ui/core/Control","./Messages","sap/m/ToggleButton","./NotificationsRenderer","./getResourceBundle"],function(L,v,C,M,T,N,g){"use strict";var a=C.extend("sap.ui.vk.Notifications",{metadata:{library:"sap.ui.vk",publicMethods:["clearAllMessages"],aggregations:{_messagePopover:{type:"sap.m.MessagePopover",multiple:false,visibility:"hidden"},_messagePopoverToggleButton:{type:"sap.m.ToggleButton",multiple:false,visibility:"hidden"}},events:{allMessagesCleared:{},messageAdded:{}}}});a.prototype.init=function(){if(C.prototype.init){C.prototype.init.call(this);}var m;var b=new T({icon:"sap-icon://message-popup",type:sap.m.ButtonType.Emphasized,tooltip:g().getText("MESSAGEPOPOVERBUTTON"),text:"0",press:function(e){if(b.getPressed()){m.openBy(b);}else{m.close();}}});b.addStyleClass("messagePopoverButton");this.setAggregation("_messagePopoverToggleButton",b);m=new sap.m.MessagePopover({headerButton:new sap.m.Button({text:g().getText("MESSAGEPOPOVER_CLEARBUTTON"),type:sap.m.ButtonType.Emphasized,tooltip:g().getText("MESSAGEPOPOVER_CLEARBUTTON"),press:function(e){m.getParent().clearAllMessages();}}),afterClose:b.setPressed.bind(b,false)});m.addStyleClass("sapVizKitNotificationPopover");this.setAggregation("_messagePopover",m);L.addLogListener(this);};a.prototype.exit=function(){L.removeLogListener(this);if(C.prototype.exit){C.prototype.exit.call(this);}};a.prototype.onLogEntry=function(e){if(e.component.startsWith("sap.ui.vk")&&(e.level===L.Level.WARNING||e.level===L.Level.ERROR||e.level===L.Level.FATAL)){var m=e.details,c,r,b;if(M[e.details]){m=g().getText(M[e.details].summary);c=g().getText(M[e.details].cause);r=g().getText(M[e.details].resolution);b=g().getText("ERROR_DESCRIPTION_CODE");}var d=g().getText("ERROR_DESCRIPTION_COMPONENT");var f=g().getText("ERROR_DESCRIPTION_DATE");var t=g().getText("ERROR_DESCRIPTION_TIME");var l=g().getText("ERROR_DESCRIPTION_LEVEL");var h=g().getText("ERROR_DESCRIPTION_MESSAGE");var i=g().getText("ERROR_DESCRIPTION_CAUSE");var j=g().getText("ERROR_DESCRIPTION_RESOLUTION");var k="<div><b>"+d+":</b><br>"+e.component+"</div><br>"+"<div><b>"+f+":</b><br>"+e.date+"</div><br>"+(b?"<div><b>"+b+":</b><br>"+e.details+"</div><br>":"")+"<div><b>"+t+":</b><br>"+e.time.slice(0,e.time.indexOf("."))+"</div><br>"+"<div><b>"+l+":</b><br>"+e.level+"</div><br>"+"<div><b>"+h+":</b><br>"+m+"</div><br>"+(c?"<div><b>"+i+":</b><br>"+c+"</div><br>":"")+(r?"<div><b>"+j+":</b><br>"+r+"</div>":"");var n=new sap.m.MessageItem({markupDescription:true,title:e.message,description:k});var o=this.getAggregation("_messagePopover");o.addItem(n);this.getAggregation("_messagePopoverToggleButton").setText(o.getItems().length);this.fireMessageAdded();}};a.prototype.clearAllMessages=function(){var m=this.getAggregation("_messagePopover");m.removeAllItems();m.close();this.getAggregation("_messagePopoverToggleButton").setText(m.getItems().length);this.fireAllMessagesCleared();return this;};return a;});