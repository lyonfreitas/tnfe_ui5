// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/library","sap/ushell/ui/appfinder/AppBox","sap/ushell/ui/appfinder/PinButton","sap/ushell/ui/launchpad/CatalogEntryContainer","sap/ushell/ui/launchpad/CatalogsContainer","sap/ushell/ui/launchpad/Tile","sap/ui/thirdparty/jquery","sap/ui/performance/Measurement","sap/ushell/resources","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/m/List","sap/m/StandardListItem","sap/ui/Device","sap/m/MessagePage","sap/m/Page","sap/m/PageAccessibleLandmarkInfo","sap/m/BusyIndicator","sap/m/SplitApp","sap/ushell/Config","sap/ushell/components/appfinder/VisualizationOrganizerHelper","sap/ushell/renderers/fiori2/AccessKeysHandler","sap/ushell/components/ComponentKeysHandler"],function(c,A,P,C,a,T,q,M,r,b,L,S,D,d,f,g,B,h,i,V,j,k){"use strict";var l=c.AccessibleLandmarkRole;sap.ui.jsview("sap.ushell.components.appfinder.Catalog",{oController:null,oVisualizationOrganizerHelper:V.getInstance(),formatPinButtonTooltip:function(G,o){var t;if(o.path){var e=G?Array.prototype.indexOf.call(G,o.id):-1;t=e!==-1?"removeAssociatedTileFromContextGroup":"addAssociatedTileToContextGroup";return r.i18n.getText(t,o.title);}t=G&&G.length?"EasyAccessMenu_PinButton_Toggled_Tooltip":"EasyAccessMenu_PinButton_UnToggled_Tooltip";return r.i18n.getText(t);},formatPinButtonSelectState:function(e,m,G,s){if(G){var n=e?Array.prototype.indexOf.call(e,s):-1;return n!==-1;}return!!m;},createContent:function(o){var t=this;this.oViewData=this.getViewData();this.parentComponent=this.oViewData.parentComponent;var m=this.parentComponent.getModel();this.setModel(m);this.setModel(this.oViewData.subHeaderModel,"subHeaderModel");this.oVisualizationOrganizerHelper.setModel(m);this.oController=o;function n(e){return((e!==null)&&(e==="1x2"||e==="2x2"))||false;}var p=new P({icon:{path:"id",formatter:this.oVisualizationOrganizerHelper.formatPinButtonIcon},type:{path:"id",formatter:this.oVisualizationOrganizerHelper.formatPinButtonType},selected:{parts:["associatedGroups","associatedGroups/length","/groupContext/path","/groupContext/id"],formatter:this.oVisualizationOrganizerHelper.formatPinButtonSelectState.bind(this)},tooltip:{parts:["associatedGroups","/groupContext","id"],formatter:this.oVisualizationOrganizerHelper.formatPinButtonTooltip.bind(this)},press:[this.oVisualizationOrganizerHelper.onTilePinButtonClick,this],visible:false});var s=new P({icon:{path:"id",formatter:this.oVisualizationOrganizerHelper.formatPinButtonIcon},type:{path:"id",formatter:this.oVisualizationOrganizerHelper.formatPinButtonType},selected:{parts:["associatedGroups","associatedGroups/length","/groupContext/path","/groupContext/id"],formatter:this.oVisualizationOrganizerHelper.formatPinButtonSelectState.bind(this)},tooltip:{parts:["associatedGroups","/groupContext","id"],formatter:this.oVisualizationOrganizerHelper.formatPinButtonTooltip.bind(this)},press:[this.oVisualizationOrganizerHelper.onTilePinButtonClick,this],visible:false});this.oAppBoxesTemplate=new A({title:"{title}",icon:"{icon}",subtitle:"{subtitle}",url:"{url}",navigationMode:"{navigationMode}",pinButton:s,press:[o.onAppBoxPressed,o]});this.oVisualizationOrganizerHelper.shouldPinButtonBeVisible().then(function(e){s.setVisible(e);p.setVisible(e);});s.addCustomData(new b({key:"tabindex",value:"-1",writeToDom:true}));s.addStyleClass("sapUshellPinButton");p.addCustomData(new b({key:"tabindex",value:"-1",writeToDom:true}));p.addStyleClass("sapUshellPinButton");this.oTileTemplate=new T({tileViews:{path:"content",factory:function(I,e){return e.getObject();}},long:{path:"size",formatter:n},tileCatalogId:"{id}",pinButton:p,press:[o.catalogTilePress,o],afterRendering:o.onTileAfterRendering});this.oCatalogSelect=new L("catalogSelect",{visible:"{/enableCatalogSelection}",rememberSelections:true,mode:"SingleSelectMaster",items:{path:"/masterCatalogs",template:new S({type:"Active",title:"{title}"})},showNoData:false,itemPress:[o._handleCatalogListItemPress,o],selectionChange:[o._handleCatalogListItemPress,o]});this.getCatalogSelect=function(){return this.oCatalogSelect;};var u=this.oCatalogSelect.onAfterRendering;if(D.system.desktop){k.getInstance().then(function(G){this.oCatalogSelect.addEventDelegate({onsaptabnext:function(H){try{H.preventDefault();j.setIsFocusHandledByAnotherHandler(true);G.setFocusOnCatalogTile();}catch(e){}},onsapskipforward:function(H){try{H.preventDefault();j.setIsFocusHandledByAnotherHandler(true);G.setFocusOnCatalogTile();}catch(e){}},onsapskipback:function(H){try{H.preventDefault();j.setIsFocusHandledByAnotherHandler(true);var I=sap.ui.getCore().byId("openCloseButtonAppFinderSubheader");if(I.getVisible()){I.focus();}else{G.appFinderFocusMenuButtons(H);}}catch(e){}}});}.bind(this));}if(m.getProperty("/enableHelp")){this.oCatalogSelect.addStyleClass("help-id-catalogCategorySelect");}this.setCategoryFilterSelection=function(e,G){var H=t.getCatalogSelect();var I=H.getItems();var J=e;var K=0;if(!J||J===""){J=r.i18n.getText("all");}I.forEach(function(N,O){if(N.getTitle()===J){K=O;H.setSelectedItem(N);}});if(I.length!==0&&G){I[K].focus();}};this.oCatalogSelect.onAfterRendering=function(){var e=t.oController.categoryFilter||r.i18n.getText("all");t.setCategoryFilterSelection(e);if(u){u.apply(this,arguments);}if(!this.getSelectedItem()){this.setSelectedItem(this.getItems()[0]);}setTimeout(function(){var G=q("#catalog-button, #userMenu-button, #sapMenu-button").filter("[tabindex=0]");if(G.length){G.eq(0).focus();}else{q("#catalog-button").focus();}},0);};var v=this.oCatalogSelect._onAfterRenderingPopover;this.oCatalogSelect._onAfterRenderingPopover=function(){if(this._oPopover){this._oPopover.setFollowOf(false);}if(v){v.apply(this,arguments);}};var E=sap.ui.getCore().getEventBus();var w;var U=function(){this.splitApp.toMaster("catalogSelect","show");if(!D.system.phone){w=this._calculateDetailPageId();if(w!==this.splitApp.getCurrentDetailPage().getId()){this.splitApp.toDetail(w);}}}.bind(this);E.subscribe("launchpad","catalogContentLoaded",function(){setTimeout(U,500);},this);E.subscribe("launchpad","afterCatalogSegment",U,this);var x=new C({header:"{title}",customTilesContainer:{path:"customTiles",template:this.oTileTemplate,templateShareable:true},appBoxesContainer:{path:"appBoxes",template:this.oAppBoxesTemplate,templateShareable:true}});this.oMessagePage=new d({visible:true,showHeader:false,text:r.i18n.getText("EasyAccessMenu_NoAppsToDisplayMessagePage_Text"),description:""});this.oCatalogsContainer=new a("catalogTiles",{categoryFilter:"{/categoryFilter}",catalogs:{path:"/catalogs",templateShareable:true,template:x},busy:true}).addStyleClass("sapUiTinyMarginTop");this.oCatalogsContainer.addStyleClass("sapUshellCatalogTileContainer");this.oCatalogsContainer.addEventDelegate({onsaptabprevious:function(e){var G=sap.ui.getCore().byId("openCloseButtonAppFinderSubheader");var H=q(e.srcControl.getDomRef());if(G.getVisible()&&!G.getPressed()&&!H.hasClass("sapUshellPinButton")){e.preventDefault();var I=sap.ui.getCore().byId("appFinderSearch");I.focus();}},onsapskipback:function(e){var G=sap.ui.getCore().byId("openCloseButtonAppFinderSubheader");if(G.getVisible()&&!G.getPressed()){e.preventDefault();G.focus();}}});this.oCatalogsContainer.onAfterRendering=function(){var e=sap.ui.getCore().byId("catalogTilesDetailedPage");if(!this.getBusy()){e.setBusy(false);M.end("FLP:AppFinderLoadingStartToEnd");}else{e.setBusy(true);}q("#catalogTilesDetailedPage-cont").scroll(function(){var G=sap.ui.getCore().byId("catalogTilesDetailedPage");var H=G.getScrollDelegate();var I=H.getScrollTop();var J=H.getMaxScrollTop();if(J-I<=30+3*t.oController.PagingManager.getTileHeight()&&t.oController.bIsInProcess===false){t.oController.bIsInProcess=true;t.oController.allocateNextPage();setTimeout(function(){t.oController.bIsInProcess=false;},0);}});};var y=new f("catalogTilesDetailedPage",{showHeader:false,showFooter:false,showNavButton:false,content:[this.oCatalogsContainer.addStyleClass("sapUshellCatalogPage")],landmarkInfo:new g({contentLabel:r.i18n.getText("appFinderCatalogTitle"),contentRole:l.None,rootRole:l.None})});var z=new f("catalogMessagePage",{showHeader:false,showFooter:false,showNavButton:false,content:[this.oMessagePage]});var F=new B("catalogSelectBusyIndicator",{size:"1rem"});this.splitApp=new h("catalogViewMasterDetail",{masterPages:[F,this.oCatalogSelect],detailPages:[y,z],mode:"{= ${/isPhoneWidth} ? 'HideMode' : 'ShowHideMode'}"});return this.splitApp;},_calculateDetailPageId:function(){var s=this.getModel("subHeaderModel");var e=s.getProperty("/search/searchMode");var t=s.getProperty("/tag/tagMode");var n=!!this.getModel().getProperty("/catalogsNoDataText");var I;if(e||t){I=this.getController().bSearchResults?"catalogTilesDetailedPage":"catalogMessagePage";}else if(n){I="catalogMessagePage";}else{I="catalogTilesDetailedPage";}return I;},getControllerName:function(){return"sap.ushell.components.appfinder.Catalog";}});});
