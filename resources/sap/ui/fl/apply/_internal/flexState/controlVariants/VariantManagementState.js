/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_omit","sap/base/util/restricted/_pick","sap/base/util/includes","sap/base/util/isEmptyObject","sap/base/util/ObjectPath","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/Change","sap/ui/fl/LayerUtils","sap/ui/fl/Utils","sap/ui/fl/Variant"],function(_,a,i,b,O,L,J,V,S,F,C,c,U,d){"use strict";var e={};function g(p){var r=[];if(p.variantData.content.variantReference){r=e.getControlChangesForVariant(Object.assign(p,{vReference:p.variantData.content.variantReference,changeInstance:true}));return r.filter(function(R){return c.compareAgainstCurrentLayer(R.getDefinition().layer,p.variantData.content.layer)===-1;});}return r;}function f(p){var v=e.getContent(p.reference);var m=O.get([p.vmReference,"variants"],v);return m||[];}function h(v,o,A){var s=o.changeType;if(!v){v={};}if(!v[s]){v[s]=[];}if(A){v[s].push(o);return true;}return v[s].some(function(E,I){if(E.fileName===o.fileName){v[s].splice(I,1);return true;}});}function j(o,m){var s=l(o);m[s].push(o);}function k(o,m){var s=l(o);var n=-1;m[s].some(function(E,I){if(E.fileName===o.fileName){n=I;return true;}});if(n>-1){m[s].splice(n,1);}}function l(o){switch(o.fileType){case"change":return"variantDependentControlChanges";case"ctrl_variant":return"variants";case"ctrl_variant_change":return"variantChanges";case"ctrl_variant_management_change":return"variantManagementChanges";default:}}e.getContent=function(r){return F.getVariantsState(r);};e.addFakeStandardVariant=function(r,s,o){F.setFakeStandardVariant(r,s,o);};e.clearFakedStandardVariants=function(r,s){F.resetFakedStandardVariants(r,s);};e.resetContent=function(r,s){F.clearFilteredResponse(r,s);};e.getControlChangesForVariant=function(p){var r=[];var v=e.getVariant(p);if(v){r=v.controlChanges.filter(function(o){return(p.includeDirtyChanges!==false||o.getState()===C.states.PERSISTED);});if(!p.changeInstance){r=r.map(function(o){return o.getDefinition();});}}return r;};e.getVariantChangesForVariant=function(p){var v=e.getVariant(p);return v&&v.variantChanges||{};};e.getVariant=function(p){var v;var o=e.getContent(p.reference);p.vReference=p.vReference||o[p.vmReference].defaultVariant;var m=f(p);m.some(function(n){if(n.content.fileName===p.vReference){v=n;return true;}});return v;};e.getCurrentVariantReference=function(p){var v=e.getContent(p.reference);var o=v[p.vmReference];return o.currentVariant||o.defaultVariant;};e.getVariantManagementReferences=function(r){var v=e.getContent(r);return Object.keys(v);};e.addVariantToVariantManagement=function(p){var v=e.getContent(p.reference);var m=v[p.vmReference].variants.slice().splice(1);var I=V.getIndexToSortVariant(m,p.variantData);if(p.variantData.content.variantReference){var r=g(p);p.variantData.controlChanges=r.concat(p.variantData.controlChanges);}v[p.vmReference].variants.splice(I+1,0,p.variantData);return I+1;};e.removeVariantFromVariantManagement=function(p){var I;var v=e.getContent(p.reference);var m=v[p.vmReference].variants.some(function(o,n){var q=new d(o);if(q.getId()===p.variant.getId()){I=n;return true;}});if(m){v[p.vmReference].variants.splice(I,1);}return I;};e.setVariantData=function(p){var v=e.getContent(p.reference);var m=v[p.vmReference].variants;var o=m[p.previousIndex];Object.keys(p.variantData).forEach(function(P){if(o.content.content[P]){o.content.content[P]=p.variantData[P];}});if(o.content.fileName!==p.vmReference){m.splice(p.previousIndex,1);var s=V.getIndexToSortVariant(m.slice(1),o);m.splice(s+1,0,o);return s+1;}m.splice(p.previousIndex,1,o);return p.previousIndex;};e.addChangeToVariant=function(p){var E=e.getControlChangesForVariant(Object.assign(p,{changeInstance:true}));var m=E.map(function(o){return o.getDefinition().fileName;});if(!i(m,p.change.getDefinition().fileName)){var v=e.getVariant(p);v.controlChanges=E.concat([p.change]);return true;}return false;};e.removeChangeFromVariant=function(p){var m=e.getControlChangesForVariant(Object.assign(p,{changeInstance:true}));var v=e.getVariant(p);var n=false;if(v){v.controlChanges=m.filter(function(o){if(!n&&o.getId()===p.change.getId()){n=true;return false;}return true;});}return n;};e.getInitialChanges=function(p){var v=e.getContent(p.reference);return Object.keys(v).reduce(function(I,s){if((p.vmReference&&p.vmReference===s)||!p.vmReference){var m=v[s].currentVariant?"currentVariant":"defaultVariant";var A=Object.assign({},p,{vmReference:s,vReference:v[s][m],includeDirtyChanges:false});return I.concat(e.getControlChangesForVariant(A));}return I;},[]);};e.fillVariantModel=function(p){var v=e.getContent(p.reference);return Object.keys(v).reduce(function(o,s){o[s]={defaultVariant:v[s].defaultVariant,variants:[]};if(v[s].currentVariant){o[s].currentVariant=v[s].currentVariant;}f(Object.assign(p,{vmReference:s})).forEach(function(m,n){o[s].variants[n]=JSON.parse(JSON.stringify({key:m.content.fileName,title:m.content.content.title,layer:m.content.layer,favorite:m.content.content.favorite,executeOnSelect:m.content.content.executeOnSelect,visible:m.content.content.visible,author:O.get("content.support.user",m)}));});return o;},{});};e.updateChangesForVariantManagementInMap=function(p){var v=e.getContent(p.reference);var o=v[p.vmReference];if(p.changeContent.fileType==="ctrl_variant_change"){o.variants.some(function(m){if(m.content.fileName===p.changeContent.selector.id){h(m.variantChanges,p.changeContent,p.add);}});}else if(p.changeContent.fileType==="ctrl_variant_management_change"){h(o.variantManagementChanges,p.changeContent,p.add);}};e.setCurrentVariant=function(p){var v=e.getContent(p.reference);if(O.get([p.vmReference],v)){v[p.vmReference].currentVariant=p.newVReference;}};e.updateVariantsState=function(p){var v=e.getContent(p.reference);if(b(v)){L.error("Variant state is not initialized yet");return;}var o=F.getFlexObjectsFromStorageResponse(p.reference);if(p.changeToBeAddedOrDeleted){switch(p.changeToBeAddedOrDeleted.getState()){case S.NEW:j(p.changeToBeAddedOrDeleted.getDefinition(),o);break;case S.DELETE:k(p.changeToBeAddedOrDeleted.getDefinition(),o);break;default:}}};e.waitForInitialVariantChanges=function(p){var m=e.getInitialChanges({vmReference:p.vmReference,reference:p.reference,changeInstance:true});var s=m.reduce(function(o,q){if(U.indexOfObject(o,q.getSelector())===-1){o.push(q.getSelector());}return o;},[]);var n=[];s.map(function(o){var q=J.bySelector(o,p.appComponent);if(q){n.push(q);}});return p.flexController.waitForChangesToBeApplied(n);};return e;});