sap.ui.define(["sap/ui/base/Object","sap/m/MessagePopover","sap/m/MessagePopoverItem","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/suite/ui/generic/template/lib/MessageUtils","sap/suite/ui/generic/template/genericUtilities/testableHelper",'sap/ui/core/Element',"sap/base/util/extend"],function(B,M,a,F,b,c,t,E,e){"use strict";F=t.observableConstructor(F,true);var p=new F({path:"persistent",operator:b.EQ,value1:false});var s=new F({path:"technical",operator:b.EQ,value1:false});var v=new F({path:"validation",operator:b.EQ,value1:true});var I=new F({filters:[v,new F({path:"validation",operator:b.EQ,value1:false})],and:true});function g(T,h,d){var C=h.controller;var u=C.getOwnerComponent().getModel("ui");var m=C.byId("showMessages");var f=T.oComponentUtils.isDraftEnabled();var A=false;var o;var j;function k(i){return!!(i&&T.oCommonUtils.getPositionableControlId(i));}function l(i,Z){return h.getGroupTitle?h.getGroupTitle(i,Z):"";}var n;var q=new F({path:"target",operator:b.EQ,value1:"/"+C.getOwnerComponent()});var r;T.oCommonUtils.getDialogFragment("sap.suite.ui.generic.template.fragments.MessagePopover",{beforeOpen:function(){var Z=n.getCurrentContexts();if(h.prepareAllMessagesForNavigation){for(var i=0;i<Z.length;i++){var $=Z[i].getObject();if(!k($.controlIds)){h.prepareAllMessagesForNavigation();return;}}}},isPositionable:k,getGroupTitle:l,titlePressed:function(i){c.navigateFromMessageTitleEvent(T.oCommonUtils,i,h.prepareForMessageNavigation);}}).then(function(Z){r=Z;r.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"msg");n=r.getBinding("items");n.filter(I);(function(r,n){var $=C.getOwnerComponent();var _=$.getModel("_templPriv");_.setProperty("/generic/messageCount",0);var a1=T.oCommonUtils.getText("MESSAGE_BUTTON_TOOLTIP_P",0);_.setProperty("/generic/messageButtonTooltip",a1);if(h.messageSorter){n.sort(h.messageSorter);}n.attachChange(function(){var b1=n.getLength();if(b1>0){var c1=r.getItems();var d1=0;var e1,f1,g1;var h1={};for(var i=0;i<c1.length;i++){if(c1[i].getType()==="Error"){d1=d1+1;}else if(c1[i].getType()==="Warning"){e1=true;}else if(c1[i].getType()==="Success"){f1=true;}else{g1=true;}}if(d1>0){h1={messageSeverity:"Negative",icon:"sap-icon://message-error"};}else if(e1){h1={messageSeverity:"Critical",icon:"sap-icon://message-warning"};}else if(g1){h1={messageSeverity:"Neutral",icon:"sap-icon://message-information"};}else if(f1){h1={messageSeverity:"Success",icon:"sap-icon://message-success"};}_.setProperty("/generic/messageBtnIcon",h1.icon);_.setProperty("/generic/messageSeverity",h1.messageSeverity);}_.setProperty("/generic/messageCount",b1);_.setProperty("/generic/errorMessageCount",d1>0?d1:undefined);a1=T.oCommonUtils.getText(b1===1?"MESSAGE_BUTTON_TOOLTIP_S":"MESSAGE_BUTTON_TOOLTIP_P",b1);_.setProperty("/generic/messageButtonTooltip",a1);});})(r,n);});var L=new F({filters:[v,new F({path:"controlIds",test:function(i){return!!T.oCommonUtils.getPositionableControlId(i);},caseSensitive:true})],and:true});var w=[];var x;var y=0;var N;var z;var D;function G(Z){if(Array.isArray(Z)){var $=false;for(var i=0;i<Z.length;i++){$=G(Z[i])||$;}return $;}if(Z instanceof Promise){Z.then(N);return false;}D.push(Z);return true;}function H(i){z=i;if(n){n.filter(z);}}function J(){if(A){o=new F({filters:D,and:false});var i=[o,p];if(T.oServices.oApplication.needsToSuppressTechnicalStateMessages()){i.push(s);}j=new F({filters:i,and:true});H(new F({filters:[j,L],and:false}));}}function R(i,Z){if(i===y&&G(Z)){J();}}function K(i){var Z=i();return G(Z);}function O(){w.forEach(K);}function P(i){x=i;y++;N=R.bind(null,y);var Z=d&&!f&&u.getProperty("/createMode");D=d?[new F({path:Z?"target":"fullTarget",operator:b.StartsWith,value1:x}),q]:[];O();J();}function Q(i){w.push(i);if(x!==undefined&&K(i)){J();}}var S;function U(){S=S||function(){if(n.getLength()>0){r.navigateBack();r.openBy(m);}};setTimeout(S,0);}function V(i){A=i;if(i){if(D){J();}}else{D=null;H(I);}}function W(i){return i?L:z;}function X(i){return i?j:o;}function Y(){return r.toggle(m);}return{adaptToContext:P,toggleMessagePopover:Y,showMessagePopover:U,registerMessageFilterProvider:Q,setEnabled:V,getMessageFilters:W,getContextFilter:X};}return B.extend("sap.suite.ui.generic.template.lib.MessageButtonHelper",{constructor:function(T,h,i){e(this,(t.testableStatic(g,"MessageButtonHelper"))(T,h,i));}});});
