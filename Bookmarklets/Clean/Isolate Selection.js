(function() {
	var d = open().document;
	d.title = "Selection";
	if (window.getSelection) { /*Moz*/
		var s = getSelection();
		for (i = 0; i < s.rangeCount; ++i) {
			var a, r = s.getRangeAt(i);
			if (!r.collapsed) {
				var x = document.createElement("div");
				x.appendChild(r.cloneContents());
				if (d.importNode) x = d.importNode(x, true);
				d.body.appendChild(x);
			}
		}
	} else { /*IE*/
		d.body.innerHTML = document.selection.createRange().htmlText;
	}
})();
