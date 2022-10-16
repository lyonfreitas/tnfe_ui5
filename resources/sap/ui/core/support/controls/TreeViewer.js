/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/base/ManagedObject',"sap/base/security/encodeXML"],function(q,M,e){'use strict';var T=M.extend("sap.ui.core.support.controls.TreeViewer",{metadata:{library:"sap.ui.core"},constructor:function(){M.apply(this,arguments);this._oRenderParent=null;this._oRootObject=null;}});var r={nodestart:"<div tabindex=\"0\" idx=\"{idx}\" class=\"node start {cssclass}\" haschildnodes=\"{haschildnodes}\" visible=\"{visible}\" collapsed=\"{collapsed}\" level=\"{level}\" raise=\"_selectNode\" args=\"{idx}\"><span class=\"expand\" raise=\"_toggleNode\" args=\"{idx}\"></span>&lt;<span class=\"nstag\" reason=\"tagName\"><span class=\"ns\" reason=\"namespace\">{namespaceURI}</span><span class=\"tag\"  reason=\"localName\">{localName}</span></span>",nodestartend:"&gt;</div>",nodenochildend:"&gt;&lt;/<span class=\"nstagend\"><span class=\"nstag\"><span class=\"ns\">{namespaceURI}</span><span class=\"tag\">{localName}</span></span></span>&gt;</div><div class=\"node end sapUiSupportViewInfoElementHidden\" visible=\"{visible}\" haschildnodes=\"{haschildnodes}\" collapsed=\"{collapsed}\" level=\"{level}\">&lt;/<span class=\"nstag\"><span class=\"ns\">{namespaceURI}</span><span class=\"tag\">{localName}</span></span>&gt;</div>",nodeend:"<div class=\"node end {cssclass}\" visible=\"{visible}\" haschildnodes=\"{haschildnodes}\" collapsed=\"{collapsed}\" level=\"{level}\">&lt;/<span class=\"nstag\"><span class=\"ns\">{namespaceURI}</span><span class=\"tag\">{localName}</span></span>&gt;</div>",attribute:"&nbsp;<span class=\"attr\" modified=\"{modified}\" oldValue=\"{oldValue}\" title=\"{oldValue}\" reason=\"attributeName\"><span class=\"attrname\">{attributeName}</span>=&quot;<span class=\"attrvalue\" reason=\"attributeValue\">{attributeValue}</span>&quot;</span>",idattribute:"&nbsp;<span class=\"attr\" modified=\"{modified}\" oldValue=\"{oldValue}\" title=\"originalValue: {oldValue}\" reason=\"attributeName\"><span class=\"attrname\">{attributeName}</span>=&quot;<span class=\"attrvalue attrvalue1\" reason=\"attributeValue\">{attributeValue1}</span><span class=\"attrvalue attrvalue2\" reason=\"attributeValue\">{attributeValue2}</span>&quot;</span>",nodeinfo:"<span class=\"info {color}\" selected=\"{selected}\"title=\"{tooltip}\" raise=\"_onInfoClick\" args=\"{idx},{infoidx}\"></span>"};var l=1;var I=-1;function a(n){var l=parseInt(n.getAttribute("level"));n=n.nextSibling;while(n){if(parseInt(n.getAttribute("level"))==l){return n;}n=n.nextSibling;}return null;}function _(n){var C=n.childNodes;for(var i=0;i<C.length;i++){if(C[i].nodeType===1){return true;}}return false;}function b(n,o){var m=n._modified||[];var O=n._oldValues;var A=n.attributes;var s=m.concat([])||[];for(var i=0;i<A.length;i++){var I=s.indexOf(A[i].name);if(I===-1){s.push(A[i]);}else{s[I]=A[i];}}for(var i=0;i<s.length;i++){var f=s[i];var g=o.fnAttributeInfos(n,f);if(g){if(g.visible===false){continue;}}if(f.name==="__id"){continue;}if(f.name==="__inactive"){continue;}if(f.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1"){continue;}if(f.name.indexOf("__changed")>-1){continue;}if(f.name==="xmlns:support"){continue;}var h=false,j="";if(m.indexOf(f.name)>-1){h=true;j="originalValue: "+O[m.indexOf(f.name)];}if(f.name==="id"){if(!o.bIgnoreIds){o.addWithParam(r.idattribute,{attributeName:f.name,attributeValue1:e(String(f.value||"")),attributeValue2:n.getAttribute("__id"),modified:h,oldValue:e(j)});}}else{o.addWithParam(r.attribute,{attributeName:f.name,attributeValue:e(String(f.value||"")),modified:h,oldValue:e(j)});}}}function c(n,o){var C=n.childNodes;for(var i=0;i<C.length;i++){if(C[i].nodeType===1){if(n.getAttribute("__inactive")==="true"){C[i].setAttribute("__inactive","true");}l++;d(C[i],o);l--;}}}function d(n,o){I++;var h=_(n);var C="";if(n.getAttribute("__inactive")==="true"){C="inactive";}else if(n.getAttribute("__replace")==="true"){C="replace";}o.addWithParam(r.nodestart,{idx:I,haschildnodes:h,visible:l<o.initialExpandedLevel,cssclass:C,level:l,collapsed:l>=(o.initialExpandedLevel-1),localName:n.localName,namespaceURI:n.namespaceURI?e(String(n.namespaceURI))+":":""});var f=o.fnNodeInfos(n);if(f){for(var i=0;i<f.length;i++){var g=f[i];o.addWithParam(r.nodeinfo,{idx:I+"",infoidx:i+"",selected:g.selected||false,color:e(g.color)||"orange",tooltip:e(g.tooltip)||""});}}b(n,o);if(h){o.addWithParam(r.nodestartend,{});c(n,o);o.addWithParam(r.nodeend,{idx:I,haschildnodes:h,visible:l<o.initialExpandedLevel,level:l,cssclass:C,collapsed:l>=(o.initialExpandedLevel-1),localName:n.localName,namespaceURI:n.namespaceURI?e(String(n.namespaceURI))+":":""});}else{o.addWithParam(r.nodenochildend,{idx:I,haschildnodes:h,visible:l<o.initialExpandedLevel,level:l,collapsed:l>=(o.initialExpandedLevel-1),localName:n.localName,namespaceURI:n.namespaceURI?e(String(n.namespaceURI))+":":""});}}function R(){this._aBuffer=[];var t=this;this.add=function(){t._aBuffer.push.apply(t._aBuffer,arguments);};this.addWithParam=function(s,o){for(var n in o){var f=new RegExp("\{"+n+"\}","g");s=s.replace(f,o[n]);}t.add(s);};this.toString=function(){return t._aBuffer.join("");};}T.prototype.initialExpandedLevel=4;T.prototype.fnSelectionChange=function(){};T.prototype.fnInfoPress=function(){};T.prototype.ignoreIds=function(){this.bIgnoreIds=true;};T.prototype.setRootObject=function(o){if(o.nodeType&&o.nodeType===9){o=o.firstChild;}this._oRootObject=o;};T.prototype.attachSelectionChange=function(f){this.fnSelectionChange=f;};T.prototype.attachInfoPress=function(f){this.fnInfoPress=f;};T.prototype.attachNodeInfos=function(f){this.fnNodeInfos=f;};T.prototype.attachAttributeInfos=function(f){this.fnAttributeInfos=f;};T.prototype._getDataObjectByIndex=function(i){if(i===0){return this._oRootObject;}else{i--;var A=this._oRootObject.querySelectorAll("*");return A[i];}};T.prototype._getIndexOfNode=function(D){if(D===this._oRootObject){return 0;}else{var A=this._oRootObject.querySelectorAll("*");for(var i=0;i<A.length;i++){if(A[i]===D){return i+1;}}}return-1;};T.prototype._getStartNodeByIndex=function(i){return this._oRenderParent.firstChild.querySelector("[idx='"+i+"']");};T.prototype.toggleIds=function(){var C=this._oRenderParent.firstChild.className;if(C.indexOf(" id1")>-1){this._oRenderParent.firstChild.className=C.replace(" id1"," id2");return true;}else{this._oRenderParent.firstChild.className=C.replace(" id2"," id1");return false;}};T.prototype.toggleNS=function(){var C=this._oRenderParent.firstChild.className;if(C.indexOf(" hideNS")>-1){this._oRenderParent.firstChild.className=C.replace(" hideNS","");return true;}else{this._oRenderParent.firstChild.className=C+" hideNS";return false;}};T.prototype.toggleInactive=function(){var C=this._oRenderParent.firstChild.className;if(C.indexOf(" hideInactive")>-1){this._oRenderParent.firstChild.className=C.replace(" hideInactive","");return true;}else{this._oRenderParent.firstChild.className=C+" hideInactive";return false;}};T.prototype._iSelectedIndex=-1;T.prototype._selectNode=function(i,f){i=parseInt(i);var n=this._getStartNodeByIndex(i);if(this._oSelectedNode===n){return;}if(this._oSelectedNode){this._oSelectedNode.className=this._oSelectedNode.className.replace(" select","");}this._iSelectedIndex=i;this._oSelectedNode=n;this._oSelectedNode.className+=" select";this.fnSelectionChange(this._getDataObjectByIndex(i),f);return true;};T.prototype._onInfoClick=function(i,f){i=parseInt(i);this._selectNode(i,["template"]);this.fnInfoPress(this._getDataObjectByIndex(i),parseInt(f));return true;};T.prototype.expandNode=function(n){var i=this._getIndexOfNode(n);this.expandNodesToIndex(i);};T.prototype.expandNodesToIndex=function(i){var D=this._oRenderParent.firstChild.querySelector("div[idx='"+i+"']");if(!D||D.getAttribute("visible")==="true"){return;}var l=parseInt(D.getAttribute("level"));D=D.previousSibling;while(D){var C=parseInt(D.getAttribute("level"));if(C<l&&D.getAttribute("collapsed")==="true"){this._toggleNode(parseInt(D.getAttribute("idx")));}D=D.previousSibling;}};T.prototype.expandNodesWithSelectedInfo=function(f){var D=this._oRenderParent.firstChild.querySelectorAll("div[idx]");for(var i=0;i<D.length;i++){var o=D[i].querySelector("[args='"+i+","+f+"'][selected='true']");if(o){this.expandNodesToIndex(i);}}return this._iSelectedIndex;};T.prototype.getSelectedIndex=function(){return this._iSelectedIndex;};T.prototype.setInfoSelected=function(i,f,s,t){var o=this._oRenderParent.firstChild.querySelector("[args='"+i+","+f+"']");if(o){o.setAttribute("selected",s+"");if(t){o.setAttribute("title",t);}}};T.prototype._toggleNode=function(i){i=parseInt(i);var n=this._getStartNodeByIndex(i);if(n){var l=parseInt(n.getAttribute("level"));var N=n.nextSibling;while(N){if(parseInt(N.getAttribute("level"))>l){if(n.getAttribute("collapsed")==="true"){if(N.getAttribute("collapsed")==="true"){N.setAttribute("visible","true");var o=a(N);if(o){N=o;}}else{N.setAttribute("visible","true");}}else{N.setAttribute("visible","false");}}if(parseInt(N.getAttribute("level"))===l){if(n.getAttribute("collapsed")==="true"){N.setAttribute("visible","true");}else{N.setAttribute("visible","false");}break;}N=N.nextSibling;}if(n.getAttribute("collapsed")==="true"){n.setAttribute("collapsed","false");}else{n.setAttribute("collapsed","true");}}this._oSelectedNode&&this._oSelectedNode.focus();return true;};T.prototype.highlightedDomNodes=[];T.prototype.clearHighlights=function(){for(var i=0;i<this.highlightedDomNodes.length;i++){this.highlightedDomNodes[i].className=this.highlightedDomNodes[i].className.replace(" highlight","");}this.highlightedDomNodes=[];};T.prototype.highlightNodeById=function(i){var n=this._oRootObject.querySelector("[id='"+i+"']");if(n){this.highlightNode(n);}};T.prototype.highlightNode=function(n){var i=this._getIndexOfNode(n);if(i>-1){var D=this._getStartNodeByIndex(i);D.className+=" highlight";this.highlightedDomNodes.push(D);}};T.prototype.update=function(D){if(!D&&!this._oRenderParent){return;}if(this._oRenderParent&&D){this._oRenderParent.innerHTML="";}this._oRenderParent=D||this._oRenderParent;if(this._oRootObject){var o=new R();o.initialExpandedLevel=this.initialExpandedLevel;o.fnNodeInfos=this.fnNodeInfos||function(){};o.fnAttributeInfos=this.fnAttributeInfos||function(){};o.bIgnoreIds=this.bIgnoreIds;I=-1;o.add("<div class=\"treeviewer id2\" id=\""+this.getId()+"\">");if(this._oRootObject&&this._oRootObject.nodeType&&this._oRootObject.nodeType===1){d(this._oRootObject,o);}o.add("</div>");this._oRenderParent.innerHTML=o.toString();q(this._oRenderParent).find(".node.start, .node.end").each(function(i,f){f.style.paddingLeft=16*parseFloat(f.getAttribute("level"))+"px";});var t=this;this._oRenderParent.firstChild.addEventListener("click",function(E){var D=E.target,f=false,g=[];while(!f){if(D.getAttribute("raise")){if(D.getAttribute("args")){var A=D.getAttribute("args").split(",");A=A.concat(g);f=t[D.getAttribute("raise")].apply(t,A);}else{var A=[D];A=A.concat(g);f=t[D.getAttribute("raise")].apply(t,A);}}else if(D.getAttribute("reason")){g.push(D.getAttribute("reason"));}D=D.parentNode;if(D===t._oRenderParent){break;}}});this._oRenderParent.firstChild.addEventListener("mouseover",function(E){var n=E.target;while(n&&n.getAttribute&&!n.getAttribute("collapsed")){n=n.parentNode;if(n.className==="nstagend"){return;}if(n.getElementsByClassName("nstagend").length>0){n.getElementsByClassName("nstagend")[0].firstChild.style.border="1px dotted green";return;}}if(!n||E.target.tagName==="DIV"){return;}if(n.getAttribute&&n.getAttribute("collapsed")==="false"){n=a(n);if(n){var f=n.getElementsByClassName("nstag")[0];f.style.border="1px dotted green";}}});this._oRenderParent.firstChild.addEventListener("mouseout",function(E){var n=E.target;while(n&&n.getAttribute&&!n.getAttribute("collapsed")){n=n.parentNode;if(n.className==="nstagend"){return;}if(n.getElementsByClassName("nstagend").length>0){n.getElementsByClassName("nstagend")[0].firstChild.style.border="";return;}}if(!n||E.target.tagName==="DIV"){return;}if(n.getAttribute&&n.getAttribute("collapsed")==="false"){n=a(n);if(n){var f=n.getElementsByClassName("nstag")[0];f.style.border="";}}});}};return T;});
