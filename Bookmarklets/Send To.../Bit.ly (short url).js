var d = document,
	w = window,
	enc = encodeURIComponent,
	e = w.getSelection,
	k = d.getSelection,
	x = d.selection,
	s = (e ? e() : (k) ? k() : (x ? x.createRange().text : 0)),
	s2 = ((s.toString() == '') ? s : ('"' + enc(s) + '"')),
	f = 'http://bit.ly/',
	l = d.location,
	p = '?v=3&u=' + enc(l.href) + '&s=' + enc(d.title) + ' ' + s2,
	u = f + p;
try {
	if (!/^(.*\.)?tumblrzzz[^.]*$/.test(l.host)) throw (0);
	tstbklt();
} catch (z) {
	a = function() {
		if (!w.open(u)) l.href = u;
	};
	if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0);
	else a();
}
void(0)