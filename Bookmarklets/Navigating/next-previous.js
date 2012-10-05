(function (num, rel, pattern) {
	var i, links, l, re;
	// try finding a <link rel="next"> tag
	if (rel) {
		links = Array.prototype.slice.call(document.getElementsByTagName('link'));
		l = links.length;
		for (i = 0; i < l; i++) {
			if (links[i].rel == rel && links[i].href) {
				window.location = links[i].href;
				return;
			}
		}
	}

	// look for links who's text matches a "next"-like pattern
	if (pattern) {
		links = document.links;
		l = links.length;
		re = new RegExp("([^\\w]|^)\\s*(" + pattern + ')\\s*([^\\w]|$)', 'i');
		for (i = 0; i < l; i++) {
			if (links[i].href && re.test(links[i].innerText.replace(/[^\w\s]+/, '').replace(/^\s+|\s+$/g, '').replace(/[\n\r]/g, ' '))) {
				window.location = links[i].href;
				return;
			}
		}
	}

	// increment the last numeric span in the URL
	l = window.location.href.match(/^(.*?)(\d+)([^\d]*)$/);
	if (l) {
		i = String(parseInt(l[2], 10) + (window.__BMRK_NAV_INC = (window.__BMRK_NAV_INC || 0 ) + num));
		while (i.length < l[2].length) {
			i = "0" + i;
		}
		window.location = l[1] + i + l[3];
	}
}(-1, 'prev', '(prev|previous)(\\s*page)?|newer'));
// }(1, 'next', 'next(\s*page)?|older'));