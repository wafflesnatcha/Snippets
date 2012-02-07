(function () {
	var inline_styles = document.getElementsByTagName('style'),
		linked_styles = document.getElementsByTagName('link'),
		popup = window.open().document;

	popup.open();
	popup.close();

	var popup_body = popup.body;

	function trim(s) {
		return s.replace(/^\s*\n/, '').replace(/\s*$/, '');
	}

	function iff(a, b, c) {
		return b ? a + b + c : '';
	}

	function add(h) {
		popup_body.appendChild(h);
	}

	function makeTag(t) {
		return popup.createElement(t);
	}

	function makeText(tag, text) {
		var t = makeTag(tag);
		t.appendChild(popup.createTextNode(text));
		return t;
	}

	add(makeText('style', 'iframe{width:100%;height:18em;border:1px solid;'));
	add(makeText('h3', popup.title = 'Style sheets in ' + location.href));

	for (i = 0; i < inline_styles.length; ++i) {
		add(makeText('h4', 'Inline style sheet' + iff(' title="', inline_styles[i].title, '"')));
		add(makeText('pre', trim(inline_styles[i].innerHTML)));
	}

	for (var i = 0; i < linked_styles.length; ++i) {
		var rs = linked_styles[i].rel.split(' ');
		for (var j = 0; j < rs.length; ++j) if (rs[j].toLowerCase() == 'stylesheet') {
			add(makeText('h4', 'link rel="' + linked_styles[i].rel + '" href="' + linked_styles[i].href + '"' + iff(' title="', linked_styles[i].title, '"')));
			iframe = makeTag('iframe');
			iframe.src = linked_styles[i].href;
			add(iframe);
			break;
		}
	}
})();
