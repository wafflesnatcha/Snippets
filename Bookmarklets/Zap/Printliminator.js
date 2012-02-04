(function() {
	function loadScript(a, b) {
		var c = document.createElement('script');
		c.type = 'text/javascript';
		c.src = a;
		var d = document.getElementsByTagName('head')[0],
			done = false;
		c.onload = c.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
				done = true;
				b()
			}
		};
		d.appendChild(c)
	}
	loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js?ver=1.3.2', function() {
		loadScript('http://css-tricks.com/examples/ThePrintliminator/js/printliminator.js', function() {
			printlimator()
		})
	})
})()
