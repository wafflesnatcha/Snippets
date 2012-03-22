(function() {
	var b = document.body,
		e = document.documentElement,
		h = 100,
		s = self,
		y = 0,
		w = window;
	if (s.pageYOffset) y = s.pageYOffset;
	else if (e && e.scrollTop) y = e.scrollTop;
	else if (b) y = b.scrollTop;
	if (w.innerHeight && w.scrollMaxY) h = w.innerHeight + w.scrollMaxY;
	else if (b.scrollHeight > b.offsetHeight) h = b.scrollHeight;
	else h = b.offsetHeight;
	w.open('http://kwout.com/grab?address=' + encodeURIComponent(location.href) + '&scroll=' + (y / h));
})();
