(function () {
	if (document.getElementById('FirebugLite')) {
		return;
	}
	var root = "https://getfirebug.com/",
		E = document.createElementNS && document.documentElement.namespaceURI;
	E = E ? document.createElementNS(E, 'script') : document.createElement('script');
	E.setAttribute('id', 'FirebugLite');
	E.setAttribute('src', root + 'firebug-lite.js#startOpened');
	E.setAttribute('FirebugLite', '4');
	if (window.log) {
		E.addEventListener("load", function () {
			if (window.Firebug && window.Firebug.version) {
				for (var a = 0; a < log.history.length; a++) {
					console.log(log.history[a])
				}
			} else {
				setTimeout(arguments.callee, 100);
			}
		}, false);
	}
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(E);
	E = new Image;
	E.setAttribute('src', root + 'releases/lite/latest/skin/xp/sprite.png');
}());
