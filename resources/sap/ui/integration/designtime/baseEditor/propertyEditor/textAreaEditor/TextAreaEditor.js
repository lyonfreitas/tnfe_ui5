/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/base/util/restricted/_isNil","sap/base/util/isPlainObject"],function(B,_,i){"use strict";var T=B.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.textAreaEditor.TextAreaEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.textAreaEditor.TextAreaEditor",metadata:{library:"sap.ui.integration"},renderer:B.getMetadata().getRenderer().render});T.configMetadata=Object.assign({},B.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"}});T.prototype.getDefaultValidators=function(){var c=this.getConfig();return Object.assign({},B.prototype.getDefaultValidators.call(this),{notABinding:{type:"notABinding",isEnabled:!c.allowBindings},maxLength:{type:"maxLength",isEnabled:typeof c.maxLength==="number",config:{maxLength:c.maxLength}}});};T.prototype.formatValue=function(v){v=JSON.stringify(v,null,"\t");if(typeof v==="object"&&!v.length){v=v.replace(/\"\$\$([a-zA-Z]*)\$\$\"/g,function(s){return s.substring(3,s.length-3);});}return v;};T.prototype._onLiveChange=function(){var t=this.getContent();var v=t.getValue();if(!v||v===""){this.setValue(V);}else{try{var V=JSON.parse(v);this.setValue(V);}catch(e){t.setValueState("Error");t.setValueStateText(this.getI18nProperty("BASE_EDITOR.VALIDATOR.NOT_A_JSONOBJECT"));}}};return T;});
