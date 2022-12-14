/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/test/Opa5","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/fe/test/Utils"],function(O,a,F,U){"use strict";var B=O.extend("sap.fe.test.BaseActions",{iClosePopover:function(){return F.createClosePopoverBuilder(this).description("Closing open popover").execute();},iPressEscape:function(){return F.create(this).has(F.Matchers.FOCUSED_ELEMENT).do(F.Actions.keyboardShortcut("Escape")).description("Pressing escape button").execute();},iWait:function(m){var w=false,f=true;return F.create(this).check(function(){if(f){f=false;setTimeout(function(){w=true;},m);}return w;}).description(U.formatMessage("Waiting for '{0}' milliseconds ",m)).execute();},iNavigateBack:function(){return a.create(this).viewId(null).do(function(){O.getWindow().history.back();}).description("Navigating back via browser back").execute();}});return B;});
