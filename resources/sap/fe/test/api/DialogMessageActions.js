/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./DialogActions","sap/fe/test/Utils","sap/ui/test/OpaBuilder"],function(D,U,O){"use strict";var a=function(d,v){return D.call(this,d,v,1);};a.prototype=Object.create(D.prototype);a.prototype.constructor=a;a.prototype.isAction=true;a.prototype.iExecuteBack=function(){return this.prepareResult(this.getBuilder().doPressHeaderButton(O.Matchers.properties({icon:"sap-icon://nav-back"})).description(U.formatMessage("Pressing back button on dialog '{0}'",this.getIdentifier())).execute());};a.prototype.iExecuteRefresh=function(){return this.prepareResult(this.getBuilder().doPressFooterButton(O.Matchers.resourceBundle("text","sap.fe.core","C_COMMON_SAPFE_REFRESH")).description(U.formatMessage("Pressing refresh button on dialog '{0}'",this.getIdentifier())).execute());};return a;});
