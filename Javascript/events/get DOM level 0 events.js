(function() {
	var k, d, h = [],
		elements = document.getElementsByTagName("*"),
		f = ["blur", "click", "contextmenu", "dblclick", "dragstart", "focus", "keydown", "keypress", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "select", "selectstart"],
		g = f.length;
	for (var e = 0, b = elements.length; e < b; e++) {
		for (d = 0; d < g; d++) {
			if (typeof elements[e]["on" + f[d]] == "function") {
				h.push({
					"node": elements[e],
					"type": f[d],
					"listener": elements[e]["on" + f[d]].toString()
				})
			}
		}
	}
	console.dir(h);
})();
