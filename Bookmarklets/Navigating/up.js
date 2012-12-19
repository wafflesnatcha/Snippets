/*jshint browser:true*/
(function (bmk, loc) {
	var host = bmk ? bmk.host : loc.host,
		pathname = bmk ? bmk.pathname : loc.pathname,
		hash = bmk ? bmk.hash : loc.hash,
		search = bmk ? bmk.search : loc.search;

	if (hash !== "") {
		hash = "";
	} else if (search !== "") {
		search = "";
	} else {
		if (pathname === "/") {
			if (host.split(".").length > 2) {
				host = host.split(".").slice(1).join(".");
			}
			else if (loc.port) {
				host = loc.hostname;
			}
		} else {
			var i, p = pathname.split("/");
			for (i = p.length; i >= 0; i--) {
				if (p[i] == "") {
					p.splice(i, 1);
				}
			}
			p.pop();
			pathname = (p.length > 0) ? "/" + p.join("/") + "/" : "/";
		}
	}

	window.__BMRK_NAV = {
		"pathname": pathname,
		"host": host,
		"hash": hash,
		"search": search
	};

	var l = loc.protocol + "//" + host + pathname + search + hash;
	if (l != loc.href) {
		window.location = l;
	}
}(window.__BMRK_NAV, window.location));