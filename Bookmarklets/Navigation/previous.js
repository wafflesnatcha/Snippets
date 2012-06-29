(function (num, rel) {
	if (rel) {
		var i, links = Array.prototype.slice.call(document.getElementsByTagName('link')),
			l = links.length;
		for (i = 0; i < l; i++) {
			if (links[i].rel == rel && links[i].href) {
				document.location = links[i].href;
				return;
			}
		}
	}
	window._BMRK_NAV_INC = window._BMRK_NAV_INC || num;
	var m = document.location.href.match(/^(.*?)(\d+)([^\d]*)$/);
	if (m) {
		var x = "" + (parseInt(m[2], 10) + window._BMRK_NAV_INC);
		while (x.length < m[2].length) {
			x = "0" + x;
		}
		document.location = m[1] + x + m[3];
	}
})(-1, 'prev');