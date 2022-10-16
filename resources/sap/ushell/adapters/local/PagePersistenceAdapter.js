// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ui/util/Storage","sap/base/util/ObjectPath"],function(u,S,O){"use strict";var P=function(s,p,a){var b=O.get("config.storageType",a)||S.Type.local;if(b!==S.Type.local&&b!==S.Type.session){throw new u.Error("PagePersistence Adapter Local Platform: unsupported storage type: '"+b+"'");}this._oAdapterConfiguration=a;};P.prototype.getPage=function(i){var t=this;return new Promise(function(r,a){var d=t._oAdapterConfiguration.config.dataLoad[i]||{};if(d.page.id===i){r(d);}a({error:"No page with id '"+i+"' was found."});});};P.prototype.getPages=function(i){var p=this._oAdapterConfiguration.config.dataLoad||{};return Promise.resolve(i.map(function(a){return p[a];}).filter(function(a){return!!a;}));};return P;},true);