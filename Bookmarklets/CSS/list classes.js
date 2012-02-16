(function() {
	var a = {},
		b = [],
		i, e, c, k, d, s = "<table border=1><thead><tr><th>#</th><th>Tag</th><th>className</th></tr></thead>";

	for (i = 0; e = document.getElementsByTagName("*")[i]; ++i) if (c = e.className) {
		k = e.tagName + "." + c;
		a[k] = a[k] ? a[k] + 1 : 1;
	}

	for (k in a) b.push([k, a[k]]);
	b.sort();
	for (i in b) s += "<tr><td>" + b[i][1] + "</td><td>" + b[i][0].split(".").join("</td><td>") + "</td></tr>";
	s += "</table>";
	d = open().document;
	d.write(s);
	d.close();
})()
