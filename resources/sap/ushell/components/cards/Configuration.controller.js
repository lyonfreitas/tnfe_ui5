// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/components/cards/ManifestPropertyHelper","sap/ushell/resources","sap/ui/core/mvc/Controller","sap/base/strings/formatMessage","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/base/Log"],function(m,r,C,f,J,q,L){"use strict";return C.extend("sap.ushell.components.cards.Configuration",{formatter:f,onInit:function(){var v=this.getView(),V=v.getViewData(),c=V.chipInstance,M,s=c.configuration.getParameterValueAsString("cardManifest"),o;if(s){o=this._prepareManifest(s,c);}M=new J({data:{editorValue:JSON.stringify(o,null,4)||""},config:{originalLanguage:"",sapLogonLanguage:"",displayOriginalLanguageWarning:false,manifestEditorEditable:true}});v.setModel(M);v.setModel(r.i18nModel,"i18n");v.setViewName("sap.ushell.components.cards.Configuration");c.configurationUi.attachSave(this.onSaveConfiguration.bind(this));this._checkOriginalLanguage();},onSaveConfiguration:function(){var d=new q.Deferred(),M=this.getView().getModel(),s=M.getProperty("/data/editorValue"),o,E;try{o=JSON.parse(s);}catch(e){this._logErrorAndReject({error:r.i18n.getText("configuration.invalidJSONProvided")},d);return d;}E=m.extractCardData(o);this._saveManifestAndTileConfig(E.manifest,E.tileConfiguration).then(this._saveTilePropertiesBag.bind(this,E)).then(this._saveTitle.bind(this,E.bagProperties.display_title_text)).then(this._updateTileModel.bind(this,E)).then(d.resolve).catch(function(a){this._logErrorAndReject(a,d);}.bind(this));return d.promise();},_saveManifestAndTileConfig:function(a,t){var c=this.getView().getViewData().chipInstance;var p=new Promise(function(b,d){c.writeConfiguration.setParameterValues({cardManifest:JSON.stringify(a),tileConfiguration:t},b,function(e,E){d({error:e,errorInfo:E});});});return p;},_saveTilePropertiesBag:function(c){var o=this.getView().getViewData().chipInstance;var t=o.bag.getBag("tileProperties");this._fillCardBag(c,t);var p=new Promise(function(a,b){t.save(a,function(e,E){b({error:e,errorInfo:E});});});return p;},_saveTitle:function(t){var c=this.getView().getViewData().chipInstance;var p=new Promise(function(a,b){if(c.title){c.title.setTitle(t,a,function(e,E){b({error:e,errorInfo:E});});}else{a();}});return p;},_updateTileModel:function(c){var t=this.getView().getModel("tileModel");t.setProperty("/data/display_title_text",c.bagProperties.display_title_text);t.setProperty("/data/display_subtitle_text",c.bagProperties.display_subtitle_text);},_logErrorAndReject:function(e,d){L.error(e.error,null,"card.Configuration.controller");d.reject(e.error,e.errorInfo);},_fillCardBag:function(e,t){Object.keys(e.bagProperties).forEach(function(p){if(e.bagProperties[p]){t.setText(p,e.bagProperties[p]);}else{t.resetProperty(p);}});},_prepareManifest:function(a,c){var M=JSON.parse(a),o=m.getCardData(c);return m.mergeCardData(M,o);},_checkOriginalLanguage:function(){var M,l;if(!this._isOriginalLanguage()){M=this.getView().getModel();l=this._getLanguages();M.setProperty("/config/originalLanguage",l.originalLanguage.toUpperCase());M.setProperty("/config/sapLogonLanguage",l.logonLanguage.toUpperCase());M.setProperty("/config/displayOriginalLanguageWarning",true);M.setProperty("/config/manifestEditorEditable",false);}},_isOriginalLanguage:function(){var l=this._getLanguages(),o=l.originalLanguage.toLowerCase(),s=l.logonLanguage.toLowerCase(),a=l.ui5CoreLanguage.toLowerCase();return o===""||o===s||o===a;},_getLanguages:function(){var c=this.oView.getViewData().chipInstance;return{originalLanguage:c.bag.getOriginalLanguage(),logonLanguage:sap.ui.getCore().getConfiguration().getLocale().getSAPLogonLanguage(),ui5CoreLanguage:sap.ui.getCore().getConfiguration().getLanguage()};}});});
