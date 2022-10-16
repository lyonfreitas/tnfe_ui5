/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(R){"use strict";var B=R.extend("sap.ui.integration.cards.BaseContentRenderer",{apiVersion:2});B.DEFAULT_MIN_HEIGHT="5rem";B.render=function(r,c){var C="sapFCard",n=c.getMetadata().getName(),t=n.slice(n.lastIndexOf(".")+1),o=c.getParent(),i=o&&o.isA("sap.f.ICard"),l=t!=="AdaptiveContent"&&i&&c.isLoading();C+=t;r.openStart("div",c).class(C).class("sapFCardBaseContent");if(c.hasListeners("press")){r.class("sapFCardClickable");}if(i&&o.getHeight()==="auto"){var h=this.getMinHeight(c.getParsedConfiguration(),c);r.style("min-height",h);}if(l){r.class("sapFCardContentLoading");}r.openEnd();if(l){r.renderControl(c._oLoadingPlaceholder);}this.renderContent(r,c);r.close("div");};B.renderContent=function(r,c){r.renderControl(c.getAggregation("_content"));};B.getMinHeight=function(c,C){return this.DEFAULT_MIN_HEIGHT;};B.isCompact=function(c){var r=c,p=c.getParent();if(!c.getDomRef()&&p&&p.isA("sap.f.ICard")){r=p;}return r.$().closest(".sapUiSizeCompact").hasClass("sapUiSizeCompact");};return B;});
