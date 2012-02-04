/*
 * Copyright 2007-2010 Allan Jardine. All rights reserved
 * Contact: allan.jardine /AT\ sprymedia.co.uk
 */
if(!window.VisEventSyntaxHighlighter){var VisEventSyntaxHighlighter=function(){var a={defaults:{"class-name":"","first-line":1,"pad-line-numbers":true,highlight:null,"smart-tabs":true,"tab-size":4,gutter:true,toolbar:true,collapse:false,"auto-links":true,light:false,"wrap-lines":true,"html-script":false},config:{useScriptTags:true,clipboardSwf:null,toolbarItemWidth:16,toolbarItemHeight:16,bloggerMode:false,stripBrs:false,tagName:"pre",strings:{expandSource:"show source",viewSource:"view source",copyToClipboard:"copy to clipboard",copyToClipboardConfirmation:"The code is in your clipboard now",print:"print",help:"?",alert:"SyntaxHighlighter\n\n",noBrush:"Can't find brush for: ",brushNotHtmlScript:"Brush wasn't configured for html-script option: ",aboutDialog:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>About SyntaxHighlighter</title></head><body style="font-family:Geneva,Arial,Helvetica,sans-serif;background-color:#fff;color:#000;font-size:1em;text-align:center;"><div style="text-align:center;margin-top:3em;"><div style="font-size:xx-large;">SyntaxHighlighter</div><div style="font-size:.75em;margin-bottom:4em;"><div>version 2.1.364 (October 15 2009)</div><div><a href="http://alexgorbatchev.com" target="_blank" style="color:#0099FF;text-decoration:none;">http://alexgorbatchev.com</a></div><div>If you like this script, please <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2930402" style="color:#0099FF;text-decoration:none;">donate</a> to keep development active!</div></div><div>JavaScript code syntax highlighter.</div><div>Copyright 2004-2009 Alex Gorbatchev.</div></div></body></html>'},debug:false},vars:{discoveredBrushes:null,spaceWidth:null,printFrame:null,highlighters:{}},brushes:{},regexLib:{multiLineCComments:/\/\*[\s\S]*?\*\//gm,singleLineCComments:/\/\/.*$/gm,singleLinePerlComments:/#.*$/gm,doubleQuotedString:/"([^\\"\n]|\\.)*"/g,singleQuotedString:/'([^\\'\n]|\\.)*'/g,multiLineDoubleQuotedString:/"([^\\"]|\\.)*"/g,multiLineSingleQuotedString:/'([^\\']|\\.)*'/g,xmlComments:/(&lt;|<)!--[\s\S]*?--(&gt;|>)/gm,url:/&lt;\w+:\/\/[\w-.\/?%&=@:;]*&gt;|\w+:\/\/[\w-.\/?%&=@:;]*/g,phpScriptTags:{left:/(&lt;|<)\?=?/g,right:/\?(&gt;|>)/g},aspScriptTags:{left:/(&lt;|<)%=?/g,right:/%(&gt;|>)/g},scriptScriptTags:{left:/(&lt;|<)\s*script.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*script\s*(&gt;|>)/gi}},toolbar:{create:function(d){var h=document.createElement("DIV"),b=a.toolbar.items;
h.className="toolbar";for(var c in b){var f=b[c],g=new f(d),e=g.create();d.toolbarCommands[c]=g;
if(e==null){continue}if(typeof(e)=="string"){e=a.toolbar.createButton(e,d.id,c)}e.className+="item "+c;
h.appendChild(e)}return h},createButton:function(f,c,g){var d=document.createElement("a"),k=d.style,e=a.config,h=e.toolbarItemWidth,b=e.toolbarItemHeight;
d.href="#"+g;d.title=f;d.highlighterId=c;d.commandName=g;d.innerHTML=f;if(isNaN(h)==false){k.width=h+"px"
}if(isNaN(b)==false){k.height=b+"px"}d.onclick=function(l){try{a.toolbar.executeCommand(this,l||window.event,this.highlighterId,this.commandName)
}catch(l){a.utils.alert(l.message)}return false};return d},executeCommand:function(f,g,b,e,d){var c=a.vars.highlighters[b],h;
if(c==null||(h=c.toolbarCommands[e])==null){return null}return h.execute(f,g,d)},items:{expandSource:function(b){this.create=function(){if(b.getParam("collapse")!=true){return
}return a.config.strings.expandSource};this.execute=function(d,e,c){var f=b.div;d.parentNode.removeChild(d);
f.className=f.className.replace("collapsed","")}},viewSource:function(b){this.create=function(){return a.config.strings.viewSource
};this.execute=function(d,g,c){var f=a.utils.fixInputString(b.originalCode).replace(/</g,"&lt;"),e=a.utils.popup("","_blank",750,400,"location=0, resizable=1, menubar=0, scrollbars=1");
f=a.utils.unindent(f);e.document.write("<pre>"+f+"</pre>");e.document.close()}},copyToClipboard:function(d){var e,c,b=d.id;
this.create=function(){var g=a.config;if(g.clipboardSwf==null){return null}function n(q){var o="";
for(var p in q){o+="<param name='"+p+"' value='"+q[p]+"'/>"}return o}function f(q){var o="";
for(var p in q){o+=" "+p+"='"+q[p]+"'"}return o}var m={width:g.toolbarItemWidth,height:g.toolbarItemHeight,id:b+"_clipboard",type:"application/x-shockwave-flash",title:a.config.strings.copyToClipboard},l={allowScriptAccess:"always",wmode:"transparent",flashVars:"highlighterId="+b,menu:"false"},k=g.clipboardSwf,h;
if(/msie/i.test(navigator.userAgent)){h="<object"+f({classid:"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"})+f(m)+">"+n(l)+n({movie:k})+"</object>"
}else{h="<embed"+f(m)+f(l)+f({src:k})+"/>"}e=document.createElement("div");e.innerHTML=h;
return e};this.execute=function(g,k,f){var l=f.command;switch(l){case"get":var h=a.utils.unindent(a.utils.fixInputString(d.originalCode).replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"));
if(window.clipboardData){window.clipboardData.setData("text",h)}else{return a.utils.unindent(h)
}case"ok":a.utils.alert(a.config.strings.copyToClipboardConfirmation);break;case"error":a.utils.alert(f.message);
break}}},printSource:function(b){this.create=function(){return a.config.strings.print
};this.execute=function(e,g,d){var f=document.createElement("IFRAME"),h=null;if(a.vars.printFrame!=null){document.body.removeChild(a.vars.printFrame)
}a.vars.printFrame=f;f.style.cssText="position:absolute;width:0px;height:0px;left:-500px;top:-500px;";
document.body.appendChild(f);h=f.contentWindow.document;c(h,window.document);h.write('<div class="'+b.div.className.replace("collapsed","")+' printing">'+b.div.innerHTML+"</div>");
h.close();f.contentWindow.focus();f.contentWindow.print();function c(k,n){var l=n.getElementsByTagName("link");
for(var m=0;m<l.length;m++){if(l[m].rel.toLowerCase()=="stylesheet"&&/shCore\.css$/.test(l[m].href)){k.write('<link type="text/css" rel="stylesheet" href="'+l[m].href+'"></link>')
}}}}},about:function(b){this.create=function(){return a.config.strings.help};this.execute=function(c,e){var d=a.utils.popup("","_blank",500,250,"scrollbars=0"),f=d.document;
f.write(a.config.strings.aboutDialog);f.close();d.focus()}}}},utils:{indexOf:function(e,b,d){d=Math.max(d||0,0);
for(var c=d;c<e.length;c++){if(e[c]==b){return c}}return -1},guid:function(b){return b+Math.round(Math.random()*1000000).toString()
},merge:function(e,d){var b={},c;for(c in e){b[c]=e[c]}for(c in d){b[c]=d[c]}return b
},toBoolean:function(b){switch(b){case"true":return true;case"false":return false
}return b},popup:function(f,e,g,c,d){var b=(screen.width-g)/2,k=(screen.height-c)/2;
d+=", left="+b+", top="+k+", width="+g+", height="+c;d=d.replace(/^,/,"");var h=window.open(f,e,d);
h.focus();return h},addEvent:function(d,b,c){if(d.attachEvent){d["e"+b+c]=c;d[b+c]=function(){d["e"+b+c](window.event)
};d.attachEvent("on"+b,d[b+c])}else{d.addEventListener(b,c,false)}},alert:function(b){alert(a.config.strings.alert+b)
},findBrush:function(f,h){var g=a.vars.discoveredBrushes,b=null;if(g==null){g={};
for(var d in a.brushes){var c=a.brushes[d].aliases;if(c==null){continue}a.brushes[d].name=d.toLowerCase();
for(var e=0;e<c.length;e++){g[c[e]]=d}}a.vars.discoveredBrushes=g}b=a.brushes[g[f]];
if(b==null&&h!=false){a.utils.alert(a.config.strings.noBrush+f)}return b},eachLine:function(d,e){var b=d.split("\n");
for(var c=0;c<b.length;c++){b[c]=e(b[c])}return b.join("\n")},trimFirstAndLastLines:function(b){return b.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g,"")
},parseParams:function(h){var d,c={},e=new XRegExp("^\\[(?<values>(.*?))\\]$"),f=new XRegExp("(?<name>[\\w-]+)\\s*:\\s*(?<value>[\\w-%#]+|\\[.*?\\]|\".*?\"|'.*?')\\s*;?","g");
while((d=f.exec(h))!=null){var g=d.value.replace(/^['"]|['"]$/g,"");if(g!=null&&e.test(g)){var b=e.exec(g);
g=b.values.length>0?b.values.split(/\s*,\s*/):[]}c[d.name]=g}return c},decorate:function(c,b){if(c==null||c.length==0||c=="\n"){return c
}c=c.replace(/</g,"&lt;");c=c.replace(/ {2,}/g,function(d){var e="";for(var f=0;f<d.length-1;
f++){e+="&nbsp;"}return e+" "});if(b!=null){c=a.utils.eachLine(c,function(d){if(d.length==0){return""
}var e="";d=d.replace(/^(&nbsp;| )+/,function(f){e=f;return""});if(d.length==0){return e
}return e+'<code class="'+b+'">'+d+"</code>"})}return c},padNumber:function(d,c){var b=d.toString();
while(b.length<c){b="0"+b}return b},measureSpace:function(){var c=document.createElement("div"),h,l=0,f=document.body,d=a.utils.guid("measureSpace"),k='<div class="',g="</div>",e="</span>";
c.innerHTML=k+'visevent_syntaxhighlighter">'+k+'lines">'+k+'line">'+k+'content"><span class="block"><span id="'+d+'">&nbsp;'+e+e+g+g+g+g;
f.appendChild(c);h=document.getElementById(d);if(/opera/i.test(navigator.userAgent)){var b=window.getComputedStyle(h,null);
l=parseInt(b.getPropertyValue("width"))}else{l=h.offsetWidth}f.removeChild(c);return l
},processTabs:function(d,e){var c="";for(var b=0;b<e;b++){c+=" "}return d.replace(/\t/g,c)
},processSmartTabs:function(f,g){var b=f.split("\n"),e="\t",c="";for(var d=0;d<50;
d++){c+="                    "}function h(k,m,l){return k.substr(0,m)+c.substr(0,l)+k.substr(m+1,k.length)
}f=a.utils.eachLine(f,function(k){if(k.indexOf(e)==-1){return k}var m=0;while((m=k.indexOf(e))!=-1){var l=g-m%g;
k=h(k,m,l)}return k});return f},fixInputString:function(c){var b=/<br\s*\/?>|&lt;br\s*\/?&gt;/gi;
if(a.config.bloggerMode==true){c=c.replace(b,"\n")}if(a.config.stripBrs==true){c=c.replace(b,"")
}return c},trim:function(b){return b.replace(/^\s+|\s+$/g,"")},unindent:function(k){var c=a.utils.fixInputString(k).split("\n"),h=new Array(),f=/^\s*/,e=1000;
for(var d=0;d<c.length&&e>0;d++){var b=c[d];if(a.utils.trim(b).length==0){continue
}var g=f.exec(b);if(g==null){return k}e=Math.min(g[0].length,e)}if(e>0){for(var d=0;
d<c.length;d++){c[d]=c[d].substr(e)}}return c.join("\n")},matchesSortCallback:function(c,b){if(c.index<b.index){return -1
}else{if(c.index>b.index){return 1}else{if(c.length<b.length){return -1}else{if(c.length>b.length){return 1
}}}}return 0},getMatches:function(f,g){function h(k,l){return[new a.Match(k[0],k.index,l.css)]
}var d=0,c=null,b=[],e=g.func?g.func:h;while((c=g.regex.exec(f))!=null){b=b.concat(e(c,g))
}return b},processUrls:function(d){var b="&lt;",c="&gt;";return d.replace(a.regexLib.url,function(e){var g="",f="";
if(e.indexOf(b)==0){f=b;e=e.substring(b.length)}if(e.indexOf(c)==e.length-c.length){e=e.substring(0,e.length-c.length);
g=c}return f+'<a href="'+e+'">'+e+"</a>"+g})},getSyntaxHighlighterScriptTags:function(){var c=document.getElementsByTagName("script"),b=[];
for(var d=0;d<c.length;d++){if(c[d].type=="syntaxhighlighter"){b.push(c[d])}}return b
},stripCData:function(c){var d="<![CDATA[",b="]]>",f=a.utils.trim(c),e=false;if(f.indexOf(d)==0){f=f.substring(d.length);
e=true}if(f.indexOf(b)==f.length-b.length){f=f.substring(0,f.length-b.length);e=true
}return e?f:c}},highlight:function(h,f){function e(t){var r=[];for(var s=0;s<t.length;
s++){r.push(t[s])}return r}var b=f?[f]:e(document.getElementsByTagName(a.config.tagName)),k="innerHTML",o=null,m=a.config;
if(m.useScriptTags){b=b.concat(a.utils.getSyntaxHighlighterScriptTags())}if(b.length===0){return
}for(var g=0;g<b.length;g++){var l=b[g],d=a.utils.parseParams(l.className),p,c,q;
d=a.utils.merge(h,d);p=d.brush;if(p==null){continue}if(d["html-script"]=="true"||a.defaults["html-script"]==true){o=new a.HtmlScript(p);
p="htmlscript"}else{var n=a.utils.findBrush(p);if(n){p=n.name;o=new n()}else{continue
}}c=l[k];if(m.useScriptTags){c=a.utils.stripCData(c)}d["brush-name"]=p;o.highlight(c,d);
q=o.div;if(a.config.debug){q=document.createElement("textarea");q.value=o.div.innerHTML;
q.style.width="70em";q.style.height="30em"}l.parentNode.replaceChild(q,l)}},all:function(b){a.utils.addEvent(window,"load",function(){a.highlight(b)
})}};a.Match=function(d,b,c){this.value=d;this.index=b;this.length=d.length;this.css=c;
this.brushName=null};a.Match.prototype.toString=function(){return this.value};a.HtmlScript=function(b){var d=a.utils.findBrush(b),c,h=new a.brushes.Xml(),g=null;
if(d==null){return}c=new d();this.xmlBrush=h;if(c.htmlScript==null){a.utils.alert(a.config.strings.brushNotHtmlScript+b);
return}h.regexList.push({regex:c.htmlScript.code,func:f});function e(l,m){for(var k=0;
k<l.length;k++){l[k].index+=m}}function f(r,l){var k=r.code,q=[],p=c.regexList,n=r.index+r.left.length,s=c.htmlScript,t;
for(var o=0;o<p.length;o++){t=a.utils.getMatches(k,p[o]);e(t,n);q=q.concat(t)}if(s.left!=null&&r.left!=null){t=a.utils.getMatches(r.left,s.left);
e(t,r.index);q=q.concat(t)}if(s.right!=null&&r.right!=null){t=a.utils.getMatches(r.right,s.right);
e(t,r.index+r[0].lastIndexOf(r.right));q=q.concat(t)}for(var m=0;m<q.length;m++){q[m].brushName=d.name
}return q}};a.HtmlScript.prototype.highlight=function(b,c){this.xmlBrush.highlight(b,c);
this.div=this.xmlBrush.div};a.Highlighter=function(){};a.Highlighter.prototype={getParam:function(d,c){var b=this.params[d];
return a.utils.toBoolean(b==null?c:b)},create:function(b){return document.createElement(b)
},findMatches:function(e,d){var b=[];if(e!=null){for(var c=0;c<e.length;c++){if(typeof(e[c])=="object"){b=b.concat(a.utils.getMatches(d,e[c]))
}}}return b.sort(a.utils.matchesSortCallback)},removeNestedMatches:function(){var f=this.matches;
for(var e=0;e<f.length;e++){if(f[e]===null){continue}var b=f[e],d=b.index+b.length;
for(var c=e+1;c<f.length&&f[e]!==null;c++){var g=f[c];if(g===null){continue}else{if(g.index>d){break
}else{if(g.index==b.index&&g.length>b.length){this.matches[e]=null}else{if(g.index>=b.index&&g.index<d){this.matches[c]=null
}}}}}}},createDisplayLines:function(b){var o=b.split(/\n/g),m=parseInt(this.getParam("first-line")),h=this.getParam("pad-line-numbers"),n=this.getParam("highlight",[]),f=this.getParam("gutter");
b="";if(h==true){h=(m+o.length-1).toString().length}else{if(isNaN(h)==true){h=0}}for(var g=0;
g<o.length;g++){var p=o[g],c=/^(&nbsp;|\s)+/.exec(p),l="alt"+(g%2==0?1:2),d=a.utils.padNumber(m+g,h),e=a.utils.indexOf(n,(m+g).toString())!=-1,k=null;
if(c!=null){k=c[0].toString();p=p.substr(k.length)}p=a.utils.trim(p);if(p.length==0){p="&nbsp;"
}if(e){l+=" highlighted"}b+='<div class="line '+l+'"><table><tr>'+(f?'<td class="number"><code>'+d+"</code></td>":"")+'<td class="content">'+(k!=null?'<code class="spaces">'+k.replace(" ","&nbsp;")+"</code>":"")+p+"</td></tr></table></div>"
}return b},processMatches:function(b,h){var k=0,m="",c=a.utils.decorate,l=this.getParam("brush-name","");
function e(o){var n=o?(o.brushName||l):l;return n?n+" ":""}for(var f=0;f<h.length;
f++){var g=h[f],d;if(g===null||g.length===0){continue}d=e(g);m+=c(b.substr(k,g.index-k),d+"plain")+c(g.value,d+g.css);
k=g.index+g.length}m+=c(b.substr(k),e()+"plain");return m},highlight:function(c,e){var l=a.config,m=a.vars,b,g,h,d="important";
this.params={};this.div=null;this.lines=null;this.code=null;this.bar=null;this.toolbarCommands={};
this.id=a.utils.guid("highlighter_");m.highlighters[this.id]=this;if(c===null){c=""
}this.params=a.utils.merge(a.defaults,e||{});if(this.getParam("light")==true){this.params.toolbar=this.params.gutter=false
}this.div=b=this.create("DIV");this.lines=this.create("DIV");this.lines.className="lines";
className="visevent_syntaxhighlighter";b.id=this.id;if(this.getParam("collapse")){className+=" collapsed"
}if(this.getParam("gutter")==false){className+=" nogutter"}if(this.getParam("wrap-lines")==false){this.lines.className+=" no-wrap"
}className+=" "+this.getParam("class-name");className+=" "+this.getParam("brush-name");
b.className=className;this.originalCode=c;this.code=a.utils.trimFirstAndLastLines(c).replace(/\r/g," ");
h=this.getParam("tab-size");this.code=this.getParam("smart-tabs")==true?a.utils.processSmartTabs(this.code,h):a.utils.processTabs(this.code,h);
this.code=a.utils.unindent(this.code);if(this.getParam("toolbar")){this.bar=this.create("DIV");
this.bar.className="bar";this.bar.appendChild(a.toolbar.create(this));b.appendChild(this.bar);
var k=this.bar;function f(){k.className=k.className.replace("show","")}b.onmouseover=function(){f();
k.className+=" show"};b.onmouseout=function(){f()}}b.appendChild(this.lines);this.matches=this.findMatches(this.regexList,this.code);
this.removeNestedMatches();c=this.processMatches(this.code,this.matches);c=this.createDisplayLines(a.utils.trim(c));
if(this.getParam("auto-links")){c=a.utils.processUrls(c)}this.lines.innerHTML=c},getKeywords:function(b){b=b.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");
return"\\b(?:"+b+")\\b"},forHtmlScript:function(b){this.htmlScript={left:{regex:b.left,css:"script"},right:{regex:b.right,css:"script"},code:new XRegExp("(?<left>"+b.left.source+")(?<code>.*?)(?<right>"+b.right.source+")","sgi")}
}};return a}()}if(!window.XRegExp){(function(){var e={exec:RegExp.prototype.exec,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},d={part:/(?:[^\\([#\s.]+|\\(?!k<[\w$]+>|[pP]{[^}]+})[\S\s]?|\((?=\?(?!#|<[\w$]+>)))+|(\()(?:\?(?:(#)[^)]*\)|<([$\w]+)>))?|\\(?:k<([\w$]+)>|[pP]{([^}]+)})|(\[\^?)|([\S\s])/g,replaceVar:/(?:[^$]+|\$(?![1-9$&`']|{[$\w]+}))+|\$(?:([1-9]\d*|[$&`'])|{([$\w]+)})/g,extended:/^(?:\s+|#.*)+/,quantifier:/^(?:[?*+]|{\d+(?:,\d*)?})/,classLeft:/&&\[\^?/g,classRight:/]/g},b=function(k,g,h){for(var f=h||0;
f<k.length;f++){if(k[f]===g){return f}}return -1},c=/()??/.exec("")[1]!==undefined,a={};
XRegExp=function(q,k){if(q instanceof RegExp){if(k!==undefined){throw TypeError("can't supply flags when constructing one RegExp from another")
}return q.addFlags()}var k=k||"",f=k.indexOf("s")>-1,m=k.indexOf("x")>-1,r=false,t=[],h=[],g=d.part,n,l,p,o,s;
g.lastIndex=0;while(n=e.exec.call(g,q)){if(n[2]){if(!d.quantifier.test(q.slice(g.lastIndex))){h.push("(?:)")
}}else{if(n[1]){t.push(n[3]||null);if(n[3]){r=true}h.push("(")}else{if(n[4]){o=b(t,n[4]);
h.push(o>-1?"\\"+(o+1)+(isNaN(q.charAt(g.lastIndex))?"":"(?:)"):n[0])}else{if(n[5]){h.push(a.unicode?a.unicode.get(n[5],n[0].charAt(1)==="P"):n[0])
}else{if(n[6]){if(q.charAt(g.lastIndex)==="]"){h.push(n[6]==="["?"(?!)":"[\\S\\s]");
g.lastIndex++}else{l=XRegExp.matchRecursive("&&"+q.slice(n.index),d.classLeft,d.classRight,"",{escapeChar:"\\"})[0];
h.push(n[6]+l+"]");g.lastIndex+=l.length+1}}else{if(n[7]){if(f&&n[7]==="."){h.push("[\\S\\s]")
}else{if(m&&d.extended.test(n[7])){p=e.exec.call(d.extended,q.slice(g.lastIndex-1))[0].length;
if(!d.quantifier.test(q.slice(g.lastIndex-1+p))){h.push("(?:)")}g.lastIndex+=p-1}else{h.push(n[7])
}}}else{h.push(n[0])}}}}}}}s=RegExp(h.join(""),e.replace.call(k,/[sx]+/g,""));s._x={source:q,captureNames:r?t:null};
return s};XRegExp.addPlugin=function(f,g){a[f]=g};RegExp.prototype.exec=function(l){var h=e.exec.call(this,l),g,k,f;
if(h){if(c&&h.length>1){f=new RegExp("^"+this.source+"$(?!\\s)",this.getNativeFlags());
e.replace.call(h[0],f,function(){for(k=1;k<arguments.length-2;k++){if(arguments[k]===undefined){h[k]=undefined
}}})}if(this._x&&this._x.captureNames){for(k=1;k<h.length;k++){g=this._x.captureNames[k-1];
if(g){h[g]=h[k]}}}if(this.global&&this.lastIndex>(h.index+h[0].length)){this.lastIndex--
}}return h}})()}RegExp.prototype.getNativeFlags=function(){return(this.global?"g":"")+(this.ignoreCase?"i":"")+(this.multiline?"m":"")+(this.extended?"x":"")+(this.sticky?"y":"")
};RegExp.prototype.addFlags=function(a){var b=new XRegExp(this.source,(a||"")+this.getNativeFlags());
if(this._x){b._x={source:this._x.source,captureNames:this._x.captureNames?this._x.captureNames.slice(0):null}
}return b};RegExp.prototype.call=function(a,b){return this.exec(b)};RegExp.prototype.apply=function(b,a){return this.exec(a[0])
};XRegExp.cache=function(c,a){var b="/"+c+"/"+(a||"");return XRegExp.cache[b]||(XRegExp.cache[b]=new XRegExp(c,a))
};XRegExp.escape=function(a){return a.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,"\\$&")};
XRegExp.matchRecursive=function(r,d,u,f,b){var b=b||{},x=b.escapeChar,m=b.valueNames,f=f||"",s=f.indexOf("g")>-1,c=f.indexOf("i")>-1,h=f.indexOf("m")>-1,w=f.indexOf("y")>-1,f=f.replace(/y/g,""),d=d instanceof RegExp?(d.global?d:d.addFlags("g")):new XRegExp(d,"g"+f),u=u instanceof RegExp?(u.global?u:u.addFlags("g")):new XRegExp(u,"g"+f),k=[],a=0,l=0,p=0,n=0,o,e,q,t,g,v;
if(x){if(x.length>1){throw SyntaxError("can't supply more than one escape character")
}if(h){throw TypeError("can't supply escape character when using the multiline flag")
}g=XRegExp.escape(x);v=new RegExp("^(?:"+g+"[\\S\\s]|(?:(?!"+d.source+"|"+u.source+")[^"+g+"])+)+",c?"i":"")
}while(true){d.lastIndex=u.lastIndex=p+(x?(v.exec(r.slice(p))||[""])[0].length:0);
q=d.exec(r);t=u.exec(r);if(q&&t){if(q.index<=t.index){t=null}else{q=null}}if(q||t){l=(q||t).index;
p=(q?d:u).lastIndex}else{if(!a){break}}if(w&&!a&&l>n){break}if(q){if(!a++){o=l;e=p
}}else{if(t&&a){if(!--a){if(m){if(m[0]&&o>n){k.push([m[0],r.slice(n,o),n,o])}if(m[1]){k.push([m[1],r.slice(o,e),o,e])
}if(m[2]){k.push([m[2],r.slice(e,l),e,l])}if(m[3]){k.push([m[3],r.slice(l,p),l,p])
}}else{k.push(r.slice(e,l))}n=p;if(!s){break}}}else{d.lastIndex=u.lastIndex=0;throw Error("subject data contains unbalanced delimiters")
}}if(l===p){p++}}if(s&&!w&&m&&m[0]&&r.length>n){k.push([m[0],r.slice(n),n,r.length])
}d.lastIndex=u.lastIndex=0;return k};VisEventSyntaxHighlighter.brushes.JScript=function(){var a="break case catch continue default delete do else false  for function if in instanceof new null return super switch this throw true try typeof var while with";
this.regexList=[{regex:VisEventSyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:VisEventSyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:VisEventSyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:VisEventSyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords(a),"gm"),css:"keyword"}];
this.forHtmlScript(VisEventSyntaxHighlighter.regexLib.scriptScriptTags)};VisEventSyntaxHighlighter.brushes.JScript.prototype=new VisEventSyntaxHighlighter.Highlighter();
VisEventSyntaxHighlighter.brushes.JScript.aliases=["js","jscript","javascript"];var VisualEvent;
(function(a){VisualEvent={nDisplay:null,nToolTip:null,toMouse:null,nCanvas:null,ctxCanvas:null,aElements:null,fnInit:function(){var c=document.body.offsetHeight>document.documentElement.clientHeight?document.body.offsetHeight:document.documentElement.clientHeight;
var b=document.body.offsetWidth;this.nDisplay=document.createElement("div");this.nDisplay.setAttribute("id","Event_display");
this.nDisplay.style.width=b+"px";this.nDisplay.style.height=c+"px";document.body.insertBefore(this.nDisplay,document.body.childNodes[0]);
var f=[];for(sLibrary in this.oGetEvents){var e=this.oGetEvents[sLibrary]();if(typeof e=="object"&&e.length!=0){f=f.concat(e)
}}if(typeof VisualEvents=="object"){if(this.fnCheckIntegrity(VisualEvents)){f=this._fnCombineEvents(f,VisualEvents)
}}f=this._fnMerge(f);this.aElements=f;this.nToolTip=document.createElement("div");
this.nToolTip.setAttribute("id","Event_tooltip_display");this.nDisplay.appendChild(this.nToolTip);
a(this.nToolTip).mouseover(function(g){VisualEvent.fnTimerClear(g)});a(this.nToolTip).mousemove(function(g){VisualEvent.fnTimerClear(g)
});a(this.nToolTip).mouseout(function(g){VisualEvent.fnHideToolTip()});this.nCanvas=document.createElement("canvas");
this.nCanvas.className="Event_canvas";this.nCanvas.width=b;this.nCanvas.height=c;
this.nDisplay.appendChild(this.nCanvas);this.ctxCanvas=this.nCanvas.getContext("2d");
this.ctxCanvas.fillStyle="rgba(0,0,0,0.3)";this.ctxCanvas.fillRect(0,0,b,c);for(var d=0;
d<f.length;d++){this.fnAddEventElement(f[d])}a(document).keydown(function(g){if(g.which==0||g.which==27){VisualEvent.fnClose()
}else{if(g.which==32){a("div.EventLabel").css("display","block");g.preventDefault()
}}})},fnClose:function(b){a(document).unbind("keypress",VisualEvent.fnClose);document.body.removeChild(VisualEvent.nDisplay);
if(!EventLoader.jQueryPreLoaded){jQuery.noConflict(true)}},fnReInit:function(){document.body.removeChild(VisualEvent.nDisplay);
a(document).unbind("keypress",VisualEvent.fnClose);VisualEvent.fnInit()},fnAddEventElement:function(e){var c=this._fnGetPos(e.nNode);
var b=document.createElement("div");b.style.position="absolute";b.style.top=c[1]+"px";
b.style.left=c[0]+"px";b.className="EventLabel Event_bg_"+this._fnGetColorFromTypes(e.aListeners);
if(e.nNode!=document.body&&e.nNode!=document.documentElement){b.style.width=e.nNode.offsetWidth+"px";
b.style.height=e.nNode.offsetHeight+"px";if(e.nNode.offsetWidth){this.ctxCanvas.clearRect(c[0],c[1],e.nNode.offsetWidth,e.nNode.offsetHeight)
}}for(var d=0;d<e.aListeners.length;d++){if(typeof e.aListeners[d].bRemoved=="undefined"||e.aListeners[d].bRemoved==false){this.fnAddEventListener(e.aListeners[d],b,e)
}}a(b).dblclick(function(g){this.style.display="none";var f;if(document.selection&&document.selection.empty){document.selection.empty()
}else{if(window.getSelection){f=window.getSelection();if(f&&f.removeAllRanges){f.removeAllRanges()
}}}});this.nDisplay.appendChild(b)},fnAddEventListener:function(e,d,c){var b=document.createElement("div");
b.className="Event_info_"+(this._fnEventTypeGroup(e.sType)=="custom"?"custom":e.sType);
d.appendChild(b);a(b).mouseover(function(g){var f=VisualEvent.fnCreateEvent(g,e.sType,c.nNode);
VisualEvent.fnTooltip(g,e.sFunction,e.sSource,e.sType,f==null?null:function(){c.nNode.dispatchEvent(f);
VisualEvent.fnReInit()})});a(b).mouseout(function(f){VisualEvent.fnHideToolTip()})
},fnCreateEvent:function(d,g,f){var b=null;var e=this._fnGetPos(f);var c=this._fnEventTypeGroup(g);
if(document.createEvent){switch(c){case"mouse":b=document.createEvent("MouseEvents");
b.initMouseEvent(g,true,true,window,0,e[0],e[1],e[0],e[1],d.ctrlKey,d.altKey,d.shiftKey,d.metaKey,d.button,null);
break;case"html":b=document.createEvent("HTMLEvents");b.initEvent(g,true,true);break;
case"ui":b=document.createEvent("UIEvents");b.initUIEvent(g,true,true,window,0);break;
default:break}}else{if(document.createEventObject){switch(c){case"mouse":b=document.createEventObject();
b.screenX=e[0];b.screenX=e[1];b.clientX=e[0];b.clientY=e[1];b.ctrlKey=d.ctrlKey;b.altKey=d.altKey;
b.metaKey=d.metaKey;b.button=d.button;b.relatedTarget=null;break;case"html":case"ui":b=document.createEventObject();
break;default:break}}}return b},fnTooltip:function(n,q,m,b,f){VisualEvent.fnTimerClear(n);
var c=n.target;if(f==null){this.nToolTip.innerHTML='<div id="Event_inner"><i>'+b+"</i> event subscribed by "+m+'<br><pre id="Event_code" class="brush: js"></pre></div>'
}else{this.nToolTip.innerHTML='<div id="Event_inner"><i>'+b+"</i> event subscribed by "+m+' (<span id="Event_trigger">trigger event</span>)<br><pre id="Event_code" class="brush: js"></pre></div>';
a("#Event_trigger").click(f)}a("pre",this.nToolTip).html(q.replace("&","&amp;").replace("<","&lt;").replace("<","&gt;"));
this.nToolTip.style.visibility="hidden";this.nToolTip.style.display="block";var l=this._fnGetPos(c);
var h=l[1]+15;var k=l[0];var o=document.body.offsetWidth;var g=document.body.offsetHeight;
var d=this.nToolTip.offsetWidth;var p=this.nToolTip.offsetHeight;if(k>o/2){k=k-d+c.offsetWidth
}if(d+k>=o){k=o-d-1}if(p+h>=g){h=h-p}if(h<0){h=0}if(k<0){k=0}VisEventSyntaxHighlighter.highlight(null,document.getElementById("Event_code"));
this.nToolTip.style.top=h+"px";this.nToolTip.style.left=k+"px";this.nToolTip.style.visibility="visible"
},fnHideToolTip:function(b){this.toMouse=setTimeout(function(){VisualEvent.nToolTip.style.display="none"
},500)},fnTimerClear:function(b){if(this.toMouse!=null){clearTimeout(this.toMouse);
this.toMouse=null}},oGetEvents:{fnJQueryGeneric:function(m,l){for(i in l){if(typeof l[i].events=="object"){var g=l[i].handle.elem;
var h;for(sType in l[i].events){if(sType=="live"){continue}var b=l[i].events[sType];
for(j in b){var e=[];var c="jQuery "+jQuery.fn.jquery;if(typeof b[j].selector!="undefined"){e=a(b[j].selector);
c+=" (live event)"}else{e.push(g)}for(var d=0,f=e.length;d<f;d++){m.push({nNode:e[d],aListeners:[]});
if(typeof b[j].origHandler!="undefined"){h=b[j].origHandler.toString()}else{if(typeof b[j].handler!="undefined"){h=b[j].handler.toString()
}else{h=b[j].toString()}}if(!h.match(/VisualEvent/)&&!h.match(/EventLoader/)){m[m.length-1].aListeners.push({sType:sType,sFunction:h,bRemoved:false,sSource:c})
}}}}}}},fnJQuery15:function(){if(!jQuery||jQuery.fn.jquery.substr(0,3)*1<1.5){return[]
}var c=[];var b=jQuery.cache;for(j in b){this.fnJQueryGeneric(c,b[j])}return c},fnJQuery14:function(){if(!jQuery||jQuery.fn.jquery.substr(0,3)*1<1.4){return[]
}var b=[];this.fnJQueryGeneric(b,jQuery.cache);return b},fnJQuery13:function(){if(!jQuery||jQuery.fn.jquery.substr(0,3)*1>1.3){return[]
}var f=[];var e=jQuery.cache;for(i in e){if(typeof e[i].events=="object"){var d=e[i].handle.elem;
f.push({nNode:d,aListeners:[]});for(sType in e[i].events){var b=e[i].events[sType];
var c=VisualEvent._fnGetObjectName(b);var g=b[c].toString();if(!g.match(/VisualEvent/)&&!g.match(/EventLoader/)){f[f.length-1].aListeners.push({sType:sType,sFunction:g,bRemoved:false,sSource:"jQuery"})
}}}}return f},fnJQuery13Live:function(){if(!jQuery||jQuery.fn.live!="undefined"||typeof jQuery.data=="undefined"||typeof jQuery.data(document,"events")=="undefined"||typeof jQuery.data(document,"events").live=="undefined"){return[]
}var c=[];var b=jQuery.cache;jQuery.each(jQuery.data(document,"events").live||[],function(e,f){var g=f.type.split(".");
g=g[0];var d=f.data;a(d).each(function(h){c.push({nNode:this,aListeners:[],});c[c.length-1].aListeners.push({sType:g,sFunction:"Unable to obtain function from live() bound event.",bRemoved:false,sSource:"jQuery.live()"})
})});return c},fnYui:function(){if(typeof YAHOO=="undefined"||typeof YAHOO.util=="undefined"||typeof YAHOO.util.Event=="undefined"){return[]
}var f=[];var b=document.getElementsByTagName("*");for(var e=0;e<b.length;e++){var c=YAHOO.util.Event.getListeners(b[e]);
if(c!=null&&c.length!=0){f.push({nNode:c[0].scope,aListeners:[]});for(var d=0;d<c.length;
d++){f[f.length-1].aListeners.push({sType:c[d].type,sFunction:c[d].fn.toString(),bRemoved:false,sSource:"YUI 2"})
}}}return f},fnMooTools:function(){if(typeof MooTools=="undefined"){return[]}var f=[];
var c=document.getElementsByTagName("*");for(var d=0;d<c.length;d++){var e=c[d].retrieve("events",{});
if(!VisualEvent.fnTestEmptyObject(e)){f.push({nNode:c[d],aListeners:[]});for(var b in e){f[f.length-1].aListeners.push({sType:b,sFunction:e[b].keys.toString(),bRemoved:false,sSource:"MooTools"})
}}}return f},fnPrototype:function(){if(typeof Prototype=="undefined"){return[]}var e=[];
var b=document.getElementsByTagName("*");for(var c=0;c<b.length;c++){if(typeof b[c]._prototypeEventID!="undefined"){e.push({nNode:b[c],aListeners:[]});
for(var d in Event.cache[b[c]._prototypeEventID]){e[e.length-1].aListeners.push({sType:d,sFunction:Event.cache[b[c]._prototypeEventID][d][0].handler.toString(),bRemoved:false,sSource:"Prototype"})
}}}return e},fnJSBase:function(){if(typeof jsBase=="undefined"){return[]}var d=[];
var b=jsBase.aEventCache;for(var c=0;c<b.length;c++){d.push({nNode:b[c].nElement,aListeners:[{sType:b[c].sType,sFunction:b[c].fn.toString(),bRemoved:false,sSource:"jsBase"}]})
}return d},fnSZN:function(){if(typeof SZN!="undefined"&&typeof SZN.Events.getInfo!="undefined"){return SZN.Events.getInfo()
}else{return[]}},fnJAK:function(){if(typeof JAK!="undefined"&&typeof JAK.Events.getInfo!="undefined"){return JAK.Events.getInfo()
}else{return[]}},fnGlow:function(){if(typeof glow=="undefined"||typeof glow.events.listenersByObjId=="undefined"){return[]
}var k=glow.events.listenersByObjId;var h="__eventId"+glow.UID;var l=[];var d=document.getElementsByTagName("*");
for(var g=0;g<d.length;g++){if(typeof d[g][h]!="undefined"){var b=d[g][h];l.push({nNode:d[g],aListeners:[]});
for(var f in k[b]){var c=k[b][f];for(var e=0,m=c.length;e<m;e++){l[l.length-1].aListeners.push({sType:f,sFunction:c[e][2].toString(),bRemoved:false,sSource:"Glow"})
}}}}return l},fnDom0:function(){var h=[],k,c=document.getElementsByTagName("*"),f=["click","dblclick","mousedown","mousemove","mouseout","mouseover","mouseup","change","focus","blur","scroll","select","submit","keydown","keypress","keyup","load","unload"],d,g=f.length;
for(var e=0,b=c.length;e<b;e++){for(d=0;d<g;d++){if(typeof c[e]["on"+f[d]]=="function"){h.push({nNode:c[e],aListeners:[{sType:f[d],sFunction:c[e]["on"+f[d]].toString(),bRemoved:false,sSource:"DOM 0 event"}]})
}}}return h}},_fnGetObjectName:function(b){for(j in b){return j}},fnCheckIntegrity:function(b){for(var d=0;
d<b.length;d++){if(typeof b[d].nNode=="undefined"){return false}if(typeof b[d].sSource=="undefined"){return false
}if(typeof b[d].sFunction!="undefined"&&typeof b[d].sType!="undefined"){continue}if(typeof b[d].aListeners!="object"){return false
}for(var c=0;c<b[d].aListeners.length;c++){if(typeof b[d].aListeners[c].sType=="undefined"){return false
}if(typeof b[d].aListeners[c].sFunction=="undefined"){return false}}}return true},_fnMerge:function(g){var f=[];
for(var d=0,b=g.length;d<b;d++){var e=false;for(var c=0,h=f.length;c<h;c++){if(f[c].nNode==g[d].nNode){f[c].aListeners=f[c].aListeners.concat(g[d].aListeners);
e=true;break}}if(!e){f.push(g[d])}}return f},_fnCombineEvents:function(e,d){for(var c=0;
c<d.length;c++){if(typeof d[c].aListeners!="undefined"){e.push(d[c])}else{var f=-1;
for(var b=0;b<e.length;b++){if(e[b].nNode==d[c].nNode){f=b;break}}if(f==-1){e.push({nNode:d[c].nNode,sSource:d[c].sSource,aListeners:[{sType:d[c].sType,sFunction:d[c].sFunction,bRemoved:d[c].bRemoved}]})
}else{var g=-1;for(var b=0;b<e[f].aListeners.length;b++){if(e[f].aListeners[b].sType==d[c].sType&&e[f].aListeners[b].sFunction==d[c].sFunction){e[f].aListeners[b].bRemoved=d[c].bRemoved;
g=b;break}}if(g!=-1){e[f].aListeners.push({sType:d[c].sType,sFunction:d[c].sFunction,bRemoved:d[c].bRemoved})
}}}}return e},fnTestEmptyObject:function(b){for(var c in b){return false}return true
},_fnGetPos:function(c){var d=0;var b=0;if(c.offsetParent){d=c.offsetLeft;b=c.offsetTop;
while(c=c.offsetParent){d+=c.offsetLeft;b+=c.offsetTop}}return[d,b]},_fnEventTypeGroup:function(b){switch(b){case"click":case"dblclick":case"mousedown":case"mousemove":case"mouseout":case"mouseover":case"mouseup":case"scroll":return"mouse";
case"change":case"focus":case"blur":case"select":case"submit":return"html";case"keydown":case"keypress":case"keyup":case"load":case"unload":return"ui";
default:return"custom"}},_fnGetColorFromTypes:function(f){var g=false;var d=false;
var c=false;for(var e=0;e<f.length;e++){var b=this._fnEventTypeGroup(f[e].sType);
switch(b){case"mouse":g=true;break;case"html":d=true;break;case"ui":default:c=true;
break}}if(g&&d&&c){return"black"}else{if(!g&&d&&c){return"orange"}else{if(g&&!d&&c){return"purple"
}else{if(g&&d&&!c){return"green"}else{if(g){return"blue"}else{if(d){return"yellow"
}else{if(c){return"red"}}}}}}}}}})(jQuery);