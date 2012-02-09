(function() {
	function RemoveBloat(w) {
		try {
			var doc = w.document,
				r = 1,
				C, j, i, t, T, N, b;

			for (j = 0; t = ["object", "embed", "applet", "iframe"][j]; ++j) {
				T = doc.getElementsByTagName(t);
				for (i = (T.length - 1); (i + 1) && (N = T[i]); --i) {
					if (j != 3 || !RemoveBloat((C = N.contentWindow) ? C : N.contentDocument.defaultView)) {
						b = doc.createElement("div");
						b.style.width = N.width;
						b.style.height = N.height;
						b.innerHTML = "<del>" + (j == 3 ? "third-party " + t : t) + "</del>";
						N.parentNode.replaceChild(b, N);
					}
				}
			}
		} catch (err) {
			r = 0;
		}
		return r;
	}
	RemoveBloat(self);
	var i, x;
	for (i = 0; x = frames[i]; i++) {
		RemoveBloat(x);
	}
})()
