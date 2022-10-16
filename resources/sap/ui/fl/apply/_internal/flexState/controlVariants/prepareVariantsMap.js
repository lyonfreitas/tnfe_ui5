/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/ObjectPath","sap/base/Log","sap/ui/fl/Change","sap/base/util/includes","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/base/util/isEmptyObject","sap/base/util/each","sap/base/util/values","sap/base/util/merge","sap/ui/fl/LayerUtils"],function(O,L,C,i,V,a,e,v,m,b){"use strict";function c(z,A){var B=m({},z);A.forEach(function(D){B[D.fileName]={content:D,controlChanges:[],variantChanges:{}};});return B;}function d(z,A){var B=m({},z);A.forEach(function(D){var E=new C(D);E.setState(C.states.PERSISTED);B[D.variantReference]=B[D.variantReference]||s(D.variantReference);B[D.variantReference].controlChanges.push(E);});return B;}function f(z,A){var B=m({},z);A.forEach(function(D){B[D.selector.id]=B[D.selector.id]||s(D.selector.id);var E=B[D.selector.id].variantChanges[D.changeType]||[];E.push(D);B[D.selector.id].variantChanges[D.changeType]=E;});return B;}function g(z){var A=m({},z);v(z).forEach(function(B){var S=O.get("variantChanges.setVisible",B);if(S&&S.length>0){var D=w(S);if(!D.getContent().visible&&D.getContent().createdByReset){delete A[B.content.fileName];}}});return A;}function r(z){var A=m({},z);v(A).forEach(function(B){var D=B.content.variantReference;var R;if(D){R=j(A,D,B.content.variantManagementReference);}B.controlChanges=h(R,B.content.layer).concat(B.controlChanges);});return A;}function h(R,z){if(!R){return[];}return v(m({},R.controlChanges)).filter(function(A){return b.compareAgainstCurrentLayer(A.getLayer(),z)===-1;});}function j(z,A,B){var R=z[A];if(!R&&A===B){R=s(A);z[A]=R;}return R;}function k(S){var z={};z=c(z,S.variants);z=d(z,S.variantDependentControlChanges);z=f(z,S.variantChanges);z=g(z);z=r(z);return z;}function l(){return{variantManagementChanges:{},variants:[]};}function n(R,z,T){var A=m({},R);v(z).forEach(function(B){var D=B.content.variantManagementReference;if(!A[D]){A[D]=l();}B=y(B);B=u(B);if(!A[D].currentVariant&&B.content.content.visible&&i(T,B.content.fileName)){A[D].currentVariant=B.content.fileName;}A[D].defaultVariant=D;var S=V.getIndexToSortVariant(A[D].variants,B);A[D].variants.splice(S,0,B);});return A;}function o(R,z){var A=m({},R);z.forEach(function(B){var D=B.selector.id;if(!A[D]){A[D]=l();}var E=B.changeType;if(!A[D].variantManagementChanges[E]){A[D].variantManagementChanges[E]=[];}A[D].variantManagementChanges[E].push(B);A[D]=t(A[D]);});return A;}function p(R){var z=m({},R);e(z,function(A,B){var S=B.variants.findIndex(function(E){return E.content.fileName===A;});var D;if(S===-1){D=s(A);}else{D=B.variants[S];B.variants.splice(S,1);}B.variants.unshift(D);});return z;}function q(z,A,T){var R={};R=n(R,z,T);R=o(R,A);R=p(R);return R;}function s(z){var R=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");return{content:{fileName:z,variantManagementReference:z,variantReference:"",content:{title:R.getText("STANDARD_VARIANT_TITLE"),favorite:true,visible:true},support:{user:V.DEFAULT_AUTHOR}},variantChanges:{},controlChanges:[]};}function t(z){var A=m({},z);var B=A.variantManagementChanges;var D;if(!a(B)){D=w(B["setDefault"]);if(D){A.defaultVariant=D.getContent().defaultVariant;}}return A;}function u(z){var A=m({},z);var B=A.variantChanges;var D;e(B,function(E,F){switch(E){case"setTitle":D=w(F);if(D){A.content.content.title=D.getText("title");}break;case"setFavorite":D=w(F);if(D){A.content.content.favorite=D.getContent().favorite;}break;case"setExecuteOnSelect":D=w(F);if(D){A.content.content.executeOnSelect=D.getContent().executeOnSelect;}break;case"setVisible":D=w(F);if(D){A.content.content.visible=D.getContent().visible;}break;default:L.error("No valid changes on variant "+A.content.content.title+" available");}});return A;}function w(z){if(z.length>0){return new C(z[z.length-1]);}return false;}function x(T){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl").getText(T);}function y(z){var A=m({},z);if(A.content.fileName===A.content.variantManagementReference){if(!O.get("content.support.user",A)){var S={support:{user:V.DEFAULT_AUTHOR}};m(A.content,S);}}if(!A.content.content.favorite){A.content.content.favorite=true;}if(!A.content.content.visible){A.content.content.visible=true;}if(!A.content.content.executeOnSelect){A.content.content.executeOnSelect=false;}var T=A.content.content.title.match(/.i18n>(\w+)./);if(T){A.content.content.title=x(T[1]);}return A;}return function(P){if(a(P)||!O.get("storageResponse.changes.variants",P)){return{};}var T=O.get(["technicalParameters",V.VARIANT_TECHNICAL_PARAMETER],P.componentData)||[];var z=k(P.storageResponse.changes);z=q(z,P.storageResponse.changes.variantManagementChanges,T);return z;};});
