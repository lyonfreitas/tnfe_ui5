// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/library","sap/ushell/resources","sap/ui/Device","sap/ui/model/json/JSONModel"],function(C,m,r,D,J){"use strict";var L=m.ListMode;return C.extend("sap.ushell.components.appfinder.GroupListPopover",{onInit:function(){var v=this.getView();this.oPopoverModel=new J({userGroupList:v.getViewData().groupData});this.oPopoverModel.setSizeLimit(9999);v.oPopover.setModel(this.oPopoverModel);},onExit:function(){var v=this.getView();if(v._oListContainer){v._oListContainer.destroy();}if(v._oNewGroupItem){v._oNewGroupItem.destroy();}if(v._oNewGroupNameInput){v._oNewGroupNameInput.destroy();}if(v._oNewGroupHeader){v._oNewGroupHeader.destroy();}},_cancelButtonPress:function(){this.getView().oPopover.close();},_groupListItemClickHandler:function(e){var l=e.getParameter("listItem");if(l.data("newGroupItem")){this._navigateToCreateNewGroupPane();return;}var o=e.getSource();if(o.getMode()===L.SingleSelectMaster){var v=this.getView();v.oPopover.close();}else{l.setSelected(!l.getSelected());}},_okayCancelButtonPress:function(){var v=this.getView();var n=v._getNewGroupInput();var N=n.getValue();if(N.length>0){this.sNewGroupId=N;}v.oPopover.close();},_navigateToCreateNewGroupPane:function(){var v=this.getView();var n=v._getNewGroupHeader();var N=v._getNewGroupInput();v.oPopover.removeAllContent();v.oPopover.addContent(N);v.oPopover.setCustomHeader(n);v.oPopover.setContentHeight("");var e=v.oPopover.getEndButton();if(e){e.setVisible(true);}else{e=v._getCancelButton();v.oPopover.setEndButton(e);}v.oPopover.getBeginButton().setText(r.i18n.getText("okDialogBtn"));e.setText(r.i18n.getText("cancelBtn"));if(v.getViewData().singleGroupSelection){this._setFooterVisibility(true);}setTimeout(function(){N.focus();},0);},_afterCloseHandler:function(){var u=this.oPopoverModel.getProperty("/userGroupList");var c={addToGroups:[],removeFromGroups:[],newGroups:this.sNewGroupId?[this.sNewGroupId]:[],allGroups:u};var g;for(var i=0,l=u.length;i<l;++i){g=u[i];if(g.selected===g.initiallySelected){continue;}if(g.selected){c.addToGroups.push(g.oGroup);}else{c.removeFromGroups.push(g.oGroup);}}var v=this.getView();v.deferred.resolve(c);v.destroy();},_backButtonHandler:function(){var v=this.getView();v.oPopover.removeAllContent();if(v.getViewData().singleGroupSelection){this._setFooterVisibility(false);}if(!D.system.phone){v.oPopover.setContentHeight("192px");}else{v.oPopover.setContentHeight("100%");}v.oPopover.setVerticalScrolling(true);v.oPopover.setHorizontalScrolling(false);v.oPopover.addContent(v._getListContainer());v.oPopover.setTitle(r.i18n.getText("addTileToGroups_popoverTitle"));v.oPopover.setCustomHeader();v._getNewGroupInput().setValue("");v.oPopover.getEndButton().setVisible(false);v.oPopover.getBeginButton().setText(r.i18n.getText("close"));},_setFooterVisibility:function(v){var f=sap.ui.getCore().byId("groupsPopover-footer");if(f){f.setVisible(v);}}});});
