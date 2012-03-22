(function() {
	if (window['geturlinfo_show']) {
		geturlinfo_show();
	} else {
		var d = document,
			s = d.createElement('script');
		s.src = 'http://geturlinfo.com/javascripts/bookmarklet.js?' + (new Date()).getTime();
		s.charset = 'utf-8';
		d.documentElement.appendChild(s);
	}
})();
