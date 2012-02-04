(function() {
	var H = ["bgcolor", "bgColor", "background", "color", "align", "text", "alink", "vlink"],
		Y = {
			FONT: 1,
			CENTER: 1
		},
		d = [],
		p;

	function R(N) {
		var a, x, i, t;
		if (t = N.tagName) {
			t = t.toUpperCase();
			for (i = 0; a = H[i]; ++i) if (N.getAttribute(a)) N.removeAttribute(a);
			for (i = 0; x = N.childNodes[i]; ++i) R(x);
			if (Y[t]) d.push(N);
		}
	}
	R(document.documentElement);
	for (i = 0; N = d[i]; ++i) {
		p = N.parentNode;
		while (N.firstChild) p.insertBefore(N.firstChild, N);
		p.removeChild(N);
	}
})()
