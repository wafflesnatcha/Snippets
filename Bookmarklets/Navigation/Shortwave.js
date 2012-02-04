SISW();

function SISW() {
	var t = window.getSelection ? window.getSelection() : (document.getSelection ? document.getSelection() : (document.selection ? document.selection.createRange().text : ''));
	var c = window.prompt('Type `help` for a list of commands:');
	if (t != '') {
		if (c) {
			c += ' ' + t;
		} else {
			c = '' + t;
		};
	};
	if (c) {
		var u = 'http://shortwaveapp.com/?go&c=' + c + '&t=' + (document.title ? encodeURI(document.title) : '') + '&s=';
		if (c.substring(0, 1) == ' ') {
			var w = window.open(u);
			w.focus();
		} else {
			window.location.href = u;
		};
	};
};
