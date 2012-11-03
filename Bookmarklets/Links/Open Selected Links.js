(function () {
	if (!window.getSelection && !window.getSelection().containsNode) return;

	var i, links = document.links,
		dll = links.length,
		hrefs = [],
		t = window.getSelection();

	for (i = 0; i < dll; i++) {
		if (t.containsNode(links[i], true) && !links[i].href.match(/^(javascript|mailto):/i) && hrefs.indexOf(links[i].href) < 0) {
			hrefs.push(links[i].href);
		}
	}

	if (hrefs.length < 1) alert("no links selected");
	else {
		if (hrefs.length > 1 && !confirm('Open ' + hrefs.length + ' selected links?')) return;
		for (i = 0; i < hrefs.length; i++) window.open(hrefs[i]);
	}
})();
