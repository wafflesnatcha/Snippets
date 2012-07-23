(function () {
	var host = window._BMRK_NAV ? window._BMRK_NAV.host : document.location.host
	var pathname = window._BMRK_NAV ? window._BMRK_NAV.pathname : document.location.pathname

	if (document.location.hash === "") {
		if (host == "/") {
			var h = host.split(".");
			if (h.length > 2) {
				h.shift();
				host = h.join(".");
			} else if (document.location.port) {
				host = document.location.hostname;
			}
		} else {
			var p = pathname.split("/");
			for (var i = p.length; i >= 0; i--) {
				if (p[i] == "") p.splice(i, 1);
			}
			p.pop();
			pathname = (p.length > 0) ? "/" + p.join("/") + "/" : "/";
		}
	}

	var l = document.location.protocol + "//" + host + pathname;
	window._BMRK_NAV = {
		"pathname": pathname,
		"host": host
	};
	if (l != document.location.href) document.location = l;
})();