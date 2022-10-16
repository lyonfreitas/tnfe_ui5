// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/ObjectPath","sap/base/Log","sap/ui/thirdparty/jquery"],function(O,L,q){"use strict";var M=function(s,p,a){this._oAdapterConfig=O.get("config",a);};M.prototype.isMenuEnabled=function(){return Promise.resolve(!!this._oAdapterConfig.enabled);};M.prototype.getMenuEntries=function(){var m=this._oAdapterConfig.menuData;return new Promise(function(r,a){if(!m){L.error("No menuData specified in the adapter configuration.",null,"sap.ushell.adapters.local.MenuAdapter");a("No menuData specified in the adapter configuration.");return;}if(typeof m==="string"){q.ajax({type:"GET",dataType:"json",url:m}).done(function(R){r(R);}).fail(function(e){L.error(e.responseText);a("Menu entries were requested but could not be loaded from JSON file: "+m);});}else{r(m);}});};return M;},true);
