(function() {
	var newSS, styles = ':visited {display: none}';
	if (document.createStyleSheet) {
		document.createStyleSheet("javascript:'" + styles + "'");
	} else {
		newSS = document.createElement('link');
		newSS.rel = 'stylesheet';
		newSS.href = 'data:text/css,' + escape(styles);
		document.getElementsByTagName("head")[0].appendChild(newSS);
	}
})();
