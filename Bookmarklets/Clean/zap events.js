(function() {
	var H = ["mouseover", "mouseout", "unload", "resize"],
		o = window.opera;
	if (document.addEventListener && !o) {
		// MOZ
		for (j in H) document.addEventListener(H[j], function(e) {
			e.stopPropagation();
		}, true);
	} else if (window.captureEvents && !o) {
		// NS4
		document.captureEvents(-1);
		for (j in H) {
			window["on" + H[j]] = null;
		}
	} else {
		function R(N) {
			var i, x;
			for (j in H) if (N["on" + H[j]] /*NOT TEXTNODE*/ ) N["on" + H[j]] = null;
			for (i = 0; x = N.childNodes[i]; ++i) R(x);
		}
		R(document);
	}
})()
