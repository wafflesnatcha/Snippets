(function() {
	var s = "body",
		c = "",
		I = " ! important;",
		i, b, f, x, h;
	for (i = 0; i < 17; ++i) {
		x = i.toString(16);
		b = i > 15 ? "FCC" : x + x + x;
		f = i > 9 ? "000" : "FFF";
		c += s + " {background: #" + b + I + "border-color: #" + b + I + "color: #" + f + I + "}\n";
		s += " *";
	}
	if (document.createStyleSheet) {
		document.createStyleSheet("javascript:'" + c + "'");
	} else {
		h = document.createElement('link');
		h.rel = 'stylesheet';
		h.href = 'data:text/css,' + escape(c);
		document.getElementsByTagName("head")[0].appendChild(h);
	}
})()
