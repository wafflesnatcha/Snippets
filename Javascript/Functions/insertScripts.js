/**
 * Incrementally add new javascript file to the document head
 */
/*jshint browser:true*/
function insertScripts(urls, callback) {
	if (typeof urls == "string") {
		urls = [urls];
	}
	var thisFn = insertScripts,
		url = urls.shift(),
		el = document.createElement("script");
	el.src = url;
	el.type = "text/javascript";
	el.addEventListener("load", function () {
		if (urls.length > 0) {
			thisFn.apply(this, [urls, callback]);
		} else if (callback && typeof callbacl) {
			callback.apply(this, arguments);
		}
	}, false);
	document.getElementsByTagName("head")[0].appendChild(el);
}