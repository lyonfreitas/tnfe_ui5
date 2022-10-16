/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnalyticalBinding","sap/base/assert","sap/base/Log","sap/base/util/each","sap/ui/model/ChangeReason","sap/ui/model/TreeAutoExpandMode","sap/ui/model/TreeBinding","sap/ui/model/TreeBindingAdapter","sap/ui/model/odata/ODataTreeBindingAdapter"],function(A,a,L,e,C,T,b,c,O){"use strict";var d=function(){if(!(this instanceof b)||this._bIsAdapted){return;}O.apply(this);for(var f in d.prototype){if(d.prototype.hasOwnProperty(f)){this[f]=d.prototype[f];}}this.setAutoExpandMode(this.mParameters.autoExpandMode||T.Bundled);},s="sap.ui.model.analytics.AnalyticalTreeBindingAdapter";d.prototype.getGrandTotalContext=function(){return this._oRootNode&&this._oRootNode.context;};d.prototype.getGrandTotalNode=function(){return this._oRootNode;};d.prototype.getGrandTotalContextInfo=function(){return this._oRootNode;};d.prototype.getLength=function(){if(!this._oRootNode){return 0;}if(this._oRootNode&&this._oWatermark&&this._isRunningInAutoExpand(T.Bundled)){if(this._oWatermark.groupID===this._oRootNode.groupID){return this._oRootNode.magnitude+this._oRootNode.numberOfTotals;}return this._oWatermark.absoluteNodeIndex+this._oRootNode.numberOfTotals+1;}return this._oRootNode.magnitude+this._oRootNode.numberOfTotals;};d.prototype.getContextByIndex=function(i){if(this._oRootNode&&i===(this.getLength()-1)&&this.providesGrandTotal()&&this.hasTotaledMeasures()){return this._oRootNode.context;}var n=this.findNode(i);if(!n||!n.context){n={context:this.getContexts(i,1,0)[0]};}return n?n.context:undefined;};d.prototype.getNodeByIndex=function(i){if(i===(this.getLength()-1)&&this.providesGrandTotal()&&this.hasTotaledMeasures()){return this._oRootNode;}if(i>=this.getLength()){return undefined;}return this.findNode(i);};d.prototype._isNodeSelectable=function(n){if(!n){return false;}return n.isLeaf&&!n.isArtificial;};d.prototype._getContextsOrNodes=function(r,S,l,t){if(!this.isResolved()){return[];}if(!l){l=this.oModel.iSizeLimit;}if(!t){t=0;}this._iPageSize=l;this._iThreshold=Math.max(this._iThreshold,t);this._aRowIndexMap=[];this._buildTree(S,l);var n=[];if(this._oRootNode){n=this._retrieveNodeSection(this._oRootNode,S,l);}this._updateRowIndexMap(n,S);var f=[];var m;var N;for(var i=0;i<n.length;i++){N=n[i];if(this._isRunningInAutoExpand(T.Bundled)&&this._oWatermark){if(N.groupID===this._oWatermark.groupID||(this._oWatermark.groupID===this._oRootNode.groupID&&(S+i+1)==this.getLength()-1)){this._autoExpandPaging();}}if(!N.context){m=m||{};var p=N.parent;m[p.groupID]=p;this._updateNodeSections(p.groupID,{startIndex:N.positionInParent,length:1});}f.push(N.context);}if(m){var g=this;e(m,function(G,N){N.magnitude=0;N.numberOfTotals=0;g._loadChildContexts(N,{absoluteNodeIndex:N.absoluteNodeIndex});});f=[];for(var j=0;j<n.length;j++){N=n[j];f.push(N.context);}}if(r){return n;}else{return f;}};d.prototype._autoExpandPaging=function(){a(this._oWatermark,"No watermark was set!");a(this._isRunningInAutoExpand(T.Bundled),"Optimised AutoExpand Paging can only be used with TreeAutoExpandMode.Bundled!");var f=this.getNodeContexts(this._oWatermark.context,{startIndex:this._oWatermark.startIndex,length:this._iPageSize,threshold:this._iThreshold,level:this._oWatermark.level,numberOfExpandedLevels:this._oWatermark.autoExpand});return f;};d.prototype._afterMatchHook=function(n,r,m,M,p,P){if(n.sumNode&&n!==this._oRootNode){if(r.length===m){return true;}var N=M.call(this,n.sumNode,n.sumNode.positionInParent,P);if(N){r.push(n.sumNode);}}return undefined;};d.prototype._afterMapHook=function(n,m){if(n.sumNode&&n!==this._oRootNode){m.call(this,n.sumNode);}};d.prototype._createSumNode=function(n){var f;if(this.bProvideGrandTotals&&!this.mParameters.sumOnTop&&this.hasTotaledMeasures()&&n.children.length>1){f=this._createNode({parent:n.parent,positionInParent:n.children.length,context:n.context,level:n.level});f.nodeState=this._createNodeState({groupID:f.groupID,sum:true,expanded:false});}return f;};d.prototype._buildTree=function(S,l){this._oRootNode=undefined;this._oWatermark=undefined;var n=this.mParameters&&this.getNumberOfExpandedLevels();var r=this.getRootContexts({startIndex:0,length:this._iPageSize,threshold:this._iThreshold,numberOfExpandedLevels:this._autoExpandMode===T.Bundled?n:undefined});var R;if(r==null){L.warning("AnalyticalTreeBindingAdapter: No Dimensions given. An artificial rootContext has be created. Please check your Table/Service definition for dimension columns!");}else{R=r[0];}if(!R){return;}var o=this._getNodeState("/");if(!o){o=this._updateTreeState({groupID:"/",expanded:true,sum:true});this._updateNodeSections("/",{startIndex:0,length:l});}this._oRootNode=this._createNode({context:R,parent:null,level:0,nodeState:o,isLeaf:false,autoExpand:n,absoluteNodeIndex:-1});this._oRootNode.isArtificial=true;this._loadChildContexts(this._oRootNode,{absoluteNodeIndex:-1});};d.prototype._loadChildContexts=function(n,r){var N=n.nodeState;var m=this.getGroupSize(n.context,n.level);if(m>=0){if(!n.children[m-1]){n.children[m-1]=undefined;}if(n.level===this.aAggregationLevel.length){N.leafCount=m;}n.sumNode=this._createSumNode(n);}for(var i=0;i<N.sections.length;i++){var o=N.sections[i];if(o.startIndex>n.children.length){continue;}var R;if(m===-1){R=o.length;}else{R=Math.min(o.length,m-o.startIndex);}var S=false;if(n.autoExpand>=0&&this._isRunningInAutoExpand(T.Bundled)){S=true;R=Math.max(0,m);}var f=this.getNodeContexts(n.context,{startIndex:o.startIndex,length:R,threshold:S?0:this._iThreshold,level:n.level,supressRequest:S});for(var j=0;j<f.length;j++){var g=f[j];var h=j+o.startIndex;var k=n.children[h];var u={context:f[j],parent:n,level:n.level+1,positionInParent:h,autoExpand:Math.max(n.autoExpand-1,-1),absoluteNodeIndex:(++r.absoluteNodeIndex)};if(k){k.context=u.context;k.parent=u.parent;k.level=u.level;k.positionInParent=u.positionInParent;k.magnitude=0;k.numberOfTotals=0;k.totalNumberOfLeafs=0;k.autoExpand=u.autoExpand;k.absoluteNodeIndex=u.absoluteNodeIndex;var G;if(g){G=this._calculateGroupID(k);}k.groupID=G;}else{k=this._createNode(u);}k.nodeState=this._getNodeState(k.groupID);if(!k.nodeState){k.nodeState=this._createNodeState({groupID:k.groupID,expanded:false});}k.nodeState.parentGroupID=n.groupID;k.isLeaf=!this.nodeHasChildren(k);n.children[h]=k;if(k.isLeaf){n.numberOfLeafs+=1;}if(k.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[k.groupID]&&k.isLeaf){this.setNodeSelection(k.nodeState,true);}if((k.autoExpand>=0||k.nodeState.expanded)&&this.isGrouped()){if(!this._mTreeState.collapsed[k.groupID]){if(k.autoExpand>=0&&k.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[k.groupID]){if(k.nodeState.selectAllMode===undefined){k.nodeState.selectAllMode=true;}}this._updateTreeState({groupID:k.nodeState.groupID,fallbackNodeState:k.nodeState,expanded:true});this._loadChildContexts(k,r);}n.magnitude+=k.magnitude;n.numberOfTotals+=k.numberOfTotals;n.numberOfLeafs+=k.numberOfLeafs;}if(k&&k.isLeaf){n.totalNumberOfLeafs=m;}else{n.totalNumberOfLeafs+=k.totalNumberOfLeafs;}}}m=this._isRunningInAutoExpand(T.Bundled)?n.children.length:m;n.magnitude+=Math.max(m||0,0);if(!m&&!this._isRunningInAutoExpand(T.Bundled)){L.warning("AnalyticalTreeBindingAdapter: iMaxGroupSize("+m+") is undefined for node '"+n.groupID+"'!");}if(n.sumNode||(n===this._oRootNode&&this.providesGrandTotal()&&this.hasTotaledMeasures())){n.numberOfTotals+=1;}if(this._isRunningInAutoExpand(T.Bundled)&&n.autoExpand!=-1){if(!this._oWatermark&&!n.isLeaf&&!this.mFinalLength[n.groupID]){this._oWatermark={groupID:n.groupID,context:n.context,absoluteNodeIndex:n.absoluteNodeIndex,startIndex:n.children.length,level:n.level,autoExpand:n.autoExpand};}}};d.prototype._calculateGroupID=function(n){var g;var m=this.aAggregationLevel.length;if(!this.isGrouped()&&n&&n.positionInParent){g="/"+n.positionInParent+"/";}else if(n.level>m){g=this._getGroupIdFromContext(n.context,m);a(n.positionInParent!=undefined,"If the node level is greater than the number of grouped columns, the position of the node to its parent must be defined!");g+=n.positionInParent+"/";}else{g=this._getGroupIdFromContext(n.context,n.level);}return g;};d.prototype.collapse=function(p){var n,N;if(typeof p==="object"){n=p;}else if(typeof p==="number"){N=this.findNode(p);a(N&&N.nodeState,"AnalyticalTreeBindingAdapter.collapse("+p+"): No node found!");if(!N){return;}n=N.nodeState;}this._updateTreeState({groupID:n.groupID,expanded:false});n.selectAllMode=false;var f=false;if(this.bCollapseRecursive||this._isRunningInAutoExpand(T.Bundled)){var g=n.groupID;if(this._isRunningInAutoExpand(T.Bundled)&&this._oWatermark&&(typeof g=="string"&&g.length>0&&this._oWatermark.groupID.startsWith(g))){if(N&&N.parent){this._oWatermark={groupID:N.parent.groupID,context:N.parent.context,absoluteNodeIndex:N.parent.absoluteNodeIndex,startIndex:N.positionInParent+1,level:N.parent.level,autoExpand:N.parent.autoExpand};}this._autoExpandPaging();f=true;}var t=this;e(this._mTreeState.expanded,function(G,o){if(typeof g=="string"&&g.length>0&&G.startsWith(g)){t._updateTreeState({groupID:G,expanded:false});}});var D=[];e(this._mTreeState.selected,function(G,o){if(typeof g=="string"&&g.length>0&&G.startsWith(g)){o.selectAllMode=false;t.setNodeSelection(o,false);D.push(G);}});if(D.length){var h={rowIndices:[]};var i=0;this._map(this._oRootNode,function(N){if(!N||!N.isArtificial){i++;}if(N&&D.indexOf(N.groupID)!==-1){if(N.groupID===this._sLeadSelectionGroupID){h.oldIndex=i;h.leadIndex=-1;}h.rowIndices.push(i);}});this._publishSelectionChanges(h);}}if(!f){this._fireChange({reason:C.Collapse});}};d.prototype.collapseToLevel=function(l){this.setNumberOfExpandedLevels(l,true);c.prototype.collapseToLevel.call(this,l);};d.prototype.nodeHasChildren=function(n){a(n,"AnalyticalTreeBindingAdapter.nodeHasChildren: No node given!");if(!n||!n.parent||n.nodeState.sum){return false;}else if(n.isArtificial){return true;}else{return A.prototype.hasChildren.call(this,n.context,{level:n.level});}};d.prototype.resetData=function(o,p){var r=A.prototype.resetData.call(this,o,p);this._aRowIndexMap=[];this._oRootNode=undefined;this._oWatermark=undefined;this._iPageSize=0;this._iThreshold=0;if(!p||p.reason!==C.Sort){this.clearSelection();this._createTreeState(true);}return r;};d.prototype.hasTotaledMeasures=function(){var h=false;e(this.getMeasureDetails()||[],function(i,m){if(m.analyticalInfo.total){h=true;return false;}return true;});return h;};d.prototype.isGrouped=function(){return(this.aAggregationLevel.length>0);};d.prototype._isRunningInAutoExpand=function(f){if(this.getNumberOfExpandedLevels()>0&&this._autoExpandMode===f){return true;}else{return false;}};d.prototype.setNumberOfExpandedLevels=function(l,S){var n;l=l||0;if(l<0){L.warning("Number of expanded levels was set to 0. Negative values are prohibited",this,s);l=0;}n=this.aAggregationLevel.length;if(l>n){L.warning("Number of expanded levels was reduced from "+l+" to "+n+" which is the number of grouped dimensions",this,s);l=n;}if(!S){this.resetData();}this.mParameters.numberOfExpandedLevels=l;};d.prototype.getNumberOfExpandedLevels=function(){return this.mParameters.numberOfExpandedLevels;};d.prototype._getSelectableNodesCount=function(n){if(n){return n.totalNumberOfLeafs;}else{return 0;}};return d;},true);
