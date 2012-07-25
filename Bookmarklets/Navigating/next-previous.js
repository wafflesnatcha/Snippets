(function (num, rel, pattern) {
	// try finding a <link rel="next"> tag
	if (rel) {
		var i, links = Array.prototype.slice.call(document.getElementsByTagName('link')),
			l = links.length;
		for (i = 0; i < l; i++) {
			if (links[i].rel == rel && links[i].href) {
				window.location = links[i].href;
				return;
			}
		}
	}

	// look for links who's text is 'next'
	if (pattern) {
		var i, links = document.links,
			l = links.length,
			re = new RegExp('([^\w]|^)\s*(' + pattern + ')\s*([^\w]|$)', 'i');
		for (i = 0; i < l; i++) {
			if (re.test(links[i].innerText.replace(/[^\w\s]+/, '').replace(/^\s+|\s+$/g, '').replace(/[\n\r]/g, ' ')) && links[i].href) {
				window.location = links[i].href;
				return;
			}
		}
	}

	// increment the last numeric span in the URL
	window.__BMRK_NAV_INC = window.__BMRK_NAV_INC || num;
	var m = window.location.href.match(/^(.*?)(\d+)([^\d]*)$/);
	if (m) {
		var x = "" + (parseInt(m[2], 10) + window.__BMRK_NAV_INC);
		while (x.length < m[2].length) {
			x = "0" + x;
		}
		window.location = m[1] + x + m[3];
	}
// })(-1, 'prev', '(prev|previous)(\s*page)?');
})(1, 'next', 'next(\s*page)?');