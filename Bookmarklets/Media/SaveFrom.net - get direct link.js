(function() {
	var s = document.createElement('script');
	s.src = 'http://savefrom.net/js/script.php?rnd' + (new Date()).getTime() + Math.random();
	document.body.appendChild(s);
})()

// http://savefrom.net/js/script.php?rnd
/*
(function() {
	var f = document.createElement('form');
	f.action = 'http://savefrom.net/bindex.php';
	f.method = 'get';
	f.target = '_blank';
	document.body.appendChild(f);

	var url = document.createElement('input');
	url.name = 'url';
	url.value = window.location.href;
	f.appendChild(url);

	f.submit();
})();
*/
