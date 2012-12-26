(function() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.addEventListener('load', function () {
		console.info('jQuery v' + jQuery.fn.jquery + ' loaded');
	}, false);
	script.src = 'http://code.jquery.com/jquery.min.js';
	document.getElementsByTagName('head')[0].appendChild(script);
})();
