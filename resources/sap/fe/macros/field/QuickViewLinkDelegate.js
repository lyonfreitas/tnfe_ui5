/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/mdc/link/Panel","sap/ui/mdc/link/PanelItem","sap/ui/mdc/LinkDelegate","sap/ui/mdc/link/LinkItem","sap/ui/mdc/link/Factory","sap/ui/mdc/link/Log","sap/base/Log","sap/ui/core/util/XMLPreprocessor","sap/ui/core/XMLTemplateProcessor","sap/ui/core/Fragment","sap/fe/macros/field/FieldHelper","sap/base/util/isPlainObject","sap/ui/mdc/link/SemanticObjectMapping","sap/ui/mdc/link/SemanticObjectMappingItem","sap/ui/mdc/link/SemanticObjectUnavailableAction","sap/base/util/merge","sap/fe/navigation/SelectionVariant","sap/fe/core/CommonUtils","sap/ui/model/json/JSONModel","sap/ui/fl/Utils","sap/ui/util/openWindow","sap/fe/macros/CommonHelper","sap/fe/core/helpers/KeepAliveHelper"],function(P,a,L,b,F,c,S,X,d,e,f,g,h,k,l,m,o,C,J,U,p,q,K){"use strict";var r=Object.assign({},L);var s={iLinksShownInPopup:3};r.getConstants=function(){return s;};r._getEntityType=function(i,M){if(M){return M.createBindingContext(i.entityType);}};r._getSemanticsModel=function(i,M){if(M){var j=new J(i);return j;}};r._getDataField=function(i,M){return M.createBindingContext(i.dataField);};r._getContact=function(i,M){return M.createBindingContext(i.contact);};r.fnTemplateFragment=function(){var t=this;var i;var j={};var n;if(this.resolvedpayload){n=this.resolvedpayload;}else{n=this.payLoad;}if(n&&!n.LinkId){n.LinkId=this.oControl&&this.oControl.isA("sap.ui.mdc.Link")?this.oControl.getId():undefined;}var u=this._getSemanticsModel(n,this.oMetaModel);if(n.entityType&&this._getEntityType(n,this.oMetaModel)){i="sap.fe.macros.field.QuickViewLinkForEntity";j.bindingContexts={"entityType":this._getEntityType(n,this.oMetaModel),"semantic":u.createBindingContext("/")};j.models={"entityType":this.oMetaModel,"semantic":u};}else if(n.dataField&&this._getDataField(n,this.oMetaModel)){i="sap.fe.macros.field.QuickViewLinkForDataField";j.bindingContexts={"dataField":this._getDataField(n,this.oMetaModel),"semantic":u.createBindingContext("/")};j.models={"dataField":this.oMetaModel,"semantic":u};}else if(n.contact&&this._getContact(n,this.oMetaModel)){i="sap.fe.macros.field.QuickViewLinkForContact";j.bindingContexts={"contact":this._getContact(n,this.oMetaModel)};j.models={"contact":this.oMetaModel};}j.models.entitySet=this.oMetaModel;j.models.metaModel=this.oMetaModel;if(this.oControl&&this.oControl.getModel("viewData")){j.models.viewData=this.oControl.getModel("viewData");j.bindingContexts.viewData=this.oControl.getModel("viewData").createBindingContext("/");}var v=d.loadTemplate(i,"fragment");return Promise.resolve(X.process(v,{name:i},j)).then(function(v){return e.load({definition:v,controller:t});}).then(function(w){if(w){if(j.models&&j.models.semantic){w.setModel(j.models.semantic,"semantic");w.setBindingContext(j.bindingContexts.semantic,"semantic");}if(j.bindingContexts&&j.bindingContexts.entityType){w.setModel(j.models.entityType,"entityType");w.setBindingContext(j.bindingContexts.entityType,"entityType");}}t.resolvedpayload=undefined;return w;});};r.onPressTitleLink=function(E){if(E.getParameter("target")!=="_blank"){var H=E.getSource().getHref();var u=F.getService("URLParsing");var t=E.getSource();var H=t.getHref();var T=H&&u.parseShellHash(H);var I=T&&T.semanticObject&&T.action&&T.semanticObject+"-"+T.action;var j=E.getSource().getCustomData()[0].getValue();for(var i=0;i<j.length;i++){if(j[i].key===I){t.setHref(j[i].href);break;}}H=t.getHref();var v=sap.ui.fl.Utils.getViewForControl(t);var A=C.getAppComponent(v);var n=v.getController();var w=n&&n.getView(),B=w&&w.getBindingContext();if(!B){B=t.getBindingContext();}E.preventDefault();this.beforeNavigationCallback(E).then(function(N){if(N){var x=u.parseShellHash(H);var y=A.getShellServices();var z={target:{semanticObject:x.semanticObject,action:x.action},params:x.params};if(C.isStickyEditMode(w)!==true){y.toExternal(z,A);}else{var D=y.hrefForExternal(z,A,false);p(D);}}}).catch(function(x){S.error("Error while resolving field value",x);});}};r.fetchAdditionalContent=function(i,B,j){this.oControl=j||B;this.payLoad=i;if(B&&(B.isA("sap.ui.model.odata.v4.Context")||B.isA("sap.ui.mdc.Link"))){this.oMetaModel=B.getModel().getMetaModel();return this.fnTemplateFragment().then(function(n){return[n];});}return Promise.resolve([]);};r.fetchLinkItems=function(i,B,I){if(B&&r._getSemanticObjects(i)){var j=B.getObject();var n=[];if(I){I.initialize(r._getSemanticObjects(i));n.forEach(function(w){I.addIntent(c.IntentType.API,{text:w.getText(),intent:w.getHref()});});}this.aLinkCustomData=this._link&&this._link.isA("sap.ui.mdc.Link")&&this._link.getParent()&&this._link.getParent().isA("sap.m.Link")&&this._link.getParent().getCustomData().map(function(w){return w.mProperties.value;});var t=r._calculateSemanticAttributes(j,i,I,this._link);var u=t.results;var v=t.payload;return r._retrieveNavigationTargets("",u,v,I,this._link).then(function(w,O){return w.length===0?null:w;});}else{return Promise.resolve(null);}};r.fetchLinkType=function(j,n){var t=this;var _=n;var u=[];var v={semanticObjects:[],semanticObjectsResolved:[]};var w=Object.assign({},j);return new Promise(function(x){if(w){if(w.semanticObjects){t._link=n;var y,z,A,B={};var D=function(H){v.semanticObjects.push(H);return v;};var E=n.getParent().getCustomData();for(var G=0;G<E.length;G++){y=E[G].getKey();B[y]={value:E[G].getValue()};}for(var i=0;i<w.semanticObjects.length;i++){A=w.semanticObjects[i];if(A&&A.indexOf("{")===0&&A.indexOf("}")===A.length-1){z=A.substr(1,A.indexOf("}")-1);if(B[z]){A=B[z].value;u.push(Promise.resolve(A));}}u.push(Promise.resolve(A));}return Promise.all(u).then(function(H){if(H&&H.length>0){H.forEach(D);}return _.retrieveLinkItems();}).then(function(H){var I=H;var M;var N=2;if(I&&I.length===1){M=new b({text:I[0].getText(),href:I[0].getHref()});}if(I.length===1&&M){N=1;}else if(w.entityType&&w.navigationPath){N=2;}else if(I.length===0){N=0;}else{N=2;}x({initialType:{type:N,directLink:M?M:undefined},runtimeType:undefined});});}else if(w.contact&&w.contact.length>0){x({initialType:{type:2,directLink:undefined},runtimeType:undefined});}else if(w.entityType&&w.navigationPath){x({initialType:{type:2,directLink:undefined},runtimeType:undefined});}}else{throw new Error("no payload or semanticObjects found");}}).catch(function(E){S.error("Error in SimpleLinkDelegate.fetchLinkType",E);});};r.modifyLinkItems=function(i,B,j){if(j.length!==0){var n=j[0].getParent();var v=sap.ui.fl.Utils.getViewForControl(n);var M=v.getModel().getMetaModel();var A=C.getAppComponent(v);var t=n.getBindingContext();var u;var T={semanticObject:i.mainSemanticObject,action:""};var w=this;return new Promise(function(x){var y=Promise.resolve(j);var N=n&&n.isA("sap.ui.mdc.Link")&&n.getParent()&&n.getParent().isA("sap.m.Link")&&n.getParent().getCustomData().map(function(G){return G.mProperties.value;});if(N&&w.aLinkCustomData&&w.aLinkCustomData.filter(function(G){return(N.filter(function(H){return H!=G;}).length>0);}).length>0){var z=r._calculateSemanticAttributes(B.getObject(),i,undefined,w._link);var D=z.results;var E=z.payload;y=r._retrieveNavigationTargets("",D,E,undefined,w._link);}return y.then(function(G){j=G;var H=A.getNavigationService();var I=v.getController();var O;u=A.getShellServices();if(!u.hasUShell()){S.error("QuickViewLinkDelegate: Service 'URLParsing' could not be obtained");return Promise.reject();}if(v.getAggregation("content")[0]&&v.getAggregation("content")[0].getBindingContext()){var Q=v.getAggregation("content")[0].getBindingContext();}var R=t.getObject();var V=M.getMetaPath(t.getPath());R=I._intentBasedNavigation.removeSensitiveData(t.getObject(),V);R=I._intentBasedNavigation.prepareContextForExternalNavigation(R,t);O=H.mixAttributesAndSelectionVariant(R.semanticAttributes,new o());T.propertiesWithoutConflict=R.propertiesWithoutConflict;v.getController().intentBasedNavigation.adaptNavigationContext(O,T);r._removeTechnicalParameters(O);if(v.getViewData().entitySet&&O){var W=H.constructContextUrl(v.getViewData().entitySet,v.getModel());O.setFilterContextUrl(W);}return H.getAppStateKeyAndUrlParameters(O.toJSONString()).then(function(Y,Z){var $=Z;i.aSemanticLinks=[];var _,a1;x(Promise.all(j.map(function(b1){return u.expandCompactHash(b1.getHref()).then(function(c1){_=u.parseShellHash(c1);var d1=Q===undefined?t:Q;var e1=[{contextData:_.params,entitySet:M.getMetaPath(d1.getPath()).replace(/^\/*/,"")}];e1=C.removeSensitiveData(e1,M);a1={target:{semanticObject:_.semanticObject,action:_.action},params:Object.assign(Y,e1[0]),appStateKey:$};delete a1.params["sap-xapp-state"];b1.setHref("#"+u.constructShellHash(a1));i.aSemanticLinks.push(b1.getHref());return b1;});})));});});}).catch(function(E){S.error("Error while getting the navigation service",E);});}else{return Promise.resolve(j);}};r.beforeNavigationCallback=function(i,E){var j=E.getSource(),H=E.getParameter("href"),u=F.getService("URLParsing"),n=H&&u.parseShellHash(H);K.storeControlRefreshStrategyForHash(j,n);return Promise.resolve(true);};r._removeTechnicalParameters=function(i){i.removeSelectOption("@odata.context");i.removeSelectOption("@odata.metadataEtag");i.removeSelectOption("SAP__Messages");};r._calculateSemanticAttributes=function(n,t,I,u){var v,w,_,x={};var y={semanticObjects:[],semanticObjectsResolved:[]};var O,z;var A=u&&u.isA("sap.ui.mdc.Link")&&u.getParent()&&u.getParent().isA("sap.m.Link")&&u.getParent().getCustomData();if(t.semanticObjects){if(A&&A.length>0){for(var B=0;B<A.length;B++){v=A[B].getKey();z=A[B].getValue();x[v]={value:z};}for(var i=0;i<t.semanticObjects.length;i++){w=t.semanticObjects[i];if(w&&w.indexOf("{")===0&&w.indexOf("}")===w.length-1){_=w.substr(1,w.indexOf("}")-1);w=x[_].value;if(t.mainSemanticObject&&t.mainSemanticObject.split(_).length===2&&t.mainSemanticObject.split(_)[0]==="{"&&t.mainSemanticObject.split(_)[1]==="}"){if(w){y.mainSemanticObject=w;}else{y.mainSemanticObject=undefined;}}if(w&&typeof w==="string"){y.semanticObjectsResolved.push(w?w:undefined);y.semanticObjects.push(w?w:undefined);}else if(Array.isArray(w)){for(var j=0;j<w.length;j++){y.semanticObjectsResolved.push(w[j]?w[j]:undefined);y.semanticObjects.push(w[j]?w[j]:undefined);}}}else{y.semanticObjects.push(w);}}if(y.semanticObjectsResolved.length>0){O={};O.entityType=t.entityType;O.dataField=t.dataField;O.contact=t.contact;O.mainSemanticObject=t.mainSemanticObject;O.navigationPath=t.navigationPath;O.propertyPathLabel=t.propertyPathLabel;O.semanticObjectMappings=t.semanticObjectMappings.slice();O.semanticObjectUnavailableActions=t.semanticObjectUnavailableActions.slice();O.semanticObjects=y.semanticObjects;O.semanticPrimaryActions=t.semanticPrimaryActions.slice();if(y.mainSemanticObject){O.mainSemanticObject=y.mainSemanticObject;}else{O.mainSemanticObject=undefined;}for(var N=0;N<y.semanticObjects.length;N++){if(O.mainSemanticObject===y.semanticObjectsResolved[N]){O.mainSemanticObject=y.semanticObjects[N];}if(!!O.semanticObjectMappings&&O.semanticObjectMappings.length>0){O.semanticObjectMappings[N]={semanticObject:y.semanticObjects[N],items:O.semanticObjectMappings[N].items};}if(O.semanticObjects[N]){O.semanticObjects[N]=y.semanticObjects[N];}else{O.semanticObjects.splice(N,1);}}for(var M=0;M<O.semanticObjectMappings.length;M++){if(O.semanticObjectMappings[M]&&O.semanticObjectMappings[M].semanticObject===undefined){O.semanticObjectMappings.splice(M,1);}}this.resolvedpayload=Object.assign({},O);}}}var D=O?O:t;var E=r._getSemanticObjects(D);var G=r._convertSemanticObjectMapping(r._getSemanticObjectMappings(D));if(!E.length){E.push("");}var R={};E.forEach(function(H){if(I){I.addContextObject(H,n);}R[H]={};for(var Q in n){var T=null,V=null;if(I){T=I.getSemanticObjectAttribute(H,Q);if(!T){T=I.createAttributeStructure();I.addSemanticObjectAttribute(H,Q,T);}}if(n[Q]===undefined||n[Q]===null){if(T){T.transformations.push({value:undefined,description:"\u2139 Undefined and null values have been removed in SimpleLinkDelegate."});}continue;}if(g(n[Q])){if(G&&G[H]){var W=Object.keys(G[H]);var Y,Z,$,a1;for(var i=0;i<W.length;i++){a1=W[i];if(a1.indexOf(Q)===0){Y=G[H][a1];Z=a1.split("/")[a1.split("/").length-1];$=n[Q][Z];if(Y&&Z&&$){R[H][Y]=$;}}}}if(T){T.transformations.push({value:undefined,description:"\u2139 Plain objects has been removed in SimpleLinkDelegate."});}continue;}var b1=G&&G[H]&&G[H][Q]?G[H][Q]:Q;if(T&&Q!==b1){V={value:undefined,description:"\u2139 The attribute "+Q+" has been renamed to "+b1+" in SimpleLinkDelegate.",reason:"\ud83d\udd34 A com.sap.vocabularies.Common.v1.SemanticObjectMapping annotation is defined for semantic object "+H+" with source attribute "+Q+" and target attribute "+b1+". You can modify the annotation if the mapping result is not what you expected."};}if(R[H][b1]){S.error("SimpleLinkDelegate: The attribute "+Q+" can not be renamed to the attribute "+b1+" due to a clash situation. This can lead to wrong navigation later on.");}R[H][b1]=n[Q];if(T){if(V){T.transformations.push(V);var c1=I.createAttributeStructure();c1.transformations.push({value:n[Q],description:"\u2139 The attribute "+b1+" with the value "+n[Q]+" has been added due to a mapping rule regarding the attribute "+Q+" in SimpleLinkDelegate."});I.addSemanticObjectAttribute(H,b1,c1);}}}});return{payload:D,results:R};};r._retrieveNavigationTargets=function(A,t,u,I,v){if(!u.semanticObjects){return new Promise(function(i){i([]);});}var T=this;var w=u.semanticObjects;var N={ownNavigation:undefined,availableActions:[]};var x=0;return sap.ui.getCore().loadLibrary("sap.ui.fl",{async:true}).then(function(){return new Promise(function(y){sap.ui.require(["sap/ui/fl/Utils"],function(U){var z=U.getAppComponentForControl(v===undefined?T.oControl:v);var B=z?z.getShellServices():null;if(!B){return y(N.availableActions,N.ownNavigation);}if(!B.hasUShell()){S.error("SimpleLinkDelegate: Service 'CrossApplicationNavigation' or 'URLParsing' could not be obtained");return y(N.availableActions,N.ownNavigation);}var D=w.map(function(i){return[{semanticObject:i,params:t?t[i]:undefined,appStateKey:A,sortResultsBy:"text"}];});return B.getLinks(D).then(function(E){var H=false;for(var i=0;i<E.length;i++){for(var j=0;j<E[i].length;j++){if(E[i][j].length>0){H=true;break;}if(H){break;}}}if(!E||!E.length||!H){return y(N.availableActions,N.ownNavigation);}var G=r._getSemanticObjectUnavailableActions(u);var M=r._convertSemanticObjectUnavailableAction(G);var O=B.hrefForExternal();if(O&&O.indexOf("?")!==-1){O=O.split("?")[0];}if(O){O+="?";}var Q=function(W,Y){return(!!M&&!!M[W]&&M[W].indexOf(Y)>-1);};var R=function(v){var W=B.parseShellHash(v.intent);if(Q(W.semanticObject,W.action)){return;}var Y="#"+B.constructShellHash({target:{shellHash:v.intent}});if(v.intent&&v.intent.indexOf(O)===0){N.ownNavigation=new b({href:Y,text:v.text});return;}var Z=new b({key:W.semanticObject&&W.action?W.semanticObject+"-"+W.action:undefined,text:v.text,description:undefined,href:Y,icon:undefined,initiallyVisible:v.tags&&v.tags.indexOf("superiorAction")>-1});if(Z.getProperty("initiallyVisible")){x++;}N.availableActions.push(Z);if(I){I.addSemanticObjectIntent(W.semanticObject,{intent:Z.getHref(),text:Z.getText()});}};for(var n=0;n<w.length;n++){E[n][0].forEach(R);}if(x===0){for(var V=0;V<N.availableActions.length;V++){if(V<T.getConstants().iLinksShownInPopup){N.availableActions[V].setProperty("initiallyVisible",true);}else{break;}}}return y(N.availableActions,N.ownNavigation);},function(){S.error("SimpleLinkDelegate: '_retrieveNavigationTargets' failed executing getLinks method");return y(N.availableActions,N.ownNavigation);});});});});};r._getSemanticObjects=function(i){return i.semanticObjects?i.semanticObjects:[];};r._getSemanticObjectUnavailableActions=function(i){var j=[];if(i.semanticObjectUnavailableActions){i.semanticObjectUnavailableActions.forEach(function(n){j.push(new l({semanticObject:n.semanticObject,actions:n.actions}));});}return j;};r._getSemanticObjectMappings=function(i){var j=[];var n=[];if(i.semanticObjectMappings){i.semanticObjectMappings.forEach(function(t){n=[];if(t.items){t.items.forEach(function(u){n.push(new k({key:u.key,value:u.value}));});}j.push(new h({semanticObject:t.semanticObject,items:n}));});}return j;};r._convertSemanticObjectMapping=function(i){if(!i.length){return undefined;}var j={};i.forEach(function(n){if(!n.getSemanticObject()){throw Error("SimpleLinkDelegate: 'semanticObject' property with value '"+n.getSemanticObject()+"' is not valid");}j[n.getSemanticObject()]=n.getItems().reduce(function(M,I){M[I.getKey()]=I.getValue();return M;},{});});return j;};r._convertSemanticObjectUnavailableAction=function(i){if(!i.length){return undefined;}var j={};i.forEach(function(n){if(!n.getSemanticObject()){throw Error("SimpleLinkDelegate: 'semanticObject' property with value '"+n.getSemanticObject()+"' is not valid");}j[n.getSemanticObject()]=n.getActions();});return j;};return r;},true);