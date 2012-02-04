(function() {
	if (typeof jQuery == 'undefined') {
		var jqit = document.createElement('script');
		jqit.type = 'text/javascript';
		jqit.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		document.getElementsByTagName('head')[0].appendChild(jqit);
	}
	_my_script = document.createElement('script');
	_my_script.type = 'text/javascript';
	_my_script.src = 'http://font-friend.googlecode.com/svn/trunk/font-friend.js';
	document.getElementsByTagName('head')[0].appendChild(_my_script);
})();
