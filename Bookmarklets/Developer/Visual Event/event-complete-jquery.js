/*
 * Copyright 2007-2010 Allan Jardine. All rights reserved
 * Contact: allan.jardine /AT\ sprymedia.co.uk
 */
/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var n=this,g,A=n.jQuery,r=n.$,q=n.jQuery=n.$=function(G,H){return new q.fn.init(G,H)
},F=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;q.fn=q.prototype={init:function(G,J){G=G||document;
if(G.nodeType){this[0]=G;this.length=1;this.context=G;return this}if(typeof G==="string"){var I=F.exec(G);
if(I&&(I[1]||!J)){if(I[1]){G=q.clean([I[1]],J)}else{var K=document.getElementById(I[3]);
if(K&&K.id!=I[3]){return q().find(G)}var H=q(K||[]);H.context=document;H.selector=G;
return H}}else{return q(J).find(G)}}else{if(q.isFunction(G)){return q(document).ready(G)
}}if(G.selector&&G.context){this.selector=G.selector;this.context=G.context}return this.setArray(q.isArray(G)?G:q.makeArray(G))
},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(G){return G===g?Array.prototype.slice.call(this):this[G]
},pushStack:function(H,J,G){var I=q(H);I.prevObject=this;I.context=this.context;if(J==="find"){I.selector=this.selector+(this.selector?" ":"")+G
}else{if(J){I.selector=this.selector+"."+J+"("+G+")"}}return I},setArray:function(G){this.length=0;
Array.prototype.push.apply(this,G);return this},each:function(H,G){return q.each(this,H,G)
},index:function(G){return q.inArray(G&&G.jquery?G[0]:G,this)},attr:function(H,J,I){var G=H;
if(typeof H==="string"){if(J===g){return this[0]&&q[I||"attr"](this[0],H)}else{G={};
G[H]=J}}return this.each(function(K){for(H in G){q.attr(I?this.style:this,H,q.prop(this,G[H],I,K,H))
}})},css:function(G,H){if((G=="width"||G=="height")&&parseFloat(H)<0){H=g}return this.attr(G,H,"curCSS")
},text:function(H){if(typeof H!=="object"&&H!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(H))
}var G="";q.each(H||this,function(){q.each(this.childNodes,function(){if(this.nodeType!=8){G+=this.nodeType!=1?this.nodeValue:q.fn.text([this])
}})});return G},wrapAll:function(G){if(this[0]){var H=q(G,this[0].ownerDocument).clone();
if(this[0].parentNode){H.insertBefore(this[0])}H.map(function(){var I=this;while(I.firstChild){I=I.firstChild
}return I}).append(this)}return this},wrapInner:function(G){return this.each(function(){q(this).contents().wrapAll(G)
})},wrap:function(G){return this.each(function(){q(this).wrapAll(G)})},append:function(){return this.domManip(arguments,true,function(G){if(this.nodeType==1){this.appendChild(G)
}})},prepend:function(){return this.domManip(arguments,true,function(G){if(this.nodeType==1){this.insertBefore(G,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,function(G){this.parentNode.insertBefore(G,this)
})},after:function(){return this.domManip(arguments,false,function(G){this.parentNode.insertBefore(G,this.nextSibling)
})},end:function(){return this.prevObject||q([])},push:[].push,sort:[].sort,splice:[].splice,find:function(G){if(this.length===1){var H=this.pushStack([],"find",G);
H.length=0;q.find(G,this[0],H);return H}else{return this.pushStack(q.unique(q.map(this,function(I){return q.find(G,I)
})),"find",G)}},clone:function(I){var G=this.map(function(){if(!q.support.noCloneEvent&&!q.isXMLDoc(this)){var K=this.outerHTML;
if(!K){var L=this.ownerDocument.createElement("div");L.appendChild(this.cloneNode(true));
K=L.innerHTML}return q.clean([K.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]
}else{return this.cloneNode(true)}});if(I===true){var J=this.find("*").andSelf(),H=0;
G.find("*").andSelf().each(function(){if(this.nodeName!==J[H].nodeName){return}var K=q.data(J[H],"events");
for(var M in K){for(var L in K[M]){q.event.add(this,M,K[M][L],K[M][L].data)}}H++})
}return G},filter:function(G){return this.pushStack(q.isFunction(G)&&q.grep(this,function(I,H){return G.call(I,H)
})||q.multiFilter(G,q.grep(this,function(H){return H.nodeType===1})),"filter",G)},closest:function(G){var I=q.expr.match.POS.test(G)?q(G):null,H=0;
return this.map(function(){var J=this;while(J&&J.ownerDocument){if(I?I.index(J)>-1:q(J).is(G)){q.data(J,"closest",H);
return J}J=J.parentNode;H++}})},not:function(G){if(typeof G==="string"){if(f.test(G)){return this.pushStack(q.multiFilter(G,this,true),"not",G)
}else{G=q.multiFilter(G,this)}}var H=G.length&&G[G.length-1]!==g&&!G.nodeType;return this.filter(function(){return H?q.inArray(this,G)<0:this!=G
})},add:function(G){return this.pushStack(q.unique(q.merge(this.get(),typeof G==="string"?q(G):q.makeArray(G))))
},is:function(G){return !!G&&q.multiFilter(G,this).length>0},hasClass:function(G){return !!G&&this.is("."+G)
},val:function(M){if(M===g){var G=this[0];if(G){if(q.nodeName(G,"option")){return(G.attributes.value||{}).specified?G.value:G.text
}if(q.nodeName(G,"select")){var K=G.selectedIndex,N=[],O=G.options,J=G.type=="select-one";
if(K<0){return null}for(var H=J?K:0,L=J?K+1:O.length;H<L;H++){var I=O[H];if(I.selected){M=q(I).val();
if(J){return M}N.push(M)}}return N}return(G.value||"").replace(/\r/g,"")}return g
}if(typeof M==="number"){M+=""}return this.each(function(){if(this.nodeType!=1){return
}if(q.isArray(M)&&/radio|checkbox/.test(this.type)){this.checked=(q.inArray(this.value,M)>=0||q.inArray(this.name,M)>=0)
}else{if(q.nodeName(this,"select")){var P=q.makeArray(M);q("option",this).each(function(){this.selected=(q.inArray(this.value,P)>=0||q.inArray(this.text,P)>=0)
});if(!P.length){this.selectedIndex=-1}}else{this.value=M}}})},html:function(G){return G===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(G)
},replaceWith:function(G){return this.after(G).remove()},eq:function(G){return this.slice(G,+G+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))
},map:function(G){return this.pushStack(q.map(this,function(I,H){return G.call(I,H,I)
}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(L,O,N){if(this[0]){var K=(this[0].ownerDocument||this[0]).createDocumentFragment(),H=q.clean(L,(this[0].ownerDocument||this[0]),K),J=K.firstChild;
if(J){for(var I=0,G=this.length;I<G;I++){N.call(M(this[I],J),this.length>1||I>0?K.cloneNode(true):K)
}}if(H){q.each(H,B)}}return this;function M(P,Q){return O&&q.nodeName(P,"table")&&q.nodeName(Q,"tr")?(P.getElementsByTagName("tbody")[0]||P.appendChild(P.ownerDocument.createElement("tbody"))):P
}}};q.fn.init.prototype=q.fn;function B(G,H){if(H.src){q.ajax({url:H.src,async:false,dataType:"script"})
}else{q.globalEval(H.text||H.textContent||H.innerHTML||"")}if(H.parentNode){H.parentNode.removeChild(H)
}}function e(){return +new Date}q.extend=q.fn.extend=function(){var L=arguments[0]||{},J=1,K=arguments.length,G=false,I;
if(typeof L==="boolean"){G=L;L=arguments[1]||{};J=2}if(typeof L!=="object"&&!q.isFunction(L)){L={}
}if(K==J){L=this;--J}for(;J<K;J++){if((I=arguments[J])!=null){for(var H in I){var M=L[H],N=I[H];
if(L===N){continue}if(G&&N&&typeof N==="object"&&!N.nodeType){L[H]=q.extend(G,M||(N.length!=null?[]:{}),N)
}else{if(N!==g){L[H]=N}}}}}return L};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,s=document.defaultView||{},u=Object.prototype.toString;
q.extend({noConflict:function(G){n.$=r;if(G){n.jQuery=A}return q},isFunction:function(G){return u.call(G)==="[object Function]"
},isArray:function(G){return u.call(G)==="[object Array]"},isXMLDoc:function(G){return G.nodeType===9&&G.documentElement.nodeName!=="HTML"||!!G.ownerDocument&&q.isXMLDoc(G.ownerDocument)
},globalEval:function(I){if(I&&/\S/.test(I)){var H=document.getElementsByTagName("head")[0]||document.documentElement,G=document.createElement("script");
G.type="text/javascript";if(q.support.scriptEval){G.appendChild(document.createTextNode(I))
}else{G.text=I}H.insertBefore(G,H.firstChild);H.removeChild(G)}},nodeName:function(H,G){return H.nodeName&&H.nodeName.toUpperCase()==G.toUpperCase()
},each:function(I,M,H){var G,J=0,K=I.length;if(H){if(K===g){for(G in I){if(M.apply(I[G],H)===false){break
}}}else{for(;J<K;){if(M.apply(I[J++],H)===false){break}}}}else{if(K===g){for(G in I){if(M.call(I[G],G,I[G])===false){break
}}}else{for(var L=I[0];J<K&&M.call(L,J,L)!==false;L=I[++J]){}}}return I},prop:function(J,K,I,H,G){if(q.isFunction(K)){K=K.call(J,H)
}return typeof K==="number"&&I=="curCSS"&&!b.test(G)?K+"px":K},className:{add:function(G,H){q.each((H||"").split(/\s+/),function(I,J){if(G.nodeType==1&&!q.className.has(G.className,J)){G.className+=(G.className?" ":"")+J
}})},remove:function(G,H){if(G.nodeType==1){G.className=H!==g?q.grep(G.className.split(/\s+/),function(I){return !q.className.has(H,I)
}).join(" "):""}},has:function(H,G){return H&&q.inArray(G,(H.className||H).toString().split(/\s+/))>-1
}},swap:function(J,I,K){var G={};for(var H in I){G[H]=J.style[H];J.style[H]=I[H]}K.call(J);
for(var H in I){J.style[H]=G[H]}},css:function(J,H,L,G){if(H=="width"||H=="height"){var N,I={position:"absolute",visibility:"hidden",display:"block"},M=H=="width"?["Left","Right"]:["Top","Bottom"];
function K(){N=H=="width"?J.offsetWidth:J.offsetHeight;if(G==="border"){return}q.each(M,function(){if(!G){N-=parseFloat(q.curCSS(J,"padding"+this,true))||0
}if(G==="margin"){N+=parseFloat(q.curCSS(J,"margin"+this,true))||0}else{N-=parseFloat(q.curCSS(J,"border"+this+"Width",true))||0
}})}if(J.offsetWidth!==0){K()}else{q.swap(J,I,K)}return Math.max(0,Math.round(N))
}return q.curCSS(J,H,L)},curCSS:function(K,H,I){var N,G=K.style;if(H=="opacity"&&!q.support.opacity){N=q.attr(G,"opacity");
return N==""?"1":N}if(H.match(/float/i)){H=y}if(!I&&G&&G[H]){N=G[H]}else{if(s.getComputedStyle){if(H.match(/float/i)){H="float"
}H=H.replace(/([A-Z])/g,"-$1").toLowerCase();var O=s.getComputedStyle(K,null);if(O){N=O.getPropertyValue(H)
}if(H=="opacity"&&N==""){N="1"}}else{if(K.currentStyle){var L=H.replace(/\-(\w)/g,function(P,Q){return Q.toUpperCase()
});N=K.currentStyle[H]||K.currentStyle[L];if(!/^\d+(px)?$/i.test(N)&&/^\d/.test(N)){var J=G.left,M=K.runtimeStyle.left;
K.runtimeStyle.left=K.currentStyle.left;G.left=N||0;N=G.pixelLeft+"px";G.left=J;K.runtimeStyle.left=M
}}}}return N},clean:function(H,M,K){M=M||document;if(typeof M.createElement==="undefined"){M=M.ownerDocument||M[0]&&M[0].ownerDocument||document
}if(!K&&H.length===1&&typeof H[0]==="string"){var J=/^<(\w+)\s*\/?>$/.exec(H[0]);
if(J){return[M.createElement(J[1])]}}var I=[],G=[],N=M.createElement("div");q.each(H,function(R,U){if(typeof U==="number"){U+=""
}if(!U){return}if(typeof U==="string"){U=U.replace(/(<(\w+)[^>]*?)\/>/g,function(W,X,V){return V.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?W:X+"></"+V+">"
});var Q=U.replace(/^\s+/,"").substring(0,10).toLowerCase();var S=!Q.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!Q.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||Q.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!Q.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!Q.indexOf("<td")||!Q.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!Q.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!q.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];
N.innerHTML=S[1]+U+S[2];while(S[0]--){N=N.lastChild}if(!q.support.tbody){var T=/<tbody/i.test(U),P=!Q.indexOf("<table")&&!T?N.firstChild&&N.firstChild.childNodes:S[1]=="<table>"&&!T?N.childNodes:[];
for(var O=P.length-1;O>=0;--O){if(q.nodeName(P[O],"tbody")&&!P[O].childNodes.length){P[O].parentNode.removeChild(P[O])
}}}if(!q.support.leadingWhitespace&&/^\s/.test(U)){N.insertBefore(M.createTextNode(U.match(/^\s*/)[0]),N.firstChild)
}U=q.makeArray(N.childNodes)}if(U.nodeType){I.push(U)}else{I=q.merge(I,U)}});if(K){for(var L=0;
I[L];L++){if(q.nodeName(I[L],"script")&&(!I[L].type||I[L].type.toLowerCase()==="text/javascript")){G.push(I[L].parentNode?I[L].parentNode.removeChild(I[L]):I[L])
}else{if(I[L].nodeType===1){I.splice.apply(I,[L+1,0].concat(q.makeArray(I[L].getElementsByTagName("script"))))
}K.appendChild(I[L])}}return G}return I},attr:function(L,I,M){if(!L||L.nodeType==3||L.nodeType==8){return g
}var J=!q.isXMLDoc(L),N=M!==g;I=J&&q.props[I]||I;if(L.tagName){var H=/href|src|style/.test(I);
if(I=="selected"&&L.parentNode){L.parentNode.selectedIndex}if(I in L&&J&&!H){if(N){if(I=="type"&&q.nodeName(L,"input")&&L.parentNode){throw"type property can't be changed"
}L[I]=M}if(q.nodeName(L,"form")&&L.getAttributeNode(I)){return L.getAttributeNode(I).nodeValue
}if(I=="tabIndex"){var K=L.getAttributeNode("tabIndex");return K&&K.specified?K.value:L.nodeName.match(/(button|input|object|select|textarea)/i)?0:L.nodeName.match(/^(a|area)$/i)&&L.href?0:g
}return L[I]}if(!q.support.style&&J&&I=="style"){return q.attr(L.style,"cssText",M)
}if(N){L.setAttribute(I,""+M)}var G=!q.support.hrefNormalized&&J&&H?L.getAttribute(I,2):L.getAttribute(I);
return G===null?g:G}if(!q.support.opacity&&I=="opacity"){if(N){L.zoom=1;L.filter=(L.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(M)+""=="NaN"?"":"alpha(opacity="+M*100+")")
}return L.filter&&L.filter.indexOf("opacity=")>=0?(parseFloat(L.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}I=I.replace(/-([a-z])/ig,function(O,P){return P.toUpperCase()});if(N){L[I]=M}return L[I]
},trim:function(G){return(G||"").replace(/^\s+|\s+$/g,"")},makeArray:function(I){var G=[];
if(I!=null){var H=I.length;if(H==null||typeof I==="string"||q.isFunction(I)||I.setInterval){G[0]=I
}else{while(H){G[--H]=I[H]}}}return G},inArray:function(I,J){for(var G=0,H=J.length;
G<H;G++){if(J[G]===I){return G}}return -1},merge:function(J,G){var H=0,I,K=J.length;
if(!q.support.getAll){while((I=G[H++])!=null){if(I.nodeType!=8){J[K++]=I}}}else{while((I=G[H++])!=null){J[K++]=I
}}return J},unique:function(M){var H=[],G={};try{for(var I=0,J=M.length;I<J;I++){var L=q.data(M[I]);
if(!G[L]){G[L]=true;H.push(M[I])}}}catch(K){H=M}return H},grep:function(H,L,G){var I=[];
for(var J=0,K=H.length;J<K;J++){if(!G!=!L(H[J],J)){I.push(H[J])}}return I},map:function(G,L){var H=[];
for(var I=0,J=G.length;I<J;I++){var K=L(G[I],I);if(K!=null){H[H.length]=K}}return H.concat.apply([],H)
}});var E=navigator.userAgent.toLowerCase();q.browser={version:(E.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(E),opera:/opera/.test(E),msie:/msie/.test(E)&&!/opera/.test(E),mozilla:/mozilla/.test(E)&&!/(compatible|webkit)/.test(E)};
q.each({parent:function(G){return G.parentNode},parents:function(G){return q.dir(G,"parentNode")
},next:function(G){return q.nth(G,2,"nextSibling")},prev:function(G){return q.nth(G,2,"previousSibling")
},nextAll:function(G){return q.dir(G,"nextSibling")},prevAll:function(G){return q.dir(G,"previousSibling")
},siblings:function(G){return q.sibling(G.parentNode.firstChild,G)},children:function(G){return q.sibling(G.firstChild)
},contents:function(G){return q.nodeName(G,"iframe")?G.contentDocument||G.contentWindow.document:q.makeArray(G.childNodes)
}},function(G,H){q.fn[G]=function(I){var J=q.map(this,H);if(I&&typeof I=="string"){J=q.multiFilter(I,J)
}return this.pushStack(q.unique(J),G,I)}});q.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(G,H){q.fn[G]=function(I){var L=[],N=q(I);
for(var M=0,J=N.length;M<J;M++){var K=(M>0?this.clone(true):this).get();q.fn[H].apply(q(N[M]),K);
L=L.concat(K)}return this.pushStack(L,G,I)}});q.each({removeAttr:function(G){q.attr(this,G,"");
if(this.nodeType==1){this.removeAttribute(G)}},addClass:function(G){q.className.add(this,G)
},removeClass:function(G){q.className.remove(this,G)},toggleClass:function(H,G){if(typeof G!=="boolean"){G=!q.className.has(this,H)
}q.className[G?"add":"remove"](this,H)},remove:function(G){if(!G||q.filter(G,[this]).length){q("*",this).add([this]).each(function(){q.event.remove(this);
q.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){q(this).children().remove();
while(this.firstChild){this.removeChild(this.firstChild)}}},function(G,H){q.fn[G]=function(){return this.each(H,arguments)
}});function l(G,H){return G[0]&&parseInt(q.curCSS(G[0],H,true),10)||0}var h="jQuery"+e(),x=0,C={};
q.extend({cache:{},data:function(H,G,I){H=H==n?C:H;var J=H[h];if(!J){J=H[h]=++x}if(G&&!q.cache[J]){q.cache[J]={}
}if(I!==g){q.cache[J][G]=I}return G?q.cache[J][G]:J},removeData:function(H,G){H=H==n?C:H;
var J=H[h];if(G){if(q.cache[J]){delete q.cache[J][G];G="";for(G in q.cache[J]){break
}if(!G){q.removeData(H)}}}else{try{delete H[h]}catch(I){if(H.removeAttribute){H.removeAttribute(h)
}}delete q.cache[J]}},queue:function(H,G,J){if(H){G=(G||"fx")+"queue";var I=q.data(H,G);
if(!I||q.isArray(J)){I=q.data(H,G,q.makeArray(J))}else{if(J){I.push(J)}}}return I
},dequeue:function(J,I){var G=q.queue(J,I),H=G.shift();if(!I||I==="fx"){H=G[0]}if(H!==g){H.call(J)
}}});q.fn.extend({data:function(G,I){var J=G.split(".");J[1]=J[1]?"."+J[1]:"";if(I===g){var H=this.triggerHandler("getData"+J[1]+"!",[J[0]]);
if(H===g&&this.length){H=q.data(this[0],G)}return H===g&&J[1]?this.data(J[0]):H}else{return this.trigger("setData"+J[1]+"!",[J[0],I]).each(function(){q.data(this,G,I)
})}},removeData:function(G){return this.each(function(){q.removeData(this,G)})},queue:function(G,H){if(typeof G!=="string"){H=G;
G="fx"}if(H===g){return q.queue(this[0],G)}return this.each(function(){var I=q.queue(this,G,H);
if(G=="fx"&&I.length==1){I[0].call(this)}})},dequeue:function(G){return this.each(function(){q.dequeue(this,G)
})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var T=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,N=0,J=Object.prototype.toString;
var H=function(aa,W,ad,ae){ad=ad||[];W=W||document;if(W.nodeType!==1&&W.nodeType!==9){return[]
}if(!aa||typeof aa!=="string"){return ad}var ab=[],Y,ah,ak,V,af,X,Z=true;T.lastIndex=0;
while((Y=T.exec(aa))!==null){ab.push(Y[1]);if(Y[2]){X=RegExp.rightContext;break}}if(ab.length>1&&O.exec(aa)){if(ab.length===2&&K.relative[ab[0]]){ah=L(ab[0]+ab[1],W)
}else{ah=K.relative[ab[0]]?[W]:H(ab.shift(),W);while(ab.length){aa=ab.shift();if(K.relative[aa]){aa+=ab.shift()
}ah=L(aa,ah)}}}else{var ag=ae?{expr:ab.pop(),set:G(ae)}:H.find(ab.pop(),ab.length===1&&W.parentNode?W.parentNode:W,S(W));
ah=H.filter(ag.expr,ag.set);if(ab.length>0){ak=G(ah)}else{Z=false}while(ab.length){var aj=ab.pop(),ai=aj;
if(!K.relative[aj]){aj=""}else{ai=ab.pop()}if(ai==null){ai=W}K.relative[aj](ak,ai,S(W))
}}if(!ak){ak=ah}if(!ak){throw"Syntax error, unrecognized expression: "+(aj||aa)}if(J.call(ak)==="[object Array]"){if(!Z){ad.push.apply(ad,ak)
}else{if(W.nodeType===1){for(var ac=0;ak[ac]!=null;ac++){if(ak[ac]&&(ak[ac]===true||ak[ac].nodeType===1&&M(W,ak[ac]))){ad.push(ah[ac])
}}}else{for(var ac=0;ak[ac]!=null;ac++){if(ak[ac]&&ak[ac].nodeType===1){ad.push(ah[ac])
}}}}}else{G(ak,ad)}if(X){H(X,W,ad,ae);if(I){hasDuplicate=false;ad.sort(I);if(hasDuplicate){for(var ac=1;
ac<ad.length;ac++){if(ad[ac]===ad[ac-1]){ad.splice(ac--,1)}}}}}return ad};H.matches=function(V,W){return H(V,null,null,W)
};H.find=function(ac,V,ad){var ab,Z;if(!ac){return[]}for(var Y=0,X=K.order.length;
Y<X;Y++){var aa=K.order[Y],Z;if((Z=K.match[aa].exec(ac))){var W=RegExp.leftContext;
if(W.substr(W.length-1)!=="\\"){Z[1]=(Z[1]||"").replace(/\\/g,"");ab=K.find[aa](Z,V,ad);
if(ab!=null){ac=ac.replace(K.match[aa],"");break}}}}if(!ab){ab=V.getElementsByTagName("*")
}return{set:ab,expr:ac}};H.filter=function(af,ae,ai,Y){var X=af,ak=[],ac=ae,aa,V,ab=ae&&ae[0]&&S(ae[0]);
while(af&&ae.length){for(var ad in K.filter){if((aa=K.match[ad].exec(af))!=null){var W=K.filter[ad],aj,ah;
V=false;if(ac==ak){ak=[]}if(K.preFilter[ad]){aa=K.preFilter[ad](aa,ac,ai,ak,Y,ab);
if(!aa){V=aj=true}else{if(aa===true){continue}}}if(aa){for(var Z=0;(ah=ac[Z])!=null;
Z++){if(ah){aj=W(ah,aa,Z,ac);var ag=Y^!!aj;if(ai&&aj!=null){if(ag){V=true}else{ac[Z]=false
}}else{if(ag){ak.push(ah);V=true}}}}}if(aj!==g){if(!ai){ac=ak}af=af.replace(K.match[ad],"");
if(!V){return[]}break}}}if(af==X){if(V==null){throw"Syntax error, unrecognized expression: "+af
}else{break}}X=af}return ac};var K=H.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(V){return V.getAttribute("href")
}},relative:{"+":function(ac,V,ab){var Z=typeof V==="string",ad=Z&&!/\W/.test(V),aa=Z&&!ad;
if(ad&&!ab){V=V.toUpperCase()}for(var Y=0,X=ac.length,W;Y<X;Y++){if((W=ac[Y])){while((W=W.previousSibling)&&W.nodeType!==1){}ac[Y]=aa||W&&W.nodeName===V?W||false:W===V
}}if(aa){H.filter(V,ac,true)}},">":function(ab,W,ac){var Z=typeof W==="string";if(Z&&!/\W/.test(W)){W=ac?W:W.toUpperCase();
for(var X=0,V=ab.length;X<V;X++){var aa=ab[X];if(aa){var Y=aa.parentNode;ab[X]=Y.nodeName===W?Y:false
}}}else{for(var X=0,V=ab.length;X<V;X++){var aa=ab[X];if(aa){ab[X]=Z?aa.parentNode:aa.parentNode===W
}}if(Z){H.filter(W,ab,true)}}},"":function(Y,W,aa){var X=N++,V=U;if(!W.match(/\W/)){var Z=W=aa?W:W.toUpperCase();
V=R}V("parentNode",W,X,Y,Z,aa)},"~":function(Y,W,aa){var X=N++,V=U;if(typeof W==="string"&&!W.match(/\W/)){var Z=W=aa?W:W.toUpperCase();
V=R}V("previousSibling",W,X,Y,Z,aa)}},find:{ID:function(W,X,Y){if(typeof X.getElementById!=="undefined"&&!Y){var V=X.getElementById(W[1]);
return V?[V]:[]}},NAME:function(X,aa,ab){if(typeof aa.getElementsByName!=="undefined"){var W=[],Z=aa.getElementsByName(X[1]);
for(var Y=0,V=Z.length;Y<V;Y++){if(Z[Y].getAttribute("name")===X[1]){W.push(Z[Y])
}}return W.length===0?null:W}},TAG:function(V,W){return W.getElementsByTagName(V[1])
}},preFilter:{CLASS:function(Y,W,X,V,ab,ac){Y=" "+Y[1].replace(/\\/g,"")+" ";if(ac){return Y
}for(var Z=0,aa;(aa=W[Z])!=null;Z++){if(aa){if(ab^(aa.className&&(" "+aa.className+" ").indexOf(Y)>=0)){if(!X){V.push(aa)
}}else{if(X){W[Z]=false}}}}return false},ID:function(V){return V[1].replace(/\\/g,"")
},TAG:function(W,V){for(var X=0;V[X]===false;X++){}return V[X]&&S(V[X])?W[1]:W[1].toUpperCase()
},CHILD:function(V){if(V[1]=="nth"){var W=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(V[2]=="even"&&"2n"||V[2]=="odd"&&"2n+1"||!/\D/.test(V[2])&&"0n+"+V[2]||V[2]);
V[2]=(W[1]+(W[2]||1))-0;V[3]=W[3]-0}V[0]=N++;return V},ATTR:function(Z,W,X,V,aa,ab){var Y=Z[1].replace(/\\/g,"");
if(!ab&&K.attrMap[Y]){Z[1]=K.attrMap[Y]}if(Z[2]==="~="){Z[4]=" "+Z[4]+" "}return Z
},PSEUDO:function(Z,W,X,V,aa){if(Z[1]==="not"){if(Z[3].match(T).length>1||/^\w/.test(Z[3])){Z[3]=H(Z[3],null,null,W)
}else{var Y=H.filter(Z[3],W,X,true^aa);if(!X){V.push.apply(V,Y)}return false}}else{if(K.match.POS.test(Z[0])||K.match.CHILD.test(Z[0])){return true
}}return Z},POS:function(V){V.unshift(true);return V}},filters:{enabled:function(V){return V.disabled===false&&V.type!=="hidden"
},disabled:function(V){return V.disabled===true},checked:function(V){return V.checked===true
},selected:function(V){V.parentNode.selectedIndex;return V.selected===true},parent:function(V){return !!V.firstChild
},empty:function(V){return !V.firstChild},has:function(X,W,V){return !!H(V[3],X).length
},header:function(V){return/h\d/i.test(V.nodeName)},text:function(V){return"text"===V.type
},radio:function(V){return"radio"===V.type},checkbox:function(V){return"checkbox"===V.type
},file:function(V){return"file"===V.type},password:function(V){return"password"===V.type
},submit:function(V){return"submit"===V.type},image:function(V){return"image"===V.type
},reset:function(V){return"reset"===V.type},button:function(V){return"button"===V.type||V.nodeName.toUpperCase()==="BUTTON"
},input:function(V){return/input|select|textarea|button/i.test(V.nodeName)}},setFilters:{first:function(W,V){return V===0
},last:function(X,W,V,Y){return W===Y.length-1},even:function(W,V){return V%2===0
},odd:function(W,V){return V%2===1},lt:function(X,W,V){return W<V[3]-0},gt:function(X,W,V){return W>V[3]-0
},nth:function(X,W,V){return V[3]-0==W},eq:function(X,W,V){return V[3]-0==W}},filter:{PSEUDO:function(ab,X,Y,ac){var W=X[1],Z=K.filters[W];
if(Z){return Z(ab,Y,X,ac)}else{if(W==="contains"){return(ab.textContent||ab.innerText||"").indexOf(X[3])>=0
}else{if(W==="not"){var aa=X[3];for(var Y=0,V=aa.length;Y<V;Y++){if(aa[Y]===ab){return false
}}return true}}}},CHILD:function(V,Y){var ab=Y[1],W=V;switch(ab){case"only":case"first":while(W=W.previousSibling){if(W.nodeType===1){return false
}}if(ab=="first"){return true}W=V;case"last":while(W=W.nextSibling){if(W.nodeType===1){return false
}}return true;case"nth":var X=Y[2],ae=Y[3];if(X==1&&ae==0){return true}var aa=Y[0],ad=V.parentNode;
if(ad&&(ad.sizcache!==aa||!V.nodeIndex)){var Z=0;for(W=ad.firstChild;W;W=W.nextSibling){if(W.nodeType===1){W.nodeIndex=++Z
}}ad.sizcache=aa}var ac=V.nodeIndex-ae;if(X==0){return ac==0}else{return(ac%X==0&&ac/X>=0)
}}},ID:function(W,V){return W.nodeType===1&&W.getAttribute("id")===V},TAG:function(W,V){return(V==="*"&&W.nodeType===1)||W.nodeName===V
},CLASS:function(W,V){return(" "+(W.className||W.getAttribute("class"))+" ").indexOf(V)>-1
},ATTR:function(aa,Y){var X=Y[1],V=K.attrHandle[X]?K.attrHandle[X](aa):aa[X]!=null?aa[X]:aa.getAttribute(X),ab=V+"",Z=Y[2],W=Y[4];
return V==null?Z==="!=":Z==="="?ab===W:Z==="*="?ab.indexOf(W)>=0:Z==="~="?(" "+ab+" ").indexOf(W)>=0:!W?ab&&V!==false:Z==="!="?ab!=W:Z==="^="?ab.indexOf(W)===0:Z==="$="?ab.substr(ab.length-W.length)===W:Z==="|="?ab===W||ab.substr(0,W.length+1)===W+"-":false
},POS:function(Z,W,X,aa){var V=W[2],Y=K.setFilters[V];if(Y){return Y(Z,X,W,aa)}}}};
var O=K.match.POS;for(var Q in K.match){K.match[Q]=RegExp(K.match[Q].source+/(?![^\[]*\])(?![^\(]*\))/.source)
}var G=function(W,V){W=Array.prototype.slice.call(W);if(V){V.push.apply(V,W);return V
}return W};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(P){G=function(Z,Y){var W=Y||[];
if(J.call(Z)==="[object Array]"){Array.prototype.push.apply(W,Z)}else{if(typeof Z.length==="number"){for(var X=0,V=Z.length;
X<V;X++){W.push(Z[X])}}else{for(var X=0;Z[X];X++){W.push(Z[X])}}}return W}}var I;
if(document.documentElement.compareDocumentPosition){I=function(W,V){var X=W.compareDocumentPosition(V)&4?-1:W===V?0:1;
if(X===0){hasDuplicate=true}return X}}else{if("sourceIndex" in document.documentElement){I=function(W,V){var X=W.sourceIndex-V.sourceIndex;
if(X===0){hasDuplicate=true}return X}}else{if(document.createRange){I=function(Y,W){var X=Y.ownerDocument.createRange(),V=W.ownerDocument.createRange();
X.selectNode(Y);X.collapse(true);V.selectNode(W);V.collapse(true);var Z=X.compareBoundaryPoints(Range.START_TO_END,V);
if(Z===0){hasDuplicate=true}return Z}}}}(function(){var W=document.createElement("form"),X="script"+(new Date).getTime();
W.innerHTML="<input name='"+X+"'/>";var V=document.documentElement;V.insertBefore(W,V.firstChild);
if(!!document.getElementById(X)){K.find.ID=function(Z,aa,ab){if(typeof aa.getElementById!=="undefined"&&!ab){var Y=aa.getElementById(Z[1]);
return Y?Y.id===Z[1]||typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id").nodeValue===Z[1]?[Y]:g:[]
}};K.filter.ID=function(aa,Y){var Z=typeof aa.getAttributeNode!=="undefined"&&aa.getAttributeNode("id");
return aa.nodeType===1&&Z&&Z.nodeValue===Y}}V.removeChild(W)})();(function(){var V=document.createElement("div");
V.appendChild(document.createComment(""));if(V.getElementsByTagName("*").length>0){K.find.TAG=function(W,aa){var Z=aa.getElementsByTagName(W[1]);
if(W[1]==="*"){var Y=[];for(var X=0;Z[X];X++){if(Z[X].nodeType===1){Y.push(Z[X])}}Z=Y
}return Z}}V.innerHTML="<a href='#'></a>";if(V.firstChild&&typeof V.firstChild.getAttribute!=="undefined"&&V.firstChild.getAttribute("href")!=="#"){K.attrHandle.href=function(W){return W.getAttribute("href",2)
}}})();if(document.querySelectorAll){(function(){var V=H,W=document.createElement("div");
W.innerHTML="<p class='TEST'></p>";if(W.querySelectorAll&&W.querySelectorAll(".TEST").length===0){return
}H=function(aa,Z,X,Y){Z=Z||document;if(!Y&&Z.nodeType===9&&!S(Z)){try{return G(Z.querySelectorAll(aa),X)
}catch(ab){}}return V(aa,Z,X,Y)};H.find=V.find;H.filter=V.filter;H.selectors=V.selectors;
H.matches=V.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var V=document.createElement("div");
V.innerHTML="<div class='test e'></div><div class='test'></div>";if(V.getElementsByClassName("e").length===0){return
}V.lastChild.className="e";if(V.getElementsByClassName("e").length===1){return}K.order.splice(1,0,"CLASS");
K.find.CLASS=function(W,X,Y){if(typeof X.getElementsByClassName!=="undefined"&&!Y){return X.getElementsByClassName(W[1])
}}})()}function R(W,ab,aa,af,ac,ae){var ad=W=="previousSibling"&&!ae;for(var Y=0,X=af.length;
Y<X;Y++){var V=af[Y];if(V){if(ad&&V.nodeType===1){V.sizcache=aa;V.sizset=Y}V=V[W];
var Z=false;while(V){if(V.sizcache===aa){Z=af[V.sizset];break}if(V.nodeType===1&&!ae){V.sizcache=aa;
V.sizset=Y}if(V.nodeName===ab){Z=V;break}V=V[W]}af[Y]=Z}}}function U(W,ab,aa,af,ac,ae){var ad=W=="previousSibling"&&!ae;
for(var Y=0,X=af.length;Y<X;Y++){var V=af[Y];if(V){if(ad&&V.nodeType===1){V.sizcache=aa;
V.sizset=Y}V=V[W];var Z=false;while(V){if(V.sizcache===aa){Z=af[V.sizset];break}if(V.nodeType===1){if(!ae){V.sizcache=aa;
V.sizset=Y}if(typeof ab!=="string"){if(V===ab){Z=true;break}}else{if(H.filter(ab,[V]).length>0){Z=V;
break}}}V=V[W]}af[Y]=Z}}}var M=document.compareDocumentPosition?function(W,V){return W.compareDocumentPosition(V)&16
}:function(W,V){return W!==V&&(W.contains?W.contains(V):true)};var S=function(V){return V.nodeType===9&&V.documentElement.nodeName!=="HTML"||!!V.ownerDocument&&S(V.ownerDocument)
};var L=function(V,ac){var Y=[],Z="",aa,X=ac.nodeType?[ac]:ac;while((aa=K.match.PSEUDO.exec(V))){Z+=aa[0];
V=V.replace(K.match.PSEUDO,"")}V=K.relative[V]?V+"*":V;for(var ab=0,W=X.length;ab<W;
ab++){H(V,X[ab],Y)}return H.filter(Z,Y)};q.find=H;q.filter=H.filter;q.expr=H.selectors;
q.expr[":"]=q.expr.filters;H.selectors.filters.hidden=function(V){return V.offsetWidth===0||V.offsetHeight===0
};H.selectors.filters.visible=function(V){return V.offsetWidth>0||V.offsetHeight>0
};H.selectors.filters.animated=function(V){return q.grep(q.timers,function(W){return V===W.elem
}).length};q.multiFilter=function(X,V,W){if(W){X=":not("+X+")"}return H.matches(X,V)
};q.dir=function(X,W){var V=[],Y=X[W];while(Y&&Y!=document){if(Y.nodeType==1){V.push(Y)
}Y=Y[W]}return V};q.nth=function(Z,V,X,Y){V=V||1;var W=0;for(;Z;Z=Z[X]){if(Z.nodeType==1&&++W==V){break
}}return Z};q.sibling=function(X,W){var V=[];for(;X;X=X.nextSibling){if(X.nodeType==1&&X!=W){V.push(X)
}}return V};return;n.Sizzle=H})();q.event={add:function(K,H,J,M){if(K.nodeType==3||K.nodeType==8){return
}if(K.setInterval&&K!=n){K=n}if(!J.guid){J.guid=this.guid++}if(M!==g){var I=J;J=this.proxy(I);
J.data=M}var G=q.data(K,"events")||q.data(K,"events",{}),L=q.data(K,"handle")||q.data(K,"handle",function(){return typeof q!=="undefined"&&!q.event.triggered?q.event.handle.apply(arguments.callee.elem,arguments):g
});L.elem=K;q.each(H.split(/\s+/),function(O,P){var Q=P.split(".");P=Q.shift();J.type=Q.slice().sort().join(".");
var N=G[P];if(q.event.specialAll[P]){q.event.specialAll[P].setup.call(K,M,Q)}if(!N){N=G[P]={};
if(!q.event.special[P]||q.event.special[P].setup.call(K,M,Q)===false){if(K.addEventListener){K.addEventListener(P,L,false)
}else{if(K.attachEvent){K.attachEvent("on"+P,L)}}}}N[J.guid]=J;q.event.global[P]=true
});K=null},guid:1,global:{},remove:function(M,J,L){if(M.nodeType==3||M.nodeType==8){return
}var I=q.data(M,"events"),H,G;if(I){if(J===g||(typeof J==="string"&&J.charAt(0)==".")){for(var K in I){this.remove(M,K+(J||""))
}}else{if(J.type){L=J.handler;J=J.type}q.each(J.split(/\s+/),function(O,Q){var S=Q.split(".");
Q=S.shift();var P=RegExp("(^|\\.)"+S.slice().sort().join(".*\\.")+"(\\.|$)");if(I[Q]){if(L){delete I[Q][L.guid]
}else{for(var R in I[Q]){if(P.test(I[Q][R].type)){delete I[Q][R]}}}if(q.event.specialAll[Q]){q.event.specialAll[Q].teardown.call(M,S)
}for(H in I[Q]){break}if(!H){if(!q.event.special[Q]||q.event.special[Q].teardown.call(M,S)===false){if(M.removeEventListener){M.removeEventListener(Q,q.data(M,"handle"),false)
}else{if(M.detachEvent){M.detachEvent("on"+Q,q.data(M,"handle"))}}}H=null;delete I[Q]
}}})}for(H in I){break}if(!H){var N=q.data(M,"handle");if(N){N.elem=null}q.removeData(M,"events");
q.removeData(M,"handle")}}},trigger:function(K,M,J,G){var I=K.type||K;if(!G){K=typeof K==="object"?K[h]?K:q.extend(q.Event(I),K):q.Event(I);
if(I.indexOf("!")>=0){K.type=I=I.slice(0,-1);K.exclusive=true}if(!J){K.stopPropagation();
if(this.global[I]){q.each(q.cache,function(){if(this.events&&this.events[I]){q.event.trigger(K,M,this.handle.elem)
}})}}if(!J||J.nodeType==3||J.nodeType==8){return g}K.result=g;K.target=J;M=q.makeArray(M);
M.unshift(K)}K.currentTarget=J;var L=q.data(J,"handle");if(L){L.apply(J,M)}if((!J[I]||(q.nodeName(J,"a")&&I=="click"))&&J["on"+I]&&J["on"+I].apply(J,M)===false){K.result=false
}if(!G&&J[I]&&!K.isDefaultPrevented()&&!(q.nodeName(J,"a")&&I=="click")){this.triggered=true;
try{J[I]()}catch(N){}}this.triggered=false;if(!K.isPropagationStopped()){var H=J.parentNode||J.ownerDocument;
if(H){q.event.trigger(K,M,H,true)}}},handle:function(M){var L,G;M=arguments[0]=q.event.fix(M||n.event);
M.currentTarget=this;var N=M.type.split(".");M.type=N.shift();L=!N.length&&!M.exclusive;
var K=RegExp("(^|\\.)"+N.slice().sort().join(".*\\.")+"(\\.|$)");G=(q.data(this,"events")||{})[M.type];
for(var I in G){var J=G[I];if(L||K.test(J.type)){M.handler=J;M.data=J.data;var H=J.apply(this,arguments);
if(H!==g){M.result=H;if(H===false){M.preventDefault();M.stopPropagation()}}if(M.isImmediatePropagationStopped()){break
}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(J){if(J[h]){return J
}var H=J;J=q.Event(H);for(var I=this.props.length,L;I;){L=this.props[--I];J[L]=H[L]
}if(!J.target){J.target=J.srcElement||document}if(J.target.nodeType==3){J.target=J.target.parentNode
}if(!J.relatedTarget&&J.fromElement){J.relatedTarget=J.fromElement==J.target?J.toElement:J.fromElement
}if(J.pageX==null&&J.clientX!=null){var K=document.documentElement,G=document.body;
J.pageX=J.clientX+(K&&K.scrollLeft||G&&G.scrollLeft||0)-(K.clientLeft||0);J.pageY=J.clientY+(K&&K.scrollTop||G&&G.scrollTop||0)-(K.clientTop||0)
}if(!J.which&&((J.charCode||J.charCode===0)?J.charCode:J.keyCode)){J.which=J.charCode||J.keyCode
}if(!J.metaKey&&J.ctrlKey){J.metaKey=J.ctrlKey}if(!J.which&&J.button){J.which=(J.button&1?1:(J.button&2?3:(J.button&4?2:0)))
}return J},proxy:function(H,G){G=G||function(){return H.apply(this,arguments)};G.guid=H.guid=H.guid||G.guid||this.guid++;
return G},special:{ready:{setup:D,teardown:function(){}}},specialAll:{live:{setup:function(G,H){q.event.add(this,H[0],c)
},teardown:function(I){if(I.length){var G=0,H=RegExp("(^|\\.)"+I[0]+"(\\.|$)");q.each((q.data(this,"events").live||{}),function(){if(H.test(this.type)){G++
}});if(G<1){q.event.remove(this,I[0],c)}}}}}};q.Event=function(G){if(!this.preventDefault){return new q.Event(G)
}if(G&&G.type){this.originalEvent=G;this.type=G.type}else{this.type=G}this.timeStamp=e();
this[h]=true};function m(){return false}function w(){return true}q.Event.prototype={preventDefault:function(){this.isDefaultPrevented=w;
var G=this.originalEvent;if(!G){return}if(G.preventDefault){G.preventDefault()}G.returnValue=false
},stopPropagation:function(){this.isPropagationStopped=w;var G=this.originalEvent;
if(!G){return}if(G.stopPropagation){G.stopPropagation()}G.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=w;
this.stopPropagation()},isDefaultPrevented:m,isPropagationStopped:m,isImmediatePropagationStopped:m};
var a=function(H){var G=H.relatedTarget;while(G&&G!=this){try{G=G.parentNode}catch(I){G=this
}}if(G!=this){H.type=H.data;q.event.handle.apply(this,arguments)}};q.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(H,G){q.event.special[G]={setup:function(){q.event.add(this,H,a,G)
},teardown:function(){q.event.remove(this,H,a)}}});q.fn.extend({bind:function(H,I,G){return H=="unload"?this.one(H,I,G):this.each(function(){q.event.add(this,H,G||I,G&&I)
})},one:function(I,J,H){var G=q.event.proxy(H||J,function(K){q(this).unbind(K,G);
return(H||J).apply(this,arguments)});return this.each(function(){q.event.add(this,I,G,H&&J)
})},unbind:function(H,G){return this.each(function(){q.event.remove(this,H,G)})},trigger:function(G,H){return this.each(function(){q.event.trigger(G,H,this)
})},triggerHandler:function(G,I){if(this[0]){var H=q.Event(G);H.preventDefault();
H.stopPropagation();q.event.trigger(H,I,this[0]);return H.result}},toggle:function(I){var G=arguments,H=1;
while(H<G.length){q.event.proxy(I,G[H++])}return this.click(q.event.proxy(I,function(J){this.lastToggle=(this.lastToggle||0)%H;
J.preventDefault();return G[this.lastToggle++].apply(this,arguments)||false}))},hover:function(G,H){return this.mouseenter(G).mouseleave(H)
},ready:function(G){D();if(q.isReady){G.call(document,q)}else{q.readyList.push(G)
}return this},live:function(I,H){var G=q.event.proxy(H);G.guid+=this.selector+I;q(document).bind(k(I,this.selector),this.selector,G);
return this},die:function(H,G){q(document).unbind(k(H,this.selector),G?{guid:G.guid+this.selector+H}:null);
return this}});function c(J){var G=RegExp("(^|\\.)"+J.type+"(\\.|$)"),I=true,H=[];
q.each(q.data(this,"events").live||[],function(K,L){if(G.test(L.type)){var M=q(J.target).closest(L.data)[0];
if(M){H.push({elem:M,fn:L})}}});H.sort(function(L,K){return q.data(L.elem,"closest")-q.data(K.elem,"closest")
});q.each(H,function(){if(this.fn.call(this.elem,J,this.fn.data)===false){return(I=false)
}});return I}function k(H,G){return["live",H,G.replace(/\./g,"`").replace(/ /g,"|")].join(".")
}q.extend({isReady:false,readyList:[],ready:function(){if(!q.isReady){q.isReady=true;
if(q.readyList){q.each(q.readyList,function(){this.call(document,q)});q.readyList=null
}q(document).triggerHandler("ready")}}});var z=false;function D(){if(z){return}z=true;
if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);
q.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);
q.ready()}});if(document.documentElement.doScroll&&n==n.top){(function(){if(q.isReady){return
}try{document.documentElement.doScroll("left")}catch(G){setTimeout(arguments.callee,0);
return}q.ready()})()}}}q.event.add(n,"load",q.ready)}q.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(H,G){q.fn[G]=function(I){return I?this.bind(G,I):this.trigger(G)
}});q(n).bind("unload",function(){for(var G in q.cache){if(G!=1&&q.cache[G].handle){q.event.remove(q.cache[G].handle.elem)
}}});(function(){q.support={};var H=document.documentElement,I=document.createElement("script"),M=document.createElement("div"),L="script"+(new Date).getTime();
M.style.display="none";M.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
var J=M.getElementsByTagName("*"),G=M.getElementsByTagName("a")[0];if(!J||!J.length||!G){return
}q.support={leadingWhitespace:M.firstChild.nodeType==3,tbody:!M.getElementsByTagName("tbody").length,objectAll:!!M.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!M.getElementsByTagName("link").length,style:/red/.test(G.getAttribute("style")),hrefNormalized:G.getAttribute("href")==="/a",opacity:G.style.opacity==="0.5",cssFloat:!!G.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};
I.type="text/javascript";try{I.appendChild(document.createTextNode("window."+L+"=1;"))
}catch(K){}H.insertBefore(I,H.firstChild);if(n[L]){q.support.scriptEval=true;delete n[L]
}H.removeChild(I);if(M.attachEvent&&M.fireEvent){M.attachEvent("onclick",function(){q.support.noCloneEvent=false;
M.detachEvent("onclick",arguments.callee)});M.cloneNode(true).fireEvent("onclick")
}q(function(){var N=document.createElement("div");N.style.width=N.style.paddingLeft="1px";
document.body.appendChild(N);q.boxModel=q.support.boxModel=N.offsetWidth===2;document.body.removeChild(N).style.display="none"
})})();var y=q.support.cssFloat?"cssFloat":"styleFloat";q.props={"for":"htmlFor","class":"className","float":y,cssFloat:y,styleFloat:y,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};
q.fn.extend({_load:q.fn.load,load:function(I,L,M){if(typeof I!=="string"){return this._load(I)
}var K=I.indexOf(" ");if(K>=0){var G=I.slice(K,I.length);I=I.slice(0,K)}var J="GET";
if(L){if(q.isFunction(L)){M=L;L=null}else{if(typeof L==="object"){L=q.param(L);J="POST"
}}}var H=this;q.ajax({url:I,type:J,dataType:"html",data:L,complete:function(O,N){if(N=="success"||N=="notmodified"){H.html(G?q("<div/>").append(O.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(G):O.responseText)
}if(M){H.each(M,[O.responseText,N,O])}}});return this},serialize:function(){return q.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?q.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))
}).map(function(G,H){var I=q(this).val();return I==null?null:q.isArray(I)?q.map(I,function(K,J){return{name:H.name,value:K}
}):{name:H.name,value:I}}).get()}});q.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(G,H){q.fn[H]=function(I){return this.bind(H,I)
}});var t=e();q.extend({get:function(G,I,J,H){if(q.isFunction(I)){J=I;I=null}return q.ajax({type:"GET",url:G,data:I,success:J,dataType:H})
},getScript:function(G,H){return q.get(G,null,H,"script")},getJSON:function(G,H,I){return q.get(G,H,I,"json")
},post:function(G,I,J,H){if(q.isFunction(I)){J=I;I={}}return q.ajax({type:"POST",url:G,data:I,success:J,dataType:H})
},ajaxSetup:function(G){q.extend(q.ajaxSettings,G)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return n.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()
},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(O){O=q.extend(true,O,q.extend(true,{},q.ajaxSettings,O));
var Y,H=/=\?(&|$)/g,T,X,I=O.type.toUpperCase();if(O.data&&O.processData&&typeof O.data!=="string"){O.data=q.param(O.data)
}if(O.dataType=="jsonp"){if(I=="GET"){if(!O.url.match(H)){O.url+=(O.url.match(/\?/)?"&":"?")+(O.jsonp||"callback")+"=?"
}}else{if(!O.data||!O.data.match(H)){O.data=(O.data?O.data+"&":"")+(O.jsonp||"callback")+"=?"
}}O.dataType="json"}if(O.dataType=="json"&&(O.data&&O.data.match(H)||O.url.match(H))){Y="jsonp"+t++;
if(O.data){O.data=(O.data+"").replace(H,"="+Y+"$1")}O.url=O.url.replace(H,"="+Y+"$1");
O.dataType="script";n[Y]=function(Z){X=Z;K();N();n[Y]=g;try{delete n[Y]}catch(aa){}if(J){J.removeChild(V)
}}}if(O.dataType=="script"&&O.cache==null){O.cache=false}if(O.cache===false&&I=="GET"){var G=e();
var W=O.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+G+"$2");O.url=W+((W==O.url)?(O.url.match(/\?/)?"&":"?")+"_="+G:"")
}if(O.data&&I=="GET"){O.url+=(O.url.match(/\?/)?"&":"?")+O.data;O.data=null}if(O.global&&!q.active++){q.event.trigger("ajaxStart")
}var S=/^(\w+:)?\/\/([^\/?#]+)/.exec(O.url);if(O.dataType=="script"&&I=="GET"&&S&&(S[1]&&S[1]!=location.protocol||S[2]!=location.host)){var J=document.getElementsByTagName("head")[0];
var V=document.createElement("script");V.src=O.url;if(O.scriptCharset){V.charset=O.scriptCharset
}if(!Y){var Q=false;V.onload=V.onreadystatechange=function(){if(!Q&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){Q=true;
K();N();V.onload=V.onreadystatechange=null;J.removeChild(V)}}}J.appendChild(V);return g
}var M=false;var L=O.xhr();if(O.username){L.open(I,O.url,O.async,O.username,O.password)
}else{L.open(I,O.url,O.async)}try{if(O.data){L.setRequestHeader("Content-Type",O.contentType)
}if(O.ifModified){L.setRequestHeader("If-Modified-Since",q.lastModified[O.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}L.setRequestHeader("X-Requested-With","XMLHttpRequest");L.setRequestHeader("Accept",O.dataType&&O.accepts[O.dataType]?O.accepts[O.dataType]+", */*":O.accepts._default)
}catch(U){}if(O.beforeSend&&O.beforeSend(L,O)===false){if(O.global&&!--q.active){q.event.trigger("ajaxStop")
}L.abort();return false}if(O.global){q.event.trigger("ajaxSend",[L,O])}var P=function(Z){if(L.readyState==0){if(R){clearInterval(R);
R=null;if(O.global&&!--q.active){q.event.trigger("ajaxStop")}}}else{if(!M&&L&&(L.readyState==4||Z=="timeout")){M=true;
if(R){clearInterval(R);R=null}T=Z=="timeout"?"timeout":!q.httpSuccess(L)?"error":O.ifModified&&q.httpNotModified(L,O.url)?"notmodified":"success";
if(T=="success"){try{X=q.httpData(L,O.dataType,O)}catch(ab){T="parsererror"}}if(T=="success"){var aa;
try{aa=L.getResponseHeader("Last-Modified")}catch(ab){}if(O.ifModified&&aa){q.lastModified[O.url]=aa
}if(!Y){K()}}else{q.handleError(O,L,T)}N();if(Z){L.abort()}if(O.async){L=null}}}};
if(O.async){var R=setInterval(P,13);if(O.timeout>0){setTimeout(function(){if(L&&!M){P("timeout")
}},O.timeout)}}try{L.send(O.data)}catch(U){q.handleError(O,L,null,U)}if(!O.async){P()
}function K(){if(O.success){O.success(X,T)}if(O.global){q.event.trigger("ajaxSuccess",[L,O])
}}function N(){if(O.complete){O.complete(L,T)}if(O.global){q.event.trigger("ajaxComplete",[L,O])
}if(O.global&&!--q.active){q.event.trigger("ajaxStop")}}return L},handleError:function(H,J,G,I){if(H.error){H.error(J,G,I)
}if(H.global){q.event.trigger("ajaxError",[J,H,I])}},active:0,httpSuccess:function(H){try{return !H.status&&location.protocol=="file:"||(H.status>=200&&H.status<300)||H.status==304||H.status==1223
}catch(G){}return false},httpNotModified:function(I,G){try{var J=I.getResponseHeader("Last-Modified");
return I.status==304||J==q.lastModified[G]}catch(H){}return false},httpData:function(L,J,I){var H=L.getResponseHeader("content-type"),G=J=="xml"||!J&&H&&H.indexOf("xml")>=0,K=G?L.responseXML:L.responseText;
if(G&&K.documentElement.tagName=="parsererror"){throw"parsererror"}if(I&&I.dataFilter){K=I.dataFilter(K,J)
}if(typeof K==="string"){if(J=="script"){q.globalEval(K)}if(J=="json"){K=n["eval"]("("+K+")")
}}return K},param:function(G){var I=[];function J(K,L){I[I.length]=encodeURIComponent(K)+"="+encodeURIComponent(L)
}if(q.isArray(G)||G.jquery){q.each(G,function(){J(this.name,this.value)})}else{for(var H in G){if(q.isArray(G[H])){q.each(G[H],function(){J(H,this)
})}else{J(H,q.isFunction(G[H])?G[H]():G[H])}}}return I.join("&").replace(/%20/g,"+")
}});var o={},p,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
function v(H,G){var I={};q.each(d.concat.apply([],d.slice(0,G)),function(){I[this]=H
});return I}q.fn.extend({show:function(L,N){if(L){return this.animate(v("show",3),L,N)
}else{for(var J=0,H=this.length;J<H;J++){var G=q.data(this[J],"olddisplay");this[J].style.display=G||"";
if(q.css(this[J],"display")==="none"){var I=this[J].tagName,M;if(o[I]){M=o[I]}else{var K=q("<"+I+" />").appendTo("body");
M=K.css("display");if(M==="none"){M="block"}K.remove();o[I]=M}q.data(this[J],"olddisplay",M)
}}for(var J=0,H=this.length;J<H;J++){this[J].style.display=q.data(this[J],"olddisplay")||""
}return this}},hide:function(J,K){if(J){return this.animate(v("hide",3),J,K)}else{for(var I=0,H=this.length;
I<H;I++){var G=q.data(this[I],"olddisplay");if(!G&&G!=="none"){q.data(this[I],"olddisplay",q.css(this[I],"display"))
}}for(var I=0,H=this.length;I<H;I++){this[I].style.display="none"}return this}},_toggle:q.fn.toggle,toggle:function(I,H){var G=typeof I==="boolean";
return q.isFunction(I)&&q.isFunction(H)?this._toggle.apply(this,arguments):I==null||G?this.each(function(){var J=G?I:q(this).is(":hidden");
q(this)[J?"show":"hide"]()}):this.animate(v("toggle",3),I,H)},fadeTo:function(G,I,H){return this.animate({opacity:I},G,H)
},animate:function(K,H,J,I){var G=q.speed(H,J,I);return this[G.queue===false?"each":"queue"](function(){var M=q.extend({},G),O,N=this.nodeType==1&&q(this).is(":hidden"),L=this;
for(O in K){if(K[O]=="hide"&&N||K[O]=="show"&&!N){return M.complete.call(this)}if((O=="height"||O=="width")&&this.style){M.display=q.css(this,"display");
M.overflow=this.style.overflow}}if(M.overflow!=null){this.style.overflow="hidden"
}M.curAnim=q.extend({},K);q.each(K,function(Q,U){var T=new q.fx(L,M,Q);if(/toggle|show|hide/.test(U)){T[U=="toggle"?N?"show":"hide":U](K)
}else{var S=U.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),V=T.cur(true)||0;if(S){var P=parseFloat(S[2]),R=S[3]||"px";
if(R!="px"){L.style[Q]=(P||1)+R;V=((P||1)/T.cur(true))*V;L.style[Q]=V+R}if(S[1]){P=((S[1]=="-="?-1:1)*P)+V
}T.custom(V,P,R)}else{T.custom(V,U,"")}}});return true})},stop:function(H,G){var I=q.timers;
if(H){this.queue([])}this.each(function(){for(var J=I.length-1;J>=0;J--){if(I[J].elem==this){if(G){I[J](true)
}I.splice(J,1)}}});if(!G){this.dequeue()}return this}});q.each({slideDown:v("show",1),slideUp:v("hide",1),slideToggle:v("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(G,H){q.fn[G]=function(I,J){return this.animate(H,I,J)
}});q.extend({speed:function(I,J,H){var G=typeof I==="object"?I:{complete:H||!H&&J||q.isFunction(I)&&I,duration:I,easing:H&&J||J&&!q.isFunction(J)&&J};
G.duration=q.fx.off?0:typeof G.duration==="number"?G.duration:q.fx.speeds[G.duration]||q.fx.speeds._default;
G.old=G.complete;G.complete=function(){if(G.queue!==false){q(this).dequeue()}if(q.isFunction(G.old)){G.old.call(this)
}};return G},easing:{linear:function(I,J,G,H){return G+H*I},swing:function(I,J,G,H){return((-Math.cos(I*Math.PI)/2)+0.5)*H+G
}},timers:[],fx:function(H,G,I){this.options=G;this.elem=H;this.prop=I;if(!G.orig){G.orig={}
}}});q.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(q.fx.step[this.prop]||q.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"
}},cur:function(H){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var G=parseFloat(q.css(this.elem,this.prop,H));return G&&G>-10000?G:parseFloat(q.curCSS(this.elem,this.prop))||0
},custom:function(K,J,I){this.startTime=e();this.start=K;this.end=J;this.unit=I||this.unit||"px";
this.now=this.start;this.pos=this.state=0;var G=this;function H(L){return G.step(L)
}H.elem=this.elem;if(H()&&q.timers.push(H)&&!p){p=setInterval(function(){var M=q.timers;
for(var L=0;L<M.length;L++){if(!M[L]()){M.splice(L--,1)}}if(!M.length){clearInterval(p);
p=g}},13)}},show:function(){this.options.orig[this.prop]=q.attr(this.elem.style,this.prop);
this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());
q(this.elem).show()},hide:function(){this.options.orig[this.prop]=q.attr(this.elem.style,this.prop);
this.options.hide=true;this.custom(this.cur(),0)},step:function(J){var I=e();if(J||I>=this.options.duration+this.startTime){this.now=this.end;
this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var G=true;
for(var H in this.options.curAnim){if(this.options.curAnim[H]!==true){G=false}}if(G){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;if(q.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){q(this.elem).hide()}if(this.options.hide||this.options.show){for(var K in this.options.curAnim){q.attr(this.elem.style,K,this.options.orig[K])
}}this.options.complete.call(this.elem)}return false}else{var L=I-this.startTime;
this.state=L/this.options.duration;this.pos=q.easing[this.options.easing||(q.easing.swing?"swing":"linear")](this.state,L,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};
q.extend(q.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(G){q.attr(G.elem.style,"opacity",G.now)
},_default:function(G){if(G.elem.style&&G.elem.style[G.prop]!=null){G.elem.style[G.prop]=G.now+G.unit
}else{G.elem[G.prop]=G.now}}}});if(document.documentElement.getBoundingClientRect){q.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return q.offset.bodyOffset(this[0])}var I=this[0].getBoundingClientRect(),L=this[0].ownerDocument,H=L.body,G=L.documentElement,N=G.clientTop||H.clientTop||0,M=G.clientLeft||H.clientLeft||0,K=I.top+(self.pageYOffset||q.boxModel&&G.scrollTop||H.scrollTop)-N,J=I.left+(self.pageXOffset||q.boxModel&&G.scrollLeft||H.scrollLeft)-M;
return{top:K,left:J}}}else{q.fn.offset=function(){if(!this[0]){return{top:0,left:0}
}if(this[0]===this[0].ownerDocument.body){return q.offset.bodyOffset(this[0])}q.offset.initialized||q.offset.initialize();
var L=this[0],I=L.offsetParent,H=L,Q=L.ownerDocument,O,J=Q.documentElement,M=Q.body,N=Q.defaultView,G=N.getComputedStyle(L,null),P=L.offsetTop,K=L.offsetLeft;
while((L=L.parentNode)&&L!==M&&L!==J){O=N.getComputedStyle(L,null);P-=L.scrollTop,K-=L.scrollLeft;
if(L===I){P+=L.offsetTop,K+=L.offsetLeft;if(q.offset.doesNotAddBorder&&!(q.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(L.tagName))){P+=parseInt(O.borderTopWidth,10)||0,K+=parseInt(O.borderLeftWidth,10)||0
}H=I,I=L.offsetParent}if(q.offset.subtractsBorderForOverflowNotVisible&&O.overflow!=="visible"){P+=parseInt(O.borderTopWidth,10)||0,K+=parseInt(O.borderLeftWidth,10)||0
}G=O}if(G.position==="relative"||G.position==="static"){P+=M.offsetTop,K+=M.offsetLeft
}if(G.position==="fixed"){P+=Math.max(J.scrollTop,M.scrollTop),K+=Math.max(J.scrollLeft,M.scrollLeft)
}return{top:P,left:K}}}q.offset={initialize:function(){if(this.initialized){return
}var N=document.body,H=document.createElement("div"),J,I,P,K,O,G,L=N.style.marginTop,M='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
O={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};
for(G in O){H.style[G]=O[G]}H.innerHTML=M;N.insertBefore(H,N.firstChild);J=H.firstChild,I=J.firstChild,K=J.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(I.offsetTop!==5);this.doesAddBorderForTableAndCells=(K.offsetTop===5);
J.style.overflow="hidden",J.style.position="relative";this.subtractsBorderForOverflowNotVisible=(I.offsetTop===-5);
N.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(N.offsetTop===0);N.style.marginTop=L;
N.removeChild(H);this.initialized=true},bodyOffset:function(G){q.offset.initialized||q.offset.initialize();
var I=G.offsetTop,H=G.offsetLeft;if(q.offset.doesNotIncludeMarginInBodyOffset){I+=parseInt(q.curCSS(G,"marginTop",true),10)||0,H+=parseInt(q.curCSS(G,"marginLeft",true),10)||0
}return{top:I,left:H}}};q.fn.extend({position:function(){var K=0,J=0,H;if(this[0]){var I=this.offsetParent(),L=this.offset(),G=/^body|html$/i.test(I[0].tagName)?{top:0,left:0}:I.offset();
L.top-=l(this,"marginTop");L.left-=l(this,"marginLeft");G.top+=l(I,"borderTopWidth");
G.left+=l(I,"borderLeftWidth");H={top:L.top-G.top,left:L.left-G.left}}return H},offsetParent:function(){var G=this[0].offsetParent||document.body;
while(G&&(!/^body|html$/i.test(G.tagName)&&q.css(G,"position")=="static")){G=G.offsetParent
}return q(G)}});q.each(["Left","Top"],function(H,G){var I="scroll"+G;q.fn[I]=function(J){if(!this[0]){return null
}return J!==g?this.each(function(){this==n||this==document?n.scrollTo(!H?J:q(n).scrollLeft(),H?J:q(n).scrollTop()):this[I]=J
}):this[0]==n||this[0]==document?self[H?"pageYOffset":"pageXOffset"]||q.boxModel&&document.documentElement[I]||document.body[I]:this[0][I]
}});q.each(["Height","Width"],function(K,I){var G=K?"Left":"Top",J=K?"Right":"Bottom",H=I.toLowerCase();
q.fn["inner"+I]=function(){return this[0]?q.css(this[0],H,false,"padding"):null};
q.fn["outer"+I]=function(M){return this[0]?q.css(this[0],H,false,M?"margin":"border"):null
};var L=I.toLowerCase();q.fn[L]=function(M){return this[0]==n?document.compatMode=="CSS1Compat"&&document.documentElement["client"+I]||document.body["client"+I]:this[0]==document?Math.max(document.documentElement["client"+I],document.body["scroll"+I],document.documentElement["scroll"+I],document.body["offset"+I],document.documentElement["offset"+I]):M===g?(this.length?q.css(this[0],L):null):this.css(L,typeof M==="string"?M:M+"px")
}})})();if(!window.VisEventSyntaxHighlighter){var VisEventSyntaxHighlighter=function(){var a={defaults:{"class-name":"","first-line":1,"pad-line-numbers":true,highlight:null,"smart-tabs":true,"tab-size":4,gutter:true,toolbar:true,collapse:false,"auto-links":true,light:false,"wrap-lines":true,"html-script":false},config:{useScriptTags:true,clipboardSwf:null,toolbarItemWidth:16,toolbarItemHeight:16,bloggerMode:false,stripBrs:false,tagName:"pre",strings:{expandSource:"show source",viewSource:"view source",copyToClipboard:"copy to clipboard",copyToClipboardConfirmation:"The code is in your clipboard now",print:"print",help:"?",alert:"SyntaxHighlighter\n\n",noBrush:"Can't find brush for: ",brushNotHtmlScript:"Brush wasn't configured for html-script option: ",aboutDialog:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>About SyntaxHighlighter</title></head><body style="font-family:Geneva,Arial,Helvetica,sans-serif;background-color:#fff;color:#000;font-size:1em;text-align:center;"><div style="text-align:center;margin-top:3em;"><div style="font-size:xx-large;">SyntaxHighlighter</div><div style="font-size:.75em;margin-bottom:4em;"><div>version 2.1.364 (October 15 2009)</div><div><a href="http://alexgorbatchev.com" target="_blank" style="color:#0099FF;text-decoration:none;">http://alexgorbatchev.com</a></div><div>If you like this script, please <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2930402" style="color:#0099FF;text-decoration:none;">donate</a> to keep development active!</div></div><div>JavaScript code syntax highlighter.</div><div>Copyright 2004-2009 Alex Gorbatchev.</div></div></body></html>'},debug:false},vars:{discoveredBrushes:null,spaceWidth:null,printFrame:null,highlighters:{}},brushes:{},regexLib:{multiLineCComments:/\/\*[\s\S]*?\*\//gm,singleLineCComments:/\/\/.*$/gm,singleLinePerlComments:/#.*$/gm,doubleQuotedString:/"([^\\"\n]|\\.)*"/g,singleQuotedString:/'([^\\'\n]|\\.)*'/g,multiLineDoubleQuotedString:/"([^\\"]|\\.)*"/g,multiLineSingleQuotedString:/'([^\\']|\\.)*'/g,xmlComments:/(&lt;|<)!--[\s\S]*?--(&gt;|>)/gm,url:/&lt;\w+:\/\/[\w-.\/?%&=@:;]*&gt;|\w+:\/\/[\w-.\/?%&=@:;]*/g,phpScriptTags:{left:/(&lt;|<)\?=?/g,right:/\?(&gt;|>)/g},aspScriptTags:{left:/(&lt;|<)%=?/g,right:/%(&gt;|>)/g},scriptScriptTags:{left:/(&lt;|<)\s*script.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*script\s*(&gt;|>)/gi}},toolbar:{create:function(d){var h=document.createElement("DIV"),b=a.toolbar.items;
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