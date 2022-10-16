/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings","sap/fe/core/converters/controls/Common/Table","sap/fe/core/converters/helpers/ConfigurableObject","sap/fe/core/converters/controls/ListReport/VisualFilters","sap/fe/core/helpers/BindingExpression","../Common/DataVisualization","sap/fe/core/converters/helpers/Key","sap/fe/core/converters/helpers/IssueManager"],function(M,T,C,V,B,D,K,I){"use strict";var _={};var a=I.IssueCategory;var b=I.IssueSeverity;var c=I.IssueType;var d=K.KeyHelper;var g=D.getSelectionVariant;var e=B.compileBinding;var f=B.annotationExpression;var h=V.getVisualFilters;var P=C.Placement;var j=C.insertCustomElements;var k=T.isFilteringCaseSensitive;var l=T.getSelectionVariantConfiguration;var m=M.TemplateType;var A=M.AvailabilityType;function o(i,L){var N=Object.keys(i);if(Object.getOwnPropertySymbols){var O=Object.getOwnPropertySymbols(i);if(L){O=O.filter(function(Q){return Object.getOwnPropertyDescriptor(i,Q).enumerable;});}N.push.apply(N,O);}return N;}function n(L){for(var i=1;i<arguments.length;i++){var N=arguments[i]!=null?arguments[i]:{};if(i%2){o(Object(N),true).forEach(function(O){p(L,O,N[O]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(L,Object.getOwnPropertyDescriptors(N));}else{o(Object(N)).forEach(function(O){Object.defineProperty(L,O,Object.getOwnPropertyDescriptor(N,O));});}}return L;}function p(i,L,N){if(L in i){Object.defineProperty(i,L,{value:N,enumerable:true,configurable:true,writable:true});}else{i[L]=N;}return i;}function q(i){var L={};i.Data.forEach(function(N){if(N.$Type==="com.sap.vocabularies.UI.v1.DataField"){var O,Q;L[N.Value.path]={group:i.fullyQualifiedName,groupLabel:e(f(i.Label||((O=i.annotations)===null||O===void 0?void 0:(Q=O.Common)===null||Q===void 0?void 0:Q.Label)||i.qualifier))||i.qualifier};}});return L;}function r(i){return i.reduce(function(L,N){N.propertyNames.forEach(function(O){L[O]=true;});return L;},{});}function s(i,L){if(L&&i.length>0){return i.every(function(N){return N.enableAnalytics&&L===N.annotation.collection;});}return false;}function t(i,L){var N=[];return i.map(function(O){var Q=O.control.filters;var R=[];for(var S in Q){if(Array.isArray(Q[S].paths)){var U=Q[S].paths;U.forEach(function(W){if(W&&W.annotationPath&&N.indexOf(W.annotationPath)===-1){N.push(W.annotationPath);var X=l(W.annotationPath,L);if(X){R.push(X);}}});}}return R;}).reduce(function(O,Q){return O.concat(Q);},[]);}var u=function(i,L){var N=L.split("/");var O;var Q="";while(N.length){var R=N.shift();O=O?O+"/"+R:R;var S=i.resolvePath(O);if(S._type==="NavigationProperty"&&S.isCollection){R+="*";}Q=Q?Q+"/"+R:R;}return Q;};var v=function(i,L,N,O,Q){var R,S,U;if(L!==undefined&&L.targetType===undefined&&(O||((R=L.annotations)===null||R===void 0?void 0:(S=R.UI)===null||S===void 0?void 0:(U=S.Hidden)===null||U===void 0?void 0:U.valueOf())!==true)){var W,X,Y,Z,$,a1,b1,c1;var d1=Q.getAnnotationEntityType(L);return{key:d.getSelectionFieldKeyFromPath(N),annotationPath:Q.getAbsoluteAnnotationPath(N),conditionPath:u(i,N),availability:((W=L.annotations)===null||W===void 0?void 0:(X=W.UI)===null||X===void 0?void 0:(Y=X.HiddenFilter)===null||Y===void 0?void 0:Y.valueOf())===true?A.Hidden:A.Adaptation,label:e(f(((Z=L.annotations.Common)===null||Z===void 0?void 0:($=Z.Label)===null||$===void 0?void 0:$.valueOf())||L.name)),group:d1.name,groupLabel:e(f((d1===null||d1===void 0?void 0:(a1=d1.annotations)===null||a1===void 0?void 0:(b1=a1.Common)===null||b1===void 0?void 0:(c1=b1.Label)===null||c1===void 0?void 0:c1.valueOf())||d1.name))};}return undefined;};var w=function(i,L,N,O,Q){var R={};if(N){N.forEach(function(S){var U=S.name;var W=(L?L+"/":"")+U;var X=v(i,S,W,O,Q);if(X){R[W]=X;}});}return R;};var x=function(i,L,N,O){var Q={};if(L){L.forEach(function(R){var S;var U=i.resolvePath(R);if(U===undefined){return;}if(U._type==="NavigationProperty"){S=w(i,R,U.targetType.entityProperties,N,O);}else if(U.targetType!==undefined){S=w(i,R,U.targetType.properties,N,O);}else{var W=R.includes("/")?R.split("/").splice(0,1).join("/"):"";S=w(i,W,[U],N,O);}Q=n(n({},Q),S);});}return Q;};var y=function(i,L,N,O){var Q=i[L];if(Q){delete i[L];}else{Q=v(O,O.resolvePath(L),L,true,N);}if(!Q){N.getDiagnostics().addIssue(a.Annotation,b.High,c.MISSING_SELECTIONFIELD);}if(Q){var R,S;Q.availability=A.Default;Q.isParameter=!!((R=O.annotations)!==null&&R!==void 0&&(S=R.Common)!==null&&S!==void 0&&S.ResultContext);}return Q;};var z=function(i,S,L,N,O,Q){var R=[];var U={};var W=L.entityProperties;Q===null||Q===void 0?void 0:Q.forEach(function(X){U[X.value]=true;});if(S&&S.length>0){S===null||S===void 0?void 0:S.forEach(function(X){var Y=X.PropertyName;var Z=Y.value;var U={};Q===null||Q===void 0?void 0:Q.forEach(function(a1){U[a1.value]=true;});if(!(Z in O)){if(!(Z in U)){var $=y(i,Z,N,L);if($){R.push($);}}}});}else if(W){W.forEach(function(X){var Y,Z;var $=(Y=X.annotations)===null||Y===void 0?void 0:(Z=Y.Common)===null||Z===void 0?void 0:Z.FilterDefaultValue;var a1=X.name;if(!(a1 in O)){if($&&!(a1 in U)){var b1=y(i,a1,N,L);if(b1){R.push(b1);}}}});}return R;};function E(i){var L,N;var O=i.getDataModelObjectPath();var Q=O.startingEntitySet.entityType;var R=!!((L=Q.annotations)!==null&&L!==void 0&&(N=L.Common)!==null&&N!==void 0&&N.ResultContext);var S=R&&i.getConverterContextFor("/"+O.startingEntitySet.name);var U=S?Q.entityProperties.map(function(W){return y({},W.name,S,Q);}):[];return U;}var F=function(i,L){if(L.getManifestWrapper().hasMultipleVisualizations()||L.getTemplateType()===m.AnalyticalListPage){return true;}var N=L.getContextPath();return s(i,N);};_.getFilterBarhideBasicSearch=F;var G=function(i,L){var N=L.getManifestWrapper().getFilterConfiguration();var O=(N===null||N===void 0?void 0:N.filterFields)||{};var Q=x(i,Object.keys(O).map(function(Z){return d.getPathFromSelectionFieldKey(Z);}),true,L);var R={};for(var S in O){var U=O[S];var W=d.getPathFromSelectionFieldKey(S);var X=Q[W];var Y=h(i,L,S,O);R[S]={key:S,annotationPath:X===null||X===void 0?void 0:X.annotationPath,conditionPath:(X===null||X===void 0?void 0:X.conditionPath)||W,template:U.template,label:U.label,position:U.position||{placement:P.After},availability:U.availability||A.Default,settings:U.settings,visualFilter:Y};}return R;};_.getManifestFilterFields=G;var H=function(i,L,N){return y({},i,L,N);};_.getFilterField=H;var J=function(L){var N,O,Q,R;var S=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var U=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";var W=t(S,L);var X=r(W);var Y=L.getEntityType();var Z=(N=Y.annotations.UI)===null||N===void 0?void 0:N.FilterFacets;var $={};var a1=L.getAnnotationsByTerm("UI","com.sap.vocabularies.UI.v1.FieldGroup");if(Z===undefined||Z.length<0){for(var i in a1){$=n(n({},$),q(a1[i]));}}else{$=Z.reduce(function(n1,o1){for(var _i=0;_i<o1.Target.$target.Data.length;_i++){var q1,r1;n1[o1.Target.$target.Data[_i].Value.path]={group:o1===null||o1===void 0?void 0:(q1=o1.ID)===null||q1===void 0?void 0:q1.toString(),groupLabel:o1===null||o1===void 0?void 0:(r1=o1.Label)===null||r1===void 0?void 0:r1.toString()};}return n1;},{});}var b1=[];var c1=g(Y,L);if(c1){b1=c1.SelectOptions;}var d1=n(n({},w(Y,"",Y.entityProperties,false,L)),x(Y,L.getManifestWrapper().getFilterConfiguration().navigationProperties,false,L));var e1=U&&((O=L.getEntityTypeAnnotation(U))===null||O===void 0?void 0:O.annotation)||((Q=Y.annotations)===null||Q===void 0?void 0:(R=Q.UI)===null||R===void 0?void 0:R.SelectionFields)||[];var f1=z(d1,b1,Y,L,X,e1);var g1=E(L);var h1=g1.concat((e1===null||e1===void 0?void 0:e1.reduce(function(l1,n1){var o1=n1.value;if(!(o1 in X)){var p1=y(d1,o1,L,Y);if(p1){p1.group="";p1.groupLabel="";l1.push(p1);}}return l1;},[]))||[]).concat(f1||[]).concat(Object.keys(d1).filter(function(n1){return!(n1 in X);}).map(function(n1){return Object.assign(d1[n1],$[n1]);}));var i1=L.getContextPath();if(s(S,i1)){var j1=S[0].aggregates;if(j1){var k1=Object.keys(j1).map(function(n1){return j1[n1].relativePath;});h1=h1.filter(function(n1){return k1.indexOf(n1.key)===-1;});}}var l1=j(h1,G(Y,L),{"availability":"overwrite",label:"overwrite",position:"overwrite",template:"overwrite",settings:"overwrite",visualFilter:"overwrite"});var m1=k(L);l1.forEach(function(n1){n1.caseSensitive=m1;});return l1;};_.getSelectionFields=J;return _;},false);
