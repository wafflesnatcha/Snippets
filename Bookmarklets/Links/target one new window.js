(function() {
	var x, i, r = Math.random();
	x = document.links;
	for (i = 0; i < x.length; ++i) {
		x[i].target = r;
	}
})();
