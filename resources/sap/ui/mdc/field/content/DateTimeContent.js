/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/content/DefaultContent","sap/ui/mdc/field/content/DateContent"],function(D,a){"use strict";var b=Object.assign({},a,{getEditOperator:function(){return{"EQ":{name:"sap/m/DateTimePicker",create:this._createDatePickerControl}};},getEdit:function(){return D.getEdit.apply(this,arguments);},createEditMultiLine:function(){throw new Error("sap.ui.mdc.field.content.DateTimeContent - createEditMultiLine not defined!");},createEdit:function(c,C,i){return D.createEdit.apply(this,arguments);}});return b;});
