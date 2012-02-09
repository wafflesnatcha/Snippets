(function() {
	var i, x;
	for (i = 0; x = document.links[i]; ++i) x.style.color = ["blue", "red", "orange"][sim(x, location)];

	function sim(a, b) {
		if (a.hostname != b.hostname) return 0;
		if (fixPath(a.pathname) != fixPath(b.pathname) || a.search != b.search) return 1;
		return 2;
	}

	function fixPath(p) {
		p = (p.charAt(0) == "/" ? "" : "/") + p; /*many browsers*/
		p = p.split("?")[0]; /*opera*/
		return p;
	}
})()
