(function() {
	var atags, i, name, a;
	anchs = document.anchors;
	for (i = 0; i < anchs.length; ++i) {
		a = anchs[i];
		name = a.name;
		a.appendChild(document.createTextNode("#" + name));
		a.style.border = "1px solid";
		a.href = "#" + name;
	}
})();
