(function() {
	var dims, dimarray, wid, hei, dimstring, x, i, z, url;

	function linkIsSafe(u) {
		if (u.substr(0, 7) == 'mailto:') return false;
		if (u.substr(0, 11) == 'javascript:') return false;
		return true;
	}

	function htmlEscape(s) {
		s = s.replace(/&/g, '&');
		s = s.replace(/>/g, '>');
		s = s.replace(/</g, '<');
		return s;
	}
	dims = prompt('width, height for each frame', '760, 500');
	if (dims != null) {
		dimarray = dims.split(',');
		wid = parseInt(dimarray[0]);
		hei = parseInt(dimarray[1]);
		dimstring = 'width=' + wid + ' height=' + hei;
		x = document.links;
		z = window.open().document;
		for (i = 0; i < x.length; ++i) {
			url = x[i].href;
			if (linkIsSafe(url)) {
				z.writeln('' + x[i].innerHTML + ' (' + htmlEscape(url) + ')<br><iframe ' + dimstring + ' src="' + url.replace(/"/g, '"') + '">[broken iframe]</iframe>');
			}
		}
		z.close();
	}
})();
