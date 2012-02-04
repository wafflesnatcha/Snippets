(function() {
	var b = false;

	function l(h) {
		if (b != false) {
			return b
		}
		if (!h) {
			b = window.open().document;
			b.write();
			b.close();
			return b
		} else {
			return window.open(h)
		}
	}
	function g(h) {
		if (typeof h == "string") {
			l().body.innerHTML += h
		} else {
			if (typeof h == "object") {
				l().body.appendChild(h)
			}
		}
	}
	function k(h) {
		var i = h.split("."),
			m = i[i.length - 1].toLowerCase();
		return {
			gif: 1,
			jpg: 1,
			jpeg: 1,
			png: 1,
			mng: 1
		}[m]
	}
	function j(h) {
		return h.replace(/&/g, "&").replace(/>/g, ">").replace(/</g, "<").replace(/"/g, '"')
	}
	var c = [],
		d, f, e, a;
	g('<style type="text/css">*{font:9pt sans-serif;text-align:center;}img{max-width:98%;margin:4px;box-shadow:0 0 2px 0 #333;border:1px solid #fff;}</style>');
	for (e = 0; d = document.links[e]; ++e) {
		f = d.href;
		if (f && k(f)) {
			a = j(f);
			if (c.indexOf(a) >= 0) {
				continue
			}
			g('<br><a href="' + a + '" target="_blank"><img src="' + a + '"></a><br>');
			c.push(a)
		}
	}
	return
})();
