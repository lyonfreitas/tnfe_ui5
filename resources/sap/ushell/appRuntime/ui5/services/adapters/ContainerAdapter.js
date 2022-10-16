// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ushell/User","sap/ui/thirdparty/jquery","sap/base/util/ObjectPath"],function(L,U,q,O){"use strict";var C=function(s,p,c){var u,l,k,K;this.load=function(){var b;l=O.get("config.systemProperties.logoutUrl",c);k=O.get("config.systemProperties.sessionKeepAlive.url",c);K=O.get("config.systemProperties.sessionKeepAlive.method",c);b=q.extend(true,{id:""},O.get("config.userProfile.defaults",c));u=new U(b);a(b);return new q.Deferred().resolve().promise();};this.getSystem=function(){return s;};this.getUser=function(){return u;};this.logout=function(){var d=new q.Deferred();try{if(typeof l==="string"&&l.length>0){this._logoutViaHiddenIFrame(d,l);setTimeout(d.resolve,4000);}else{d.resolve();}}catch(e){L.error("logout from iframe "+document.URL+" failed",e,"sap.ushell.appRuntime.ui5.SessionHandlerAgent");d.resolve();}return d.promise();};this._logoutViaHiddenIFrame=function(d,b){var f=document.createElement("iframe"),S=b.replace(/"/g,"\\\"");window.addEventListener("message",function(e){if((e.data&&e.data.url)===b){d.resolve();}});f.style.visibility="hidden";f.setAttribute("src",b);function o(){this.contentWindow.parent.postMessage({url:S,request_id:"dummy-logout-id"},"*");}f.addEventListener("load",o);f.addEventListener("error",o);document.body.appendChild(f);};this.sessionKeepAlive=function(){if(typeof k==="string"&&k.length>0&&typeof K==="string"&&K.length>0){var x=new XMLHttpRequest();x.open(K,k,true);x.onreadystatechange=function(){if(this.readyState===4){L.debug("Server session was extended");}};x.send();}};function a(S){var o=sap.ui.getCore(),b=o.getConfiguration(),f=b.getFormatSettings();if(S.sapDateFormat){f.setLegacyDateFormat(S.sapDateFormat);}if(S.sapDateCalendarCustomizing){f.setLegacyDateCalendarCustomizing(S.sapDateCalendarCustomizing);}if(S.sapNumberFormat){f.setLegacyNumberFormat(S.sapNumberFormat);}if(S.sapTimeFormat){f.setLegacyTimeFormat(S.sapTimeFormat);}if(typeof S.currencyFormats==="object"){f.addCustomCurrencies(S.currencyFormats);}}};return C;},true);
