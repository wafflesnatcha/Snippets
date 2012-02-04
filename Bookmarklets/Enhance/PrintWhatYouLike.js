(function() {
	if (window['ppw'] && ppw['bookmarklet']) {
		ppw.bookmarklet.toggle();
	} else {
		window._pwyl_home = 'http://www.printwhatyoulike.com/';
		window._pwyl_pro_id = null;
		window._pwyl_bmkl = document.createElement('script');
		window._pwyl_bmkl.setAttribute('type', 'text/javascript');
		window._pwyl_bmkl.setAttribute('src', window._pwyl_home + 'static/compressed/pwyl_bookmarklet_10.js');
		window._pwyl_bmkl.setAttribute('pwyl', 'true');
		document.getElementsByTagName('head')[0].appendChild(window._pwyl_bmkl);
	}
})();
