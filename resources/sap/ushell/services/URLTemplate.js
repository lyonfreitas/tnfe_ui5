// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/base/Log"],function(u,L){"use strict";function U(){this._init.apply(this,arguments);}U.prototype._init=function(a){this.oAdapter=a;};U.prototype.handlePostTemplateProcessing=function(s,S,f){if(this.oAdapter&&this.oAdapter.handlePostTemplateProcessing){return this.oAdapter.handlePostTemplateProcessing(s,S,f);}else{return Promise.resolve(s);}};U.hasNoAdapter=false;U.useConfigAdapterOnly=true;return U;});