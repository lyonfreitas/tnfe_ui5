// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/deepExtend"],function(d){"use strict";function i(n){return typeof n==="string"||n.type==="wildcard"||n.type==="literal"||n.type==="intentParameter"||n.type==="reference";}function a(n){return n.type==="reference"&&!n.namespace;}function b(G,p,n){if(!G.hasOwnProperty(p)){G[p]=[];}if(a(n)){G[p].push(n.value);}}function c(p){var D={};var A=b.bind(null,D);Object.keys(p).forEach(function(P){var n=p[P];v(n,P,A);});return D;}function e(n){var N=n.type;if(N==="expression"){return[n.value];}if(N==="function"){return(n.args||[]).concat(n.params||[]);}if(N==="pipe"||N==="path"){return n.value;}throw new Error("Unknown type encountered while building dependency graph: '"+N+"'");}function v(n,p,A){A(p,n);if(i(n)){return;}var N=e(n);N.forEach(function(n){v(n,p,A);});}function g(D){var o=d({},D);var n,N,r=[],R={};do{var f=Object.keys(o);n=f.length;f.forEach(function(s){if(o[s].length>0){o[s]=o[s].filter(function(h){var w=!R[h];var m=o.hasOwnProperty(h);return w&&m;});}if(o[s].length===0){delete o[s];r.push(s);R[s]=true;}});N=Object.keys(o).length;}while(n!==N);if(N!==0){throw new Error("Graph of dependencies contains cyclic references");}return r;}return{buildDependencyGraph:c,getDependencyResolutionOrder:g};});
