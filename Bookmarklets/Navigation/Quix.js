Quix();

function Quix() {
	var e = encodeURIComponent;
	var t = window.getSelection ? window.getSelection() : (document.getSelection ? document.getSelection() : (document.selection ? document.selection.createRange().text : ''));
	var c = window.prompt('Quix: Type `help` for a list of commands:');
	if (t != '') {
		if (c) {
			c += ' ' + t;
		} else {
			c = '' + t;
		}
	}
	if (c) {
		var u = 'http://quixapp.com/go/?c=' + e(c) + '&t=' + (document.title ? e(document.title) : '') + '&s=' + '&v=080' + '&u=' + (document.location ? e(document.location) : '');
		d = '' + document.location;
		if (d.substr(0, 4) != 'http') {
			window.location = u + '&mode=direct';
		} else {
			heads = document.getElementsByTagName('head');
			if (c.substring(0, 1) == ' ') {
				var w = window.open(u + '&mode=direct');
				w.focus();
			} else if (heads.length == 0) {
				window.location = u + '&mode=direct';
			} else {
				q = document.getElementById('quix');
				if (q) {
					q.parentNode.removeChild(q);
				}
				sc = document.createElement('script');
				sc.src = u;
				sc.id = 'quix';
				sc.type = 'text/javascript';
				void(heads[0].appendChild(sc));
			}
		}
	}
}
