(function() {
	var T = {},
		W = [],
		C = 0,
		s, i;

	function F(n) {
		var i, x, a, w, t = n.tagName;
		if (n.nodeType == 3) {
			a = n.data.toLowerCase().split(/[\s\(\)\:\,\.;\<\>\&\'\"]/);
			for (i in a) if (w = a[i]) {
				w = " " + w;
				T[w] = T[w] ? T[w] + 1 : 1;
				++C;
			}
		}
		if (t != "SCRIPT" && t != "STYLE") for (i = 0; x = n.childNodes[i]; ++i) F(x)
	}
	F(document);
	for (i in T) W.push([T[i], i]);
	W.sort(function(a, b) {
		var x = b[0] - a[0];
		return x ? x : ((b[1] < a[1]) ? 1 : -1)
	});
	s = "<h3>" + C + " words</h3>";
	for (i in W) s += W[i][0] + ":" + W[i][1] + "<br>";
	with(open().document) {
		write(s);
		close()
	}
})()
