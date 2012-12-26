/*jshint browser:true*/
(function () {
	var doc = window.open().document;
	doc.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>userAgent</title><style>*{font-family:Menlo,Consolas,"DejaVu Sans Mono",Monaco,monospace;font-size:13px}html,body{margin:0;padding:8px;text-align:center;background:#f3f3f3}input,table{border:1px solid #bbb;width:90%;margin:4px auto;box-sizing:border-box}input{padding:3px 6px;font-size:14px}th,td{text-align:left;padding:2px 6px;background:white}th{background:lightyellow;}.boolean{}.number{color:#1c00cf}.null{color:gray}.string{color:#c41a16}</style></head><body><input type="text" id="u" readonly><table id="d"></table></body></html>');
	doc.close();
	var p, n = window.navigator,
		o = [];
	for (p in n) {
		if (n.hasOwnProperty(p)) {
			var v, t = typeof n[p];
			if (n[p] === undefined || n[p] === null) {
				t = v = 'null';
			}
			switch (t) {
				case 'string':
				case 'number':
					v = n[p];
					break;
				case 'boolean':
					v = (v ? 'true' : 'false');
					break;
				default:
					continue;
			}
			if (v) {
				o.push([p, '<tr><th>' + p + '</th><td class="' + t + '">' + v.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') + '</td></tr>']);
			}
		}
	}
	doc.getElementById('d').innerHTML = o.sort(function (a, b) {
		return a[0] < b[0] ? -1 : 1;
	}).map(function (n) {
		return n[1];
	}).join('\n');
	doc.getElementById('u').value = n.userAgent;
}());
