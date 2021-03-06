(function() {
	var count = 0,
		text, regexp;
	text = prompt("Search regexp:", "");
	if (text == null || text.length == 0) return;
	try {
		regexp = new RegExp("(" + text + ")", "i");
	} catch (er) {
		alert("Unable to create regular expression using text '" + text + "'.\n\n" + er);
		return;
	}

	function searchWithinNode(node, re) {
		var pos, skip, spannode, middlebit, endbit, middleclone;
		skip = 0;
		if (node.nodeType == 3) {
			pos = node.data.search(re);
			if (pos >= 0) {
				spannode = document.createElement("SPAN");
				spannode.style.backgroundColor = "yellow";
				middlebit = node.splitText(pos);
				endbit = middlebit.splitText(RegExp.$1.length);
				middleclone = middlebit.cloneNode(true);
				spannode.appendChild(middleclone);
				middlebit.parentNode.replaceChild(spannode, middlebit);
				++count;
				skip = 1;
			}
		} else if (node.nodeType == 1 && node.childNodes && node.tagName.toUpperCase() != "SCRIPT" && node.tagName.toUpperCase != "STYLE") {
			for (var child = 0; child < node.childNodes.length; ++child) {
				child = child + searchWithinNode(node.childNodes[child], re);
			}
		}
		return skip;
	}
	window.status = "Searching for " + regexp + "...";
	searchWithinNode(document.body, regexp);
	window.status = "Found " + count + " match" + (count == 1 ? "" : "es") + " for " + regexp + ".";
})();
