sap.ui.define([],function(){"use strict";var f="FioriElements";function F(c,m){var e=new Error(c+': '+m);e.name=f;Object.setPrototypeOf(e,Object.getPrototypeOf(this));if(Error.captureStackTrace){Error.captureStackTrace(e,F);}return e;}F.prototype=Object.create(Error.prototype,{constructor:{value:Error,enumerable:false,writable:true,configurable:true}});Object.setPrototypeOf(F,Error);return F;});