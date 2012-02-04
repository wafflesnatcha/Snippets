(function() {
	function A(n, g) {
		var p = n.parentNode,
			t = n.tagName;
		if (!p) return "";
		if (!t) return A(p, g);
		var T = t.toUpperCase(),
			b = (T != "TABLE" && T != "TBODY" && T != "THEAD" && T != "TR"),
			c = n.className,
			i = n.id;
		return A(p, ' > ') + (b ? T : T.toLowerCase()) + (c ? "." + c : "") + (i ? "#" + i : "") + (b ? g : ' ');
	}
	document.onmouseover = function(e) {
		e = e ? e : event;
		var s, g = e.target;
		g = g ? g : e.srcElement;
		try {
			s = A(g, '');
		} catch (err) {
			s = err.message;
		}
		window.status = s;
		return true;
	};
	window.status = A(document.documentElement, '');
})()
