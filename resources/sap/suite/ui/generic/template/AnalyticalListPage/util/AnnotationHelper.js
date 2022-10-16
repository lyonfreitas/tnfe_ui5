sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/suite/ui/generic/template/genericUtilities/FeError"],function(B,F,a){"use strict";var c="AnalyticalListPage.util.AnnotationHelper";var l=new F(c).getLogger();var A=B.extend("sap.suite.ui.generic.template.AnalyticalListPage.util.AnnotationHelper");A.getDetailEntitySet=function(C){var o=C.getObject();var m=C.getModel();var M=m.getProperty("/metaModel");return M.createBindingContext(M.getODataEntitySet(o,true));};A.resolveMetaModelPath=function(C){var p=C.getObject();var m=C.getModel();var M=m.getProperty("/metaModel");return M.createBindingContext(p);};A.createWorkingContext=function(C){var p=C.getObject(),s=p.settings,m=C.getModel(),M=m.getProperty("/metaModel"),E=M.getODataEntitySet(p.entitySet),o=M.getODataEntityType(E.entityType),u=s.uniqueHierarchyNodeIDForTreeTable,b="",w={};b=o.$path+"/com.sap.vocabularies.UI.v1.SelectionPresentationVariant"+(s&&s.qualifier?"#"+s.qualifier:"");w.selectionPresentationVariant=M.getObject(b);w.selectionPresentationVariantQualifier=b.split("#")[1]||"";w.selectionPresentationVariantPath=b;if(u&&p.templateSpecific.tableSettings.type==="TreeTable"&&o&&o.hasOwnProperty('property')&&o.property.length){var I=[],h="",P=o.property;for(var i=0;i<P.length;i++){if(P[i].hasOwnProperty('sap:hierarchy-node-for')){h=P[i]["sap:hierarchy-node-for"];break;}}for(var i=0;i<P.length;i++){var d=P[i].name!==u&&P[i].name!==h;if(!P[i].hasOwnProperty('com.sap.vocabularies.Analytics.v1.Measure')){if(P[i].hasOwnProperty('sap:attribute-for')&&d){if(P[i]['sap:attribute-for']!==u&&P[i]['sap:attribute-for']!==h){I.push(P[i]['name']);}}else if(d){I.push(P[i]['name']);}}}w.ignoredFields=I.toString();}b=A.getAnnotationfromSPV(o,b,w.selectionPresentationVariant,w.selectionPresentationVariantPath,(s?s.qualifier:""),"PresentationVariant");w.presentationVariant=M.getObject(b);w.presentationVariantPath=b;w.presentationVariantQualifier=b.split("#")[1]||"";w.initialExpansionLevel=w.presentationVariant&&w.presentationVariant.InitialExpansionLevel&&w.presentationVariant.InitialExpansionLevel.Int;if(s.qualifier&&!w.presentationVariant){var e=new a(c,"Error in manifest.json: Not SelectionPresentationVariant or PresentationVariant found for qualifier: "+s.qualifier,"./manifest.json");throw e;}if(w.presentationVariant&&w.presentationVariant.Visualizations){w.presentationVariant.Visualizations.forEach(function(t){var x="/"+t.AnnotationPath.slice(1);if(x.indexOf("com.sap.vocabularies.UI.v1.LineItem")>-1){b=o.$path+x;w.lineItem=M.getObject(b);w.lineItemPath=b;w.lineItemQualifier=b.split("#")[1]||"";w.lineItemCriticality=sap.suite.ui.generic.template.AnalyticalListPage.util.AnnotationHelper._resolveLineItemCriticality(w.lineItem,w.lineItemQualifier);}if(!s.chartPresentationQualifier&&(x.indexOf("com.sap.vocabularies.UI.v1.Chart")>-1)){b=o.$path+x;w.chart=M.getObject(b);w.chartPath=b;w.chartQualifier=b.split("#")[1]||"";}});}if(!w.lineItem){b=o.$path+"/com.sap.vocabularies.UI.v1.LineItem";w.lineItem=M.getObject(b);w.lineItemPath=b;w.lineItemQualifier="";w.lineItemCriticality=sap.suite.ui.generic.template.AnalyticalListPage.util.AnnotationHelper._resolveLineItemCriticality(w.lineItem,w.lineItemQualifier);}if(s&&s.chartPresentationQualifier){var f=o.$path+"/com.sap.vocabularies.UI.v1.PresentationVariant"+"#"+s.chartPresentationQualifier;var g=M.getObject(f);if(!g){var e=new a(c,"Error in manifest.json: No PresentationVariant found for qualifier: "+s.chartPresentationQualifier,"./manifest.json");throw e;}if(g&&!g.Visualizations){var e=new a(c,"Error: No Visualizations found in PresentationVariant for chartPresentationVariantQualifier: "+s.chartPresentationQualifier,"./manifest.json");throw e;}else{g.Visualizations.forEach(function(t){var x="/"+t.AnnotationPath.slice(1);if(x.indexOf("com.sap.vocabularies.UI.v1.Chart")>-1){b=o.$path+x;w.chart=M.getObject(b);w.chartPath=b;w.chartPresentationVariantQualifier=s.chartPresentationQualifier;w.chartQualifier=b.split("#")[1]||"";}});if(!w.chart){var e=new a(c,"Error: No chart annotations found with chartPresentationVariantQualifier "+s.chartPresentationQualifier,"./manifest.json");throw e;}}}if(!s.chartPresentationQualifier&&!w.chart){b=o.$path+"/com.sap.vocabularies.UI.v1.Chart";w.chart=M.getObject(b);w.chartPath=b;w.chartQualifier="";}w.tableChartTabs=[];var j,v,i,k,V;v=p&&p.manifest&&p.manifest["sap.ui.generic.app"]&&p.manifest["sap.ui.generic.app"].pages&&p.manifest["sap.ui.generic.app"].pages[0].component&&p.manifest["sap.ui.generic.app"].pages[0].component.settings&&p.manifest["sap.ui.generic.app"].pages[0].component.settings.quickVariantSelectionX&&p.manifest["sap.ui.generic.app"].pages[0].component.settings.quickVariantSelectionX.variants;for(i in v){V={};j="";k={};k.key=v[i].key;k.variantAnnotationPath=v[i].annotationPath;k.variantQualifier=k.variantAnnotationPath.split("#")[1]||"";if(!!v[i].entitySet){k.entitySet=v[i].entitySet;E=M.getODataEntitySet(k.entitySet);if(E){o=M.getODataEntityType(E.entityType);}else{continue;}}V=o[k.variantAnnotationPath];if(V&&V.PresentationVariant){var n;if(V.PresentationVariant.Path){var q=V.PresentationVariant.Path.split("@")[1];n=q&&o[q];k.presentationVariantQualifier=q.split("#")[1]||"";}else{n=V.PresentationVariant;}j=n.Visualizations&&n.Visualizations[0].AnnotationPath;}else if(V&&V.Visualizations){j=V.Visualizations[0].AnnotationPath;}if(j){var r="/"+j.slice(1);if(j.indexOf("com.sap.vocabularies.UI.v1.Chart")>-1){k.smartControl="chart";k.chartAbsolutePath=o.$path+r;}else if(j.indexOf("com.sap.vocabularies.UI.v1.LineItem")>-1){k.smartControl="table";b=o.$path+r;k.lineItem=M.getObject(b);k.lineItemPath=b;k.lineItemQualifier=b.split("#")[1]||"";}}if(!(k.chartAbsolutePath||k.lineItemPath)){b=o.$path+"/com.sap.vocabularies.UI.v1.LineItem";k.lineItem=M.getObject(b);k.lineItemPath=b;k.lineItemQualifier="";}k.controlQualifier=j&&j.split("#")[1]||"";w.tableChartTabs.push(k);}m.setProperty("/workingContext",w);return"/workingContext";};A.hasDeterminingActionsForALP=function(t,C,e,m){if(e&&m&&m["sap.suite.ui.generic.template.AnalyticalListPage.view.AnalyticalListPage"]&&sap.suite.ui.generic.template.AnalyticalListPage.util.AnnotationHelper._hasCustomDeterminingActionsInALP(e,m["sap.suite.ui.generic.template.AnalyticalListPage.view.AnalyticalListPage"]["sap.ui.generic.app"])){return true;}for(var r=0;r<t.length;r++){if((t[r].RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAction"||t[r].RecordType==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation")&&t[r].Determining&&t[r].Determining.Bool==="true"){return true;}}for(var r=0;r<C.length;r++){if((C[r].RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAction"||C[r].RecordType==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation")&&C[r].Determining&&C[r].Determining.Bool==="true"){return true;}}return false;};A.hasGlobalActionsForALP=function(t,C,e,m){if(e&&m&&m["sap.suite.ui.generic.template.AnalyticalListPage.view.AnalyticalListPage"]&&sap.suite.ui.generic.template.AnalyticalListPage.util.AnnotationHelper._hasCustomGlobalActions(e,m["sap.suite.ui.generic.template.AnalyticalListPage.view.AnalyticalListPage"]["sap.ui.generic.app"])){return true;}return false;};A.getAreaShrinkRatio=function(t,C,e,m){var g=sap.suite.ui.generic.template.AnalyticalListPage.util.AnnotationHelper.hasGlobalActionsForALP(t,C,e,m);if(g){return"0:3:0.7";}else{return"0:3:0.1";}};A._hasCustomDeterminingActionsInALP=function(e,m){if(m&&m[e]){var M=m[e];if(M.Actions){for(var b in M.Actions){if(M.Actions[b].determining){return true;}}}}return false;};A._hasCustomGlobalActions=function(e,m){if(m&&m[e]){var M=m[e];if(M.Actions){for(var b in M.Actions){if(M.Actions[b].global){return true;}}}}return false;};A.getFilterableKPIs=function(k){var m=k.getModel();var b={};var K=k.getObject();b.filterableKPIs=[];b.globalKPIs=[];if(K){for(var i=0;i<Object.keys(K).length;i++){if(K[Object.keys(K)[i]]["filterable"]){b.filterableKPIs.push(K[Object.keys(K)[i]]);}else{b.globalKPIs.push(K[Object.keys(K)[i]]);}}}m.setProperty("/kpiContext",b);return"/kpiContext";};A.generateKPIToolbarId=function(k){for(var i=0;Object.keys(k).length;i++){if(k[Object.keys(k)[i]]["filterable"]){return"template::KPITagContainer::filterableKPIs";}else{return"template::KPITagContainer::globalKPIs";}}};A.generateKPITagID=function(k){return"template::KPITag::"+k.model+"::"+k.qualifier;};A._resolveLineItemCriticality=function(b,d){if(b){var e;if(d){e=b["com.sap.vocabularies.UI.v1.Criticality#"+d];}else{e=b["com.sap.vocabularies.UI.v1.Criticality"];}if(!e){return"";}else{return e.Path?"\\{\"Path\": \""+e.Path+"\"\\}":"\\{\"EnumMember\": \""+e.EnumMember+"\"\\}";}}else{l.error("Please add LineItem annotation for your application");return undefined;}};A.getAnnotationfromSPV=function(e,s,S,b,q,d){if(S&&S[d]){s=S[d].Path||S[d].AnnotationPath||b+"/"+d;if(s.indexOf("@")===0){s=e.$path+"/"+s.substr(1);}}else{s=e.$path+"/com.sap.vocabularies.UI.v1."+d+(q?"#"+q:"");}return s;};A.createSVAnnotation=function(e,m,q){var s=e.$path+"/com.sap.vocabularies.UI.v1.SelectionPresentationVariant"+(q?"#"+q:""),S=m.getObject(s),b=s;s=this.getAnnotationfromSPV(e,s,S,b,q,"SelectionVariant");var o=m.getObject(s);return o;};return A;},true);
