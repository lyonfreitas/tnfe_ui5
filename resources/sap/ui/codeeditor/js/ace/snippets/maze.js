ace.define("ace/snippets/maze",[],function(r,e,m){"use strict";e.snippetText="snippet >\ndescription assignment\nscope maze\n	-> ${1}= ${2}\n\nsnippet >\ndescription if\nscope maze\n	-> IF ${2:**} THEN %${3:L} ELSE %${4:R}\n";e.scope="maze";});(function(){ace.require(["ace/snippets/maze"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();