(function() {
	function init() {
		var newline = unescape("%" + "0A"),
			importCount = 0,
			L = [];
		dead = false;
		oldCSS = null;
		x = opener;
		ta = document.f.ta;
		ta.select();
		if (x.editStyles) {
			ta.value = x.editStyles.innerHTML;
			update();
			return;
		}
		ta.value = "/* Type CSS rules here and they will be applied" + newline + "to pages from '" + location.host + "'" + newline + "immediately as long as you keep this window open. */" + newline + newline;

		function add(s) {
			if (!s.disabled) {
				var y = {
					sheet: s,
					readable: true,
					label: "Imported",
					inline: false,
					shorturl: "",
					fulltext: ""
				};
				try {
					for (var k = 0, m; m = s.cssRules[k]; ++k) if (m.type == 3) add(m.styleSheet);
				} catch (er) {
					y.readable = false;
				}
				L.push(y);
				if (s.ownerNode) {
					y.label = s.ownerNode.tagName.toUpperCase() + "-tag";
					if (!s.ownerNode.getAttribute("src") && !s.ownerNode.href) y.inline = true;
				}
				if (y.inline) {
					y.label = "Inline " + y.label;
					y.fulltext = fix(s.ownerNode.innerHTML);
				} else if (s.href.substr(0, 13) == "data:text/css") {
					y.shorturl = " contained in a data: URL";
					y.fulltext = fix(unescape(s.href.slice(14)));
				} else {
					++importCount;
					y.importtext = "@import \"" + s.href + "\";";
					y.shorturl = " " + s.href.split('/').reverse()[0];
					if (!y.readable) {
						y.fulltext = "/* Out-of-domain; imported above. */";
					} else if (s.href.substr(0, 5) != "http:") {
						y.fulltext = "/* Non-http; imported above. */";
					} else {
						var loadingText = "/* Loading (" + (L.length - 1) + ") */";
						y.fulltext = loadingText;
						var p = new XMLHttpRequest();
						p.onload = function(e) {
							ta.value = ta.value.replace(y.importtext + newline, "");
							y.fulltext = p.responseText;
							ta.value = ta.value.replace(loadingText, fix(y.fulltext));
							ta.value = ta.value.replace(firstNote + newline, "");
						};
						p.open("GET", s.href);
						p.send(null);
					}
				}
			}
		}
		function fix(s) {
			while ((s[0] == newline) && s.length > 1) s = s.slice(1);
			while ((s[s.length - 1] == newline) && s.length > 1) s = s.substr(0, s.length - 1);
			s = s.replace(/@import.*;/ig, function() {
				return "/* " + RegExp.lastMatch + " */";
			});
			return s;
		}
		for (var i = 0, ss; ss = x.document.styleSheets[i]; ++i) add(ss);
		var imports = "",
			main = "";
		var firstNote = "/**** Style sheets whose contents could be loaded were ****/" + newline + "/**** imported instead.  Rule order may be incorrect   ****/" + newline + "/**** as a result. ****/" + newline;
		if (importCount) {
			ta.value += firstNote;
		}
		for (var i = 0; ss = L[i]; ++i) {
			if (ss.importtext) {
				imports += ss.importtext + newline;
			}
			main += "/**** " + ss.label + " style sheet" + ss.shorturl + " ****/" + newline;
			main += newline;
			main += ss.fulltext;
			main += newline;
			main += newline;
			main += newline;
		}
		ta.value += imports + newline + main;
		update();
	}
	function update() {
		try {
			if (!x || x.closed) {
				ta.style.backgroundColor = "#ddd";
				return;
			}
			x.editStyles;
		} catch (er) {
			ta.style.backgroundColor = "#fdc";
			setTimeout(update, 150);
			dead = true;
			return;
		}
		if (dead) {
			dead = false;
			ta.style.backgroundColor = "";
			oldCSS = null;
		}
		if (!x.editStyles) {
			var newSS;
			newSS = x.document.createElement("style");
			newSS.type = "text/css";
			x.document.getElementsByTagName("head")[0].appendChild(newSS);
			x.editStyles = newSS;
			oldCSS = null;
			for (var i = 0, ss; ss = x.document.styleSheets[i]; ++i) ss.disabled = true;
		}
		if (oldCSS != ta.value) {
			oldCSS = ta.value;
			x.editStyles.innerHTML = ta.value;
		}
		setTimeout(update, 150);
	}
	y = open('', '', 'resizable,scrollbars=yes,width=550,height=520');
	y.document.write('<title>Edit Styles</title><style>.ec { width: 100%; height: 100%; border: none; margin: 0px; padding: 0px; }</style><body class="ec"><form name="f" style="margin: 0px;" class="ec"><textarea name="ta" wrap="soft" style="margin: 0px; border: 0px; width:100%; height:100%;" class="ec"></textarea><script>' + update + init + 'init();<' + '/script>');
	y.document.close();
})()
