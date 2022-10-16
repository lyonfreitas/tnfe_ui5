// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/utils/UrlParsing","sap/ushell/ui/launchpad/Tile","sap/ushell/EventHub","sap/base/Log","sap/base/util/extend"],function(u,a,T,E,L,b){"use strict";var U=function(){};U.prototype={_maxLoggedMessages:50,_maxMessageByteSize:2048,_maxQueueByteSize:30720,_isActive:false,_observedLaunchpadActions:["createGroupAt","deleteGroup","resetGroup","changeGroupTitle","moveGroup","addTile","deleteTile","movetile","externalSearch","addBookmarkTile"],_observedGeneralActions:["openApp"],_observedEventHubEvents:["showCatalog"],_aDoableObjects:[],messageType:{ACTION:0,ERROR:1},_tileOntapOrigFunc:undefined,activate:function(){if(this._isActive){return;}this._isActive=true;var e=sap.ui.getCore().getEventBus(),t=this;this._observedLaunchpadActions.forEach(function(d,i,f){e.subscribe("launchpad",d,t._handleAction,t);});e.subscribe("sap.ushell","appOpened",t._handleAction,t);this._observedGeneralActions.forEach(function(d,i,f){e.subscribe(d,t._handleAction,t);});this._observedEventHubEvents.forEach(function(d,i,f){t._aDoableObjects.push(E.on(d).do(t._handleActionEventHub.bind(t)));});L.addLogListener(this);t._tileOntapOrigFunc=T.prototype.ontap;sap.ushell.ui.launchpad.Tile.prototype.ontap=t._tileOnTapDecorator(t._tileOntapOrigFunc);},deactivate:function(){if(!this._isActive){return;}this._isActive=false;var e=sap.ui.getCore().getEventBus(),t=this;this._observedLaunchpadActions.forEach(function(d,i,f){e.unsubscribe("launchpad",d,t._handleAction,t);});e.unsubscribe("sap.ushell","appOpened",t._handleAction,t);this._observedGeneralActions.forEach(function(d,i,f){e.unsubscribe(d,t._handleAction,t);});this._aDoableObjects.forEach(function(d){d.off();});L.removeLogListener(this);sap.ushell.ui.launchpad.Tile.prototype.ontap=this._tileOntapOrigFunc;},addMessage:function(t,m,d){if(this._isActive){this._addMessageInternal(t,m,d);}},getLog:function(){return this._getLoggingQueueFromStorage();},getMessageInfo:function(){var r={userDetails:this._getUserDetails(),shellState:this._getShellState(),navigationData:this._getLastNavActionFromStorage(),userLog:this.getLog(),formFactor:u.getFormFactor()};return r;},getMessageInfoAsString:function(s){return JSON.stringify(this.getMessageInfo(s));},onLogEntry:function(d){if(d.level<=2){var e=d.message;if(typeof d.details!=="undefined"&&(d.details!=="")){e=e+", "+d.details;}this.addMessage(this.messageType.ERROR,e);}},onAttachToLog:function(){},onDetachFromLog:function(){},_tileOnTapDecorator:function(o){var t=this,n,l,d,e,f,g;return function(){var h=this.getMetadata().getName();if(h==="sap.ushell.ui.launchpad.PlusTile"){t.addMessage(t.messageType.ACTION,"Open Catalog for empty group "+this.getGroupId());}else if(h==="sap.ushell.ui.launchpad.Tile"){n=hasher.getHash();if(n){var i=a.parseShellHash(n);n="#"+a.constructShellHash({target:{semanticObject:i.semanticObject,action:i.action}});}l=t._getLastNavActionFromStorage();l.time=new Date();l.navigationHash=n;l.tileDebugInfo=this.getDebugInfo();d=sap.ui.getCore().byId(this.getId());e=d.getModel();f=this.getBindingContext();g=f.getPath();l.tileTitle=f.getModel().getProperty(g).title;t._putInSessionStorage("sap.ushell.UserActivityLog.lastNavigationActionData",JSON.stringify(l));t.addMessage(t.messageType.ACTION,"Click on Tile: "+e.getData().title+" Tile debugInfo: "+this.getDebugInfo());}o.apply(this,arguments);};},_addMessageInternal:function(t,m,d){var l=this._getLoggingQueueFromStorage(),e={type:null},p;for(p in this.messageType){if(t===this.messageType[p]){e.type=p;break;}}if(e.type===null){return;}b(e,{messageID:d,messageText:m,time:new Date(),toString:function(){var f=[this.type,this.time];if(typeof this.messageID!=="undefined"){f.push(this.messageID);}f.push(this.messageText);return f.join(" :: ");}});l.push(e);if(l.length>this._maxLoggedMessages){l.shift();}this._putInSessionStorage("sap.ushell.UserActivityLog.loggingQueue",JSON.stringify(l));},_handleActionEventHub:function(e){this._handleAction("",e.sId,e.oData);},_handleAction:function(C,e,d){var m;switch(e){case"deleteTile":m="Delete Tile "+(d.tileId||"");break;case"moveTile":m="Move Tile "+(d.sTileId||"")+" to Group "+(d.toGroupId||"");break;case"createGroupAt":m="Create Group";break;case"changeGroupTitle":m="Change Group Title of "+(d.groupId||"")+" to "+(d.newTitle||"");break;case"deleteGroup":m="Delete Group "+(d.groupId||"");break;case"addTile":var t=d.catalogTileContext.oModel.oData,s=d.catalogTileContext.sPath,f=this._findInModel(s,t),g=f.id,h=d.groupContext.getObject(),i=h.groupId;m="Add Tile "+(g||"")+" to Group "+(i||"");break;case"moveGroup":m="Move Group from index "+(d.fromIndex||"")+" to index "+(d.toIndex||"");break;case"appOpened":m="Open application "+d.action;var l=this._getLastNavActionFromStorage();l.applicationInformation={};["applicationType","ui5ComponentName","url","additionalInformation","text"].forEach(function(p){l.applicationInformation[p]=d[p];});if(!this._hashSegmentsEqual(l.navigationHash,d.sShellHash)){l.tileDebugInfo="";}l.navigationHash=d.sShellHash;this._putInSessionStorage("sap.ushell.UserActivityLog.lastNavigationActionData",JSON.stringify(l));break;case"addBookmarkTile":m="Add Bookmark "+(d.title||"")+" "+(d.subtitle||"")+" for URL: "+(d.url||"");break;case"showCatalog":m="Show Catalog";break;default:break;}this.addMessage(this.messageType.ACTION,m);},_findInModel:function(p,m){var d,f=m,i,g;try{d=p.split("/");for(i=0;i<d.length;i=i+1){if(g!==d[i]){continue;}f=f[g];}}catch(e){return undefined;}return f;},_getUserDetails:function(){var d=sap.ushell.Container.getUser();return{fullName:d.getFullName()||"",userId:d.getId()||"",eMail:d.getEmail()||"",Language:d.getLanguage()||""};},_getShellState:function(){var v=sap.ui.getCore().byId("viewPortContainer"),m,r="";if(v!==undefined){m=v.getModel();r=m.getProperty("/currentState/stateName");}return r;},_getLoggingQueueFromStorage:function(){var l=this._getFromSessionStorage("sap.ushell.UserActivityLog.loggingQueue");var q=[];if(l){try{q=JSON.parse(l);}catch(e){}}return q;},_getLastNavActionFromStorage:function(){var l=this._getFromSessionStorage("sap.ushell.UserActivityLog.lastNavigationActionData");return(l?JSON.parse(l):{});},_hashSegmentsEqual:function(d,e){if((!d)||(!e)){return false;}return(this._getHashSegment(d)===this._getHashSegment(e));},_getHashSegment:function(d){var i=d.indexOf("~"),e;if(i>-1){return d.substring(0,i);}e=d.indexOf("?");if(e>-1){return d.substring(0,e);}return d;},_getFromSessionStorage:function(k){var r=null;try{r=sessionStorage.getItem(k);}catch(e){}return r;},_putInSessionStorage:function(k,v){try{sessionStorage.setItem(k,v);}catch(e){}}};var c=new U();return c;},true);
