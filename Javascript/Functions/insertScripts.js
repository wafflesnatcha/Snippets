/**
 * Incrementally add new javascript file to the document head
 */
function insertScripts(urls, callback) {
	if(typeof urls == 'string') urls = [urls];
	var thisFn = arguments.callee,
		url = urls.shift(),
		el = document.createElement('script');
	el.src = url;
	el.type = "text/javascript";
	el.addEventListener("load", function() {
		console.log(arguments.callee.toString(), "Script Loaded", url);
		if (urls.length>0)
			thisFn.apply(this, [urls, callback]);
		else if (callback)
			callback.apply(this, arguments);
	}, false);
	document.getElementsByTagName('head')[0].appendChild(el);
}