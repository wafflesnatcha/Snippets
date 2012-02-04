(function() {
	function selectColor(i) {
		return ["#fdc", "#cdf", "#bfd", "#dbf", "#fbd"][i % 5];
	}
	var u = location.href,
		ul = u.length;
	var tparts = [""],
		zparts = [],
		nz = 0;

	function isDigit(c) {
		return ("0" <= c && c <= "9");
	}
	for (i = 0; i < ul;) {
		for (; i < ul && !isDigit(u.charAt(i)); ++i) tparts[nz] += u.charAt(i);
		if (i < ul) {
			zparts[nz] = "";
			for (; i < ul && isDigit(u.charAt(i)); ++i) zparts[nz] += u.charAt(i);
			tparts[nz + 1] = "";
			++nz;
		}
	}
	if (!nz) {
		alert("No numbers in URL.");
		return;
	}
	D = window.open().document;
	D.write();
	D.close();
	D.body.innerHTML = '<style type="text/css">body{font:9pt sans-serif;}a{text-decoration:none;}a:hover{text-decoration:underline;}</style>';
	function a(n) {
		A(D.body, n);
	}

	function A(p, n) {
		p.appendChild(n);
	}

	function E(q) {
		return D.createElement(q);
	}

	function cT(t) {
		return D.createTextNode(t)
	}

	function cBR() {
		return E("br");
	}

	function cS(t, ci) {
		var s = E("span");
		s.style.background = selectColor(ci);
		s.style.fontWeight = "bold";
		A(s, cT(t));
		return s;
	}

	function cTB(v, oc) {
		var b = E("input");
		b.size = 6;
		b.value = v;
		b.addEventListener("input", oc, false);
		return b;
	}

	function cCB(t, oc) {
		var L = E("label"),
			b = E("input");
		b.type = "checkbox";
		b.checked = true;
		b.onchange = oc;
		A(L, b);
		A(L, cT(t));
		return L;
	}

	function cL(nz, tparts, zparts) {
		var L = E("a");
		var u = "";
		for (var i = 0; i < nz; ++i) {
			A(L, cT(tparts[i]));
			A(L, cS(zparts[i], i));
			u += tparts[i] + zparts[i];
		}
		A(L, cT(tparts[nz]));
		u += tparts[nz];
		L.href = u;
		L.target = "_blank";
		return L;
	}
	a(cT("Original URL: "));
	a(cBR());
	a(cL(nz, tparts, zparts));
	a(cBR());
	a(cBR());
	var fromBoxes = [],
		toBoxes = [],
		padChecks = [];
	for (i = 0; i < nz; ++i) {
		a(cT("Run "));
		a(cS(zparts[i], i));
		a(cT(" from "));
		a(fromBoxes[i] = cTB(zparts[i], listURLs));
		a(cT(" to "));
		a(toBoxes[i] = cTB(zparts[i], listURLs));
		a(cT(" ("));
		a(j = cCB(" Pad with zeroes to maintain length", listURLs));
		padChecks[i] = j.childNodes[0];
		a(cT(")"));
		a(cBR());
	}
	a(cBR());
	resultDiv = E("div");
	a(resultDiv);
	listURLs();

	function listURLs() {
		while (resultDiv.childNodes.length) resultDiv.removeChild(resultDiv.childNodes[0]);
		var lows = [],
			highs = [];
		for (i = 0; i < nz; ++i) {
			lows[i] = parseInt(fromBoxes[i].value, 10);
			highs[i] = parseInt(toBoxes[i].value, 10);
			if (highs[i] - lows[i] > 999) {
				A(resultDiv, cT("Too many"));
				return;
			}
		}
		urls = [];

		function cb(sta) {
			var newzparts = [];
			for (var i = 0; i < nz; ++i) {
				var z = "" + sta[i];
				if (padChecks[i].checked) while (z.length < zparts[i].length) z = "0" + z;
				newzparts[i] = z;
			}
			A(resultDiv, cL(nz, tparts, newzparts));
			A(resultDiv, cBR());
		}
		fors(nz, cb, lows, highs);
	}

	function fors(n, callback, lows, highs) {
		function fors_inner(states, v) {
			if (v >= n) callback(states);
			else for (states[v] = lows[v]; states[v] <= highs[v]; ++(states[v])) fors_inner(states, v + 1);
		}
		fors_inner([], 0);
	}
})()
