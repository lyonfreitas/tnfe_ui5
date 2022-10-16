// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/ui5service/_CardUserRecents/CardUserRecentsBase","sap/ushell/EventHub","sap/ushell/Config"],function(C,E,a){"use strict";var b=C.extend("sap.ushell.ui5service.CardUserRecents");b.prototype.getData=function(){if(!a.last("/core/shell/model/enableTrackingActivity")){return Promise.resolve([]);}return this.oUserRecentsPromise.then(function(u){return new Promise(function(r,c){u.getRecentActivity().done(function(R){r(this._getActivitiesAsCardItems(R));}.bind(this)).fail(function(e){c(e);});}.bind(this));}.bind(this));};b.prototype.attachDataChanged=function(u){E.on("newUserRecentsItem").do(function(r){var U=r.recentUsageArray;var c=[];for(var i=0;i<U.length;i++){c.push(U[i].oItem);}var p=this._getActivitiesAsCardItems(c);u({data:p});}.bind(this));E.on("userRecentsCleared").do(function(){u({data:[]});});};b.prototype.detachDataChanged=function(){E.on("newUserRecentsItem").off();E.on("userRecentsCleared").off();};b.hasNoAdapter=true;return b;});
