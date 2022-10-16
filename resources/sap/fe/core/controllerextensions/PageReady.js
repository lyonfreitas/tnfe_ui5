/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/core/mvc/OverrideExecution","sap/fe/core/controllerextensions/ControllerExtensionMetadata","sap/ui/core/Component","sap/fe/core/CommonUtils","sap/ui/base/EventProvider","sap/base/Log","../helpers/ClassSupport","sap/fe/core/services/TemplatedViewServiceFactory"],function(C,O,a,b,c,E,L,d,T){"use strict";var _,f,g,h,j,k,l,m,n;var P=d.Private;var q=d.Extensible;var F=d.Final;var r=d.Public;var s=d.Override;var U=d.UI5Class;function t(i,e){if(!(i instanceof e)){throw new TypeError("Cannot call a class as a function");}}function u(e,p){for(var i=0;i<p.length;i++){var o=p[i];o.enumerable=o.enumerable||false;o.configurable=true;if("value"in o)o.writable=true;Object.defineProperty(e,o.key,o);}}function v(e,p,i){if(p)u(e.prototype,p);if(i)u(e,i);return e;}function w(e,i){if(typeof i!=="function"&&i!==null){throw new TypeError("Super expression must either be null or a function");}e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,writable:true,configurable:true}});if(i)x(e,i);}function x(o,p){x=Object.setPrototypeOf||function x(o,p){o.__proto__=p;return o;};return x(o,p);}function y(e){var i=B();return function p(){var S=D(e),o;if(i){var N=D(this).constructor;o=Reflect.construct(S,arguments,N);}else{o=S.apply(this,arguments);}return z(this,o);};}function z(e,i){if(i&&(typeof i==="object"||typeof i==="function")){return i;}return A(e);}function A(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return e;}function B(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function D(o){D=Object.setPrototypeOf?Object.getPrototypeOf:function D(o){return o.__proto__||Object.getPrototypeOf(o);};return D(o);}function G(e,p,i,o,I){var J={};Object.keys(o).forEach(function(K){J[K]=o[K];});J.enumerable=!!J.enumerable;J.configurable=!!J.configurable;if('value'in J||J.initializer){J.writable=true;}J=i.slice().reverse().reduce(function(J,K){return K(e,p,J)||J;},J);if(I&&J.initializer!==void 0){J.value=J.initializer?J.initializer.call(I):void 0;J.initializer=undefined;}if(J.initializer===void 0){Object.defineProperty(e,p,J);J=null;}return J;}var H=(_=U("sap.fe.core.controllerextensions.PageReady",a),f=s(),g=s(),h=s("_routing"),j=s("_routing"),k=s("_routing"),l=q(O.Instead),_(m=(n=function(e){w(H,e);var i=y(H);function H(){t(this,H);return i.apply(this,arguments);}v(H,[{key:"onInit",value:function I(){var o=this;this._nbWaits=0;this._bSeachTriggered=false;this._oEventProvider=this._oEventProvider?this._oEventProvider:new E();this._oView=this.base.getView();this._oAppComponent=c.getAppComponent(this._oView);this._oPageComponent=b.getOwnerComponentFor(this._oView);if(this._oPageComponent&&this._oPageComponent.attachContainerDefined){this._oPageComponent.attachContainerDefined(function(J){return o.registerContainer(J.getParameter("container"));});}else{this.registerContainer(this._oView);}var p=this._oAppComponent.getRootControl().getController().getPlaceholder();if(p.isPlaceholderDebugEnabled()){this.attachEvent("pageReady",null,function(){p.getPlaceholderDebugStats().iPageReadyEventTimestamp=Date.now();},this);this.attachEvent("heroesBatchReceived",null,function(){p.getPlaceholderDebugStats().iHeroesBatchReceivedEventTimestamp=Date.now();},this);}}},{key:"onExit",value:function o(){delete this._oAppComponent;this._oContainer&&this._oContainer.removeEventDelegate(this._fnContainerDelegate);}},{key:"waitFor",value:function I(p){var o=this;this._nbWaits++;p.finally(function(){setTimeout(function(){o._nbWaits--;},0);}).catch(null);}},{key:"onRouteMatched",value:function o(){this._bIsPageReady=false;}},{key:"onRouteMatchedFinished",value:function o(){this.checkPageReadyDebounced();}},{key:"onAfterBinding",value:function W(o){var p=this;if(!this._bAfterBindingAlreadyApplied){this._bAfterBindingAlreadyApplied=true;var I=[];var N=[];var R=0;var J=0;var K=function(X){X.getSource().detachDataRequested(K);R++;p.bDataReceived=false;};var M=function(X){switch(X.getSource().sGroupId){case"$auto.Workers":p._oEventProvider.fireEvent("workersBatchReceived");break;case"$auto.Heroes":p._oEventProvider.fireEvent("heroesBatchReceived");break;default:}X.getSource().detachDataReceived(M);J++;if(J>=R&&R!==0){R=0;J=0;p.bDataReceived=true;p.checkPageReadyDebounced();}};var S=function(X){var Y=N.filter(function(Z){if(X.getSource().sId===Z.getFilter()&&Z.getVisible()){return true;}return false;});if(Y.length>0){p._bSeachTriggered=true;}Y.forEach(function(Z){var $=Z.getRowBinding();var a1=function(){$.attachDataRequested(K);$.attachDataReceived(function(X){M(X);p._bSeachTriggered=false;});I.push($);};if($){a1();}else{Z.attachEventOnce("bindingUpdated",null,function(){$=Z.getRowBinding();a1();},null);}});};if(this.isContextExpected()&&o===undefined){this.bHasContext=false;return;}else{this.bHasContext=true;}this.attachEventOnce("pageReady",null,function(){I.forEach(function(X){X.detachEvent("dataRequested",K);X.detachEvent("dataReceived",M);X.detachEvent("search",S);});p._bAfterBindingAlreadyApplied=false;I=[];},null);if(o){var Q=o.getBinding();Q.attachDataRequested(K);Q.attachDataReceived(M);I.push(Q);}var V=[];this._oView.findAggregatedObjects(true,function(X){var Y=X.getObjectBinding();if(Y){Y.attachDataRequested(K);Y.attachDataReceived(M);I.push(Y);}else{var Z=Object.keys(X.mBindingInfos);if(Z.length>0){Z.forEach(function($){var a1=X.mBindingInfos[$].binding;if(a1&&a1.isA("sap.ui.model.odata.v4.ODataListBinding")){a1.attachDataRequested(K);a1.attachDataReceived(M);I.push(a1);}});}}if(X.isA("sap.ui.mdc.Table")){p.bTablesLoaded=false;V.push(X.initialized().then(function(){var $=X.getRowBinding();if($){$.attachDataRequested(K);$.attachDataReceived(M);I.push($);}else{N.push(X);}}).catch(function($){L.error("Cannot find a bound table",$);}));}else if(X.isA("sap.fe.core.controls.FilterBar")){X.attachEvent("search",S);I.push(X);}});if(V.length>0){Promise.all(V).then(function(){p.bTablesLoaded=true;p.checkPageReadyDebounced();}).catch(function(X){L.info("There was an error with one or multiple table",X);p.bTablesLoaded=true;p.checkPageReadyDebounced();});}}}},{key:"isPageReady",value:function o(){return this._bIsPageReady;}},{key:"waitPageReady",value:function p(){var o=this;return new Promise(function(I){if(o.isPageReady()){I();}else{o.attachEventOnce("pageReady",null,function(){I();},o);}});}},{key:"attachEventOnce",value:function K(o,p,I,J){return this._oEventProvider.attachEventOnce(o,p,I,J);}},{key:"attachEvent",value:function K(o,p,I,J){return this._oEventProvider.attachEvent(o,p,I,J);}},{key:"detachEvent",value:function I(o,p){return this._oEventProvider.detachEvent(o,p);}},{key:"registerContainer",value:function I(o){var p=this;this._oContainer=o;this._fnContainerDelegate={onBeforeShow:function(){p.bShown=false;p._bIsPageReady=false;},onBeforeHide:function(){p.bShown=false;p._bIsPageReady=false;},onAfterShow:function(){p.bShown=true;p._checkPageReady(true);}};this._oContainer.addEventDelegate(this._fnContainerDelegate);}},{key:"isContextExpected",value:function o(){return false;}},{key:"checkPageReadyDebounced",value:function p(){var o=this;if(this.pageReadyTimer){clearTimeout(this.pageReadyTimer);}this.pageReadyTimer=setTimeout(function(){o._checkPageReady();},200);}},{key:"_checkPageReady",value:function K(){var o=this;var p=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;var I=function(){if(!sap.ui.getCore().getUIDirty()){sap.ui.getCore().detachEvent("UIUpdated",I);o._bWaitingForRefresh=false;setTimeout(function(){o._checkPageReady();},20);}};var J=function(){if(sap.ui.getCore().getUIDirty()){setTimeout(J,500);}else if(o._bWaitingForRefresh){o._bWaitingForRefresh=false;sap.ui.getCore().detachEvent("UIUpdated",I);o._checkPageReady();}};if(this.bShown&&this.bDataReceived!==false&&this.bTablesLoaded!==false&&(!this.isContextExpected()||this.bHasContext)){if(this.bDataReceived===true&&!p&&!this._bWaitingForRefresh&&sap.ui.getCore().getUIDirty()){this.bDataReceived=undefined;this._bWaitingForRefresh=true;sap.ui.getCore().attachEvent("UIUpdated",I);setTimeout(J,500);}else if(!this._bWaitingForRefresh&&sap.ui.getCore().getUIDirty()||this._nbWaits!==0||T.getNumberOfViewsInCreationState()>0||this._bSeachTriggered){this._bWaitingForRefresh=true;sap.ui.getCore().attachEvent("UIUpdated",I);setTimeout(J,500);}else if(!this._bWaitingForRefresh){this._bIsPageReady=true;this._oEventProvider.fireEvent("pageReady");}}}}]);return H;}(C),(G(n.prototype,"onInit",[f],Object.getOwnPropertyDescriptor(n.prototype,"onInit"),n.prototype),G(n.prototype,"onExit",[g],Object.getOwnPropertyDescriptor(n.prototype,"onExit"),n.prototype),G(n.prototype,"waitFor",[r,F],Object.getOwnPropertyDescriptor(n.prototype,"waitFor"),n.prototype),G(n.prototype,"onRouteMatched",[h],Object.getOwnPropertyDescriptor(n.prototype,"onRouteMatched"),n.prototype),G(n.prototype,"onRouteMatchedFinished",[j],Object.getOwnPropertyDescriptor(n.prototype,"onRouteMatchedFinished"),n.prototype),G(n.prototype,"onAfterBinding",[k],Object.getOwnPropertyDescriptor(n.prototype,"onAfterBinding"),n.prototype),G(n.prototype,"isPageReady",[r,F],Object.getOwnPropertyDescriptor(n.prototype,"isPageReady"),n.prototype),G(n.prototype,"waitPageReady",[r,F],Object.getOwnPropertyDescriptor(n.prototype,"waitPageReady"),n.prototype),G(n.prototype,"attachEventOnce",[r,F],Object.getOwnPropertyDescriptor(n.prototype,"attachEventOnce"),n.prototype),G(n.prototype,"attachEvent",[r,F],Object.getOwnPropertyDescriptor(n.prototype,"attachEvent"),n.prototype),G(n.prototype,"detachEvent",[r,F],Object.getOwnPropertyDescriptor(n.prototype,"detachEvent"),n.prototype),G(n.prototype,"isContextExpected",[P,l],Object.getOwnPropertyDescriptor(n.prototype,"isContextExpected"),n.prototype)),n))||m);return H;},false);
