sap.ui.define(["sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/ui/core/UIComponent","sap/ui/core/routing/HashChanger","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/suite/ui/generic/template/genericUtilities/controlHelper","sap/suite/ui/generic/template/extensionAPI/NavigationController","sap/suite/ui/generic/template/lib/MessageButtonHelper","sap/suite/ui/generic/template/genericUtilities/testableHelper","sap/suite/ui/generic/template/detailTemplates/DiscardEditHandler","sap/suite/ui/generic/template/detailTemplates/PaginatorButtonsHelper","sap/suite/ui/generic/template/ObjectPage/extensionAPI/DraftTransactionController","sap/suite/ui/generic/template/ObjectPage/extensionAPI/NonDraftTransactionController","sap/m/DraftIndicator"],function(F,U,H,a,b,c,N,M,t,D,P,d,e){"use strict";var l=new F("detailTemplates.detailUtils").getLogger();var f=sap.m.DraftIndicatorState;var p=new a({path:"persistent",operator:b.EQ,value1:false});function g(C,o,v){function i(){var T=o.getTemplatePrivateModel();T.setProperty("/objectPage",{displayMode:0,headerInfo:{objectTitle:"",objectSubtitle:""},cancelEnabled:true});}function j(B,I){if(!o.isDraftEnabled()){var r=C.getModel("ui");var T=o.getTemplatePrivateModel();var s=r.getProperty("/createMode");T.setProperty("/objectPage/displayMode",s?4:1);}(v.onComponentActivate||Function.prototype)(B,I);}function u(B){var T=C.getModel("_templPrivGlobal");T.setProperty("/generic/draftIndicatorState",f.Clear);(v.applyHeaderContextToSmartTablesDynamicColumnHide||Function.prototype)(B);}function n(){v.navigateUp();}function k(O){return v.getMessageFilters(O);}function m(r){return v.getScrollFunction&&v.getScrollFunction(r);}function q(){return{callAlways:true};}return{init:i,onActivate:j,getTitle:o.getTitle,updateBindingContext:u,navigateUp:n,getMessageFilters:k,getScrollFunction:m,getStatePreserverSettings:q};}function h(v,T,C){var o;var j;function G(){var R=U.getRouterFor(C);return R?R.getHashChanger():H.getInstance();}function s(i){var J=!T.oComponentUtils.isDraftEnabled();if(J||!i){var K=C.getView().getModel("ui");K.setProperty("/editable",i);}}function O(){T.oServices.oApplication.onBackButtonPressed();}function A(){var L=T.oServices.oApplication.getLinksToUpperLayers();var V=T.oComponentUtils.getViewLevel();var J;if(T.oComponentUtils.isDraftEnabled()){var K=T.oComponentUtils.getTemplatePrivateModel();J=K.getProperty("/objectPage/displayMode");}else{J=1;}v.navigateUp=L[V-1].navigate.bind(null,J,false);var Q=v.aBreadCrumbs;var R=Q?Q.length:0;for(var i=0;i<R;i++){var S=Q[i];var W=L[i+1];W.adaptBreadCrumbLink(S);var X=T.oCommonUtils.getControlInformation(S,function(Y){});X.navigate=W.navigate.bind(null,J,true);}}function k(i){var J=i.getBindingContext();var K=G().getHash();return T.oServices.oApplicationController.propertyChanged(K,J);}function n(){v.navigateUp();}function m(i){var J=T.oServices.oApplication.getBusyHelper();var K=C.getView().getModel("ui");var L=k(i).then(function(R){n();},function(){J.getUnbusy().then(function(R){T.oCommonUtils.processDataLossTechnicalErrorConfirmation(function(){n();K.setProperty("/enabled",true);},Function.prototype,o.state);});});J.setBusy(L);}function q(i){var J=i.getSource();var K=T.oComponentUtils.getCRUDActionHandler();K.handleCRUDScenario(2,m.bind(null,J));}var r;function u(i){r=r||new D(C,T,v,o.state);return r.discardEdit(i);}function w(){o.state.messageButtonHelper.toggleMessagePopover();}function x(i){return o.state.messageButtonHelper&&o.state.messageButtonHelper.getMessageFilters(i);}function y(){var i;return function(){i=i||new N(T,C,o.state);return i;};}function z(){var i;return function(){if(!i){var J=T.oComponentUtils.isDraftEnabled()?d:e;i=new J(T,C,o.state);}return i;};}function B(){j.handleShowNextObject();}function E(){j.handleShowPrevObject();}var G=t.testable(G,"getHashChangerInstance");var A=t.testable(A,"adaptLinksToUpperLevels");o={onInit:function(R,i,J,K,L){if(!R||R.footerBar){var Q=T.oComponentUtils.isODataBased();var S={controller:C,prepareAllMessagesForNavigation:i,messageSorter:J,getGroupTitle:K,prepareForMessageNavigation:L};o.state.messageButtonHelper=new M(T,S,Q);if(!T.oComponentUtils.isDraftEnabled()){var V=C.getOwnerComponent().getModel("ui");var W=V.bindProperty("/editable");var X=sap.ui.getCore().getMessageManager();var Y=X.getMessageModel();W.attachChange(function(){if(!W.getValue()){var Z=o.state.messageButtonHelper.getContextFilter(false);var $=Y.bindList("/",null,null,[Z,p]);var _=$.getContexts();var a1=_.map(function(b1){return b1.getObject();});X.removeMessages(a1);}});}T.oServices.oTemplateCapabilities.oMessageButtonHelper=o.state.messageButtonHelper;o.state.onCancel=u;}if(!R||R.paginatorButtons){j=new P(o,C,T);}v.getScrollFunction=function(Z){var $=T.oCommonUtils.getPositionableControlId(Z);return $&&c.focusControl.bind(null,$);};},handlers:{handleShowNextObject:B,handleShowPrevObject:E,onShowMessages:w,applyAndUp:q,onSave:function(){l.error("Save for this floorplan not implemented yet");},onBack:O},extensionAPI:{getNavigationControllerFunction:y,getTransactionControllerFunction:z},fclInfo:{isContainedInFCL:false},state:{},onComponentActivate:function(i,J){if(o.state.messageButtonHelper){o.state.messageButtonHelper.adaptToContext(i);}A();if(j){j.computeAndSetVisibleParamsForNavigationBtns();}}};v.navigateUp=n;v.setEditable=s;v.getMessageFilters=x;var I=T.oComponentUtils.getFclProxy();if(I.oActionButtonHandlers){o.handlers.fclActionButtonHandlers=I.oActionButtonHandlers;o.fclInfo.isContainedInFCL=true;}return o;}return{getComponentBase:g,getControllerBase:h};});