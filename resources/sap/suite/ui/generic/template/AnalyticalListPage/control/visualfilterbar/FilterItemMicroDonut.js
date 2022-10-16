sap.ui.define(["sap/suite/ui/microchart/InteractiveDonutChart","sap/suite/ui/microchart/InteractiveDonutChartSegment","sap/ui/model/json/JSONModel","sap/suite/ui/generic/template/AnalyticalListPage/control/visualfilterbar/FilterItemMicroChart","sap/suite/ui/generic/template/AnalyticalListPage/util/CriticalityUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/suite/ui/generic/template/js/StableIdHelper","sap/base/util/deepExtend"],function(I,a,J,F,C,b,S,d){"use strict";var c="__IS_OTHER__";var e=F.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.visualfilterbar.FilterItemMicroDonut",{metadata:{properties:{labelWidthPercent:{type:"float",group:"Misc",defaultValue:1/2}},aggregations:{control:{type:"sap.suite.ui.microchart.InteractiveDonutChart",multiple:false}}},renderer:{}});e.prototype.init=function(){var i=this.getId()+"-innerChart";this._chart=new I({id:i,selectionEnabled:true,segments:[]});this.setControl(this._chart);this.setModel(new J(),'__alp_chartJSONModel');this._otherField="__IS_OTHER__";this._sorters=[];F.prototype.init.apply(this,arguments);};e.prototype._applyDonutChartSelections=function(o,D){var s=this._chart.getSegments(),p=this.getParentProperty(),f=[],g,r;if(o.dimValue===c){s.forEach(function(h){g=h.getCustomData()[0].getValue();if(g!==c){if(h.getSelected()){f.push(g);}r={"exclude":true,"operation":"EQ"};r.keyField=p;r.value1=g;D.ranges.push(r);}});if(f.length>0){D.items=D.items.filter(function(h){return f.indexOf(h.key)===-1;});D.ranges=D.ranges.filter(function(r){return!(r.exclude===false&&r.operation==="EQ"&&r.keyField===p&&f.indexOf(r.value1)>-1);});}}else{if(o.dimValue instanceof Date){D.ranges.push({exclude:false,keyField:this.getDimensionField(),operation:"EQ",value1:o.dimValue,value2:null});}else{D.items.push({key:o.dimValue,text:o.dimValueDisplay});}var i=false;s.forEach(function(h){g=h.getCustomData()[0].getValue();if(g===c&&h.getSelected()){i=true;}if(g!==c){f.push(g);}});if(i){D.ranges=D.ranges.filter(function(r){return!(r.exclude===true&&r.operation==="EQ"&&r.keyField===p&&f.indexOf(r.value1)>-1);});}}return D;};e.prototype._onDataReceived=function(t,T){var r=[],D=this.getDimensionFieldDisplay(),m=this.getMeasureField(),s=this.getDimensionField(),n=b.IsNavigationProperty(this.getModel(),this.getEntitySet(),D)?D.split("/"):null;if(!T){t.results.forEach(function(i,j){i['dimensionValue']=i[s];r.push(i);});}else{var f=0,o=0;t.results.forEach(function(i,j){if(j<2){i['dimensionValue']=i[s];r.push(i);f+=parseFloat(i[m]);}});if(T){T.results.forEach(function(i){var j=this.getModel("i18n"),k=d({},i);k['dimensionValue']=this._otherField;k[s]=this._otherField;if(this.getUnitField()){k[this.getUnitField()]=t.results.length>1?t.results[0][this.getUnitField()]:"";}if(n&&n.length>0){k[n[0]]={};k[n[0]][n[1]]=j?j.getResourceBundle().getText("VIS_FILTER_DONUT_OTHER"):"";}else{k[D]=j?j.getResourceBundle().getText("VIS_FILTER_DONUT_OTHER"):"";}if(f<0){o=parseFloat(i[m])+f;}else{o=parseFloat(i[m])-f;}k[m]=o;r.push(k);}.bind(this));}}F.prototype._onDataReceived.call(this,r);this.getModel('__alp_chartJSONModel').setData(r);this._chart.setModel(this.getModel('__alp_chartJSONModel'));var g=3,h={path:'/',template:new a(this._getChartAggregationSettings("Donut")),startIndex:0,length:g};this._chart.bindSegments(h);this._chart.setBusy(false);};return e;},true);