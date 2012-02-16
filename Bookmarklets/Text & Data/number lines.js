(function() {
	var i, p, L, d, j, n;
	for (i = 0; p = document.getElementsByTagName("pre")[i]; ++i) {
		L = p.innerHTML.split("\r\n");
		d = "" + L.length;
		for (j = 0; j < L.length; ++j) {
			n = "" + (j + 1) + ". ";
			while (n.length < d.length + 2) n = "0" + n;
			L[j] = n + L[j];
		}
		p.innerHTML = L.join("<br>"); /*join with br for ie*/
	}
})()
