/*jshint browser:true, devel:true*/
(function () {
	var i, n, hrefs = [],
		nodes = Array.prototype.slice.call(document.querySelectorAll(prompt('Selector'))),
		l = nodes.length;
	for (i = 0; i < l; i++) {
		n = nodes[i].href;
		if (n && n.match(/^https?:\/\//i) && hrefs.indexOf(n) < 0) {
			hrefs.push(n);
		}
	}
	if (hrefs.length > 1 && confirm('Open ' + hrefs.length + ' links?')) {
		for (i = 0; i < hrefs.length; i++) {
			window.open(hrefs[i]);
		}
	}
})();
