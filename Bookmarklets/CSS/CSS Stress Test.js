(function(d) {
	var s = d.createElement('script');
	s.src = 'http://andy.edinborough.org/Demos/css-stress/stressTest.js?_=' + Math.random();
	var es = d.getElementsByTagName('script')[0];
	es.parentNode.insertBefore(s, es);
	
	var doit = function() {
		if (window.stressTest) stressTest.bookmarklet();
		else setTimeout(doit, 100);
	};
	
	doit();
})(document);
