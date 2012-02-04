(function() {
	if (!Array.prototype.unique) Array.prototype.unique = function() {
		for (var i = 0; i < this.length; i++) {
			var n = this[i];
			for (x = i + 1; x < this.length; x++) {
				while (n == this[x]) this.splice(x, 1)
			}
		}
		return this;
	};

	if (!window.getSelection && !window.getSelection().containsNode) return;

	var i, links = document.links,
		dll = links.length,
		hrefs = [],
		t = window.getSelection();

	for (i = 0; i < dll; i++) {
		if (t.containsNode(links[i], true) && !links[i].href.match(/^(javascript|mailto):/i)) {
			hrefs.push(links[i].href);
		}
	}

	hrefs.unique();
	if (hrefs.length < 1) {
		alert("no links selected");
	} else {
		if (hrefs.length > 1 && !confirm('Open ' + hrefs.length + ' selected links?')) return;
		for (i = 0; i < hrefs.length; i++) window.open(hrefs[i]);
	}
})();
