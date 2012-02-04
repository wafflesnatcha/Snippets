(function() {
	var d = document;

	function K(N, w) {
		var nn = d.createElement(w),
			C = N.childNodes,
			i;
		for (i = C.length - 1; i >= 0; --i) nn.insertBefore(C[i], nn.childNodes[0]);
		N.parentNode.replaceChild(nn, N);
	}
	function Z(t, w) {
		var T = document.getElementsByTagName(t),
			j;
		for (j = T.length - 1; j >= 0; --j) K(T[j], w);
	}
	Z("blink", "span");
	Z("marquee", "div");
})();
