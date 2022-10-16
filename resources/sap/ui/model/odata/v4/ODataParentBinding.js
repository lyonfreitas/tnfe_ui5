/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataBinding","./SubmitMode","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/ChangeReason"],function(C,a,S,_,L,b,c){"use strict";function O(){a.call(this);this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aChildCanUseCachePromises=[];this.bHasPathReductionToParent=false;this.iPatchCounter=0;this.bPatchSuccess=true;this.oReadGroupLock=undefined;this.oRefreshPromise=null;this.oResumePromise=undefined;}a(O.prototype);var s="sap.ui.model.odata.v4.ODataParentBinding";O.prototype.attachPatchCompleted=function(f,l){this.attachEvent("patchCompleted",f,l);};O.prototype.detachPatchCompleted=function(f,l){this.detachEvent("patchCompleted",f,l);};O.prototype.doSuspend=function(){};O.prototype.firePatchCompleted=function(e){if(this.iPatchCounter===0){throw new Error("Completed more PATCH requests than sent");}this.iPatchCounter-=1;this.bPatchSuccess=this.bPatchSuccess&&e;if(this.iPatchCounter===0){this.fireEvent("patchCompleted",{success:this.bPatchSuccess});this.bPatchSuccess=true;}};O.prototype.attachPatchSent=function(f,l){this.attachEvent("patchSent",f,l);};O.prototype.detachPatchSent=function(f,l){this.detachEvent("patchSent",f,l);};O.prototype.firePatchSent=function(){this.iPatchCounter+=1;if(this.iPatchCounter===1){this.fireEvent("patchSent");}};O.prototype._findEmptyPathParentContext=function(o){if(this.sPath===""&&this.oContext.getBinding){return this.oContext.getBinding()._findEmptyPathParentContext(this.oContext);}return o;};O.prototype.aggregateQueryOptions=function(q,B,e){var A=_.merge({},e&&this.mLateQueryOptions||this.mAggregatedQueryOptions),f=false,t=this;function m(g,Q,M,i,h){function j(E){var l=!g.$expand[E],n=M+"/"+E;if(l){g.$expand[E]={};if(e&&t.oModel.getMetaModel().fetchObject(n).getResult().$isCollection){return false;}f=true;}return m(g.$expand[E],Q.$expand[E],n,true,l);}function k(l){if(g.$select.indexOf(l)<0){f=true;g.$select.push(l);}return true;}return(!i||Object.keys(g).every(function(n){return n in Q||n==="$count"||n==="$expand"||n==="$select";}))&&Object.keys(Q).every(function(n){switch(n){case"$count":if(Q.$count){g.$count=true;}return true;case"$expand":g.$expand=g.$expand||{};return Object.keys(Q.$expand).every(j);case"$select":g.$select=g.$select||[];return Q.$select.every(k);default:if(h){g[n]=Q[n];return true;}return Q[n]===g[n];}});}if(m(A,q,B)){if(!e){this.mAggregatedQueryOptions=A;}else if(f){this.mLateQueryOptions=A;}return true;}return false;};O.prototype.changeParameters=function(p){var B=Object.assign({},this.mParameters),e,k,t=this;function u(n){if(t.oModel.bAutoExpandSelect&&(n==="$expand"||n==="$select")){throw new Error("Cannot change "+n+" parameter in auto-$expand/$select mode: "+JSON.stringify(p[n])+" !== "+JSON.stringify(B[n]));}if(n==="$filter"||n==="$search"){e=c.Filter;}else if(n==="$orderby"&&e!==c.Filter){e=c.Sort;}else if(!e){e=c.Change;}}if(!p){throw new Error("Missing map of binding parameters");}for(k in p){if(k.startsWith("$$")){if(p[k]===B[k]){continue;}throw new Error("Unsupported parameter: "+k);}if(p[k]===undefined&&B[k]!==undefined){u(k);delete B[k];}else if(B[k]!==p[k]){u(k);if(typeof p[k]==="object"){B[k]=_.clone(p[k]);}else{B[k]=p[k];}}}if(e){if(this.hasPendingChanges(true)){throw new Error("Cannot change parameters due to pending changes");}this.applyParameters(B,e);}};O.prototype.checkUpdateInternal=function(f){var t=this;function u(){return b.all(t.getDependentBindings().map(function(D){return D.checkUpdateInternal();}));}if(f!==undefined){throw new Error("Unsupported operation: "+s+"#checkUpdateInternal must not"+" be called with parameters");}return this.oCachePromise.then(function(o){if(o&&t.bRelative){return t.fetchResourcePath(t.oContext).then(function(r){if(o.getResourcePath()===r){return u();}return t.refreshInternal("");});}return u();});};O.prototype.createInCache=function(u,v,e,t,i,E,f){var g=this;return this.oCachePromise.then(function(o){var p;if(o){p=_.getRelativePath(e,g.getResolvedPath());return o.create(u,v,p,t,i,E,f).then(function(h){if(g.mCacheByResourcePath){delete g.mCacheByResourcePath[o.getResourcePath()];}return h;});}return g.oContext.getBinding().createInCache(u,v,e,t,i,E,f);});};O.prototype.createReadGroupLock=function(g,l,i){var G,t=this;function e(){t.oModel.addPrerenderingTask(function(){i-=1;if(i>0){Promise.resolve().then(e);}else if(t.oReadGroupLock===G){L.debug("Timeout: unlocked "+G,null,s);t.removeReadGroupLock();}});}this.removeReadGroupLock();this.oReadGroupLock=G=this.lockGroup(g,l);if(l){i=2+(i||0);e();}};O.prototype.createRefreshPromise=function(){var p,r;p=new Promise(function(e){r=e;});p.$resolve=r;this.oRefreshPromise=p;return p;};O.prototype.deleteFromCache=function(g,e,p,E,D,f){var G;if(this.oCache===undefined){throw new Error("DELETE request not allowed");}if(this.oCache){G=g.getGroupId();if(!this.oModel.isAutoGroup(G)&&!this.oModel.isDirectGroup(G)){throw new Error("Illegal update group ID: "+G);}return this.oCache._delete(g,e,p,E,D,f);}return this.oContext.getBinding().deleteFromCache(g,e,_.buildPath(this.oContext.iIndex,this.sPath,p),E,D,f);};O.prototype.destroy=function(){this.aChildCanUseCachePromises=[];this.removeReadGroupLock();this.oResumePromise=undefined;a.prototype.destroy.call(this);};O.prototype.fetchIfChildCanUseCache=function(o,e,v){var B=this.getBaseForPathReduction(),f=_.getMetaPath(o.getPath()),g,h,D=o.getPath().includes("(...)"),i=o.getIndex(),I=e[0]==="#",m=this.oModel.getMetaModel(),p,r=this.oModel.resolve(e,o),t=this;function j(){if(I){return m.fetchObject(f+"/");}return _.fetchPropertyAndType(t.oModel.oInterface.fetchMetadata,k(r));}function k(P){var i;P=_.getMetaPath(P);i=P.indexOf("@");return i>0?P.slice(0,i):P;}if(D&&!r.includes("/$Parameter/")||this.getRootBinding().isSuspended()||this.mParameters&&this.mParameters.$$aggregation){return b.resolve(r);}g=this.oCachePromise.isRejected()||i!==undefined&&i!==C.VIRTUAL||o.isKeepAlive()||this.oCache===null||this.oCache&&this.oCache.hasSentRequest();p=[this.doFetchQueryOptions(this.oContext),j(),v];h=b.all(p).then(function(R){var l=R[2],w,n=R[0],P=R[1],q,u;if(Array.isArray(P)){return undefined;}u=m.getReducedPath(r,B);q=_.getRelativePath(k(u),f);if(q===undefined){t.bHasPathReductionToParent=true;return t.oContext.getBinding().fetchIfChildCanUseCache(t.oContext,_.getRelativePath(r,t.oContext.getPath()),v);}if(D||q==="$count"||q.endsWith("/$count")){return u;}if(t.bAggregatedQueryOptionsInitial){t.selectKeyProperties(n,f);t.mAggregatedQueryOptions=_.clone(n);t.bAggregatedQueryOptionsInitial=false;}if(I){w={"$select":[q.slice(1)]};return t.aggregateQueryOptions(w,f,g)?u:undefined;}if(q===""||P&&(P.$kind==="Property"||P.$kind==="NavigationProperty")){w=_.wrapChildQueryOptions(f,q,l,t.oModel.oInterface.fetchMetadata);if(w){return t.aggregateQueryOptions(w,f,g)?u:undefined;}return undefined;}if(q==="value"){return t.aggregateQueryOptions(l,f,g)?u:undefined;}L.error("Failed to enhance query options for auto-$expand/$select as the path '"+r+"' does not point to a property",JSON.stringify(P),s);return undefined;}).then(function(R){if(t.mLateQueryOptions){if(t.oCache){t.oCache.setLateQueryOptions(t.mLateQueryOptions);}else if(t.oCache===null){return t.oContext.getBinding().fetchIfChildCanUseCache(t.oContext,t.sPath,b.resolve(t.mLateQueryOptions)).then(function(P){return P&&R;});}}return R;});this.aChildCanUseCachePromises.push(h);this.oCachePromise=b.all([this.oCachePromise,h]).then(function(R){var l=R[0];if(l&&!l.hasSentRequest()&&!t.oOperation){if(t.bSharedRequest){l.setActive(false);l=t.createAndSetCache(t.mAggregatedQueryOptions,l.getResourcePath(),o);}else{l.setQueryOptions(_.merge({},t.oModel.mUriParameters,t.mAggregatedQueryOptions));}}return l;});this.oCachePromise.catch(function(E){t.oModel.reportError(t+": Failed to enhance query options for "+"auto-$expand/$select for child "+e,s,E);});return h;};O.prototype.fetchResolvedQueryOptions=function(o){var f,m,M,e=this.oModel,q=this.getQueryOptionsFromParameters();if(!(e.bAutoExpandSelect&&q.$select)){return b.resolve(q);}f=e.oInterface.fetchMetadata;M=_.getMetaPath(e.resolve(this.sPath,o));m=Object.assign({},q,{$select:[]});return b.all(q.$select.map(function(g){return _.fetchPropertyAndType(f,M+"/"+g).then(function(){var w=_.wrapChildQueryOptions(M,g,{},f);if(w){_.aggregateExpandSelect(m,w);}else{_.addToSelect(m,[g]);}});})).then(function(){return m;});};O.prototype.getBaseForPathReduction=function(){var p,P;if(!this.isRoot()){p=this.oContext.getBinding();P=p.getUpdateGroupId();if(P===this.getUpdateGroupId()||this.oModel.getGroupProperty(P,"submit")!==S.API){return p.getBaseForPathReduction();}}return this.getResolvedPath();};O.prototype.getInheritableQueryOptions=function(){if(this.mLateQueryOptions){return _.merge({},this.mCacheQueryOptions,this.mLateQueryOptions);}return this.mCacheQueryOptions||_.getQueryOptionsForPath(this.oContext.getBinding().getInheritableQueryOptions(),this.sPath);};O.prototype.getGeneration=function(){return this.bRelative&&this.oContext.getGeneration&&this.oContext.getGeneration()||0;};O.prototype.getQueryOptionsForPath=function(p,o){if(Object.keys(this.mParameters).length){return _.getQueryOptionsForPath(this.getQueryOptionsFromParameters(),p);}o=o||this.oContext;if(!this.bRelative||!o.getQueryOptionsForPath){return{};}return o.getQueryOptionsForPath(_.buildPath(this.sPath,p));};O.prototype.getResumePromise=function(){return this.oResumePromise;};O.prototype.hasPendingChangesInDependents=function(i){return this.getDependentBindings().some(function(D){var o=D.oCache,h;if(i&&D.oContext.isKeepAlive()){return false;}if(o!==undefined){if(o&&o.hasPendingChangesForPath("")){return true;}}else if(D.hasPendingChangesForPath("")){return true;}if(D.mCacheByResourcePath){h=Object.keys(D.mCacheByResourcePath).some(function(p){var e=D.mCacheByResourcePath[p];return e!==o&&e.hasPendingChangesForPath("");});if(h){return true;}}return D.hasPendingChangesInDependents();})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.getResolvedPath().slice(1));};O.prototype.isPatchWithoutSideEffects=function(){return this.mParameters.$$patchWithoutSideEffects||!this.isRoot()&&this.oContext&&this.oContext.getBinding().isPatchWithoutSideEffects();};O.prototype.isMeta=function(){return false;};O.prototype.refreshDependentBindings=function(r,g,e,k){return b.all(this.getDependentBindings().map(function(D){return D.refreshInternal(r,g,e,k);}));};O.prototype.refreshDependentListBindingsWithoutCache=function(){return b.all(this.getDependentBindings().map(function(D){if(D.filter&&D.oCache===null){return D.refreshInternal("");}if(D.refreshDependentListBindingsWithoutCache){return D.refreshDependentListBindingsWithoutCache();}}));};O.prototype.removeReadGroupLock=function(){if(this.oReadGroupLock){this.oReadGroupLock.unlock(true);this.oReadGroupLock=undefined;}};O.prototype.refreshSuspended=function(g){if(g&&g!==this.getGroupId()){throw new Error(this+": Cannot refresh a suspended binding with group ID '"+g+"' (own group ID is '"+this.getGroupId()+"')");}this.setResumeChangeReason(c.Refresh);};O.prototype.resetChangesInDependents=function(p){this.getDependentBindings().forEach(function(D){p.push(D.oCachePromise.then(function(o){if(o){o.resetChangesForPath("");}D.resetInvalidDataState();}).unwrap());if(D.mCacheByResourcePath){Object.keys(D.mCacheByResourcePath).forEach(function(P){D.mCacheByResourcePath[P].resetChangesForPath("");});}D.resetChangesInDependents(p);});};O.prototype.resolveRefreshPromise=function(p){if(this.oRefreshPromise){this.oRefreshPromise.$resolve(p.catch(function(e){if(!e.canceled){throw e;}}));this.oRefreshPromise=null;}return p;};O.prototype._resume=function(A){var t=this;function e(){t.bSuspended=false;if(t.oResumePromise){t.resumeInternal(true);t.oResumePromise.$resolve();t.oResumePromise=undefined;}}if(this.oOperation){throw new Error("Cannot resume an operation binding: "+this);}if(!this.isRoot()){throw new Error("Cannot resume a relative binding: "+this);}if(!this.bSuspended){throw new Error("Cannot resume a not suspended binding: "+this);}if(A){this.createReadGroupLock(this.getGroupId(),true,1);this.oModel.addPrerenderingTask(e);}else{this.createReadGroupLock(this.getGroupId(),true);e();}};O.prototype.resume=function(){this._resume(false);};O.prototype.resumeAsync=function(){this._resume(true);return Promise.resolve(this.oResumePromise);};O.prototype.selectKeyProperties=function(q,m){_.selectKeyProperties(q,this.oModel.getMetaModel().getObject(m+"/"));};O.prototype.suspend=function(){var r;if(this.oOperation){throw new Error("Cannot suspend an operation binding: "+this);}if(!this.isRoot()){throw new Error("Cannot suspend a relative binding: "+this);}if(this.bSuspended){throw new Error("Cannot suspend a suspended binding: "+this);}if(this.hasPendingChanges(true)){throw new Error("Cannot suspend a binding with pending changes: "+this);}this.bSuspended=true;this.oResumePromise=new b(function(e){r=e;});this.oResumePromise.$resolve=r;this.removeReadGroupLock();this.doSuspend();};O.prototype.updateAggregatedQueryOptions=function(n){var A=Object.keys(n),t=this;if(this.mAggregatedQueryOptions){A=A.concat(Object.keys(this.mAggregatedQueryOptions));A.forEach(function(N){if(t.bAggregatedQueryOptionsInitial||N!=="$select"&&N!=="$expand"){if(n[N]===undefined){delete t.mAggregatedQueryOptions[N];}else{t.mAggregatedQueryOptions[N]=n[N];}}});}};O.prototype.visitSideEffects=function(g,p,o,n,P,e){var D=o?this.oModel.getDependentBindings(o):this.getDependentBindings();D.forEach(function(f){var h=_.buildPath(e,_.getMetaPath(f.getPath())),i;if(f.oCache){i=_.stripPathPrefix(h,p);if(i.length){P.push(f.requestSideEffects(g,i));}}else if(n[h]){P.push(f.refreshInternal("",g));}else{f.visitSideEffects(g,p,null,n,P,h);}});};function d(p){if(this){O.apply(this,arguments);}else{Object.assign(p,O.prototype);}}["adjustPredicate","destroy","doDeregisterChangeListener","getGeneration","hasPendingChangesForPath"].forEach(function(m){d.prototype[m]=O.prototype[m];});return d;},false);
