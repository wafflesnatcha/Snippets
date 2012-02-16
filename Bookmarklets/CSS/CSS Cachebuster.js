(function() {
	var s, i, x;
	x = document.getElementsByTagName('link');
	for (i = 0; i < x.length; i++) {
		x[i].href = x[i].href + '?' + new Date().getTime();
	}
})()
