((function() {
	window.baseUrl = 'http://www.readability.com';
	window.readabilityToken = '';
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('charset', 'UTF-8');
	s.setAttribute('src', baseUrl + '/bookmarklet/read.js');
	document.documentElement.appendChild(s);
})())