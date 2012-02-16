(function() {
	function d(s) {
		return s == null ? "missing" : "\"" + s + "\""
	}
	var c = [0, 0, 0],
		i, P, a, y, D = document;
	if (D.createElement("img").getAttribute("alt") != null) alert("Your browser misreports missing alts as empty alts.");
	for (i = 0; P = D.images[i]; ++i) {
		a = P.getAttribute("alt");
		y = !! a + (a != null);
		++c[y];
		P.style.border = "2px " + ["dotted red", "dashed #888", "solid green"][y];
		P.title = "Alt: " + d(a) + ", Title: " + d(P.getAttribute("title"));
	}
	top.status = "Image alt texts: " + c[0] + " missing, " + c[1] + " empty, " + c[2] + " present"
})()
