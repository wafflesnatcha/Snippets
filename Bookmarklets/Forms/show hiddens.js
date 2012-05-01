(function() {
	var i, f, j, e, div, label, ne;
	for (i = 0; f = document.forms[i]; ++i) for (j = 0; e = f[j]; ++j) if (e.type == "hidden") {
		D = document;

		function C(t) {
			return D.createElement(t);
		}

		function A(a, b) {
			a.appendChild(b);
		}
		div = C("div");
		label = C("label");
		A(div, label);
		A(label, D.createTextNode(e.name + ": "));
		e.parentNode.insertBefore(div, e);
		e.parentNode.removeChild(e);
		ne = C("input"); /*for ie*/
		ne.type = "text";
		ne.value = e.value;
		A(label, ne);
		label.style.MozOpacity = ".6";
		--j; /*for moz*/
	}
})()