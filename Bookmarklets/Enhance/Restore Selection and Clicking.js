(function() {
	var j, f, h = document.getElementsByTagName("*"),
		c = ["click", "contextmenu", "dblclick", "dragstart", "keydown", "keypress", "keyup", "mousedown", "mouseup", "select", "selectstart"],
		g = ["MozUserSelect", "-webkit-user-select"];
	eL = c.length, sL = g.length;
	for (var i = 0, a = h.length; i < a; i++) {
		if (h[i].style) {
			for (var f = 0; f < sL; f++) {
				h[i].style[g[f]] = ""
			}
		}
		for (j = 0; j < eL; j++) {
			if (typeof h[i]["on" + c[j]] == "function") {
				h[i]["on" + c[j]] = null
			}
		}
	}
})()
