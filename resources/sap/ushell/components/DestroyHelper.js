// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";function d(t){var i;if(t&&t.content){for(i=0;i<t.content.length;i++){if(t.content[i].destroy){t.content[i].destroy();}}}}function a(t){var i;if(t){for(i=0;i<t.length;i++){d(t[i]);}}}function b(A){if(A){a(A.tiles);}}function c(A){var i;if(A){for(i=0;i<A.length;i++){b(A[i]);}}}return{destroyFLPAggregationModel:b,destroyFLPAggregationModels:c,destroyTileModel:d,destroyTileModels:a};});
