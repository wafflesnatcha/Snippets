/*jshint browser:true, devel:true*/
(function (rel, pattern, delta) {
	var arr, l, m;

	function link(el) {
		if (el.href) {
			window.location = el.href;
		} else {
			// Try triggering a click event on the element if it has no href
			if (document.createEvent) {
				var e = document.createEvent('HTMLEvents');
				e.initEvent('click', true, true);
				el.dispatchEvent(e);
			} else if (document.createEventObject) {
				el.fireEvent('on' + event, document.createEventObject());
			}
		}
		return;
	}

	// Method 1: find tag with 'rel' attribute
	if (rel) {
		arr = Array.prototype.slice.call(document.getElementsByTagName('link'));
		while (arr.length > 0) {
			l = arr.shift();
			if (l.rel == rel && l.href) {
				window.location = l.href;
			}
		}

		arr = Array.prototype.slice.call(document.getElementsByTagName('a'));
		while (arr.length > 0) {
			l = arr.shift();
			if (l.rel == rel) {
				return link(l);
			}
		}
	}

	// Method 2: look for links who's text matches a given regular expression
	if (pattern) {
		pattern = new RegExp('([^\\w]|^)\\s*(' + pattern + ')\\s*([^\\w]|$)', 'i');
		arr = Array.prototype.slice.call(document.getElementsByTagName('a'));
		while (arr.length > 0) {
			l = arr.shift();
			if (pattern.test(l.innerText.replace(/^\s+|\s+$/g, '').replace(/[\n\r]/g, ' '))) {
				return link(l);
			}
		}
	}

	// Method 3: increment/decrement the last numeric span in the URL
	m = window.location.href.match(/^(.*?)(\d+)([^\d]*)$/);
	if (m) {
		l = String(parseInt(m[2], 10) + (window.__BMRK_NAV_INC = (window.__BMRK_NAV_INC || 0) + delta));
		while (l.length < m[2].length) {
			l = '0' + l;
		}
		return window.location = m[1] + l + m[3];
	}
}('prev', '<+|(prev|previous)(\\s*(page|post))?|newer', -1));
// }('next', '>+|next(\\s*(page|post))?|older', 1));
