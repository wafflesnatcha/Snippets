(function() {
	var D = false;

	function Window(url) {
		if (D != false) return D;
		if (!url) {
			D = window.open().document;
			D.write();
			D.close();
			return D;
		} else return window.open(url);
	}

	function Write(n) {
		if (typeof n == "string") Window().body.innerHTML += n;
		else if (typeof n == "object") Window().body.appendChild(n);
	}

	var i, q, src, links = [],
		re = /^(?:http|https|ftp)\:\/\/[^'"\?\&]*\.(apng|bmp|gif|ico|jpg|jpeg|png|svg|tiff)(\?{1}.*)?$/i;

	for (i = 0; q = document.links[i]; ++i) {
		if (re.test(q.href) && links.indexOf(q.href) < 0) links.push(q.href);
	}

	if (links.length > 0) {
		Write('<style type="text/css">body{margin:0;padding:0;text-align:center;}img{max-height:95%;max-width:95%;box-shadow:0 1px 3px #666;margin:6px;border:1px solid #fff}</style>');
		for (i = 0; i < links.length; i++) {
			Write('<a href="' + links[i] + '" target="_blank"><img src="' + links[i] + '"></a><br />');
		}
	}
})();
