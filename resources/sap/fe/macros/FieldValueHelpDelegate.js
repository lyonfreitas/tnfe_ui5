/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/mdc/odata/v4/FieldValueHelpDelegate","sap/fe/macros/internal/valuehelp/ValueListHelper","sap/fe/core/CommonUtils"],function(F,V,C){"use strict";var O=Object.assign({},F);O.determineSearchSupported=function(p,f){return V.setValueListFilterFields(p.propertyPath,f,true,p.conditionModel);};O.contentRequest=function(p,f,s,P){return V.showValueListInfo(p.propertyPath,f,s,p.conditionModel,P);};O.adjustSearch=function(p,t,s){return C.normalizeSearchTerm(s);};return O;},false);
