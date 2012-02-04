/**
 * CSS Selector function
 */
 
function $$(xpath,root) { 
	xpath = xpath
		.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
		.replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
		.replace(/#([\w-]+)/g, '[@id="$1"]')
		.replace(/\/\[/g,'/*[');
	str = '(@\\w+|"[^"]*"|\'[^\']*\')';
	xpath = xpath
		.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
		.replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
		.replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
	var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
	while (next = got.iterateNext())
		result.push(next);
	return result;
}