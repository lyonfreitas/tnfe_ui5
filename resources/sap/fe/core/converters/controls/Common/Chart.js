/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings","sap/fe/core/converters/controls/Common/Action","sap/fe/core/converters/annotations/DataField","../../helpers/ID","sap/fe/core/converters/helpers/ConfigurableObject","sap/fe/core/converters/helpers/Key","sap/fe/core/templating/DataModelPathHelper","../../helpers/Aggregation"],function(M,A,D,I,C,K,a,b){"use strict";var _={};var c=b.AggregationHelper;var g=a.getTargetObjectPath;var d=K.KeyHelper;var e=C.insertCustomElements;var F=I.FilterBarID;var f=I.ChartID;var h=D.isDataFieldForActionAbstract;var j=A.getActionsFromManifest;var T=M.TemplateType;var k=M.ActionType;var V=M.VisualizationType;function l(n,i){return s(n)||r(n,i)||p(n,i)||m();}function m(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function p(o,i){if(!o)return;if(typeof o==="string")return q(o,i);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return q(o,i);}function q(n,o){if(o==null||o>n.length)o=n.length;for(var i=0,x=new Array(o);i<o;i++){x[i]=n[i];}return x;}function r(n,i){var o=n==null?null:typeof Symbol!=="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(o==null)return;var x=[];var y=true;var z=false;var B,E;try{for(o=o.call(n);!(y=(B=o.next()).done);y=true){x.push(B.value);if(i&&x.length===i)break;}}catch(G){z=true;E=G;}finally{try{if(!y&&o["return"]!=null)o["return"]();}finally{if(z)throw E;}}return x;}function s(i){if(Array.isArray(i))return i;}function t(i,n,o){var x=[];if(i){var y=i.Actions||[];y.forEach(function(z){var B,E,G,H;var J;if(h(z)&&!(((B=z.annotations)===null||B===void 0?void 0:(E=B.UI)===null||E===void 0?void 0:(G=E.Hidden)===null||G===void 0?void 0:G.valueOf())===true)&&!z.Inline&&!z.Determining&&!(z!==null&&z!==void 0&&(H=z.ActionTarget)!==null&&H!==void 0&&H.isBound)){var L=d.generateKeyFromDataField(z);switch(z.$Type){case"com.sap.vocabularies.UI.v1.DataFieldForAction":J={type:k.DataFieldForAction,annotationPath:o.getEntitySetBasedAnnotationPath(z.fullyQualifiedName),key:L};break;case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":J={type:k.DataFieldForIntentBasedNavigation,annotationPath:o.getEntitySetBasedAnnotationPath(z.fullyQualifiedName),key:L};break;}}if(J){x.push(J);}});}return x;}function u(i,n,o){var x=t(i,n,o);return e(x,j(o.getManifestControlConfiguration(n).actions,o,x),{enableOnSelect:"overwrite",enabled:"overwrite"});}_.getChartActions=u;function v(i,n){var o;var x=n.getManifestWrapper();var y=n.getManifestControlConfiguration(i);var z=["Page","Control"].indexOf(x.getVariantManagement())>-1;var B=true;var P=[];if((y===null||y===void 0?void 0:(o=y.chartSettings)===null||o===void 0?void 0:o.personalization)!==undefined){B=y.chartSettings.personalization;}if(z&&B){if(B===true){return"Sort,Type,Item";}else if(typeof B==="object"){if(B.type){P.push("Type");}if(B.item){P.push("Item");}if(B.sort){P.push("Sort");}return P.join(",");}}return undefined;}_.getP13nMode=v;function w(n,o,x,y){var z,B,E,G;var H=new c(x.getEntityType(),x);if(!y&&!H.isAnalyticsSupported()){throw new Error("ApplySupported is not added to the annotations");}var J=(z=x.getEntityType().annotations.Analytics)===null||z===void 0?void 0:z.AggregatedProperties;var L={};for(var i=0;J&&i<J.length;i++){var N,O,P;L[J[i].Name]={label:(N=J[i])===null||N===void 0?void 0:(O=N.annotations)===null||O===void 0?void 0:(P=O.Common)===null||P===void 0?void 0:P.Label};}var Q=H.getCustomAggregateDefinitions();var R={};if(Q){for(var S=0;S<Q.length;S++){var U,W;var X=(U=Q[S].annotations)===null||U===void 0?void 0:(W=U.Aggregation)===null||W===void 0?void 0:W.ContextDefiningProperties;R[Q[S].qualifier]={name:Q[S].qualifier,label:"Custom Aggregate ("+Q[S].qualifier+")",sortable:true,sortOrder:"both",contextDefiningProperty:X?X.map(function(z1){return z1.value;}):[]};}}var Y=H.getTransAggregations()[0];var Z={};if(Y){for(var $=0;$<Y.length;$++){Z[Y[$].Name]={name:Y[$].Name,propertyPath:Y[$].AggregatableProperty.valueOf().value,aggregationMethod:Y[$].AggregationMethod,label:Y[$].Name in L?L[Y[$].Name].label:"Aggregatable property ("+Y[$].Name+")",sortable:true,sortOrder:"both",custom:false};}}var a1=H.getAggregatableProperties();var b1=H.getGroupableProperties();var c1={};c1.$Type="Org.OData.Aggregation.V1.ApplySupportedType";c1.AggregatableProperties=[];c1.GroupableProperties=[];for(var d1=0;a1&&d1<a1.length;d1++){var e1,f1,g1;var h1={$Type:(e1=a1[d1])===null||e1===void 0?void 0:e1.$Type,Property:{$PropertyPath:(f1=a1[d1])===null||f1===void 0?void 0:(g1=f1.Property)===null||g1===void 0?void 0:g1.value}};c1.AggregatableProperties.push(h1);}for(var i1=0;b1&&i1<b1.length;i1++){var j1;var k1={$PropertyPath:(j1=b1[i1])===null||j1===void 0?void 0:j1.value};c1.GroupableProperties.push(k1);}var l1=u(n,o,x);var m1=o.split("@"),n1=l(m1,1),o1=n1[0];if(o1.lastIndexOf("/")===o1.length-1){o1=o1.substr(0,o1.length-1);}var p1=(B=x.getDataModelObjectPath().targetEntityType.annotations)===null||B===void 0?void 0:(E=B.UI)===null||E===void 0?void 0:(G=E.HeaderInfo)===null||G===void 0?void 0:G.TypeNamePlural;var q1=x.getDataModelObjectPath();var r1=o1.length===0;var s1=q1.targetEntitySet?q1.targetEntitySet.name:q1.startingEntitySet.name;var t1=r1?F(x.getContextPath()):undefined;var u1={"legendGroup":{"layout":{"position":"bottom"}}};var v1;if(x.getTemplateType()===T.ObjectPage){v1=true;}else if(x.getTemplateType()===T.ListReport||x.getTemplateType()===T.AnalyticalListPage){v1=false;}var w1=x.getManifestWrapper().hasMultipleVisualizations()||x.getTemplateType()==="AnalyticalListPage";var x1=w1?".handlers.onSegmentedButtonPressed":"";var y1=w1?"{= ${pageInternal>alpContentView} !== 'Table'}":"true";return{type:V.Chart,id:f(r1?s1:o1,V.Chart),collection:g(x.getDataModelObjectPath()),entityName:s1,personalization:v(o,x),navigationPath:o1,annotationPath:x.getAbsoluteAnnotationPath(o),filterId:t1,vizProperties:JSON.stringify(u1),actions:l1,title:p1,autoBindOnInit:v1,onSegmentedButtonPressed:x1,visible:y1,customAgg:R,transAgg:Z,applySupported:c1};}_.createChartVisualization=w;return _;},false);