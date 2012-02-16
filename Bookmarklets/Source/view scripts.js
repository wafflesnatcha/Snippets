(function() {
	s = document.getElementsByTagName('SCRIPT');
	d = window.open().document; /*140681*/
	d.open();
	d.close();
	b = d.body;

	function trim(s) {
		return s.replace(/^\s*\n/, '').replace(/\s*$/, '');
	};

	function add(h) {
		b.appendChild(h);
	}

	function makeTag(t) {
		return d.createElement(t);
	}

	function makeText(tag, text) {
		t = makeTag(tag);
		t.appendChild(d.createTextNode(text));
		return t;
	}
	add(makeText('style', 'iframe{width:100%;height:18em;border:1px solid;'));
	add(makeText('h3', d.title = 'Scripts in ' + location.href));
	for (i = 0; i < s.length; ++i) {
		if (s[i].src) {
			add(makeText('h4', 'script src="' + s[i].src + '"'));
			iframe = makeTag('iframe');
			iframe.src = s[i].src;
			add(iframe);
		} else {
			add(makeText('h4', 'Inline script'));
			add(makeText('pre', trim(s[i].innerHTML)));
		}
	}
	void 0
})()
