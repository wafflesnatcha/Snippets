(function() {
	function HTMLEscape(s) {
		s = s.replace(/&/g, "&amp;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/</g, "&lt;");
		return s;
	}
	var w = window.open();
	w.document.write("<pre>" + HTMLEscape("<html>\n" + document.documentElement.innerHTML + "\n</html>"));
	w.document.close();
})();
