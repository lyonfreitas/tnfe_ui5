// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/XMLView","sap/base/Log","sap/ushell/Config","sap/ushell/resources"],function(X,L,C,r){"use strict";function g(){var v="userActivitiesSetting",c="sap.ushell.components.shell.Settings.userActivities.UserActivitiesSetting",V;return{id:"userActivitiesEntry",entryHelpID:"userActivitiesEntry",title:r.i18n.getText("userActivities"),valueResult:null,contentResult:null,icon:"sap-icon://laptop",valueArgument:null,contentFunc:function(){return X.create({id:v,viewName:c}).then(function(o){V=o;return o;});},onSave:function(){if(V){return V.getController().onSave();}L.warning("Save operation for user account settings was not executed, because the userActivities view was not initialized");return Promise.resolve();},onCancel:function(){if(V){V.getController().onCancel();return;}L.warning("Cancel operation for user account settings was not executed, because the userActivities view was not initialized");}};}return{getEntry:g};});