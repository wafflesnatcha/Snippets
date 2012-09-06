(function () {
	function fixFileUrl(u) {
		var windows, u;
		windows = (navigator.platform.indexOf("Win") != -1); /* chop off file:///, unescape each %hh, convert / to \ and | to : */
		u = u.substr(windows ? 8 : 7);
		u = unescape(u);
		if (windows) {
			u = u.replace(/\//g, "\\");
			u = u.replace(/\|/g, ":");
		}
		return u;
	} /* bookmarklet body */
	var loc, fileloc;
	loc = document.location.href;
	if (loc.length > 9 && loc.substr(0, 8) == "file:///") {
		fileloc = fixFileUrl(loc);
		if (prompt("Copy filename to clipboard, press enter, paste into validator form", fileloc) != null) {
			document.location.href = "http://validator.w3.org/file-upload.html"
		}
	} else document.location.href = "http://validator.w3.org/check?uri=" + escape(document.location.href);
	void(0);
})();
