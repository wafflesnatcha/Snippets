(function() {
	if (!Array.prototype.unique) Array.prototype.unique = function() {
		for (var y = 0; y < this.length; ++y) {
			var ty = this[y];
			for (var z = (y + 1); z < this.length; ++z)
				while (ty == this[z]) 
					this.splice(z, 1)
		}
		return this;
	}

	var W;
	function Write(n) {
		if (!W) {
			W = window.open().document;
			W.write();
			W.close();
		}
		if (typeof n == "string") W.body.innerHTML += n;
		else if (typeof n == "object") W.body.appendChild(n);
	}

	var links = [];
	function addMatches(pattern, source) {
		var matches = source.match(R);
		if (matches) links = links.concat(matches);
	}
	
	// Find video urls in document.body
	var expression = new RegExp(/((?:http|https|ftp)\:\/\/[^'"\?\&]*\.(?:aac|ac3|asf|avi|flac|flv|m2v|m4a|m4v|mid|midi|mkv|mov|mp3|mp4|mp4v|mpeg|mpg|ogg|ogm|qt|ra|rmvb|wav|wmv)(\?[^\s'"]*)?(?=(?:[^a-zA-Z0-9\-\_]|$)))+/gi);
	addMatches(expression, document.body.innerHTML);

	// Do it again but with a URL decoded document.body
	try {
		var m = decodeURIComponent(document.body.innerHTML).match(R);
		if (m) links = links.concat(m);
	} catch (e) {}

	// Remove duplicates
	for (var y = 0; y < this.length; ++y) {
		var ty = this[y];
		for (var z = (y + 1); z < this.length; ++z)
			while (ty == this[z]) 
				this.splice(z, 1)
	}

	if (!links || links.length < 1) {
		if (document.location.href.match(/http:\/\/[a-zA-Z\.]*youtube\.com\/watch/)) {
			window.open("http://savefrom.net/" + location.href);
		}
	} else if (links.length > 1) {
		var html = "";
		for (var i = 0; i < links.length; i++) {
			html += '<li><a href="' + links[i] + '">' + links[i] + '</a></li>';
		}
		Write('<ol>' + html + '</ol>');
	} else {
		window.open(links[0]);
	}

})();
