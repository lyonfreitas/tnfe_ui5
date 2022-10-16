// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_ClientSideTargetResolution/VirtualInbounds","sap/base/util/ObjectPath","sap/ui/thirdparty/jquery","sap/base/Log","sap/ushell/utils"],function(v,O,q,L,u){"use strict";var N=function(U,p,a){var A=O.create("config.applications",a);var V=v.getInbounds();b(V,A);function b(V,A){V.forEach(function(i){var I=i.semanticObject+"-"+i.action;A[I]=i.resolutionResult;});}this.resolveHashFragment=function(h){var d=new q.Deferred(),i,r,R,P;if(h&&h.charAt(0)!=="#"){throw new u.Error("Hash fragment expected","sap.ushell.renderers.minimal.Shell");}h=h.substring(1);if(!h&&!A[h]){d.resolve(undefined);}else{L.info("Hash Fragment: "+h);i=h.indexOf("&/");if(i>=0){h=h.slice(0,i);}i=h.indexOf("?");if(i>=0){P=h.slice(i+1);h=h.slice(0,i);}r=A[h];if(r){R={additionalInformation:r.additionalInformation,applicationType:r.applicationType,url:r.url,text:r.text,fullWidth:r.fullWidth};if(P){R.url+=(R.url.indexOf("?")<0)?"?":"&";R.url+=P;}if(r.navigationMode!==undefined){R.navigationMode=r.navigationMode;}d.resolve(R);}else{d.reject("Could not resolve link '"+h+"'");}}return d.promise();};this.getSemanticObjectLinks=function(s,P){var I,r=[],i=0,d=new q.Deferred(),c;if(!s){setTimeout(function(){d.resolve([]);},0);}else{sap.ushell.Container.getServiceAsync("URLParsing").then(function(o){c=o.paramsToString(P);L.info("getSemanticObjectLinks: "+s);for(I in A){if(A.hasOwnProperty(I)&&I.substring(0,I.indexOf("-"))===s){r[i]=A[I];r[i].id=I;r[i].text=r[i].text||r[i].description||"no text";r[i].intent="#"+I;if(c!==""){if(r[i].intent.indexOf("?")!==-1){r[i].intent+="&"+c;}else{r[i].intent+="?"+c;}}i+=1;}}if(r){d.resolve(r);}else{d.reject("Could not get links for  '"+s+"'");}});}return d.promise();};this.isIntentSupported=function(I){var d=new q.Deferred(),s={},D=[],t=this;function c(i,S){s[i]={supported:S};}I.forEach(function(e,i){var o=new q.Deferred();D.push(o.promise());t.resolveHashFragment(e).fail(function(E){c(e,false);o.resolve();}).done(function(f){c(e,true);o.resolve();});});if(I.length>0){q.when.apply(q,D).always(function(){d.resolve(s);});}else{d.resolve(s);}return d.promise();};};return N;},true);
