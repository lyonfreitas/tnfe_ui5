/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/macros/PhantomUtil","sap/ui/model/odata/v4/lib/_MetadataRequestor","sap/ui/model/odata/v4/ODataMetaModel","sap/ui/core/util/XMLPreprocessor","sap/base/Log","xpath","fs","@sap/cds-compiler","prettier","sap/ui/base/BindingParser","sap/ui/model/json/JSONModel","sap/ui/core/InvisibleText","sap/base/util/merge","path","sap/fe/core/converters/ConverterContext","sap/fe/core/services/SideEffectsServiceFactory","sap/fe/core/TemplateModel"],function(P,_,O,X,L,x,f,c,p,B,J,I,m,a,C,S,T){"use strict";var b={};var d=p.format;var t=c.to;var g=c.compileSources;function h(o,n){var V=typeof Symbol!=="undefined"&&o[Symbol.iterator]||o["@@iterator"];if(!V){if(Array.isArray(o)||(V=j(o))||n&&o&&typeof o.length==="number"){if(V)o=V;var i=0;var F=function(){};return{s:F,n:function(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function(e){throw e;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var W=true,Y=false,Z;return{s:function(){V=V.call(o);},n:function(){var e=V.next();W=e.done;return e;},e:function(e){Y=true;Z=e;},f:function(){try{if(!W&&V.return!=null)V.return();}finally{if(Y)throw Z;}}};}function j(o,e){if(!o)return;if(typeof o==="string")return k(o,e);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return k(o,e);}function k(e,n){if(n==null||n>e.length)n=e.length;for(var i=0,o=new Array(n);i<n;i++){o[i]=e[i];}return o;}var l=function(n,i){try{var o="<root><core:Fragment fragmentName=\"".concat(n,"\" type=\"XML\" xmlns:core=\"sap.ui.core\" /></root>");var F=new window.DOMParser();var V=F.parseFromString(o,"text/xml");var W={models:{},bindingContexts:{}};for(var Y in i){var Z=new J();Z.setData(i[Y]);W.models[Y]=Z;W.bindingContexts[Y]=W.models[Y].createBindingContext("/");}return Promise.resolve(X.process(V.firstElementChild,{name:n},W)).then(function($){var a1=$.getElementsByTagName("core:Fragment");if((a1===null||a1===void 0?void 0:a1.length)>0){var b1=h(a1),c1;try{for(b1.s();!(c1=b1.n()).done;){var d1=c1.value;d1.innerHTML="";}}catch(e1){b1.e(e1);}finally{b1.f();}}return q($.innerHTML,{filter:function(f1){return f1.type!=="Comment";}});});}catch(e){return Promise.reject(e);}};b.processFragment=l;var q=require("xml-formatter");L.setLevel(1,"sap.ui.core.util.XMLPreprocessor");jest.setTimeout(40000);var r={"macros":"sap.fe.macros","macro":"sap.fe.macros","macrodata":"http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1","log":"http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1","unittest":"http://schemas.sap.com/sapui5/preprocessorextension/sap.fe.unittesting/1","control":"sap.fe.core.controls","core":"sap.ui.core","m":"sap.m","f":"sap.ui.layout.form","mdc":"sap.ui.mdc","mdcField":"sap.ui.mdc.field","u":"sap.ui.unified","macroMicroChart":"sap.fe.macros.microchart","microChart":"sap.suite.ui.microchart"};var s=x.useNamespaces(r);var u=function(e){P.register(e);};b.registerMacro=u;var v=function(e){X.plugIn(null,e.namespace,e.name);if(e.publicName){X.plugIn(null,e.publicNamespace,e.publicName);}};b.unregisterMacro=v;var w=function(e,i){return s(e,i);};expect.extend({toHaveControl:function(e,i){var n=w("/root".concat(i),e);return{message:function(){var o=z(e);return"did not find controls matching ".concat(i," in generated xml:\n ").concat(o);},pass:n&&n.length>=1};},toNotHaveControl:function(e,i){var n=w("/root".concat(i),e);return{message:function(){var o=z(e);return"There is a control matching ".concat(i," in generated xml:\n ").concat(o);},pass:n&&n.length===0};}});b.runXPathQuery=w;var y=function(e,i,n){var o="string(/root".concat(e,"/@").concat(i,")");return w(o,n);};b.getControlAttribute=y;var z=function(e){var i=new window.XMLSerializer();var n=i.serializeToString(e).replace(/(?:[\t ]*(?:\r?\n|\r))+/g,"\n").replace(/\\"/g,'"');return d(n,{parser:"html"});};b.serializeXML=z;var A=function(e){var i=f.readFileSync(e,"utf-8");var n=g({"string.cds":i},{});var o=t.edmx(n,{service:"sap.fe.test.JestService"});var F=a.resolve(e,"..","gen");var V=a.resolve(F,a.basename(e).replace(".cds",".xml"));if(!f.existsSync(F)){f.mkdirSync(F);}f.writeFileSync(V,o);return V;};b.compileCDS=A;var D=function(o){try{var i={scopeObject:{},scopeType:"",settings:{}};return Promise.resolve(new S().createInstance(i).then(function(n){var F=n.getInterface();F.getContext=function(){return{scopeObject:{getModel:function(){return{getMetaModel:function(){return o;}};}}};};return F;}));}catch(e){return Promise.reject(e);}};b.getFakeSideEffectsService=D;var E=function(){var i=[];return{addIssue:function(e,n,o){i.push({issueCategory:e,issueSeverity:n,details:o});},getIssues:function(){return i;},checkIfIssueExists:function(e,n,o){return i.find(function(F){F.issueCategory===e&&F.issueSeverity===n&&F.details===o;});}};};b.getFakeDiagnostics=E;var G=function(e,i){var n=e.entitySets.find(function(F){return F.name===i.entitySet;});var o=M(n,n);return new C(e,i,E(),m,o);};b.getConverterContextForTest=G;var H={};var K=function(i){try{function n(){return H[i];};var o=_.create({},"4.0",{});var F=function(){if(!H[i]){var V=new O(o,i,undefined,null);return Promise.resolve(V.fetchEntityContainer()).then(function(){H[i]=V;});}}();return Promise.resolve(F&&F.then?F.then(n):n(F));}catch(e){return Promise.reject(e);}};b.getMetaModel=K;var M=function(e,i){var n={startingEntitySet:e,navigationProperties:[],targetObject:i,targetEntitySet:e,targetEntityType:e.entityType};n.contextLocation=n;return n;};b.getDataModelObjectPathForProperty=M;var N=function(e){var i=B.complexParser(e);for(var n=arguments.length,o=new Array(n>1?n-1:0),F=1;F<n;F++){o[F-1]=arguments[F];}return i.formatter.apply(undefined,o);};b.evaluateBinding=N;var Q=function(e,i){var n=B.complexParser(e);var o=new J(i);var F=new I();F.bindProperty("text",n);F.setModel(o);F.setBindingContext(o.createBindingContext("/"));return F.getText();};b.evaluateBindingWithModel=Q;var R=function(i,n,o,F){try{var V="<root>".concat(i,"</root>");var W=new window.DOMParser();var Y=W.parseFromString(V,"text/xml");return Promise.resolve(K(n)).then(function(Z){if(!F.hasOwnProperty("converterContext")){F=Object.assign(F,{"converterContext":new T({},Z)});}Object.keys(F).forEach(function(a1){if(F[a1]&&F[a1].isTemplateModel){F[a1]=new T(F[a1].data,Z);}});var $={models:Object.assign({metaModel:Z},F),bindingContexts:{}};Object.keys(o).forEach(function(a1){expect(typeof Z.getObject(o[a1])).toBeDefined();var b1=F[a1]||Z;$.bindingContexts[a1]=b1.createBindingContext(o[a1]);$.models[a1]=b1;});if($.models["this"]){$.bindingContexts["this"]=$.models["this"].createBindingContext("/");}return X.process(Y.firstElementChild,{name:"Test Fragment"},$);});}catch(e){return Promise.reject(e);}};b.getTemplatingResult=R;var U=function(i,n,o,F){try{return Promise.resolve(R(i,n,o,F)).then(z);}catch(e){return Promise.reject(e);}};b.getTemplatedXML=U;return b;},false);
