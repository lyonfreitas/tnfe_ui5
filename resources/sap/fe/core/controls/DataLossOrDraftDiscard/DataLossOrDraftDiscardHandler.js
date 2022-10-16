/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","sap/ui/model/json/JSONModel","sap/ui/core/XMLTemplateProcessor","sap/ui/core/util/XMLPreprocessor","sap/ui/core/Fragment"],function(L,J,X,a,F){"use strict";var D={};var o;var O;function d(b,c,C,s){var e;o=b;O=c;var f="sap.fe.core.controls.DataLossOrDraftDiscard.DataLossDraft";var v=C.getView();var g={onDataLossKeepDraft:function(){e.close();o();},onDataLossDiscardDraft:function(){e.close();D.discardDraft(C,s).then(o).catch(function(E){L.error("Error while discarding draft",E);});},onDataLossCancel:function(){e.close();O();}};g.setDataLossPopup=function(e){C.dataLossPopup=e;};var t=new J({id:v.getId()}),P={bindingContexts:{"this":t.createBindingContext("/")},models:{"this":t,"this.i18n":v.getModel("sap.fe.i18n")}};var h=X.loadTemplate(f,"fragment");if(C.dataLossPopup){e=C.dataLossPopup;e.open();}else{Promise.resolve(a.process(h,{name:f},P)).then(function(i){return F.load({definition:i,controller:g});}).then(function(i){e=i;v.addDependent(e);var m=new J();e.setModel(m,"dataLoss");var j=C.getView().getModel("sap.fe.i18n");e.setModel(j,"i18n");e.open();g.setDataLossPopup(e);}).catch(function(E){L.error("Error while opening the Discard Dialog fragment",E);});}}function p(P,n,c,s){d(P,n,c,s);}D.performAfterDiscardorKeepDraft=function(P,c,C,s){var r=new Promise(function(b,e){var f=function(g){var r=P(g);b(r);};var n=function(){c();e();};p(f,n,C,s);});return r;};D.discardDraft=function(c,s){var P=c.getView().getBindingContext();var m={};m.bSkipDiscardPopover=true;m.bSkipBindingToView=s!==undefined?s:true;return c.editFlow.cancelDocument(P,m);};return D;});
