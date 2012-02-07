(function () {
	if (!window.NAV_BOOKMARKLET) window.NAV_BOOKMARKLET = {
		"pathname": location.pathname,
		"host": location.host
	};
	if (location.hash === "") {
		if (NAV_BOOKMARKLET.pathname == "/") {
			var host_parts = NAV_BOOKMARKLET.host.split(".");
			if (host_parts.length > 2) {
				host_parts.shift();
				NAV_BOOKMARKLET.host = host_parts.join(".");
			} else if (location.port) {
				NAV_BOOKMARKLET.host = location.hostname;
			}
		} else {
			var path_parts = NAV_BOOKMARKLET.pathname.split("/");
			// var i = path_parts.length;
			for (var i = path_parts.length; i >= 0; i--) {
				if (path_parts[i] == "") path_parts.splice(i, 1);
			}
			path_parts.pop();
			NAV_BOOKMARKLET.pathname = (path_parts.length > 0) ? "/" + path_parts.join("/") + "/" : "/";
		}
	}
	var l = location.protocol + "//" + NAV_BOOKMARKLET.host + NAV_BOOKMARKLET.pathname;
	if (l != location.href) location = l;
})();
