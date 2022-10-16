ace.define("ace/mode/zeek_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var Z=function(){this.$rules={"start":[{token:"comment.line",regex:"#.*$"},{token:"string.double",regex:/"/,next:"string-state"},{token:"string.regexp",regex:"(/)(?=.*/)",next:"pattern-state"},{token:["keyword.other","meta.preprocessor"],regex:/(@(?:load-plugin|load-sigs|load|unload))(.*$)/},{token:"keyword.other",regex:/@(?:DEBUG|DIR|FILENAME|deprecated|if|ifdef|ifndef|else|endif)/},{token:["keyword.other","meta.preprocessor","keyword.operator","meta.preprocessor"],regex:/(@prefixes)(\s*)(\+?=)(.*$)/},{token:"storage.modifier.attribute",regex:/\&\b(?:redef|priority|log|optional|default|add_func|delete_func|expire_func|read_expire|write_expire|create_expire|synchronized|persistent|rotate_interval|rotate_size|encrypt|raw_output|mergeable|error_handler|type_column|deprecated)\b/},{token:"constant.language",regex:/\b(?:T|F)\b/},{token:"constant.numeric.port",regex:/\b\d{1,5}\/(?:udp|tcp|icmp|unknown)\b/},{token:"constant.numeric.addr",regex:/\b(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\b/,comment:"IPv4 address"},{token:"constant.numeric.addr",regex:/\[(?:[0-9a-fA-F]{0,4}:){2,7}(?:[0-9a-fA-F]{0,4})?(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2}))?\]/,comment:"IPv6 address"},{token:"constant.numeric.float.decimal.interval",regex:/(?:(?:\d*\.\d*(?:[eE][+-]?\d+)?|\d*[eE][+-]?\d+|\d*\.\d*)|\d+)\s*(?:day|hr|min|msec|usec|sec)s?/},{token:"constant.numeric.float.decimal",regex:/\d*\.\d*(?:[eE][+-]?\d+)?|\d*[eE][+-]?\d+|\d*\.\d*/},{token:"constant.numeric.hostname",regex:/\b[A-Za-z0-9][A-Za-z0-9\-]*(?:\.[A-Za-z0-9][A-Za-z0-9\-]*)+\b/},{token:"constant.numeric.integer.hexadecimal",regex:/\b0x[0-9a-fA-F]+\b/},{token:"constant.numeric.integer.decimal",regex:/\b\d+\b/},{token:"keyword.operator",regex:/==|!=|<=|<|>=|>/},{token:"keyword.operator",regex:/(&&)|(\|\|)|(!)/},{token:"keyword.operator",regex:/=|\+=|-=/},{token:"keyword.operator",regex:/\+\+|\+|--|-|\*|\/|%/},{token:"keyword.operator",regex:/&|\||\^|~/},{token:"keyword.operator",regex:/\b(?:in|as|is)\b/},{token:"punctuation.terminator",regex:/;/},{token:"punctuation.accessor",regex:/\??\$/},{token:"punctuation.accessor",regex:/::/},{token:"keyword.operator",regex:/\?/},{token:"punctuation.separator",regex:/:/},{token:"punctuation.separator",regex:/,/},{token:["keyword.other","meta.namespace","entity.name.namespace"],regex:/(module)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)/},{token:"keyword.other",regex:/\bexport\b/},{token:"keyword.control.conditional",regex:/\b(?:if|else)\b/},{token:"keyword.control",regex:/\b(?:for|while)\b/},{token:"keyword.control",regex:/\b(?:return|break|next|continue|fallthrough)\b/},{token:"keyword.control",regex:/\b(?:switch|default|case)\b/},{token:"keyword.other",regex:/\b(?:add|delete)\b/},{token:"keyword.other",regex:/\bprint\b/},{token:"keyword.control",regex:/\b(?:when|timeout|schedule)\b/},{token:["keyword.other","meta.struct.record","entity.name.struct.record","meta.struct.record","punctuation.separator","meta.struct.record","storage.type.struct.record"],regex:/\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)(\s*\b)(record)\b/},{token:["keyword.other","meta.enum","entity.name.enum","meta.enum","punctuation.separator","meta.enum","storage.type.enum"],regex:/\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)(\s*\b)(enum)\b/},{token:["keyword.other","meta.type","entity.name.type","meta.type","punctuation.separator"],regex:/\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)/},{token:["keyword.other","meta.struct.record","storage.type.struct.record","meta.struct.record","entity.name.struct.record"],regex:/\b(redef)(\s+)(record)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/},{token:["keyword.other","meta.enum","storage.type.enum","meta.enum","entity.name.enum"],regex:/\b(redef)(\s+)(enum)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/},{token:["storage.type","text","entity.name.function.event"],regex:/\b(event)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/},{token:["storage.type","text","entity.name.function.hook"],regex:/\b(hook)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/},{token:["storage.type","text","entity.name.function"],regex:/\b(function)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/},{token:"keyword.other",regex:/\bredef\b/},{token:"storage.type",regex:/\bany\b/},{token:"storage.type",regex:/\b(?:enum|record|set|table|vector)\b/},{token:["storage.type","text","keyword.operator","text","storage.type"],regex:/\b(opaque)(\s+)(of)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/},{token:"keyword.operator",regex:/\bof\b/},{token:"storage.type",regex:/\b(?:addr|bool|count|double|file|int|interval|pattern|port|string|subnet|time)\b/},{token:"storage.type",regex:/\b(?:function|hook|event)\b/},{token:"storage.modifier",regex:/\b(?:global|local|const|option)\b/},{token:"entity.name.function.call",regex:/\b[A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*(?=s*\()/},{token:"punctuation.section.block.begin",regex:/\{/},{token:"punctuation.section.block.end",regex:/\}/},{token:"punctuation.section.brackets.begin",regex:/\[/},{token:"punctuation.section.brackets.end",regex:/\]/},{token:"punctuation.section.parens.begin",regex:/\(/},{token:"punctuation.section.parens.end",regex:/\)/}],"string-state":[{token:"constant.character.escape",regex:/\\./},{token:"string.double",regex:/"/,next:"start"},{token:"constant.other.placeholder",regex:/%-?[0-9]*(\.[0-9]+)?[DTdxsefg]/},{token:"string.double",regex:"."}],"pattern-state":[{token:"constant.character.escape",regex:/\\./},{token:"string.regexp",regex:"/",next:"start"},{token:"string.regexp",regex:"."}]};this.normalizeRules();};Z.metaData={fileTypes:["bro","zeek"],name:"Zeek",scopeName:"source.zeek"};o.inherits(Z,T);e.ZeekHighlightRules=Z;});ace.define("ace/mode/folding/cstyle",[],function(r,e,a){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(c){if(c){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end));}};o.inherits(F,B);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(s,f,b){var l=s.getLine(b);if(this.singleLineBlockCommentRe.test(l)){if(!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";}var c=this._getFoldWidgetBase(s,f,b);if(!c&&this.startRegionRe.test(l))return"start";return c;};this.getFoldWidgetRange=function(s,f,b,c){var l=s.getLine(b);if(this.startRegionRe.test(l))return this.getCommentRegionBlock(s,l,b);var m=l.match(this.foldingStartMarker);if(m){var i=m.index;if(m[1])return this.openingBracketBlock(s,m[1],b,i);var d=s.getCommentFoldRange(b,i+m[0].length,1);if(d&&!d.isMultiLine()){if(c){d=this.getSectionRange(s,b);}else if(f!="all")d=null;}return d;}if(f==="markbegin")return;var m=l.match(this.foldingStopMarker);if(m){var i=m.index+m[0].length;if(m[1])return this.closingBracketBlock(s,m[1],b,i);return s.getCommentFoldRange(b,i,-1);}};this.getSectionRange=function(s,b){var l=s.getLine(b);var c=l.search(/\S/);var d=b;var f=l.length;b=b+1;var g=b;var m=s.getLength();while(++b<m){l=s.getLine(b);var i=l.search(/\S/);if(i===-1)continue;if(c>i)break;var h=this.getFoldWidgetRange(s,"all",b);if(h){if(h.start.row<=d){break;}else if(h.isMultiLine()){b=h.end.row;}else if(c==i){break;}}g=b;}return new R(d,f,g,s.getLine(g).length);};this.getCommentRegionBlock=function(s,l,b){var c=l.search(/\s*$/);var d=s.getLength();var f=b;var g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var h=1;while(++b<d){l=s.getLine(b);var m=g.exec(l);if(!m)continue;if(m[1])h--;else h++;if(!h)break;}var i=b;if(i>f){return new R(f,c,i,l.length);}};}).call(F.prototype);});ace.define("ace/mode/zeek",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var Z=r("./zeek_highlight_rules").ZeekHighlightRules;var F=r("./folding/cstyle").FoldMode;var M=function(){this.HighlightRules=Z;this.foldingRules=new F();};o.inherits(M,T);(function(){this.lineCommentStart="#";this.$id="ace/mode/zeek";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/zeek"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
