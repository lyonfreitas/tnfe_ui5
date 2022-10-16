/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["./Table","./Chart","sap/fe/core/converters/helpers/IssueManager","../../ManifestSettings"],function(T,C,I,M){"use strict";var _={};var a=M.TemplateType;var b=I.IssueCategory;var c=I.IssueSeverity;var d=I.IssueType;var e=C.createChartVisualization;var f=T.createTableVisualization;var g=T.createDefaultTableVisualization;var h=function(r,v,s){var t=[];var u=r.Visualizations||[];var w=v.split("@")[0];if(u){var x=false;var y=false;var z=false;var A=s.getManifestWrapper().hasMultipleVisualizations()||s.getTemplateType()===a.AnalyticalListPage;u.forEach(function(B){switch(B.$target.term){case"com.sap.vocabularies.UI.v1.LineItem":if(!x&&(A||!z)){t.push({visualization:B.$target,annotationPath:"".concat(w).concat(B.value),converterContext:s});x=true;z=true;}break;case"com.sap.vocabularies.UI.v1.Chart":if(!y&&(A||!z)){t.push({visualization:B.$target,annotationPath:"".concat(w).concat(B.value),converterContext:s});y=true;z=true;}break;default:break;}});}return t;};function i(r,s,t){if(s){var u=t.getEntityTypeAnnotation(s);var v=u.annotation;if(v){if(v.term==="com.sap.vocabularies.UI.v1.SelectionPresentationVariant"){return v;}}else{throw new Error("Annotation Path for the SPV mentioned in the manifest is not found, Please add the SPV in the annotation");}}else{var w,x;return(w=r.annotations)===null||w===void 0?void 0:(x=w.UI)===null||x===void 0?void 0:x.SelectionPresentationVariant;}}_.getSelectionPresentationVariant=i;function j(S,r){var s=S&&S.PresentationVariant;if(s){return k(s,r);}else{throw new Error("Presentation Variant is not present in the SPV annotation");}}_.isSelectionPresentationCompliant=j;function k(r,s){var H=false,t=false;if(s){if(r&&r.Visualizations){var v=r.Visualizations;v.map(function(V){if(V.$target.term==="com.sap.vocabularies.UI.v1.LineItem"){H=true;}if(V.$target.term==="com.sap.vocabularies.UI.v1.Chart"){t=true;}});}return t&&H;}else{return r&&r.Visualizations&&!!r.Visualizations.find(function(u){return u.$target.term==="com.sap.vocabularies.UI.v1.LineItem"||u.$target.term==="com.sap.vocabularies.UI.v1.Chart";});}}_.isPresentationCompliant=k;function l(r){var s;return(s=r.annotations.UI)===null||s===void 0?void 0:s.LineItem;}_.getDefaultLineItem=l;function m(r){var s;return(s=r.annotations.UI)===null||s===void 0?void 0:s.Chart;}_.getDefaultChart=m;function n(r){var s,t;return(s=r.annotations)===null||s===void 0?void 0:(t=s.UI)===null||t===void 0?void 0:t.PresentationVariant;}_.getDefaultPresentationVariant=n;function o(r){var s,t;return(s=r.annotations)===null||s===void 0?void 0:(t=s.UI)===null||t===void 0?void 0:t.SelectionVariant;}_.getDefaultSelectionVariant=o;function p(r,s){var t=s.getManifestWrapper().getDefaultTemplateAnnotationPath();var u=i(r,t,s);var v;if(u){var w=u.SelectionVariant;if(w){return w;}}else{v=o(r);return v;}}_.getSelectionVariant=p;function q(v,r,s,t,u){var w=s.getEntityTypeAnnotation(v);var x=w.annotation;s=w.converterContext;var y=[];var z;var A="";var B,D;var E=x===null||x===void 0?void 0:x.term;if(E){switch(E){case"com.sap.vocabularies.UI.v1.LineItem":case"com.sap.vocabularies.UI.v1.Chart":y.push({visualization:x,annotationPath:v,converterContext:s});break;case"com.sap.vocabularies.UI.v1.PresentationVariant":z=x;y=y.concat(h(x,v,s));break;case"com.sap.vocabularies.UI.v1.SelectionPresentationVariant":z=x.PresentationVariant;A=z.fullyQualifiedName;if(!k(z)){var F=s.getEntityType();var G=l(F);if(G){y.push({visualization:G,annotationPath:s.getRelativeAnnotationPath(G.fullyQualifiedName,F),converterContext:s});}}else{y=y.concat(h(z,v,s));}break;default:break;}y.map(function(H){var x=H.visualization,J=H.annotationPath,s=H.converterContext;switch(x.term){case"com.sap.vocabularies.UI.v1.Chart":B=e(x,J,s,u);break;case"com.sap.vocabularies.UI.v1.LineItem":default:D=f(x,J,s,z,r,t);break;}});}else{D=g(s);s.getDiagnostics().addIssue(b.Annotation,c.Medium,d.MISSING_LINEITEM);}var V=[];var P=E==="com.sap.vocabularies.UI.v1.SelectionPresentationVariant"?A:x&&x.fullyQualifiedName;if(P===undefined){P="/";}if(B){V.push(B);}if(D){V.push(D);}return{visualizations:V,annotationPath:s.getEntitySetBasedAnnotationPath(P)};}_.getDataVisualizationConfiguration=q;return _;},false);