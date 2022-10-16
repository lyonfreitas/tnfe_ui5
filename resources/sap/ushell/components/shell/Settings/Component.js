// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/XMLView","sap/ui/core/UIComponent","sap/ui/model/json/JSONModel","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/resources","sap/ushell/components/shell/Settings/ProfilingLoader","sap/ushell/components/shell/Settings/userAccount/UserAccountEntry","sap/ushell/components/shell/Settings/appearance/AppearanceEntry","sap/ushell/components/shell/Settings/homepage/HomepageEntry","sap/ushell/components/shell/Settings/spaces/SpacesEntry","sap/ushell/components/shell/Settings/userActivities/UserActivitiesEntry","sap/ushell/components/shell/Settings/userProfiling/UserProfilingEntry","sap/ushell/components/shell/Settings/notifications/NotificationsEntry","sap/ushell/components/shell/Settings/userDefaults/UserDefaultsEntry","sap/ushell/components/shell/Settings/userLanguageRegion/UserLanguageRegionEntry","sap/ushell/ui/shell/ShellHeadItem","sap/ushell/components/shell/Settings/search/SearchEntry"],function(X,U,J,C,E,r,l,a,A,H,S,b,c,N,d,e,f,g){"use strict";var D=[];return U.extend("sap.ushell.components.shell.Settings.Component",{metadata:{version:"1.97.1",library:"sap.ushell",dependencies:{libs:{"sap.m":{},"sap.ui.layout":{lazy:true}}}},init:function(){U.prototype.init.apply(this,arguments);var s=sap.ushell.Container.getRenderer("fiori2").getShellConfig();if(s.moveUserSettingsActionToShellHeader){this.oSettingsBtn=this._addUserSettingsButton();}this._addStandardEntityToConfig();l();this._addNotificationSettings().then(function(o){if(o.notificationsAvailable&&this.oSettingsView){this.oSettingsView.setModel(C.createModel("/core/userPreferences",J));}}.bind(this));D.push(E.on("openUserSettings").do(this._openUserSettings.bind(this)));},_addStandardEntityToConfig:function(){var h=C.last("/core/userPreferences/entries");h.push(a.getEntry());h.push(A.getEntry());if(C.last("/core/spaces/configurable")){h.push(S.getEntry());}h.push(e.getEntry());if(C.last("/core/shell/enableRecentActivity")){h.push(b.getEntry());}h.push(c.getEntry());if(C.last("/core/shell/model/searchAvailable")){g.getEntry().then(function(s){s.isActive().then(function(i){if(!i){return;}h=C.last("/core/userPreferences/entries");h.push(s);C.emit("/core/userPreferences/entries",h);});});}if(C.last("/core/home/enableHomePageSettings")&&!C.last("/core/spaces/enabled")){h.push(H.getEntry());}if(C.last("/core/shell/model/userDefaultParameters")){h.push(d.getEntry());}h=sap.ushell.Container.getRenderer("fiori2").reorderUserPrefEntries(h);C.emit("/core/userPreferences/entries",h);},_addNotificationSettings:function(){var R={notificationsAvailable:false};if(C.last("/core/shell/model/enableNotifications")){sap.ushell.Container.getServiceAsync("Notifications").then(function(s){s._userSettingInitialization();s._getNotificationSettingsAvalability().done(function(h){if(h.settingsAvailable){var i=C.last("/core/userPreferences/entries");i.push(N.getEntry());C.emit("/core/userPreferences/entries",i);R.notificationsAvailable=true;return Promise.resolve(R);}return Promise.resolve(R);});});}return Promise.resolve(R);},_openUserSettings:function(o){if(!this.oDialog){X.create({id:"settingsView",viewName:"sap.ushell.components.shell.Settings.UserSettings"}).then(function(s){this.oSettingsView=s;var m=C.createModel("/core/userPreferences",J);s.setModel(m);s.setModel(r.i18nModel,"i18n");this.oDialog=s.byId("userSettingsDialog");var h=o.controlId||"shell-header";sap.ui.getCore().byId(h).addDependent(s);this.oDialog.open();}.bind(this));}else{this.oDialog.open();}},_addUserSettingsButton:function(){var u=new f({id:"userSettingsBtn",icon:"sap-icon://action-settings",tooltip:r.i18n.getText("userSettings"),text:r.i18n.getText("userSettings"),ariaHaspopup:"dialog",press:this._openUserSettings.bind(this)});sap.ushell.Container.getRenderer("fiori2").oShellModel.addHeaderEndItem([u.getId()],false,["home","app","minimal","standalone","embedded","embedded-home","merged","merged-home"],true);return u;},exit:function(){for(var i=0;i<D.length;i++){D[i].off();}if(this.oSettingsView){this.oSettingsView.destroy();this.oSettingsView=null;this.oDialog=null;}if(this.oSettingsBtn){this.oSettingsBtn.destroy();this.oSettingsBtn=null;}}});});