// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/components/pages/MyHomeImport","sap/ui/model/json/JSONModel","sap/ui/core/mvc/Controller","sap/ushell/resources","sap/ushell/EventHub","sap/base/Log"],function(m,J,C,r,E,L){"use strict";return C.extend("sap.ushell.components.pages.controller.MyHome",{onInit:function(){this.oViewModel=new J({personalizationAvailable:false});var s=function(f){this.oViewModel.setProperty("/personalizationAvailable",!!f);}.bind(this);this.getView().setModel(r.i18nModel,"i18n");this.getView().setModel(this.oViewModel,"view");m.isImportEnabled().then(s);this.oImportBookmarksFlagListener=E.on("importBookmarksFlag").do(s);},onExit:function(){this.oImportBookmarksFlagListener.off();},connect:function(c){this.fnOnEdit=c.onEdit;this.fnOnOpenDialog=c.onOpenDialog;},onEditPress:function(){if(this.fnOnEdit){this.fnOnEdit();}},onImportDialogPress:function(){if(this.fnOnOpenDialog){this.fnOnOpenDialog();}},onMessageStripClose:function(){this.oViewModel.setProperty("/personalizationAvailable",false);m.setImportEnabled(false);sap.ui.require(["sap/m/MessageBox"],function(M){M.information(r.i18n.getText("MyHome.InitialPage.MessageStrip.Popup"));});}});});
