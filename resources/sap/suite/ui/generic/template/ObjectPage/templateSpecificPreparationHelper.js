sap.ui.define(["sap/base/util/extend","sap/base/util/deepExtend","sap/ui/model/odata/AnnotationHelper","sap/suite/ui/generic/template/js/StableIdHelper","sap/suite/ui/generic/template/js/staticChecksHelper","sap/suite/ui/generic/template/js/preparationHelper","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/suite/ui/generic/template/js/AnnotationHelper"],function(e,d,A,S,s,p,F,a){"use strict";var l=new F("ObjectPage.Component").getLogger();function g(c,m,o,D,L){function G(i,Q){var R=e({},Q);switch(i){case"com.sap.vocabularies.UI.v1.ReferenceFacet":if(!R["com.sap.vocabularies.UI.v1.PartOfPreview"]||R["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool!=="false"){R["com.sap.vocabularies.UI.v1.PartOfPreview"]={Bool:"true"};}break;default:break;}return R;}function f(R){if(!R.getObject().Target){return undefined;}var i=A.resolvePath(m.getContext(R.sPath+"/Target"));return i&&m.getContext(i).getObject();}function E(i){i.subSections=i.subSections||[];if(i.subSections.find(function(Q){return i.additionalData.facetId===Q.additionalData.facetId;})){return;}var Q=e({},i);delete Q.subSections;Q.blocks=[];i.subSections.push(Q);}var M=0;function b(Q,R,T,U){var V=[];var W=["sections","subSections","blocks"];T=T||0;var X=m.getObject(Q);if(!Array.isArray(X)){return[];}X.forEach(function(Y,i){var Z={additionalData:{facetId:S.getStableId({type:"ObjectPage",subType:"Facet",sRecordType:Y.RecordType,bIsHeaderFacet:R,sAnnotationPath:Y.Target&&Y.Target.AnnotationPath,sAnnotationId:Y.ID&&Y.ID.String})},temporaryData:{},annotations:{Facet:{annotation:d({},Y)}},metaModelPath:Q+"/"+i};Z.facetIdAsObject={id:Z.additionalData.facetId};Z.fallbackIdByEnumerationForRuntime=Z.additionalData.facetId||"missingStableId#"+M++;if(Y.RecordType==="com.sap.vocabularies.UI.v1.CollectionFacet"){var $=b(Q+"/"+i+"/Facets",R,T+1,Z);if(T===0&&!Z.subSections&&$.length===0){E(Z);}else{var _=W[T+1]||"unsupportedNestingLevel";Z[_]=Z[_]||[];Z[_]=Z[_].concat($);}}else if(Y.RecordType==="com.sap.vocabularies.UI.v1.ReferenceFacet"){Z.fallbackIdByAnnotationPathForManifest=S.getStableId({type:"ObjectPage",subType:"Facet",sRecordType:Y.RecordType,bIsHeaderFacet:R,sAnnotationPath:Y.Target&&Y.Target.AnnotationPath});Z.annotations.Facet.annotation=G("com.sap.vocabularies.UI.v1.ReferenceFacet",Y);var a1=e({},Z);a1.targetAnnotation=f(m.getContext(Q+"/"+i));var b1;switch(T){case 0:if(Y.Target&&!Y.Target.AnnotationPath){return;}b1=e({},Z);b1.blocks=[a1];Z.subSections=[b1];break;case 1:E(U);b1=U.subSections.find(function(b1){return b1.additionalData.facetId===U.additionalData.facetId;});b1.blocks.push(a1);return;case 2:Z.targetAnnotation=a1.targetAnnotation;U.temporaryData.potentiallySeparateForms=true;break;default:l.warning("UnSupported Nesting of Collectionfacets");break;}}else{l.warning("UnSupported Facet annotation record type: "+Y.RecordType);return;}V.push(Z);});return V;}var t={};function h(i,Q){if(!t[i.entityType]){t[i.entityType]=p.getTargetEntityForQuickView(m,i);}}h(m.getODataEntitySet(L));function j(i){i.multiSelect=i.multiSelect||i.allTableMultiSelect;var T=A.gotoEntitySet(m.getContext(i.metaModelPath+"/Target"));var Q=T&&m.getObject(T).name||L;var R=c.getControllerExtensions();var U=R&&R.Sections&&R.Sections[i.additionalData.facetId]&&R.Sections[i.additionalData.facetId].Actions;var V=p.getNormalizedTableSettings(m,i,D,Q,U,i.targetAnnotation);V.variantManagement=!!(i.tableSettings&&i.tableSettings.variantManagement);V.selectAll=i.tableSettings&&i.tableSettings.selectAll===false?false:true;if(V.onlyForDelete){V.mode=c.isDraftEnabled()?"{= ${ui>/editable} ? '"+V.mode+"' : 'None'}":"{= ${ui>/editable} ? 'None' : '"+V.mode+"'}";}var W=m.getODataEntitySet(Q);if(V&&V.createWithParameterDialog&&V.createWithParameterDialog.fields){s.checkErrorforCreateWithDialog(m.getODataEntityType(W.entityType),V);V.createWithParameterDialog.id=S.getStableId({type:'ObjectPageAction',subType:'CreateWithDialog',sFacet:i.additionalData.facetId});}h(W);V.bExportToExcel=k(i,W,V.type);return V;}function k(i,Q,T){if(i.createMode!=="inline"){return false;}if(!c.isDraftEnabled()){return false;}var R,U,V;var W=m.getODataEntityType(Q.entityType)&&m.getODataEntityType(Q.entityType)["sap:semantics"];if(T==='TreeTable'||(T==='AnalyticalTable'&&W==="aggregate")){return false;}var X=m.getODataEntitySet(L);var Y=a.handleNavigationRestrictions(m,X,Q,'Insertable');if(Y){R=Y['Insertable'];U=X.entityType;}else{V=Q['Org.OData.Capabilities.V1.InsertRestrictions'];R=V&&V['Insertable'];U=Q.entityType;}if(!R){return true;}var Z=R.Bool?!R.Path:!!(R.Path&&a._isPropertyPathBoolean(m,U,R.Path));if(!Z){l.error("Service Broken: Restrictions annotations for entity type "+Q.entityType+" for section Insertable are invalid.");}if(R.Bool==="false"){return false;}return Z;}function n(i){return{variantManagement:!!(i.chartSettings&&i.chartSettings.variantManagement),chartTitle:i.targetAnnotation&&i.targetAnnotation.Title};}function I(i){return i.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAction"||i.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";}function N(T){return!T.apply(this,Array.prototype.slice.apply(arguments,[1]));}function q(i){var Q=o.sections&&e({},o.sections[i.additionalData.facetId],o.sections[i.fallbackIdByAnnotationPathForManifest]);e(i,Q,i);if(i.targetAnnotation){var R=d({},o,i);switch(i.additionalData.type){case"SmartTable":i.tableSettings=j(R);break;case"SmartChart":i.chartSettings=n(R);break;case"SmartForm":i.temporaryData.content=Array.isArray(i.targetAnnotation)?i.targetAnnotation.filter(N.bind(null,I)):i.targetAnnotation.Data;break;default:break;}}}function r(i){if(i.blocks.length===1&&i.blocks[0].targetAnnotation){var Q=i.blocks[0];var R=Q.annotations.Facet.annotation.Target.AnnotationPath.split("@")[1].split("#")[0];var T=i.annotations.Facet.annotation.Label&&i.annotations.Facet.annotation.Label.String;switch(R){case"com.sap.vocabularies.UI.v1.LineItem":return T!==(Q.tableSettings.headerInfo&&Q.tableSettings.headerInfo.TypeNamePlural&&Q.tableSettings.headerInfo.TypeNamePlural.String);case"com.sap.vocabularies.UI.v1.Chart":return T!==(Q.chartSettings.chartTitle&&Q.chartSettings.chartTitle.String);default:return true;}}return true;}function u(i,Q){var R={BeforeFacet:{withKey:{section:{type:"ObjectPageSection",subType:"BeforeFacetExtensionSectionWithKey"},subSection:{type:"ObjectPageSection",subType:"BeforeFacetExtensionSubSectionWithKey"}},withoutKey:{section:{type:"ObjectPageSection",subType:"BeforeFacetExtensionSection"},subSection:{type:"ObjectPageSection",subType:"BeforeFacetExtensionSubSection"}}},AfterFacet:{withKey:{section:{type:"ObjectPageSection",subType:"AfterFacetExtensionSectionWithKey"},subSection:{type:"ObjectPageSection",subType:"AfterFacetExtensionSubSectionWithKey"}},withoutKey:{section:{type:"ObjectPageSection",subType:"AfterFacetExtensionSection"},subSection:{type:"ObjectPageSection",subType:"AfterFacetExtensionSubSection"}}}};var T=R[i][Q.sKey?"withKey":"withoutKey"];var U=e({},T.section);U.sEntitySet=Q.sEntitySet;U.sFacet=Q.sFacetId;U.sFacetExtensionKey=Q.oExtensionDefinition.key||Q.sKey;var V=S.getStableId(U);U.type=T.subSection.type;U.subType=T.subSection.subType;var W=S.getStableId(U);return{id:V,additionalData:{facetId:Q.sFacetId},extensionPointName:Q.sExtensionPointName,extensionPointNamePrefix:Q.sExtensionPointNamePrefix,subSections:[{id:W,additionalData:{facetId:Q.sFacetId},temporaryData:{},extensionPointName:Q.sExtensionPointName,extensionPointNamePrefix:Q.sExtensionPointNamePrefix,blocks:[]}]};}function v(){var V=c.getViewExtensions()||{};return Object.keys(V).map(function(i){var Q=i.split("|");return{sExtensionPointNamePrefix:Q[0],sEntitySet:Q[1],sFacetId:Q[2],sKey:Q[3],oExtensionDefinition:V[i],sExtensionPointName:i};}).filter(function(i){return i.sEntitySet===L;});}function w(i){var Q=c.getControllerExtensions();return Q&&Q.Sections&&Q.Sections[i]&&Q.Sections[i].Actions;}function x(i){var V=v();var R=[];i.forEach(function(Q){var T=V.filter(function(W){return W.sFacetId===Q.additionalData.facetId&&W.sExtensionPointNamePrefix==="BeforeFacet";});var U=V.filter(function(W){return W.sFacetId===Q.additionalData.facetId&&W.sExtensionPointNamePrefix==="AfterFacet";});R=R.concat(T.map(u.bind(null,"BeforeFacet")));R.push(Q);R=R.concat(U.map(u.bind(null,"AfterFacet")));});return R;}function y(i){var V=v();var Q=V.find(function(R){return R.sFacetId===i.additionalData.facetId&&R.sExtensionPointNamePrefix==="SmartFormExtension";});if(Q){i.extensionPointName=Q.sExtensionPointName;i.extensionPointNamePrefix="SmartFormExtension";i.additionalData.type=i.additionalData.type||"SmartForm";}}function z(i){var T=i.annotations.Facet.annotation.Target&&i.annotations.Facet.annotation.Target.AnnotationPath&&i.annotations.Facet.annotation.Target.AnnotationPath.split("@")[1];T=T&&T.split("#")[0];switch(T){case"com.sap.vocabularies.UI.v1.FieldGroup":case"com.sap.vocabularies.UI.v1.Identification":i.additionalData.type="SmartForm";break;case"com.sap.vocabularies.UI.v1.LineItem":i.additionalData.type="SmartTable";break;case"com.sap.vocabularies.UI.v1.Chart":i.additionalData.type="SmartChart";break;case"com.sap.vocabularies.Communication.v1.Address":i.additionalData.type="Address";break;case"com.sap.vocabularies.Communication.v1.Contact":i.additionalData.type="Contact";break;default:}q(i);y(i);}function B(i){if(i.annotations.Facet.annotation.RecordType!=="com.sap.vocabularies.UI.v1.ReferenceFacet"){return false;}switch(i.additionalData.type){case"SmartForm":if(i.extensionPointName){return true;}if(!i.targetAnnotation||!i.temporaryData.content){return false;}return i.temporaryData.content.find(function(Q){return(Q.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForAction"&&Q.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation");});case"SmartTable":case"SmartChart":return i.targetAnnotation||A.isMultiple(m.getContext(i.metaModelPath+"/Target"));default:return i.targetAnnotation;}}function P(i){return i.additionalData.type==="SmartForm";}function C(i){q(i);i.blocks.forEach(z);i.actions=[];i.blocks.forEach(function(T){if(T.additionalData.type==="SmartForm"){var U=w(T.additionalData.facetId);if(U){Object.values(U).forEach(function(X){i.actions.push({id:S.getStableId({type:"ObjectPageAction",subType:"ExtensionAction",sAction:X.id}),text:X.text,press:X.press});});}}if(!T.targetAnnotation||!T.temporaryData.content){return;}var V=A.resolvePath(m.getContext(T.metaModelPath+"/Target"));var W=V+(T.targetAnnotation.Data?"/Data/":"/");T.temporaryData.content.forEach(function(X,Y){if(!X||!X.Action||(X.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForAction"&&X.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation")){return;}var Z=S.getStableId({type:"ObjectPage",subType:"DataField",sRecordType:X.RecordType,sSemanticObject:X.SemanticObject&&(X.SemanticObject.String||X.SemanticObject.Path),sAction:X.Action&&(X.Action.String||X.Action.Path)});var $="._templateEventHandlers.";if(X.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAction"){var _=[];_.push("'"+A.format(m.getContext(W+Y+"/Action"))+"'");_.push("${$source>/text}");var a1=(X.InvocationGrouping&&X.InvocationGrouping.EnumMember)||"";_.push("'"+a1+"'");$+="onCallAction("+_.join(", ")+")";}else{$+="onDataFieldForIntentBasedNavigation";var b1={semanticObject:A.format(m.getContext(W+Y+"/SemanticObject")),action:A.format(m.getContext(W+Y+"/Action"))};}i.actions.push({id:S.getStableId({type:"ObjectPageAction",subType:"AnnotatedAction",sFacet:T.additionalData.facetId,sDataField:Z}),press:$,semanticObject:b1&&b1.semanticObject,action:b1&&b1.action,metaModelPath:W+Y});});});i.blocks=i.blocks.filter(B);if(i.temporaryData.potentiallySeparateForms&&!i.blocks.every(P)){i.blocks=i.blocks.map(function(T){if(P(T)){return{additionalData:{type:T.additionalData.type,facetId:T.additionalData.facetId},metaModelPath:T.metaModelPath,controlProperties:{id:S.getStableId({type:"ObjectPageSection",subType:"SmartForm",sFacet:T.additionalData.facetId,sIsPartOfPreview:T.annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool})},aggregations:{groups:[T]}};}else{return T;}});i.moreBlocks=i.blocks.filter(function(T){if(T.additionalData.type==="SmartForm"){return T.aggregations.groups[0].annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="false";}else{return T.annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="false";}});i.blocks=i.blocks.filter(function(T){if(T.additionalData.type==="SmartForm"){return T.aggregations.groups[0].annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="true";}else{return T.annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="true";}});}else{var Q={additionalData:{type:"SmartForm",facetId:i.additionalData.facetId},controlProperties:{id:S.getStableId({type:"ObjectPageSection",subType:"SmartForm",sFacet:i.additionalData.facetId,sIsPartOfPreview:"true"})},aggregations:{groups:i.blocks.filter(function(T){return P(T)&&T.annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="true";})}};var R={additionalData:{type:"SmartForm",facetId:i.additionalData.facetId},controlProperties:{id:S.getStableId({type:"ObjectPageSection",subType:"SmartForm",sFacet:i.additionalData.facetId,sIsPartOfPreview:"false"})},aggregations:{groups:i.blocks.filter(function(T){return P(T)&&T.annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="false";})}};i.moreBlocks=i.blocks.filter(function(T){return!P(T)&&T.annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="false";});i.blocks=i.blocks.filter(function(T){return!P(T)&&T.annotations.Facet.annotation["com.sap.vocabularies.UI.v1.PartOfPreview"].Bool==="true";});if(Q.aggregations.groups.length>0){i.blocks.unshift(Q);}if(R.aggregations.groups.length>0){i.moreBlocks.unshift(R);}}i.bShowTitle=r(i);}function H(){return true;}function J(i){q(i);i.subSections.forEach(C);i.subSections=i.subSections.filter(H);}function K(){return true;}function O(){var i=m.getMetaContext("/"+L).getPath();var Q=b(i+"/com.sap.vocabularies.UI.v1.Facets",false);var R=x(Q);R.forEach(J);return R.filter(K);}return{sections:O(),breadCrumb:c.getBreadCrumbInfo(),isSelflinkRequired:true,isIndicatorRequired:true,isSemanticallyConnected:false,targetEntities:t};}return{getTemplateSpecificParameters:g};});