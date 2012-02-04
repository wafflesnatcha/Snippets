(function() {
	var D = false;

	function Window(url) {
		if (D != false) return D;
		if (!url) {
			//D = window.open(null,null,"height=300,width=600").document;
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

	function I(u) {
		var t = u.split('.'),
			e = t[t.length - 1].toLowerCase();
		return {
			gif: 1,
			jpg: 1,
			jpeg: 1,
			png: 1,
			mng: 1
		}[e]
	}

	function hE(s) {
		return s.replace(/&/g, '&').replace(/>/g, '>').replace(/</g, '<').replace(/"/g, '"');
	}

	var linked = [],
		q, h, i, src;
	Write('<style type="text/css">*{font:9pt sans-serif;text-align:center;}img{max-width:98%;margin:4px;box-shadow:0 0 2px 0 #333;border:1px solid #fff;}</style>');

	for (i = 0; q = document.links[i]; ++i) {
		h = q.href;
		if (h && I(h)) {
			src = hE(h);
			if (linked.indexOf(src) >= 0) continue;
			Write('<br><a href="' + src + '" target="_blank"><img src="' + src + '"></a><br>');
			linked.push(src);
		}
	}
	return;
})();
