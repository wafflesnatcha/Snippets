(function() {
	function init() {
		var newline = unescape("%" + "0A");
		dead = false;
		oldCSS = null;
		x = opener;
		ta = document.f.ta;
		ta.select();
		ta.value = "/* Type CSS rules here and they will be applied to" + newline + "whatever page is loaded in that tab, as long as the pages" + newline + "are from '" + location.host + "'" + newline + "and you keep this window open. */" + newline + newline;
		update();
	}
	function update() {
		try {
			if (!x || x.closed) {
				ta.style.backgroundColor = "#ddd";
				return;
			}
			x.bookmarkletStyleSheet;
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
		if (!x.testStyles) {
			var newSS;
			newSS = x.document.createElement("link");
			newSS.rel = "stylesheet";
			newSS.type = "text/css";
			x.document.getElementsByTagName("head")[0].appendChild(newSS);
			x.testStyles = newSS;
			oldCSS = null;
		}
		if (oldCSS != ta.value) {
			oldCSS = ta.value;
			if (window.opera) x.testStyles.href = "javascript:unescape('" + escape(ta.value) + "')";
			else if (navigator.userAgent.indexOf("MSIE") != -1) x.testStyles.href = "javascript:unescape('" + escape(escape(ta.value)) + "')";
			else x.testStyles.href = "data:text/css," + escape(ta.value);
		}
		setTimeout(update, 150);
	}
	y = window.open('', '', 'resizable,width=500,height=300');
	y.document.write('<title>New CSS Style Sheet</title><style>.ec { width: 100%; height: 100%; border: none; margin: 0px; padding: 0px; }</style><body class="ec"><form name="f" style="margin: 0px;" class="ec"><textarea name="ta" wrap="soft" style="margin: 0px; border: 0px; width:100%; height:100%;" class="ec"></textarea><script>' + update + init + 'init();<' + '/script>');
	y.document.close();
})()
