(function() {
	var D = document,
		i, f, j, e;
	for (i = 0; f = D.forms[i]; ++i) for (j = 0; e = f[j]; ++j) if (e.type == "text" || e.type == "password" || e.tagName.toLowerCase() == "textarea") S(e);

	function S(e) {
		if (!e.N) {
			var x = D.createElement("span"),
				s = x.style;
			s.color = "green";
			s.background = "white";
			s.font = "bold 10pt sans-serif";
			s.verticalAlign = "top";
			e.parentNode.insertBefore(x, e.nextSibling);

			function u() {
				x.innerHTML = e.value.length;
			}
			u();
			e.onchange = u;
			e.onkeyup = u;
			e.oninput = u;
			e.N = x;
		} else {
			e.parentNode.removeChild(e.N);
			e.N = 0;
		}
	}
})()