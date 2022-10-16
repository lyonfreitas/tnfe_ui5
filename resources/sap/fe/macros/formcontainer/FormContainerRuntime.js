/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/macros/ResourceModel"],function(R,L){"use strict";var F={toggleDetails:function(e){var b=e.getSource(),i=e.getSource().getBindingContext("internal"),S="showDetails";if(!i||!(i.getProperty instanceof Function)||i.getProperty(S)===undefined){L.error("FormContainerRuntime: No internal model context / property found: Cannot execute 'Show Details' in FormContainer.","sap.fe.macros.formcontainer.FormContainerRuntime","toggleDetails");}else{i.setProperty(S,!i.getProperty(S));b.setProperty("text",i.getProperty(S)?R.getText("T_COMMON_OBJECT_PAGE_HIDE_FORM_CONTAINER_DETAILS"):R.getText("T_COMMON_OBJECT_PAGE_SHOW_FORM_CONTAINER_DETAILS"));}}};return F;},false);
