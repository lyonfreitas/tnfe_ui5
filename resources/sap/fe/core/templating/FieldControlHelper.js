/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingExpression"],function(B){"use strict";var _={};var a=B.annotationExpression;var o=B.or;var e=B.equal;var i=function(t){return o(b(t),c(t));};_.isNonEditableExpression=i;var b=function(t){var f,g,h;var F=t===null||t===void 0?void 0:(f=t.annotations)===null||f===void 0?void 0:(g=f.Common)===null||g===void 0?void 0:(h=g.FieldControl)===null||h===void 0?void 0:h.valueOf();if(typeof F==="object"){return!!F&&e(a(F),1);}return F==="Common.FieldControlType/ReadOnly";};_.isReadOnlyExpression=b;var c=function(t){var f,g,h;var F=t===null||t===void 0?void 0:(f=t.annotations)===null||f===void 0?void 0:(g=f.Common)===null||g===void 0?void 0:(h=g.FieldControl)===null||h===void 0?void 0:h.valueOf();if(typeof F==="object"){return!!F&&e(a(F),0);}return F==="Common.FieldControlType/Inapplicable";};_.isDisabledExpression=c;var d=function(t){var f,g,h;var F=t===null||t===void 0?void 0:(f=t.annotations)===null||f===void 0?void 0:(g=f.Common)===null||g===void 0?void 0:(h=g.FieldControl)===null||h===void 0?void 0:h.valueOf();if(typeof F==="object"){return!!F&&e(a(F),7);}return F==="Common.FieldControlType/Mandatory";};_.isRequiredExpression=d;return _;},false);