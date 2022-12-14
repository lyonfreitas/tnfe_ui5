/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./DialogAssertions","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/fe/test/Utils"],function(D,O,F,U){"use strict";var a=function(d,v){return D.call(this,d,v,1);};a.prototype=Object.create(D.prototype);a.prototype.constructor=a;a.prototype.isAction=false;a.prototype.iCheckCreate=function(s){return this.prepareResult(this.getBuilder().hasFooterButton(O.Matchers.resourceBundle("text","sap.fe.core","C_TRANSACTION_HELPER_SAPFE_ACTION_CREATE_BUTTON"),s).description(U.formatMessage("Checking that dialog '{0}' has create button with state '{1}'",this.getIdentifier(),s)).execute());};return a;});
