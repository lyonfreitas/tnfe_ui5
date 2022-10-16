sap.ui.define(["sap/base/util/ObjectPath","sap/suite/ui/generic/template/genericUtilities/FeLogger","sap/suite/ui/generic/template/manifestMerger/MergerUtil"],function(O,F,M){"use strict";var l=new F("manifestMerger.ChangePageConfiguration").getLogger();var c={applyChange:function(m,C){l.info("modifyPageConfiguration use case");var o=C.getContent();M.consistencyCheck(o,"MODIFY");var p=o.parentPage.entitySet;var P=o.parentPage.component;var a=M.iterateAndFind(m["sap.ui.generic.app"],p,P);var b=o.entityPropertyChange;var d=Object.keys(b.propertyValue);d.forEach(function(s){var e=b.propertyPath.split("/");e.push(s);var v=O.get(e,a);if(v&&typeof v==="object"){var f=O.create(e,a);Object.assign(f,b.propertyValue[s]);}else{O.set(e,b.propertyValue[s],a);}});return m;}};return c;});