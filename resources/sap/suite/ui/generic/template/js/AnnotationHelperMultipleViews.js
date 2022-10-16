sap.ui.define(["sap/suite/ui/generic/template/js/AnnotationHelper"],function(A){"use strict";function u(m){var C=0;for(var i in m){if(m.hasOwnProperty(i)){++C;if(C>3){return false;}}}return true;}function a(F,s){var m=s&&s["sections"]&&s["sections"][sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(F)];var v=m&&m.quickVariantSelection&&m.quickVariantSelection.variants;var C=0;for(var i in v){if(v.hasOwnProperty(i)){++C;if(C>3){return false;}}}return true;}function g(i,q,I){var D=false;var s=false;if(I&&I.entitySet){D=true;}if(D){s=q.showCounts===false?false:true;}if(q.showCounts||s){return"{path: '_templPriv>/listReport/multipleViews/items/"+I.key+"', formatter: '._templateFormatters.formatItemTextForMultipleView'}";}return A.getIconTabFilterText(i.getInterface(0),I);}g.requiresIContext=true;function b(i,q,I){var D=false;var s=false;if(I&&I.entitySet){D=true;}if(D){s=q.showCounts===false?false:true;}if(q.showCounts||s){return"{path: '_templPriv>/alp/multipleViews/items/"+I.key+"', formatter: '._templateFormatters.formatItemTextForMultipleView'}";}return A.getIconTabFilterText(i.getInterface(0),I);}b.requiresIContext=true;function c(i,s,I,F,t){var C,q;var k=sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(F);C=s[k];q=C&&C.quickVariantSelection;if(q&&q.showCounts){return"{path: '_templPriv>/objectPage/multipleViews/"+k+"/items/"+I.key+"', formatter: '._templateFormatters.formatItemTextForMultipleView'}";}return A.getIconTabFilterText(i,I,t);}c.requiresIContext=true;function d(t){return"{= ${_templPriv>/listReport/multipleViews/mode} !== 'multi' || ${_templPriv>/listReport/multipleViews/selectedKey} === '"+(t&&t.key)+"' }";}function e(t){return"{= ${_templPriv>/alp/multipleViews/mode} !== 'multi' || ${_templPriv>/alp/multipleViews/selectedKey} === '"+(t&&t.key)+"' }";}function h(F,s){var S;if(s&&s.sections){S=s.sections[sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(F)];}return(S&&S.quickVariantSelection?true:false);}function f(i,F,s){return(s[sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(F)]===i)?true:false;}function j(F){return"{_templPriv>/objectPage/multipleViews/"+sap.suite.ui.generic.template.js.AnnotationHelper.getStableIdPartFromFacet(F)+"/selectedKey}";}return{useSegmentedButton:u,useSegmentedButtonInOP:a,getTextForItem:g,getVisibleForTableTabs:d,getVisibleForALPTableTabs:e,hasQuickVariantSelectionInObjectPageSection:h,isCurrentSection:f,getTextForItemObjectPage:c,getSelectedKeyBinding:j,getTextForItemAnalyticalListPage:b};},true);
