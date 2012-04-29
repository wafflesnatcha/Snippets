(function(b) {
	var c = b.createElement("style");
	c.appendChild(b.createTextNode("*:hover{outline:2px solid red;}caption:hover,thead:hover,tbod:hover,tfoot:hover,tr:hover{outline:2px dotted red;}td:hover,th:hover{outline:2px solid red;}h1:hover,h2:hover,h3:hover,h4:hover,h5:hover,h6:hover{outline:2px solid green;}ol:hover,ul:hover{outline:2px dotted blue;}li:hover{outline:2px solid blue;}div:hover{outline:2px dotted aqua;}span:hover{outline:2px solid aqua;}"));
	b.body.appendChild(c);
	var f = b.createElement("div");
	f.innerHTML = "Hover stuff!";
	f.style.position = "fixed";
	f.style.bottom = "0px";
	f.style.left = "0px";
	f.style.right = "0px";
	f.style.backgroundColor = "rgba(32,32,32,0.8)";
	f.style.color = "#fff";
	f.style.textShadow = "0 2px 2px #000";
	f.style.padding = "1em";
	f.style.fontSize = "12px";
	f.style.fontFamily = "Lucida Grande";
	f.style.border = "1px solid #666";
	f.style.outline = "1px solid #000";
	f.style.zIndex = 9999999;
	b.body.appendChild(f);

	function a(g) {
		return [String(g.tagName).toLowerCase(), g.id && ("#" + g.id), g.className && ("." + g.className.split(" ").join("."))].join("");
	}

	function e(h) {
		var g = [];
		do {
			g.unshift(h);
		} while ((h = h.parentNode));
		g.shift();
		return g;
	}

	function d(h) {
		var g = [];
		e(h).forEach(function(i) {
			g.push(a(i));
		});
		return g.join(" > ");
	}
	b.body.addEventListener("mouseover", function(h) {
		var g = h.target;
		f.innerHTML = d(g);
	}, false);
})(document);
