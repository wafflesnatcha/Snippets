(function() {
	var i, a, s;
	a = document.getElementsByTagName('link');
	for (i = 0; i < a.length; i++) {
		s = a[i];
		if (s.rel.toLowerCase().indexOf('stylesheet') >= 0 && s.href) {
			var h = s.href.replace(/(&|\?)forceReload=\d+/, '');
			s.href = h + (h.indexOf('?') >= 0 ? '&' : '?') + 'forceReload=' + (new Date().valueOf())
		}
	}
})()
