(function() {
	var D = document;
	D.body.normalize();
	F(D.body);

	function F(n) {
		var u, A, M, R, c, x;
		if (n.nodeType == 3) {
			u = n.data.search(/https?\:\/\/[^\s]*[^.,;'">\s\)\]]/);
			if (u >= 0) {
				M = n.splitText(u);
				R = M.splitText(RegExp.lastMatch.length);
				A = document.createElement("A");
				A.href = M.data;
				A.appendChild(M);
				R.parentNode.insertBefore(A, R);
			}
		} else if (n.tagName != "STYLE" && n.tagName != "SCRIPT" && n.tagName != "A") for (c = 0; x = n.childNodes[c]; ++c) F(x);
	}
})();
