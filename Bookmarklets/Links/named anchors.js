(function () {
	var i, a = document.anchors, l = a.length, n;
	for (i = 0; i < l; ++i) {
		n = a[i];
		n.appendChild(document.createTextNode("#" + n.name));
		n.style.border = "1px solid";
		n.href = "#" + n.name;
	}
})();
