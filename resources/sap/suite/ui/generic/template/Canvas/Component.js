sap.ui.define(["sap/suite/ui/generic/template/lib/TemplateAssembler","sap/suite/ui/generic/template/lib/TemplateComponent","sap/suite/ui/generic/template/detailTemplates/detailUtils","sap/suite/ui/generic/template/Canvas/controller/ControllerImplementation","sap/base/util/extend"],function(T,a,d,C,e){"use strict";function g(c,o){var v={};var b=d.getComponentBase(c,o,v);var s={oControllerSpecification:{getMethods:C.getMethods.bind(null,v),oControllerDefinition:{},oControllerExtensionDefinition:{provideExtensionStateData:function(S){},restoreExtensionStateData:function(G){}}},oComponentData:{templateName:"sap.suite.ui.generic.template.Canvas.view.Canvas"}};return e(b,s);}return T.getTemplateComponent(g,"sap.suite.ui.generic.template.Canvas",{metadata:{library:"sap.suite.ui.generic.template",properties:{"requiredControls":"object"},"manifest":"json"}});});
