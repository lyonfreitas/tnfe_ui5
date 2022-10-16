/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/URI','../Element','sap/base/util/UriParameters','sap/base/Log','sap/base/util/extend','sap/ui/core/ThemeCheck','sap/base/util/LoaderExtensions','sap/ui/thirdparty/jquery','./ThemeHelper'],function(U,E,a,L,e,T,b,q,c){"use strict";var C=window["sap-ui-config"]||{};var s=0;if(C['xx-nosync']==='warn'||/(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(window.location.search)){s=1;}if(C['xx-nosync']===true||C['xx-nosync']==='true'||/(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(window.location.search)){s=2;}var P={};var p=null;var t=null;var d=[];var f=[];var B=new U(sap.ui.require.toUrl(""),document.baseURI).origin();var o={};var r=/url[\s]*\('?"?([^\'")]*)'?"?\)/;var u=a.fromQuery(window.location.search).get("sap-ui-xx-no-inline-theming-parameters")!=="true";var g,D;function h(i,j){var M=r.exec(i);if(M){var K=new U(M[1]);if(K.is("relative")){var N=K.absoluteTo(j).normalize().toString();i="url('"+N+"')";}}return i;}function k(i,j){var M=r.exec(i);if(M&&M[1]){var K=window.getComputedStyle(document.body||document.documentElement);i=K.getPropertyValue("--"+j+"__asResolvedUrl").trim();if(i){i=JSON.parse(i);var R=b.resolveUI5Url(i);i="url("+JSON.stringify(R)+")";}else{L.error("The parameter '"+j+"' contains a url, but no matching resolved-url CSS variable could be found.");}}return i;}function m(i,N,j){for(var K in N){if(typeof i[K]==="undefined"){i[K]=h(N[K],j);}}return i;}function l(N,i){if(typeof N["default"]!=="object"){N={"default":N,"scopes":{}};}p=p||{};p["default"]=p["default"]||{};p["scopes"]=p["scopes"]||{};m(p["default"],N["default"],i);if(typeof N["scopes"]==="object"){for(var S in N["scopes"]){p["scopes"][S]=p["scopes"][S]||{};m(p["scopes"][S],N["scopes"][S],i);}}var j=Object.keys(p["scopes"]);if(j.length){if(j.length>1){L.error("There are multiple theming parameter scopes available but only a single scope is supported. Only the first scope '"+j[0]+"' is used for retrieval of parameters.");}if(!g){D=document.createElement("span");D.classList.add(j[0]);document.documentElement.appendChild(D);g=window.getComputedStyle(D);}}}function n(i){q("link[id^=sap-ui-theme-]").each(function(){i(this.getAttribute("id"));});}function v(i){if(w(i)){return false;}var j=y(i);var K=T.checkStyle(i);if(!K){L.warning("Parameters have been requested but theme is not applied, yet.","sap.ui.core.theming.Parameters");}if(K&&u){var $=q(document.getElementById(i));var M=$.css("background-image");var N=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(M);if(N&&N.length>=2){var O=N[1];if(O.charAt(0)!=="{"&&O.charAt(O.length-1)!=="}"){try{O=decodeURIComponent(O);}catch(Q){L.warning("Could not decode theme parameters URI from "+j.styleSheetUrl);}}try{var R=JSON.parse(O);l(R,j.themeBaseUrl);return true;}catch(Q){L.warning("Could not parse theme parameters from "+j.styleSheetUrl+". Loading library-parameters.json as fallback solution.");}}}return false;}function w(i){var j=i.replace("sap-ui-theme-","").replace(/\./g,"-");var V=!!(window.getComputedStyle(document.body||document.documentElement).getPropertyValue("--sapUiTheme-"+j).trim());if(V){var M=c.getMetadata(i);if(M&&M.Scopes&&M.Scopes.length>0){var S={};M.Scopes.forEach(function(K){S[K]={};});l({"default":{},scopes:S});}}return V;}function x(i,j){var K=y(i);if(w(i)&&!j){return;}if(!v(i)){var M=K.styleSheetUrl.replace(/\/(?:css_variables|library)([^\/.]*)\.(?:css|less)($|[?#])/,function($,Q,R){return"/library-parameters.json"+(R?R:"");});if(s===2){L.error("[nosync] Loading library-parameters.json ignored",M,"sap.ui.core.theming.Parameters");return;}else if(s===1){L.error("[nosync] Loading library-parameters.json with sync XHR",M,"sap.ui.core.theming.Parameters");}var N=new U(K.themeBaseUrl).origin();var W=o[N];var O=[];if(W===undefined){if(M.startsWith(B)){O=[false,true];}else{O=[true,false];}}else{O=[W];}z(M,K.themeBaseUrl,O);}}function y(i){var j=document.getElementById(i);if(!j){L.warning("Could not find stylesheet element with ID",i,"sap.ui.core.theming.Parameters");return undefined;}var S=j.href;return{themeBaseUrl:new U(S).filename("").query("").toString(),styleSheetUrl:S};}function z(i,K,W){var M=W.shift();var N=M?{"X-Requested-With":"XMLHttpRequest"}:{};q.ajax({url:i,dataType:'json',async:false,xhrFields:{withCredentials:M},headers:N,success:function(O,Q,R){var S=new U(K).origin();o[S]=M;if(Array.isArray(O)){for(var j=0;j<O.length;j++){var V=O[j];l(V,K);}}else{l(O,K);}},error:function(j,O,Q){L.error("Could not load theme parameters from: "+i,Q);if(W.length>0){L.warning("Initial library-parameters.json request failed ('withCredentials="+M+"'; sUrl: '"+i+"').\n"+"Retrying with 'withCredentials="+!M+"'.","sap.ui.core.theming.Parameters");z(i,K,W);}}});}function A(i,j){if(!p){l({},"");t=sap.ui.getCore().getConfiguration().getTheme();n(function(K){if(i){if(T.checkStyle(K)){v(K);}else{d.push(K);}}else{x(K,j);}});}return p;}function F(){var i=[];d.forEach(function(j){if(T.checkStyle(j)){v(j);}else{i.push(j);}});d=i;}function G(i){d.forEach(function(j){x(j,i);});d=[];}P._addLibraryTheme=function(i){if(p){d.push("sap-ui-theme-"+i);}};function H(i,j,K){var M=i[j];if(!M){var N=K?g:window.getComputedStyle(document.body||document.documentElement);M=N.getPropertyValue("--"+j).trim();M=M!=""?M:undefined;if(M){M=k(M,j);i[j]=M;}}return M;}function I(O){var i=O.async,j=false,K=A(i);if(O.scopeName){K=K["scopes"][O.scopeName];j=true;}else{K=K["default"];}var M=H(K,O.parameterName,j);if(!M){var N=O.parameterName.indexOf(":");if(N!=-1){var Q=O.parameterName.substr(N+1);M=H(K,Q,j);}}if(O.loadPendingParameters&&typeof M==="undefined"&&!i){G();M=I({parameterName:O.parameterName,scopeName:O.scopeName,loadPendingParameters:false});}return M;}function J(j,K,M){var S=P.getActiveScopesFor(K,M);var N=S.flat().reduce(function(R,V){if(R.indexOf(V)===-1){R.push(V);}return R;},[]);for(var i=0;i<N.length;i++){var O=N[i];var Q=I({parameterName:j,scopeName:O,async:M});if(Q){return Q;}}return I({parameterName:j,async:M});}P._getScopes=function(i,j){if(i&&!p){return;}var K=A(j);var S=Object.keys(K["scopes"]);return S;};P.getActiveScopesFor=function(i,j){var S=[];if(i instanceof E){var K=i.getDomRef();if(j){F();}else{G();}var M=this._getScopes(undefined,j);if(M.length){if(K){var N=function(R){var V=K.classList;return V&&V.contains(R);};while(K){var O=M.filter(N);if(O.length>0){S.push(O);}K=K.parentNode;}}else{var Q=function(R){return typeof i.hasStyleClass==="function"&&i.hasStyleClass(R);};while(i){var O=M.filter(Q);if(O.length>0){S.push(O);}i=typeof i.getParent==="function"&&i.getParent();}}}}return S;};P.get=function(N,j){var K,M,O,Q,R;var S=function($){return $.callback===M;};if(!sap.ui.getCore().isInitialized()){L.warning("Called sap.ui.core.theming.Parameters.get() before core has been initialized. "+"Consider using the API only when required, e.g. onBeforeRendering.");}if(arguments.length===0){L.warning("Legacy variant usage of sap.ui.core.theming.Parameters.get API detected. Do not use the Parameters.get() API to retrieve ALL theming parameters, "+"as this will lead to unwanted synchronous requests. "+"Use the asynchronous API variant instead and retrieve a fixed set of parameters.","LegacyParametersGet","sap.ui.support",function(){return{type:"LegacyParametersGet"};});G(true);var V=A(false,true);return Object.assign({},V["default"]);}if(!N){return undefined;}if(N instanceof Object&&!Array.isArray(N)){if(!N.name){L.warning("sap.ui.core.theming.Parameters.get was called with an object argument without one or more parameter names.");return undefined;}j=N.scopeElement;M=N.callback;Q=typeof N.name==="string"?[N.name]:N.name;O=true;}else{if(typeof N==="string"){Q=[N];}else{Q=N;}L.warning("Legacy variant usage of sap.ui.core.theming.Parameters.get API detected for parameter(s): '"+Q.join(", ")+"'. This could lead to bad performance and additional synchronous XHRs, as parameters might not be available yet. Use asynchronous variant instead.","LegacyParametersGet","sap.ui.support",function(){return{type:"LegacyParametersGet"};});}var W,X;var Y=function($){if(j instanceof E){return J($,j,O);}else{if(O){F();}return I({parameterName:$,loadPendingParameters:!O,async:O});}};X={};for(var i=0;i<Q.length;i++){K=Q[i];var Z=Y(K);if(!O||Z){X[K]=Z;}}if(O&&M&&Object.keys(X).length!==Q.length){if(!sap.ui.getCore().isThemeApplied()){W=function(){var $=this.get({name:N.name,scopeElement:N.scopeElement});if(!$||(typeof $==="object"&&(Object.keys($).length!==Q.length))){L.error("One or more parameters could not be found.","sap.ui.core.theming.Parameters");}M($);f.splice(f.findIndex(S),1);sap.ui.getCore().detachThemeChanged(W);}.bind(this);R=f.findIndex(S);if(R>=0){sap.ui.getCore().detachThemeChanged(f[R].eventHandler);f[R].eventHandler=W;}else{f.push({callback:M,eventHandler:W});}sap.ui.getCore().attachThemeChanged(W);return undefined;}else{L.error("One or more parameters could not be found.","sap.ui.core.theming.Parameters");}}return Q.length===1?X[Q[0]]:X;};P._setOrLoadParameters=function(i){p={"default":{},"scopes":{}};t=sap.ui.getCore().getConfiguration().getTheme();n(function(j){var K=j.substr(13);if(i[K]){e(p["default"],i[K]);}else{x(j);}});};P.reset=function(){var O=arguments[0]===true;if(!O||sap.ui.getCore().getConfiguration().getTheme()!==t){p=null;if(D){document.documentElement.removeChild(D);D=g=undefined;}c.reset();}};P._getThemeImage=function(i,j){i=i||"sapUiGlobalLogo";var K=P.get(i);if(K){var M=r.exec(K);if(M){K=M[1];}else if(K==="''"||K==="none"){K=null;}}if(j&&!K){return sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif');}return K;};return P;},true);