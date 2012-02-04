(function() {
	var url = location.href,
		term = '%s';
	if (term && term != unescape('%25%73')) {
		url = term;
		if (!term.match(/^[a-z]*\:/i)) url = 'http://' + url
	}
	try {
		window.open(url, null, "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no");
	} catch (e) {
		alert(e);
	}
})()
