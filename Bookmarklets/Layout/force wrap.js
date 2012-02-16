(function() {
	var D = document;
	F(D.body);

	function F(n) {
		var u, r, c, x;
		if (n.nodeType == 3) {
			u = n.data.search(/\S{45}/);
			if (u >= 0) {
				r = n.splitText(u + 45);
				n.parentNode.insertBefore(D.createElement("WBR"), r);
			}
		} else if (n.tagName != "STYLE" && n.tagName != "SCRIPT") {
			for (c = 0; x = n.childNodes[c]; ++c) {
				F(x);
			}
		}
	}
})();
