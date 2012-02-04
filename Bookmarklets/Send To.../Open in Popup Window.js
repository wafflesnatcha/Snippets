(function() {
	var a = location.href,
		b = "%s";
	if (b && b != unescape("%s")) {
		a = b;
		if (!b.match(/^[a-z]*\:/i)) {
			a = "http://" + a
		}
	}
	try {
		window.open(a, null, "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no")
	} catch (c) {
		alert(c)
	}
})();
