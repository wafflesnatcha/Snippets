(function() {
	function getSelSource() {
		x = document.createElement("div");
		x.appendChild(window.getSelection().getRangeAt(0).cloneContents());
		return x.innerHTML;
	}

	function makeHR() {
		return nd.createElement("hr");
	}

	function makeParagraph(text) {
		p = nd.createElement("p");
		p.appendChild(nd.createTextNode(text));
		return p;
	}

	function makePre(text) {
		p = nd.createElement("pre");
		p.appendChild(nd.createTextNode(text));
		return p;
	}
	nd = window.open().document;
	ndb = nd.body;
	if (!window.getSelection || !window.getSelection().rangeCount || window.getSelection().getRangeAt(0).collapsed) {
		nd.title = "Generated Source of: " + location.href;
		ndb.appendChild(makeParagraph("No selection, showing generated source of entire document."));
		ndb.appendChild(makeHR());
		ndb.appendChild(makePre("<html>\n" + document.documentElement.innerHTML + "\n</html>"));
	} else {
		nd.title = "Partial Source of: " + location.href;
		ndb.appendChild(makePre(getSelSource()));
	};
})()
