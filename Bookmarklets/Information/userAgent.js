/*jshint browser:true*/
(function () {
	var doc = window.open().document;
	doc.close();
	doc.body.innerHTML = '<style>*{font-family:Menlo,Consolas,Monaco,monospace;font-size:13px}html,body{margin:0;padding:8px;text-align:center;background:#f3f3f3}input,table{border:1px solid #bbb;width:90%;margin:4px auto;box-sizing:border-box}input{padding:3px 6px;font-size:14px}th,td{text-align:left;padding:1px 8px;background:#fff}th{background:#ffffe0}</style><input type="text" id="u" readonly><table id="d"></table>';
	var p, n = window.navigator,
		o = [],
		d = doc.getElementById("d");
	for (p in n) {
		if (n.hasOwnProperty(p)) {
			var v;
			switch (typeof n[p]) {
			case "string":
				v = '"' + n[p] + '"';
				break;
			case "number":
				v = n[p];
				break;
			case "boolean":
				v = "<b>" + (n[p] ? "true" : "false") + "</b>";
				break;
			default:
				continue;
			}
			if (v) {
				o.push([p, "<tr><th>" + p + "</th><td>" + v + "</td></tr>"]);
			}
		}
	}
	d.innerHTML = o.sort(function (a, b) {
		return a[0] < b[0] ? -1 : 1;
	}).map(function (n) {
		return n[1];
	}).join("\n");
	doc.getElementById("u").value = n.userAgent;
}());
