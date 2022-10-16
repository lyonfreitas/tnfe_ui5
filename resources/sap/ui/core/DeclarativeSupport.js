/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/base/DataType','sap/ui/base/ManagedObject','./Control','./CustomData','./HTML','./mvc/View','./mvc/EventHandlerResolver','sap/base/Log','sap/base/util/ObjectPath','sap/base/assert','sap/base/strings/camelize'],function(q,D,M,C,a,H,V,E,L,O,b,c){"use strict";var d={};d.attributes={"data-sap-ui-type":true,"data-sap-ui-id":true,"data-sap-ui-aggregation":true,"data-sap-ui-default-aggregation":true,"data-sap-ui-binding":function(v,s){var B=M.bindingParser(v);s.objectBindings=s.objectBindings||{};s.objectBindings[B.model||undefined]=B;},"data-tooltip":function(v,s){s["tooltip"]=v;},"tooltip":function(v,s,f){s["tooltip"]=v;L.warning('[Deprecated] Control "'+s.id+'": The attribute "tooltip" is not prefixed with "data-*". Future version of declarative support will only suppport attributes with "data-*" prefix.');},"class":true,"style":true,"id":true};d.compile=function(e,v,i){var t=this;q(e).find("[data-sap-ui-type]").filter(function(){return q(this).parents("[data-sap-ui-type]").length===0;}).each(function(){t._compile(this,v,i);});};d._compile=function(e,v,i){var $=q(e);var t=$.attr("data-sap-ui-type");var f=[];var I=t==="sap.ui.core.UIArea";if(I){var g=this;$.children().each(function(){var o=g._createControl(this,v);if(o){f.push(o);}});}else{var o=this._createControl(e,v);if(o){f.push(o);}}$.empty();var A=[];q.each(e.attributes,function(h,j){var n=j.name;if(!I||I&&/^data-/g.test(n.toLowerCase())){A.push(n);}});if(A.length>0){$.removeAttr(A.join(" "));}f.forEach(function(o){if(o instanceof C){if(v&&!i){v.addContent(o);}else{o.placeAt(e);if(v){v.connectControl(o);}}}});};d._createControl=function(e,v){var $=q(e);var o=null;var t=$.attr("data-sap-ui-type");if(t){var f=sap.ui.requireSync(t.replace(/\./g,"/"));f=f||O.get(t);b(typeof f!=="undefined","Class not found: "+t);var s={};s.id=this._getId($,v);if(v&&v._sProcessingMode!=null&&f.getMetadata().hasSpecialSetting("processingMode")){s.processingMode=v._sProcessingMode;}this._addSettingsForAttributes(s,f,e,v);this._addSettingsForAggregations(s,f,e,v);var o;if(V.prototype.isPrototypeOf(f.prototype)&&typeof f._sType==="string"){o=V._create(s,undefined,f._sType);}else{o=new f(s);}if(e.className){o.addStyleClass(e.className);}$.removeAttr("data-sap-ui-type");}else{o=this._createHtmlControl(e,v);}return o;};d._createHtmlControl=function(e,v){var h=new H();h.setDOMContent(e);this.compile(e,v,true);return h;};d._addSettingsForAttributes=function(s,f,e,v){var t=this;var S=d.attributes;var B=M.bindingParser;var g=[];var r=/^data-custom-data:(.+)/i;q.each(e.attributes,function(i,A){var n=A.name;var h=A.value;if(!r.test(n)){if(typeof S[n]==="undefined"){n=t.convertAttributeToSettingName(n,s.id);var p=t._getProperty(f,n);if(p){var o=B(h,v&&v.getController(),true);if(o&&typeof o==="object"){s[n]=o;}else{s[n]=t.convertValueToType(t.getPropertyDataType(p),o||h);}}else if(t._getAssociation(f,n)){var j=t._getAssociation(f,n);if(j.multiple){h=h.replace(/\s*,\s*|\s+/g,",");s[n]=h.split(",").map(function(I){return v?v.createId(I):I;});}else{s[n]=v?v.createId(h):h;}}else if(t._getAggregation(f,n)){var k=t._getAggregation(f,n);if(k.multiple){var o=B(h,v&&v.getController());if(o){s[n]=o;}else{throw new Error("Aggregation "+n+" with cardinality 0..n only allows binding paths as attribute value");}}else if(k.altTypes){var o=B(h,v&&v.getController(),true);if(o&&typeof o==="object"){s[n]=o;}else{s[n]=t.convertValueToType(k.altTypes[0],o||h);}}else{throw new Error("Aggregation "+n+" not supported");}}else if(t._getEvent(f,n)){var l=v&&(v._oContainingView||v).getController();var m=E.resolveEventHandler(h,l);if(m){s[n]=m;}else{throw new Error('Control "'+s.id+'": The function "'+h+'" for the event "'+n+'" is not defined');}}else{b((n==="id"),"DeclarativeSupport encountered unknown setting '"+n+"' for class '"+f.getMetadata().getName()+"' (value:'"+h+"')");}}else if(typeof S[n]==="function"){S[n](h,s,f);}}else{n=c(r.exec(n)[1]);var o=B(h,v&&v.getController());g.push(new a({key:n,value:o||h}));}});if(g.length>0){s.customData=g;}return s;};d._addSettingsForAggregations=function(s,f,e,v){var $=q(e);var g=this._getDefaultAggregation(f,e);var t=this;var A=f.getMetadata().getAllAggregations();$.children().each(function(){var h=q(this);var i=h.attr("data-sap-ui-aggregation");var T=h.attr("data-sap-ui-type");var u=false;if(!i){u=true;i=g;}if(i&&A[i]){var m=A[i].multiple;var j=function(o){var k=t._createControl(o,v);if(k){if(m){if(!s[i]){s[i]=[];}if(typeof s[i].path==="string"){b(!s[i].template,"list bindings support only a single template object");s[i].template=k;}else{s[i].push(k);}}else{s[i]=k;}}};if(u||(T&&!u)){j(this);}else{h.children().each(function(){j(this);});}}h.removeAttr("data-sap-ui-aggregation");h.removeAttr("data-sap-ui-type");});return s;};d._getId=function(e,v){var $=q(e);var i=$.attr("id");if(i){if(v){i=v.createId(i);$.attr("data-sap-ui-id",i);}$.attr("id","");}return i;};d._getProperty=function(f,n){return f.getMetadata().getProperty(n);};d.convertValueToType=function(t,v){if(t instanceof D){v=t.parseValue(v);}return typeof v==="string"?M.bindingParser.escape(v):v;};d.getPropertyDataType=function(p){var t=D.getType(p.type);if(!t){throw new Error("Property "+p.name+" has no known type");}return t;};d.convertAttributeToSettingName=function(A,i,e){if(A.indexOf("data-")===0){A=A.substr(5);}else if(e){L.warning('[Deprecated] Control "'+i+'": The attribute "'+A+'" is not prefixed with "data-*". Future version of declarative support will only suppport attributes with "data-*" prefix.');}else{throw new Error('Control "'+i+'": The attribute "'+A+'" is not prefixed with "data-*".');}return c(A);};d._getAssociation=function(f,n){return f.getMetadata().getAssociation(n);};d._getAggregation=function(f,n){return f.getMetadata().getAggregation(n);};d._getEvent=function(f,n){return f.getMetadata().getEvent(n);};d._getDefaultAggregation=function(f,e){var $=q(e);var s=$.attr("data-sap-ui-default-aggregation")||f.getMetadata().getDefaultAggregationName();$.removeAttr("data-sap-ui-default-aggregation");return s;};return d;},true);
