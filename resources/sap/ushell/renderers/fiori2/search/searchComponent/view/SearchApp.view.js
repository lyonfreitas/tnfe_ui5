// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/View","sap/m/Label","sap/esh/search/ui/SearchCompositeControl"],function(V,L,S){"use strict";return V.extend("sap.ushell.renderers.fiori2.search.searchComponent.view.SearchApp",{getControllerName:function(){return"sap.ushell.renderers.fiori2.search.searchComponent.controller.SearchApp";},createContent:function(){var m=sap.esh.search.ui.getModelSingleton({},"flp");return new S({model:m});}});});
