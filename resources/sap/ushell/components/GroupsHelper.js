// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";return{getIndexOfGroup:a,getModelPathOfGroup:g};function g(G,s){var i=a(G,s);if(i<0){return null;}return"/groups/"+i;}function a(G,s){for(var i=0;i<G.length;i++){if(G[i].groupId===s){return i;}}return-1;}});
