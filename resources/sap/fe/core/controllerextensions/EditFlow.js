/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/core/mvc/OverrideExecution","sap/fe/core/actions/sticky","sap/base/Log","sap/m/Text","sap/m/Button","sap/m/Dialog","sap/fe/core/CommonUtils","sap/fe/core/BusyLocker","sap/fe/core/library","sap/ui/model/odata/v4/ODataListBinding","sap/fe/core/helpers/SemanticKeyHelper","sap/fe/core/helpers/EditState","sap/fe/core/helpers/FPMHelper","sap/ui/core/message/Message","sap/ui/core/MessageType","sap/fe/core/helpers/ModelHelper"],function(C,O,s,L,T,B,D,a,b,F,c,S,E,d,M,f,g){"use strict";var h=F.CreationMode,P=F.ProgrammingModel,j=F.Constants,k=F.DraftStatus,l=F.EditMode;var m=C.extend("sap.fe.core.controllerextensions.EditFlow",{metadata:{methods:{editDocument:{"public":true,"final":true},updateDocument:{"public":true,"final":true},createDocument:{"public":true,"final":true},saveDocument:{"public":true,"final":true},cancelDocument:{"public":true,"final":true},deleteDocument:{"public":true,"final":true},deleteMultipleDocuments:{"public":true,"final":true},applyDocument:{"public":true,"final":true},invokeAction:{"public":true,"final":true},securedExecution:{"public":true,"final":true},onBeforeSave:{"public":true,"final":false,"overrideExecution":O.Instead}}},editDocument:function(o,p){p=p||{};var t=this,e=p.prepareOnEdit||undefined,i=true,n=this._getTransactionHelper();return n.editDocument(o,e,t.getView(),t._getMessageHandler()).then(function(N){var q=t._getProgrammingModel(o);if(q===P.Sticky){t._getInternalModel().setProperty("/sessionOn",true);}if(N){t._setEditMode(l.Editable,false);t._getMessageHandler().showMessageDialog();if(N!==o){return t._handleNewContext(N,true,undefined,i,true).then(function(){if(q===P.Sticky){t._handleStickyOn(N);}});}}});},deleteMultipleDocuments:function(e,p){return this.base.getView().getController()._editFlow.deleteMultipleDocuments(e,p);},updateDocument:function(o,p){var t=this,e=t._getTransactionHelper(),i=t._getProgrammingModel(o)===P.Draft;this._getMessageHandler().removeTransitionMessages();return this._syncTask(function(){e.handleDocumentModifications();E.setEditStateDirty();t._getMessageHandler().removeTransitionMessages();if(i){t._setDraftStatus(k.Saving);}return p.then(function(){if(i){var n=t.getView().getBindingContext(),q=n.getModel().getMetaModel(),r=q.getMetaContext(n.getPath()).getObject("@sapui.name"),u=S.getSemanticKeys(q,r);if(u&&u.length){var v=t.base.getAppComponent().getRoutingService().getLastSemanticMapping(),w=v&&v.semanticPath,x=S.getSemanticPath(n,true);if(w!==x){return t._handleNewContext(n,true,undefined,true).then(function(){t._setDraftStatus(k.Saved);});}else{t._setDraftStatus(k.Saved);}}else{t._setDraftStatus(k.Saved);}}},function(){if(i){t._setDraftStatus(k.Clear);}}).catch(function(n){L.error("Error while updating the document",n);}).finally(function(){t._getMessageHandler().showMessages();});});},createDocument:function(v,p){var t=this,e=this._getTransactionHelper(),o=this._getGlobalUIModel(),i,n=0,r=t.getView().getController().oResourceBundle,q=!p||(p.creationMode!==h.Inline&&p.creationMode!==h.CreationRow&&p.creationMode!==h.External),u=Promise.resolve([]),A=a.getAppComponent(this.getView());A.getRouterProxy().removeIAppStateKey();if(p.creationMode===h.External){return this._syncTask().then(function(){var J=t.getView().getController(),K=g.getAbsoluteMetaPathForListBinding(t.getView(),v);J.handlers.onChevronPressNavigateOutBound(J,p.outbound,undefined,K);});}if(p.creationMode===h.CreationRow&&p.creationRow){i=p.creationRow.getParent();var w=i.getCreationRow().data("customValidationFunction");if(w){var x=w.substring(0,w.lastIndexOf(".")||-1).replace(/\./gi,"/"),y=w.substring(w.lastIndexOf(".")+1,w.length),z=p.creationRow.getBindingContext().getObject();delete z["@$ui5.context.isTransient"];u=d.validationWrapper(x,y,z,t.base.getView(),i.getBindingContext("internal"));}if(i.getCreationRow().data("disableAddRowButtonForEmptyData")==="true"){var I=i.getBindingContext("internal");I.setProperty("creationRowFieldValidity",{});}}if(p.creationMode===h.Inline&&p.tableId){i=this.getView().byId(p.tableId);}function G(J,K){K.then(function(N){return N.created();}).then(function(){var N=t.getView().getBindingContext();if(!a.hasTransientContext(J)){var A=a.getAppComponent(t.getView());A.getSideEffectsService().requestSideEffectsForNavigationProperty(J.getPath(),N);}}).catch(function(N){L.error("Error while creating the document",N);});}function H(V){var w=i&&i.getCreationRow().data("customValidationFunction"),J=i&&i.getBindingContext("internal").getProperty("creationRowCustomValidity"),K=sap.ui.getCore().getMessageManager(),N=[],Q,R;K.getMessageModel().getData().forEach(function(U){if(U.code===w){K.removeMessages(U);}});V.forEach(function(U){if(U.messageTarget){Q=sap.ui.getCore().getControl(J[U.messageTarget].fieldId);R=Q.getBindingContext().getPath()+"/"+Q.getBindingPath("value");if(K.getMessageModel().getData().filter(function(X){return X.target===R;}).length===0){K.addMessages(new M({message:U.messageText,processor:t.getView().getModel(),type:f.Error,code:w,technical:false,persistent:false,target:R}));}var W=K.getMessageModel().getData().filter(function(X){return X.target===R;});W[0].addControlId(J[U.messageTarget].fieldId);}else{N.push({code:w,text:U.messageText,persistent:true,type:f.Error});}});if(N.length>0){t._getMessageHandler().showMessageDialog({customMessages:N});}}q&&b.lock(o);return this._syncTask(u).then(function(V){if(V.length>0){H(V);L.error("Custom Validation failed");return;}var J,K,N;p=p||{};if(v&&typeof v==="object"){K=v;}else if(typeof v==="string"){K=new c(t.getView().getModel(),v);p.creationMode=h.Sync;delete p.createAtEnd;}else{throw new Error("Binding object or path expected");}N=K.getModel();n=K.iMaxLength||0;var Q=p.creationMode;return Promise.resolve(t._getProgrammingModel(K)).then(function(R){J=R;if(Q&&Q!==h.NewPage){return Q;}else{var U=N.getMetaModel();if(!K.isRelative()){var W=K.getPath(),X=J===P.Draft?U.getObject(W+"@com.sap.vocabularies.Common.v1.DraftRoot/NewAction"):U.getObject(W+"@com.sap.vocabularies.Session.v1.StickySessionSupported/NewAction");if(X){var Y=U.getObject("/"+X+"/@$ui5.overload/0/$Parameter")||[];if(Y.length>1){return h.Deferred;}}}var Z=U.getMetaPath(K.getHeaderContext().getPath());var $=a.getNonComputedVisibleFields(U,Z);if($.length>0){return h.Deferred;}return h.Async;}}).then(function(Q){var R,U,W=p.creationRow,X,Y=Promise.resolve(),Z,$,_=N.getMetaModel(),a1=t._getRoutingListener();if(Q!==h.Deferred){if(Q===h.CreationRow){X=W.getBindingContext();$=_.getMetaPath(X.getPath());Z=X.getObject();p.data={};Object.keys(Z).forEach(function(d1){var e1=_.getObject($+"/"+d1);if(e1&&e1.$kind==="NavigationProperty"){return;}p.data[d1]=Z[d1];});Y=t._checkForValidationErrors(X);}if(Q===h.CreationRow||Q===h.Inline){p.keepTransientContextOnFailed=false;p.busyMode="Local";t._handleCreateEvents(K);}R=Y.then(function(){if(!p.parentControl){p.parentControl=t.getView();}return e.createDocument(K,p,r,t._getMessageHandler());});}var b1;switch(Q){case h.Deferred:b1=a1.navigateForwardToContext(K,{bDeferredContext:true,editable:true,bForceFocus:true});break;case h.Async:b1=a1.navigateForwardToContext(K,{asyncContext:R,editable:true,bForceFocus:true});break;case h.Sync:U={editable:true,bForceFocus:true};if(J==P.Sticky||p.createAction){U.transient=true;}b1=R.then(function(d1){if(!d1){var r=sap.ui.getCore().getLibraryResourceBundle("sap.fe.core");return a1.navigateToMessagePage(r.getText("C_COMMON_SAPFE_DATA_RECEIVED_ERROR"),{title:r.getText("C_COMMON_SAPFE_ERROR"),description:r.getText("C_EDITFLOW_SAPFE_CREATION_FAILED_DESCRIPTION")});}else{return a1.navigateForwardToContext(d1,U);}});break;case h.Inline:b1=G(K,R);t._syncTask(R);break;case h.CreationRow:b1=Y.then(function(){var d1=X.getBinding(),e1;if(!p.bSkipSideEffects){G(K,R);}e1=d1.create();W.setBindingContext(e1);e1.created().catch(function(){L.trace("transient fast creation context deleted");});return X.delete("$direct");}).catch(function(d1){if(b.isLocked(t.getView().getModel("ui"))){b.unlock(t.getView().getModel("ui"));}L.error("CreationRow navigation error: ",d1);});break;default:b1=Promise.reject("Unhandled creationMode "+Q);break;}if(J===P.Sticky){t._getInternalModel().setProperty("/sessionOn",true);}var c1=p.creationMode!==h.CreationRow&&p.creationMode!==h.Inline;if(R){return Promise.all([R,b1]).then(function(d1){if(c1){t._setEditMode(l.Editable,c1);}else{t._setEditMode(l.Editable);}var e1=d1[0];if(e1){E.setEditStateDirty();if(J===P.Sticky){t._handleStickyOn(e1);}}}).catch(function(d1){if(d1&&d1.navigateBackFromTransientState){a1.navigateBackFromTransientState();}return Promise.reject(d1);});}});}).finally(function(){if(i&&i.isA("sap.ui.mdc.Table")){var J=p.creationMode===h.Inline?i.focusRow.bind(i):i.scrollToIndex.bind(i);i.getRowBinding().attachEventOnce("change",function(){switch(p.createAtEnd){case true:if(i.data("tableType")==="ResponsiveTable"&&i.getThreshold()){J(i.getThreshold(),true);}else{J(n,true);}break;case false:J(0,true);break;}});}q&&b.unlock(o);});},onBeforeSave:function(){return Promise.resolve();},saveDocument:function(o,p){p=p||{};var t=this,e=p.bExecuteSideEffectsOnError||undefined,i=true,n=this._getTransactionHelper(),r=t.getView().getController().oResourceBundle,q=p.bindings;return(this._syncTask().then(this._submitOpenChanges.bind(this,o)).then(this._checkForValidationErrors.bind(this,o)).then(this.base.editFlow.onBeforeSave.bind(this)).then(n.saveDocument.bind(n,o,r,e,q,t._getMessageHandler())).then(function(A){var u=t._getProgrammingModel(o);t._removeContextsFromPages();if(u===P.Sticky){t._getInternalModel().setProperty("/sessionOn",false);t._handleStickyOff(o);}t._setEditMode(l.Display,false);t._getMessageHandler().showMessageDialog();if(A!==o){t._handleNewContext(A,false,undefined,i,true);}}).catch(function(u){L.error("Error while saving the document",u);return Promise.reject(u);}));},toggleDraftActive:function(o){var e=o.getObject();var t=this;var i;var I=o&&this._getProgrammingModel(o)===P.Draft;var n=o.getModel().bindContext(o.getPath()+"/SiblingEntity").getBoundContext();if(!I||!((!e.IsActiveEntity&&e.HasActiveEntity)||(e.IsActiveEntity&&e.HasDraftEntity))){return;}if(!e.IsActiveEntity&&e.HasActiveEntity){i=false;}else if(e.IsActiveEntity&&e.HasDraftEntity){i=true;}n.requestCanonicalPath().then(function(p){return n.getModel().bindContext(p).getBoundContext();}).then(function(n){t._setEditMode(i?l.Editable:l.Display,false);t._handleNewContext(n,i,true,true,true);}).catch(function(p){return Promise.reject("Error in EditFlow.toggleDraftActive:"+p);});},cancelDocument:function(o,p){var t=this,e=this._getTransactionHelper(),r=t.getView().getController().oResourceBundle;p.cancelButton=p.control||p.cancelButton;return this._syncTask().then(e.cancelDocument.bind(e,o,p,r,t._getMessageHandler())).then(function(A){var i=true,n=t._getProgrammingModel(o);t._removeContextsFromPages();if(n===P.Sticky){t._getInternalModel().setProperty("/sessionOn",false);t._handleStickyOff(o);}t._setEditMode(l.Display,false);t._setDraftStatus(k.Clear);if(!A){E.setEditStateDirty();t._getRoutingListener().navigateBackFromContext(o);}else if(n===P.Draft){return t._fetchSemanticKeyValues(A).then(function(){if(p.bSkipBindingToView){return A;}else{return t._handleNewContext(A,false,true,i,true);}});}else{return t._handleNewContext(A,false,undefined,i,true);}});},deleteDocument:function(o,p){var t=this;var A=a.getAppComponent(t.getView());if(!p){p={bFindActiveContexts:false};}else{p.bFindActiveContexts=false;}return this._deleteDocumentTransaction(o,p).then(function(){E.setEditStateDirty();t._getRoutingListener().navigateBackFromContext(o);if(A){A.getShellServices().setBackNavigation();}});},applyDocument:function(o){var t=this,e=this._getGlobalUIModel();b.lock(e);return(this._submitOpenChanges(o).then(this._checkForValidationErrors.bind(this,o)).then(function(){t._getMessageHandler().showMessageDialog();t._getRoutingListener().navigateBackFromContext(o);return true;}).finally(function(){if(b.isLocked(e)){b.unlock(e);}}));},invokeAction:function(A,p){var t=this,o,e=this._getTransactionHelper(),i,n,q,r,u,v=this.getView();p=p||{};if((p.isA&&p.isA("sap.ui.model.odata.v4.Context"))||Array.isArray(p)||arguments.length===3){var w=p;p=arguments[2]||{};if(w){p.contexts=w;}else{p.model=this.getView().getModel();}}p.isNavigable=p.requiresNavigation||p.isNavigable;if(!p.parentControl){p.parentControl=this.getView();}if(p.prefix){o=this.getView().byId(p.prefix);if(o){p.internalModelContext=o.getBindingContext("internal");}}else{p.internalModelContext=v.getBindingContext("internal");}if(A&&A.indexOf("(")>-1){q=A.split("(");A=q[0];r=q[q.length-1].replaceAll(")","");}if(p.bStaticAction){if(o.isTableBound()){p.contexts=o.getRowBinding().getHeaderContext();}else{var x=o.data("rowsBindingInfo").path,y=new c(t.getView().getModel(),x);p.contexts=y.getHeaderContext();}if(r){var z=p.contexts.getModel().getMetaModel().getMetaContext(p.contexts.getPath()).getObject("$Type");if(r!==z){i=o;while(i){n=i.getBindingContext();if(n&&n.getModel().getMetaModel().getMetaContext(n.getPath()).getObject("$Type")===r){p.contexts=n;break;}else{i=i.getParent();}}if(!p.contexts){return Promise.reject("Context not found for entity type "+r);}}}if(p.enableAutoScroll){u=this._createActionPromise(A,o.sId);}}if(p.isNavigable){p.bGetBoundContext=false;}else{p.bGetBoundContext=true;}p.bObjectPage=v.getViewData().converterType==="ObjectPage";return this._syncTask().then(e.callAction.bind(e,A,p,t.getView(),t._getMessageHandler())).then(function(R){if(p.contexts){return t._refreshListIfRequired(t._getActionResponseDataAndKeys(A,R),p.contexts[0]).then(function(){return R;});}}).then(function(R){if(u){u.fResolver(R);}if(p.contexts){E.setEditStateDirty();}if(p.isNavigable){var G=R;if(Array.isArray(G)&&G.length===1){G=G[0];}if(G&&!Array.isArray(G)){var H=v.getModel().getMetaModel();var I=H.getMetaPath(G.getPath());var J=Array.isArray(p.contexts)?p.contexts[0]:p.contexts;var K=J&&H.getMetaPath(J.getPath());if(I!=undefined&&I===K){if(J.getPath()!==G.getPath()){t._getRoutingListener().navigateForwardToContext(G,{noHistoryEntry:false});}else{L.info("Navigation to the same context is not allowed");}}}}}).catch(function(G){if(u){u.fRejector();}if(G==j.CancelActionDialog){return Promise.reject("Dialog cancelled.");}else{return Promise.reject("Error in EditFlow.invokeAction:"+G);}});},securedExecution:function(e,p){var i=p&&p.busy&&p.busy.set!==undefined?p.busy.set:true,n=p&&p.busy&&p.busy.check!==undefined?p.busy.check:true,u=(p&&p.updatesDocument)||false,o=this._getGlobalUIModel(),q=this.base.getView().getBindingContext(),I=q&&this._getProgrammingModel(q)===P.Draft,t=this;if(n&&b.isLocked(o)){return Promise.reject("Application already busy therefore execution rejected");}if(i){b.lock(o);}if(u&&I){this._setDraftStatus(k.Saving);}this._getMessageHandler().removeTransitionMessages();return this._syncTask(e).then(function(){if(u){t._getTransactionHelper().handleDocumentModifications();E.setEditStateDirty();if(I){t._setDraftStatus(k.Saved);}}}).catch(function(r){if(u&&I){t._setDraftStatus(k.Clear);}return Promise.reject(r);}).finally(function(){if(i){b.unlock(o);}return t._getMessageHandler().showMessageDialog();});},handlePatchSent:function(e){var t=this;this.mPatchPromises=this.mPatchPromises?this.mPatchPromises:{};var p=new Promise(function(r,i){t.mPatchPromises[e.getSource()]={resolvePatchPromise:r,rejectPatchPromise:i};});this.updateDocument(e.getSource(),p);},handlePatchCompleted:function(e){var i=e.getParameter("success");if(i){this.mPatchPromises[e.getSource()].resolvePatchPromise();}else{this.mPatchPromises[e.getSource()].rejectPatchPromise();}delete this.mPatchPromises[e.getSource()];},_setEditMode:function(e,i){this.base.getView().getController()._editFlow.setEditMode(e,i);},_setDraftStatus:function(e){this.base.getView().getController()._editFlow.setDraftStatus(e);},_getRoutingListener:function(){return this.base.getView().getController()._editFlow.getRoutingListener();},_getGlobalUIModel:function(){return this.base.getView().getController()._editFlow.getGlobalUIModel();},_syncTask:function(t){return this.base.getView().getController()._editFlow.syncTask(t);},_getProgrammingModel:function(o){return this.base.getView().getController()._editFlow.getProgrammingModel(o);},_deleteDocumentTransaction:function(o,p){return this.base.getView().getController()._editFlow.deleteDocumentTransaction(o,p);},_handleCreateEvents:function(o){this.base.getView().getController()._editFlow.handleCreateEvents(o);},_getTransactionHelper:function(){return this.base.getView().getController()._editFlow.getTransactionHelper();},_getInternalModel:function(){return this.base.getView().getController()._editFlow.getInternalModel();},_createActionPromise:function(A,e){return this.base.getView().getController()._editFlow.createActionPromise(A,e);},_getCurrentActionPromise:function(){return this.base.getView().getController()._editFlow.getCurrentActionPromise();},_deleteCurrentActionPromise:function(){return this.base.getView().getController()._editFlow.deleteCurrentActionPromise();},_getMessageHandler:function(){return this.base.getView().getController()._editFlow.getMessageHandler();},_getActionResponseDataAndKeys:function(A,r){return this.base.getView().getController()._editFlow.getActionResponseDataAndKeys(A,r);},_submitOpenChanges:function(o){var e=o.getModel(),i=this._getGlobalUIModel();return e.submitBatch("$auto").then(function(){if(e.hasPendingChanges("$auto")){return Promise.reject("submit of open changes failed");}}).finally(function(){if(b.isLocked(i)){b.unlock(i);}});},_handleStickyOn:function(o){var t=this,A=a.getAppComponent(this.getView());if(!A.getRouterProxy().hasNavigationGuard()){var H=A.getRouterProxy().getHash(),i=this._getInternalModel();setTimeout(function(){A.getRouterProxy().setNavigationGuard();},0);A.getShellServices().setBackNavigation(t._onBackNavigationInSession.bind(t));this.fnDirtyStateProvider=function(n){var p=n.innerAppRoute,r=A.getRouterProxy(),q,u=i.getProperty("/sessionOn");if(!u){return;}if(!r.isNavigationFinalized()){q=false;H=p;}else if(H===p){q=true;}else if(r.checkHashWithGuard(p)||r.isGuardCrossAllowedByUser()){H=p;q=false;}else{q=true;}if(q){setTimeout(function(){A.getShellServices().setDirtyFlag(false);},0);}return q;};A.getShellServices().registerDirtyStateProvider(this.fnDirtyStateProvider);var e=this.getView().getModel("sap.fe.i18n");this.fnHandleSessionTimeout=function(){t._getMessageHandler().removeTransitionMessages();var n=new D({title:"{sap.fe.i18n>C_EDITFLOW_OBJECT_PAGE_SESSION_EXPIRED_DIALOG_TITLE}",state:"Warning",content:new T({text:"{sap.fe.i18n>C_EDITFLOW_OBJECT_PAGE_SESSION_EXPIRED_DIALOG_MESSAGE}"}),beginButton:new B({text:"{sap.fe.i18n>C_COMMON_DIALOG_OK}",type:"Emphasized",press:function(){t._handleStickyOff();t._getRoutingListener().navigateBackFromContext(o);}}),afterClose:function(){n.destroy();}});n.addStyleClass("sapUiContentPadding");n.setModel(e,"sap.fe.i18n");t.getView().addDependent(n);n.open();};this.getView().getModel().attachSessionTimeout(this.fnHandleSessionTimeout);this._fnStickyDiscardAfterNavigation=function(){var n=A.getRouterProxy().getHash();if(!n||!A.getRouterProxy().checkHashWithGuard(n)){t._discardStickySession(o);}};A.getRoutingService().attachRouteMatched(this._fnStickyDiscardAfterNavigation);}},_handleStickyOff:function(){var A=a.getAppComponent(this.getView());if(A.getRouterProxy){A.getRouterProxy().discardNavigationGuard();}if(this.fnDirtyStateProvider){A.getShellServices().deregisterDirtyStateProvider(this.fnDirtyStateProvider);this.fnDirtyStateProvider=null;}if(this.getView().getModel()&&this.fnHandleSessionTimeout){this.getView().getModel().detachSessionTimeout(this.fnHandleSessionTimeout);}A.getRoutingService().detachRouteMatched(this._fnStickyDiscardAfterNavigation);this._fnStickyDiscardAfterNavigation=null;this._setEditMode(l.Display,false);if(A){A.getShellServices().setBackNavigation();}},_handleNewContext:function(o,e,r,i,n){E.setEditStateDirty();return this._getRoutingListener().navigateToContext(o,{checkNoHashChange:true,editable:e,bPersistOPScroll:true,bRecreateContext:r,bDraftNavigation:i,showPlaceholder:false,bForceFocus:n});},_checkForValidationErrors:function(o){var t=this;return this._syncTask().then(function(){var v=t.base.getView().getId();var e=sap.ui.getCore().getMessageManager().getMessageModel().getData(),n,p;if(!e.length){return Promise.resolve("No validation errors found");}for(var i=0;i<e.length;i++){p=e[i];if(p.validation){n=sap.ui.getCore().byId(p.getControlId());while(n){if(n.getId()===v){return Promise.reject("validation errors exist");}n=n.getParent();}}}});},_onBackNavigationInSession:function(){var t=this,v=t.getView(),A=a.getAppComponent(v),r=A.getRouterProxy();if(r.checkIfBackIsOutOfGuard()){var o=v&&v.getBindingContext();a.processDataLossConfirmation(function(){t._discardStickySession(o);history.back();},v,t._getProgrammingModel(o));return;}history.back();},_discardStickySession:function(o){s.discardDocument(o);this._handleStickyOff();},_refreshListIfRequired:function(r,o){if(!o||!r||!r.oData){return Promise.resolve();}var i=o.getBinding();if(i&&i.isA("sap.ui.model.odata.v4.ODataListBinding")){var t=this,n=r.oData,K=r.keys,p=o.getObject(),R=true;if(Object.keys(n).length){R=K.every(function(e){return p[e]===n[e];});if(!R){return new Promise(function(q,u){if(i.isRoot()){i.attachEventOnce("dataReceived",function(){q();});i.refresh();}else{var A=a.getAppComponent(t.getView());A.getSideEffectsService().requestSideEffects([{$NavigationPropertyPath:i.getPath()}],i.getContext()).then(function(){q();},function(){L.error("Error while refreshing the table");q();}).catch(function(e){L.error("Error while refreshing the table",e);});}});}}}return Promise.resolve();},_fetchSemanticKeyValues:function(o){var e=o.getModel().getMetaModel(),i=e.getMetaContext(o.getPath()).getObject("@sapui.name"),n=S.getSemanticKeys(e,i);if(n&&n.length){var r=n.map(function(K){return o.requestObject(K.$PropertyPath);});return Promise.all(r);}else{return Promise.resolve();}},_removeContextsFromPages:function(){var p=[];var A=a.getAppComponent(this.getView());if(A._isFclEnabled()){p=p.concat(A.getRootContainer().getMidColumnPages()||[]);p=p.concat(A.getRootContainer().getEndColumnPages()||[]);}else{p=A.getRootContainer().getPages()||[];}p.forEach(function(o){if(o.isA("sap.ui.core.ComponentContainer")){o=o.getComponentInstance();}if(o.getBindingContext()){o.setBindingContext(null);}});}});return m;});
