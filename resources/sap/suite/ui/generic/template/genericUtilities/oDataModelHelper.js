sap.ui.define([],function(){"use strict";function s(p){if(p.indexOf("/")===0){p=p.substring(1);}var P=p.split("(");var e=P.shift();var r=P.join("(");var k=r.substring(0,r.length-1);return{entitySet:e,key:k,canonicalPath:"/"+p};}function a(p,m){if(p.lastIndexOf("/")!==0){var M=m.getMetaModel();p=M.oMetadata._calculateCanonicalPath(p);}return s(p);}function A(c){return a(c.getPath(),c.getModel());}return{splitCanonicalPath:s,analyseContextPath:a,analyseContext:A};});