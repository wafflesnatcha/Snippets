(function () {
	var host = window.__BMRK_NAV ? window.__BMRK_NAV.host : window.location.host,
		pathname = window.__BMRK_NAV ? window.__BMRK_NAV.pathname : window.location.pathname,
		hash = window.__BMRK_NAV ? window.__BMRK_NAV.hash : window.location.hash,
		search = window.__BMRK_NAV ? window.__BMRK_NAV.search : window.location.search

	if (hash !== "") {
		hash = "";
	} else if (search !== "") {
		search = "";
	} else {
		if (pathname === "/") {
			if (host.split(".").length > 2) host = host.split(".").slice(1).join(".");
			else if (window.location.port) host = window.location.hostname;
		} else {
			var i, p = pathname.split("/");
			for (i = p.length; i >= 0; i--) {
				if (p[i] == "") p.splice(i, 1);
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

	var l = window.location.protocol + "//" + host + pathname + search + hash;
	if (l != window.location.href) window.location = l;
})();