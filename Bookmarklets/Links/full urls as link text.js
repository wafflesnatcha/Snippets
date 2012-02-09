(function() {
	var i, c, x, h;
	for (i = 0; x = document.links[i]; ++i) {
		h = x.href;
		x.title += " " + x.innerHTML;
		while (c = x.firstChild) x.removeChild(c);
		x.appendChild(document.createTextNode(h));
	}
})()
