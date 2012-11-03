(function () {
	var i, h, hrefs = [],
		nodes = Array.prototype.slice.call(document.querySelectorAll(prompt("Selector"))),
		l = nodes.length;

	for (i = 0; i < l; i++) {
		h = nodes[i].getAttribute('href');
		if (h && !h.match(/^(javascript|mailto):/i) && hrefs.indexOf(h) < 0) hrefs.push(h);
	}

	if (hrefs.length > 1 && !confirm('Open ' + hrefs.length + ' links?')) return;
	for (i = 0; i < hrefs.length; i++) window.open(hrefs[i]);
})();
