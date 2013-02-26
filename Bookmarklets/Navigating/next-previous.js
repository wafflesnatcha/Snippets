/*jshint browser:true, devel:true*/
(function (delta, rel, pattern) {
	var i, l, links;

	function go(url) {
		// return console.log(url);
		return window.location = url;
	}

	// Method 1: find a <link rel=...> tag
	if (rel) {
		links = Array.prototype.slice.call(document.getElementsByTagName('link')).concat(Array.prototype.slice.call(document.links));
		l = links.length;
		for (i = 0; i < l; i++) {
			if (links[i].rel == rel && links[i].href) {
				return go(links[i]);
			}
		}
	}

	// Method 2: look for links who's text matches a given regular expression
	if (pattern) {
		links = document.links;
		l = links.length;
		pattern = new RegExp('([^\\w]|^)\\s*(' + pattern + ')\\s*([^\\w]|$)', 'i');
		for (i = 0; i < l; i++) {
			if (links[i].href && pattern.test(links[i].innerText.replace(/^\s+|\s+$/g, '').replace(/[\n\r]/g, ' '))) {
				return go(links[i]);
			}
		}
	}

	// Method 3: increment/decrement the last numeric span in the URL
	l = window.location.href.match(/^(.*?)(\d+)([^\d]*)$/);
	if (l) {
		i = String(parseInt(l[2], 10) + (window.__BMRK_NAV_INC = (window.__BMRK_NAV_INC || 0) + delta));
		while (i.length < l[2].length) {
			i = '0' + i;
		}
		return go(l[1] + i + l[3]);
	}
}(-1, 'prev', '<+|(prev|previous)(\\s*(page|post))?|newer'));
// }(1, 'next', '>+|next(\\s*(page|post))?|older'));