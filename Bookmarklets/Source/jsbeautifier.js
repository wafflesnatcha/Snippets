(function() {
	s = document.getElementsByTagName('SCRIPT');
	tx = '';
	sr = [];
	for (i = 0; i < s.length; i++) {
		with(s.item(i)) {
			t = text;
			if (t) {
				tx += t;
			} else {
				sr.push(src)
			};
		}
	};
	with(window.open()) {
		document.write('<textarea id="t">' + (sr.join("\n")) + "\n\n-----\n\n" + tx + '</textarea><script src="http://jsbeautifier.org/beautify.js"></script><script>with(document.getElementById("t")){value=js_beautify(value);with(style){width="99%";height="99%";borderStyle="none";}};</script>');
		document.close();
	}
})();
