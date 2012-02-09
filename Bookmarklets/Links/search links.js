(function() {
	var x, n, nD, z, i;

	function htmlEscape(s) {
		s = s.replace(/&/g, '&');
		s = s.replace(/>/g, '>');
		s = s.replace(/</g, '<');
		return s;
	}

	function attrQuoteEscape(s) {
		s = s.replace(/&/g, '&');
		s = s.replace(/"/g, '"');
		return s;
	}
	x = prompt("show links with this word/phrase in link text or target url (leave blank to list all links):", "");
	n = 0;
	if (x != null) {
		x = x.toLowerCase();
		nD = window.open().document;
		nD.writeln('<html><head><title>Links containing "' + htmlEscape(x) + '"</title><base target="_blank"></head><body>');
		nD.writeln('Links on <a href="' + attrQuoteEscape(location.href) + '">' + htmlEscape(location.href) + '</a><br> with link text or target url containing "' + htmlEscape(x) + '"<br><hr>');
		z = document.links;
		for (i = 0; i < z.length; ++i) {
			if ((z[i].innerHTML && z[i].innerHTML.toLowerCase().indexOf(x) != -1) || z[i].href.toLowerCase().indexOf(x) != -1) {
				nD.writeln(++n + '. <a href="' + attrQuoteEscape(z[i].href) + '">' + (z[i].innerHTML || htmlEscape(z[i].href)) + '</a><br>');
			}
		}
		nD.writeln('<hr></body></html>');
		nD.close();
	}
})();
