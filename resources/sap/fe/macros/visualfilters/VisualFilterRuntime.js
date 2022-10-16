/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/mdc/condition/Condition","sap/base/Log","sap/ui/mdc/util/FilterUtil","sap/ui/mdc/util/DateUtil","sap/fe/macros/CommonHelper","sap/fe/core/templating/FilterHelper","sap/fe/core/controls/filterbar/utils/VisualFilterUtils","sap/fe/macros/filter/FilterUtils"],function(C,L,M,D,a,F,V,b){"use strict";var c={selectionChanged:function(e){var i=e.getSource(),o=i.data("outParameter"),d=i.data("dimension"),s=i.data("dimensionText"),m=i.data("multipleSelectionAllowed"),f=i.data("dimensionType"),S=e.getParameter("bar")||e.getParameter("point")||e.getParameter("segment"),I=e.getParameter("selected"),g=i.getModel("$field"),h=g.getProperty("/conditions");if(!o||o!==d){L.error("VisualFilter: Cannot sync values with regular filter as out parameter is not configured properly!");}else{var j=S.getBindingContext().getObject(o);if(j){var k=S.getBindingContext().getObject(s);if(typeof k!=="string"&&!(k instanceof String)){k=undefined;}if(I){if(m==="false"){h=[];}if(f==="Edm.DateTimeOffset"){j=V._parseDateTime(j);}var l=C.createItemCondition(j,k||undefined);h.push(l);}else{h=h.filter(function(l){if(f==="Edm.DateTimeOffset"){return(l.operator!=="EQ"||Date.parse(l.values[0])!==Date.parse(j));}return l.operator!=="EQ"||l.values[0]!==j;});}g.setProperty("/conditions",h);}else{L.error("VisualFilter: No vaue found for the outParameter");}}},getAggregationSelected:function(d){var s=[];if(!this.getBindingContext()){return;}for(var i=0;i<=d.length-1;i++){var o=d[i];if(o.operator==="EQ"){s.push(o.values[0]);}}var I=this.getParent(),e=I.data("dimension"),f=I.data("dimensionType"),g=this.getBindingContext().getObject(e);if(f==="Edm.DateTimeOffset"){g=V._parseDateTime(g);}return s.indexOf(g)>-1;},getFiltersFromConditions:function(){var I=this.getParent(),f=I.getParent().getParent().getParent().getParent(),d=I.data("inParameters").customData,p=f.getPropertyInfoSet(),A=[].slice.call(arguments),m={},v=[],o,P=I.data("parameters").customData,s=a.parseCustomData(I.data("selectionVariantAnnotation")),e=I.getBinding("bars")||I.getBinding("points")||I.getBinding("segments"),g=e.getPath(),h=I.getModel().getMetaModel(),j=h.getObject(g+"/");var k=F.getFiltersConditionsFromSelectionVariant(j,s,V.getCustomConditions.bind(V));var S=V.convertFilterCondions(k);Object.keys(S).forEach(function(K){m[K]=S[K];var y=d.find(function(G){return G.valueListProperty===K;});var z=y?y.localDataProperty:K;if(!P||(P&&P.indexOf(K)===-1)){for(var i=0;i<p.length;i++){if(z===p[i].name){if(p[i].typeConfig.baseType==="DateTime"){if(m[K]){m[K].forEach(function(G){G.values[0]=V._formatDateTime(G.values[0]);});}}v.push({name:K,typeConfig:p[i].typeConfig});}}}});d.forEach(function(y,z){if(A[z].length>0){m[y.valueListProperty]=A[z];if(!P||(P&&P.indexOf(y.valueListProperty)===-1)){for(var i=0;i<p.length;i++){if(p[i].name===y.localDataProperty){if(p[i].typeConfig.baseType==="DateTime"){if(m[y.valueListProperty]){m[y.valueListProperty].forEach(function(G){G.values[0]=V._formatDateTime(G.values[0]);});}}v.push({name:y.valueListProperty,typeConfig:p[i].typeConfig});}}}}});var l=I.getBindingContext("internal");var n=I.data("infoPath");var E;var r=sap.ui.getCore().getLibraryResourceBundle("sap.fe.macros");var R=a.parseCustomData(I.data("requiredProperties"));if(R.length){var q=Object.keys(m)||[];var N=[];R.forEach(function(g){if(q.indexOf(g)===-1){N.push(g);}});if(!N.length){E=l.getProperty(n+"/showError");l.setProperty(n,{"errorMessageTitle":"","errorMessage":"","showError":false});}else if(N.length>1){l.setProperty(n,{"errorMessageTitle":r.getText("M_VISUAL_FILTERS_ERROR_MESSAGE_TITLE"),"errorMessage":r.getText("M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_MULTIPLEVF"),"showError":true});return;}else{var h=I.getModel().getMetaModel();var t=e.getPath();var u=h.getObject(t+"/"+N[0]+"@com.sap.vocabularies.Common.v1.Label")||N[0];l.setProperty(n,{"errorMessageTitle":r.getText("M_VISUAL_FILTERS_ERROR_MESSAGE_TITLE"),"errorMessage":r.getText("M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_SINGLEVF",u),"showError":true});return;}}else{E=l.getProperty(n+"/showError");l.setProperty(n,{"errorMessageTitle":"","errorMessage":"","showError":false});}var w=f.data("entityType").split("/")[1];var x=g.split("/")[1].split("(")[0];if(P&&P.length&&w===x){var B=E?b.getBindingPathForParameters(f,m,p,P):undefined;if(B){e.sPath=B;}}if(P&&P.length){P.forEach(function(i){if(m[i]){delete m[i];}});}Object.keys(m).forEach(function(i){m[i].forEach(function(y){if(y.values.length>1){y.values=y.values.slice(0,1);}});});if(Object.keys(m).length>0&&v.length){o=M.getFilterInfo(f,m,v).filters;e.filter(o);}else if(!Object.keys(m).length){e.filter();}if(E&&e.isSuspended()){e.resume();}return o;},getFilterCounts:function(o){if(o.length>0){return"("+o.length+")";}else{return undefined;}},scaleVisualFilterValue:function(v,s,n,d){if(s){var e=V.getFormattedNumber(v,s,n);return e;}else if(d){var f=V.getFormattedNumber(v,null,null,d);return f;}else if(n>0){n>2?2:n;var g=V.getFormattedNumber(v,null,n);return g;}else{return v;}},fireValueHelp:function(e){e.getSource().getParent().getParent().getParent().fireValueHelpRequest();}};return c;},true);
