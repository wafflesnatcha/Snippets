(function() {
	if (window['pgzp']) {
		_pgzpToggleBookmarklet();
	} else {
		window._page_zipper_is_bookmarklet = true;
		window._page_zipper = document.createElement('script');
		window._page_zipper.type = 'text/javascript';
		window._page_zipper.src = 'http://www.printwhatyoulike.com/static/pagezipper/pagezipper_10.js';
		document.getElementsByTagName('head')[0].appendChild(window._page_zipper);
	}
})();