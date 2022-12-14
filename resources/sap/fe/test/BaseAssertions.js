/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/fe/test/Utils"],function(O,a,F,U){"use strict";var B=O.extend("sap.fe.test.BaseAssertions",{iSeeMessagePage:function(m){return a.create(this).hasType("sap.m.MessagePage").hasProperties({text:m}).description(U.formatMessage("Error Page with message '{0}' is visible",m)).execute();},iSeeMessageToast:function(t){return F.createMessageToastBuilder(t).execute(this);}});return B;});
