/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/generic/template/designtime/utils/designtimeHelper","sap/base/util/deepExtend"],function(d,a){"use strict";var A={"sap.f.DynamicPage":{properties:["fitContent"]},"sap.ui.comp.smartfilterbar.SmartFilterBar":{properties:["liveMode"]},"sap.ui.comp.smarttable.SmartTable":{properties:["useExportToExcel"]},"sap.m.Table":{properties:["sticky","popinLayout","includeItemInSelection","growingThreshold"]},"sap.m.Column":{properties:["width","hAlign"]},"sap.ui.table.Column":{properties:["width","hAlign"]},"sap.m.Button":{actions:["combine"],properties:["visible","icon","activeIcon","type"]},"sap.m.OverflowToolbarButton":{properties:["visible","icon","activeIcon","type"]}};var g={"sap.f.DynamicPage":{properties:["headerExpanded"]},"sap.m.VBox":{properties:["width"]},"sap.ui.comp.smartfilterbar.SmartFilterBar":{properties:["showClearOnFB","showFilterConfiguration","showRestoreOnFB","useDateRangeType","filterBarExpanded","showGoOnFB"]},"sap.m.Label":{properties:["width","wrapping"]},"sap.m.Text":{properties:["text","wrapping"]},"sap.m.Title":{properties:["text"]},"sap.m.MultiInput":{properties:["showSuggestion","editable","value","showValueHelp","enabled"]},"sap.m.IconTabFilter":{properties:["text","icon","count","iconColor"]},"sap.ui.comp.smarttable.SmartTable":{properties:["header","ignoreFromPersonalisation","showTablePersonalisation","editable","showRowCount","wrap","requestAtLeastFields","ignoredFields","exportType","width","demandPopin"]},"sap.m.Table":{properties:["noDataText","fixedLayout","growingScrollToLoad","growing"]},"sap.m.Column":{properties:["demandPopin","vAlign","popinDisplay","mergeDuplicates"]},"sap.ui.table.Table":{properties:["selectionMode"]},"sap.ui.table.AnalyticalTable":{properties:["selectionMode","minAutoRowCount","visibleRowCountMode"]},"sap.ui.table.AnalyticalColumn":{properties:["width","minWidth","showFilterMenuEntry","summed"]},"sap.ui.comp.smartmicrochart.SmartMicroChart":{properties:["size"]},"sap.ui.comp.smartchart.SmartChart":{properties:["showDownloadButton","header","ignoredChartTypes","useTooltip","useChartPersonalisation"]},"sap.m.Button":{properties:["enabled","text","blocked"]},"sap.m.OverflowToolbarButton":{properties:["enabled","text","blocked"]},"sap.m.MenuButton":{properties:["text","type"]}};var m={"sap.m.Button":{actions:["combine"]}};var b=a({},A,g,m);return d.then(function(c){return c.getViewDesignTime(b);});});
