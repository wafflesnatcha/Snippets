(function() {
	function rotate(es) {
		var i, n = es.length;
		for (i = 0; i < n; ++i) {
			if (es[i].checked) {
				es[(i + 1) % n].checked = true;
				break;
			}
		}
		if (i == es.length) es[0].checked = true;
	}
	var x, k, f, j, e, B, key;
	x = document.forms;
	for (k = 0; f = x[k]; ++k) {
		B = [];
		for (j = 0; e = f[j]; ++j) if (e.type && e.type.toLowerCase() == "radio") {
			key = " " + e.name;
			if (!B[key]) B[key] = [];
			B[key].push(e);
		}
		for (key in B) rotate(B[key])
	}
})()