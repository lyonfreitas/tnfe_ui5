/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FooterAPI","sap/fe/test/Utils","sap/ui/test/OpaBuilder"],function(F,U,O){"use strict";var a=function(o,f){return F.call(this,o,f);};a.prototype=Object.create(F.prototype);a.prototype.constructor=a;a.prototype.isAction=true;a.prototype.iExecuteAction=function(A){var o=this.getBuilder();return this.prepareResult(o.doOnContent(this.createActionMatcher(A),O.Actions.press()).description(U.formatMessage("Executing footer action '{0}'",A)).execute());};return a;});
