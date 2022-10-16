(function(){"use strict";var m={};["initializeConnection","getScene","getGeomMesh","getAnnotation","getMaterial","getImage","getView"].reverse().forEach(function(a,i){m[a]=i;});var t=new Map();var u;var c;var d;var f;var r=[];var g=4;var h=0;function s(a,b,e){return new Promise(function(i,F){r.push({url:u+a,context:b,priority:m[b&&b.method]||0,responseType:e,resolve:i,reject:F});if(h<g){p();}});}function p(){if(!r.length){return;}r.sort(function(a,b){return a.priority-b.priority;});var e=r.pop();h++;j(encodeURI(e.url),e.responseType).then(function(a){e.resolve(a);h--;p();}).catch(function(a){E({errorText:"Could not connect to server: "+u,error:a.status,reason:a.message?a.message:a,context:e.context});if(e.reject){e.reject(a);}h--;p();});}function j(u,a){return new Promise(function(b,e){var i=new XMLHttpRequest();i.onload=function(){if(this.status>=200&&this.status<300){if(this.getAllResponseHeaders().includes("tile-width")){var F=this.getResponseHeader("tile-width");var G=new RegExp("[^\/]+$");var H=this.responseURL.match(G);t.set(H[0],F);}b(this.response);}else{e({status:this.status,statusText:this.statusText});}};i.onerror=function(){e({status:this.status,statusText:this.statusText});};i.open("GET",u,true);if(d){i.setRequestHeader("Authorization",d);}if(f){i.setRequestHeader("X-TenantUuid",f);}i.setRequestHeader("X-CorrelationID",c);i.responseType=a||"arraybuffer";i.send();});}var k="TextDecoder"in self?(function(){var a=new TextDecoder();return function(b,e,i){return a.decode(new DataView(b,e,i-e));};})():function(a,b,i){var F="";var M=1000;try{while(b<i){var G=Math.min(M,i-b);var H=new Uint8Array(a,b,G);F+=String.fromCharCode.apply(null,H);b+=G;}}catch(e){return"";}return decodeURIComponent(escape(F));};function l(a){var b=a.split(",");if(b.length<0||b.length>2){throw"invalid content length";}var i=0;var F=0;try{i=parseInt(b[0],10);if(b.length===2){F=parseInt(b[1],10);}}catch(e){throw"invalid content length";}return{jsonContentLength:i,binaryContentLength:F};}function n(a,i){var b="[".charCodeAt(0);var e="]".charCodeAt(0);var F=[];var G=0;var H=0;var I;var J;var K;var L=new Uint8Array(a);while(H<a.byteLength){H=L.indexOf(b,G);if(H===-1){break;}var M=k(a,G,H).replace(/\n|\r|\s/g,"");G=H+1;H=L.indexOf(e,G);if(H===-1){throw"No matching [] for command length. abort";}I=l(k(a,G,H));G=H+1;H=G+I.jsonContentLength;J=k(a,G,H);if(I.binaryContentLength){G=H;H=G+I.binaryContentLength;K=new Uint8Array(a,G,I.binaryContentLength);}else{K=undefined;}G=H;var N={name:M,jsonString:J,isInitial:i};if(K){N.binaryContent=K;}F.push(N);}return F;}function o(a){var b;var e=-1;var F,i;var G=false;var H=false;var I=false;for(i=0;i<a.length;i++){b=a[i];if(b.name==="setView"){if(!G){if(!b.jsonContent.viewId){G=true;}}H=true;}else if(b.name==="setViewNode"){if(F===undefined){F=b.jsonContent.viewId;}}else if(b.name==="setSequence"&&H){I=true;}}if(F&&G){for(i=0;i<a.length;i++){b=a[i];if(b.name==="setView"){b.jsonContent={viewId:F};break;}}}for(i=0;i<a.length;i++){b=a[i];if(b.name==="setPlayback"&&I){e=i;continue;}if(b.name==="setImage"){var J=b.jsonContent.id;var K=J?t.get(J):null;if(K){b.jsonContent.tileWidth=K;}}if(b.name==="setScene"&&a.length>1){continue;}q(b);}if(e!==-1){b=a[e];q(b);}}function q(a){if(a.binaryContent){self.postMessage({name:a.name,jsonString:a.jsonString,jsonContent:a.jsonContent,binaryContent:a.binaryContent,isInitial:a.isInitial},[a.binaryContent.buffer]);}else{self.postMessage({name:a.name,jsonString:a.jsonString,jsonContent:a.jsonContent,isInitial:a.isInitial});}}function v(a){var b="";for(var e in a){if(a[e]==null){continue;}if(b.length!==0){b+="&";}b+=e+"="+a[e];}return b;}function w(a){var b="scenes/"+a.sceneId+"?sid=1";s(b,a,"text").then(function(e){var i;try{i=JSON.parse(e);}catch(F){E({errorText:"Failed to parse JSON"});return;}o([{name:"setScene",jsonContent:i.scene}]);});}function x(a){var b=a.parameters.sceneId;var e=a.parameters.viewId;var i=a.parameters.sids;var F=a.isInitial;var G="scenes/"+b;if(e){G+="/views/"+e;}G+="?"+v(a.parameters.query);if(i&&i.length>0){G+="&sid="+i.join("&sid=");}var H=a.isPartialTree;s(G,a,"text").then(function(I){var J;try{J=JSON.parse(I);}catch(K){E({errorText:"Failed to parse JSON"});return;}var L=[];var M=e?J.views[0]:J.tree;var N=M.nodes;delete M.nodes;var O=J.highlightStyles;var P=J.annotations;var Q=J.parametrics;var R=J.textStyles;var S=J.linestyles;var T=J.fillstyles;if(N){N.forEach(function(W){if("highlightStyle"in W&&O){W.highlightStyleId=O[W.highlightStyle].id;}if("annotation"in W&&P){W.annotationId=P[W.annotation].id;}if("parametric"in W&&Q){W.parametricId=Q[W.parametric].id;}});}if(Q){Q.forEach(function(W){if("style"in W&&R){W["style_id"]=R[W.style].veid;}if("stroke"in W&&S){W["stroke_id"]=S[W.stroke].veid;}if("fill"in W&&T){W["fill_id"]=T[W.fill].veid;}});}L.push({name:"suppressSendRequests",jsonContent:{sceneId:b}});if(!H){M.sceneId=b;M.viewId=e;L.push({name:"setView",jsonContent:M,isInitial:F});}if(N){L.push({name:H?"setTreeNode":"setViewNode",jsonContent:{sceneId:b,viewId:e,nodes:N},isInitial:F});}L.push({name:H?"notifyFinishedTree":"notifyFinishedView",jsonContent:{sceneId:b,viewId:e},isInitial:F});if(O){O.forEach(function(W){W.sceneId=b;L.push({name:"setHighlightStyle",jsonContent:W,isInitial:F});});}if(R){L.push({name:"setTextStyle",jsonContent:{sceneId:b,textStyles:R},isInitial:F});}if(S){L.push({name:"setLineStyle",jsonContent:{sceneId:b,lineStyles:S},isInitial:F});}if(T){L.push({name:"setFillStyle",jsonContent:{sceneId:b,fillStyles:T},isInitial:F});}if(Q){L.push({name:"setParametric",jsonContent:{sceneId:b,parametrics:J.parametrics},isInitial:F});}if(P){L.push({name:"setAnnotation",jsonContent:{sceneId:b,annotations:P},isInitial:F});}var U=J.animation;if(U&&U.sequences&&U.playbacks){var V={sceneId:b,viewId:e,tracks:U.tracks,sequences:U.sequences};if(U.joints){V.joints=U.joints;}L.push({name:"setSequence",jsonContent:V,isInitial:F});U.playbacks.forEach(function(W){W.sequenceId=U.sequences[W.sequence].id;});L.push({name:"setPlayback",jsonContent:{sceneId:b,viewId:e,playbacks:U.playbacks},isInitial:F});}L.push({name:"unsuppressSendRequests",jsonContent:{sceneId:b}});o(L);if(a.pushViewGroups){z({method:"getViewGroups",parameters:{sceneId:b}});}});}function y(a){var b=a.parameters.sceneId;var e=a.parameters.viewId;var i="scenes/"+b+"/views/"+e+"/animations?"+v(a.parameters.query);s(i,a,"text").then(function(F){var G;try{G=JSON.parse(F);}catch(H){E({errorText:"Failed to parse JSON"});return;}o([{name:"setPlayback",jsonContent:{sceneId:b,viewId:e,playbacks:G.playbacks}}]);});}function z(a){var b=a.parameters.sceneId;var e=a.parameters.viewGroupId;var i="scenes/"+b+"/viewGroups";if(e){i+="/"+e;}s(i,a,"text").then(function(F){var G;try{G=JSON.parse(F);}catch(H){E({errorText:"Failed to parse JSON"});return;}o(G.groups.map(function(I){return{name:"setViewGroup",jsonContent:I};}));});}function A(a){var b=a.parameters.sceneId;var e=a.parameters.materialIds;var i=e.map(function(G){return"id="+G;}).join("&");var F="scenes/"+b+"/materials?"+i;s(F,a,"text").then(function(G){var H;try{H=JSON.parse(G);}catch(I){E({errorText:"Failed to parse JSON"});return;}H.sceneId=b;o([{name:"setMaterial",jsonContent:H}]);});}function B(a){var b=a.parameters.sceneId;var e=a.parameters.annotationIds;var i=e.map(function(G){return"id="+G;}).join("&");var F="scenes/"+b+"/annotations?"+i;s(F,a,"text").then(function(G){var H;try{H=JSON.parse(G);}catch(I){E({errorText:"Failed to parse JSON"});return;}H.sceneId=b;o([{name:"setAnnotation",jsonContent:H}]);});}function C(a){var b;if(a.materialId){b="scenes/"+a.sceneId+"/materials/"+a.materialId+"/images/"+a.imageId;}else if(a.viewId){b="scenes/"+a.sceneId+"/views/"+a.viewId+"/images/"+a.imageId;}else{return;}s(b,a,"arraybuffer").then(function(e){o([{name:"setImage",jsonContent:{sceneId:a.sceneId,id:a.imageId,isInitial:a.isInitial},binaryContent:new Uint8Array(e)}]);});}function D(a){var b="scenes/"+a.sceneId+"/meshes?ids="+a.meshIds.join(",");s(b,a,"arraybuffer").then(function(e){var i=n(e);i.forEach(function(F){F.jsonContent={sceneId:a.sceneId};});o(i);});}function E(e){self.postMessage({name:"notifyError",jsonContent:e});}self.onmessage=function(e){var a=e.data;switch(a.method){case"getAnnotation":{B(a);break;}case"getGeomMesh":{D(a);break;}case"getImage":{C(a);break;}case"getMaterial":{A(a);break;}case"getScene":{w(a);break;}case"getView":{x(a);break;}case"getViewAnimations":{y(a);}case"getViewGroups":{z(a);break;}case"initializeConnection":{u=a.url;c=a.cid;g=a.maxActiveRequests;break;}case"close":{self.close();break;}case"useAccessTokenResponse":{if(a.accessTokenResponse){d=a.accessTokenResponse.token_type+" "+a.accessTokenResponse.access_token;f=a.accessTokenResponse.tenant_uuid;}else{d=null;f=null;}break;}case"setMaxActiveRequests":{g=a.maxActiveRequests;break;}case"addClientLog":{break;}default:{console.warn("Unknown TotaraLoader command: "+a.method);break;}}};})();
