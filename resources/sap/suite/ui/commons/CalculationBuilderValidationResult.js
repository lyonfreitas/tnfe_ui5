sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","sap/ui/base/ManagedObject"],function(q,l,C,M){"use strict";var a=M.extend("sap.suite.ui.commons.CalculationBuilderValidationResult",{constructor:function(){M.prototype.constructor.apply(this,arguments);this._aErrors=[];}});a.prototype.addError=function(e){this._aErrors.push(e);};a.prototype.addErrors=function(e){q.merge(this._aErrors,e);};a.prototype.getErrors=function(){return this._aErrors;};return a;});
