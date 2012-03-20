(function() {

	if (!Array.prototype.unique) Array.prototype.unique = function() {
		for (var i = 0; i < this.length; i++) for (x = i + 1; x < this.length; x++) while (this[i] == this[x]) this.splice(x, 1)
		return this;
	};

	function Element(config) {
		if (typeof config === "string") {
			var res = [],
				arr = document.querySelectorAll(config);
			if (arr.length == 0) return;
			for (var i = 0; i < arr.length; i++) {
				res.push(new Element(arr[i]));
			}
			return res;
		} else if (typeof config === "object") {
			if (config.toString() === "[object Object]") {
				this.element = document.createElement(config.tag);
				this.setAttributes(config);
			} else this.element = config;
		}
		return this;
	}

	Element.prototype = {

		destroy: function() {
			if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
		},

		insert: function(content) {
			if (typeof content == "string") this.element.innerHTML += content;
			else if (typeof content == "object") {
				if (content instanceof Element) {
					this.element.appendChild(content.element);
					return content;
				} else if (content.toString() === "[object Object]") {
					var d = new Element(content);
					this.element.appendChild(d.element);
					return d;
				} else {
					this.element.appendChild(content);
					return new Element(content);
				}
			}
		},

		setAttributes: function(attr) {
			for (var prop in attr) {
				if (prop == "tag") continue;
				else if (prop == "text") this.insert(attr[prop]);
				else if (prop == "children") {
					this.children = [];
					for (var i = 0; i < attr[prop].length; i++) {
						this.children.push(this.insert(attr[prop][i]));
					}
				} else this.element.setAttribute(prop, attr[prop]);
			}
			return this;
		},

		center: function(el) {
			var el = el || window;
			this.width(this.width());
			this.height(this.height());
			this.element.style.left = Math.round(((el.innerWidth || el.clientWidth) - this.width()) / 2) + "px";
			this.element.style.top = Math.round(((el.innerHeight || el.clientHeight) - this.height()) / 2) + "px";
		},

		height: function(v) {
			if (v) this.element.style.height = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
			return this.element.offsetHeight;
		},

		width: function(v) {
			if (v) this.element.style.width = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
			return this.element.offsetWidth;
		}
	};

	Element.Frame = function(content) {
		var id = 'frame-' + (new Date).getTime();
		this.El = new Element({
			tag: 'div',
			id: id,
			style: [
				'background:#000',
				'background:rgba(0,0,0,.8)',
				'bottom:0',
				'left:0',
				'position:fixed',
				'right:0',
				'top:0',
				'z-index:10000'
				].join(";"),
			children: [{
				tag: 'div',
				style: [
					'background:#222',
					'border:4px solid #eee',
					'border-radius:8px',
					'box-shadow:0 1px 2px rgba(0,0,0,.5)',
					'margin:0',
					'max-width:80%',
					'max-height:80%',
					'min-width:30px',
					'min-height:30px',
					'padding:0',
					'position:absolute'
					].join(";"),
				children: [{
					tag: 'iframe',
					id: id + '-frame',
					src: 'about:blank',
					style: [
						'border:0',
						'bottom:auto',
						'height:100%',
						'left:0',
						'margin:0',
						'padding:0',
						'position:absolute',
						'right:auto',
						'top:0',
						'width:100%'
						].join(";")
				}]
			}]
		});

		document.body.appendChild(this.El.element);

		var El = this.El,
			contentEl = El.children[0],
			frameEl = contentEl.children[0],
			frameDocument = frameEl.element.contentWindow.document;

		frameDocument.write();
		frameDocument.close();

		for (var prop in this.El) this[prop] = this.El[prop];
		this.element = frameDocument.body;

		this.center = function() {
			contentEl.center.apply(contentEl, arguments);
		};
		this.height = function() {
			contentEl.height.apply(contentEl, arguments);
		};
		this.width = function() {
			contentEl.width.apply(contentEl, arguments);
		};
		this.resize = function() {
			this.width((frameDocument.body.scrollWidth || frameDocument.body.offsetWidth || frameDocument.width) + 25);
			this.height((frameDocument.body.scrollHeight || frameDocument.body.offsetHeight || frameDocument.height));
		};

		// Close the frame when clicking on the background
		El.element.addEventListener("click", function(e) {
			if (e.target != El.element) return;
			El.destroy.apply(El);
		}, true);

		this.insert({
			tag: 'style',
			type: 'text/css',
			text: 'html,body{padding:0;margin:0}body{color:#fff;display:inline-block;font:13px sans-serif;padding:8px;overflow:auto}ol,li{list-style:none;margin:0;padding:0;white-space:pre}a{color:#6cf;text-decoration:none;}a:visited{color:#ba66ff;}.e a{color:#ff6669}hr{height:2px;border:0;background:#444}</style>'
		});

		if (content) {
			this.insert(content);
			this.resize();
		}

		this.center();
		return this;
	}

	var links = [],
		patterns = [
			new RegExp(/((?:http|https|ftp)\:\/\/[^'"\?\&]*\.(?:aac|ac3|asf|avi|flac|flv|m2v|m4a|m4v|mid|midi|mkv|mov|mp3|mp4|mp4v|mpeg|mpg|ogg|ogm|qt|ra|rmvb|wav|wma|wmv)(\?[^\s'"]*)?(?=(?:[^a-zA-Z0-9\-\_]|$)))+/gi),
			// new RegExp(/(?:<param[^>]*?)((?:(?:http|https|ftp)\:\/\/[^'"\?\&]*\.(?:[a-z]+)(?:\?[^\s'"]*)?(?=[^a-zA-Z0-9\-\_]|$)))/gi)
			];

	function addFrameContents(f) {
		var f = f || window;
		try {
			scanText(f.document.documentElement.innerHTML);
			// scanText(decodeURIComponent(f.document.documentElement.innerHTML));
			scanText(unescape(f.document.documentElement.innerHTML));
		} catch (err) {
			return;
		}

		// find iframes
		var frames = f.document.getElementsByTagName('iframe');
		if (frames.length > 0) for (var i = 0; i < frames.length; i++) {
			arguments.callee.apply(this, [frames[i].contentWindow]);
		}

		// find actual frames
		var frames = f.frames;
		if (f.length > 0) for (var i = 0; i < f.length; i++) {
			arguments.callee.apply(this, [frames[i]]);
		}
	}

	function scanText(text) {
		var i, x, pl = patterns.length;
		for (i = 0; i < pl; i++) {
			var match = text.match(patterns[i]);
			if (match && match.length > 0) {
				for (x = 0; x < match.length; x++) {
					links.push(match[x]);
				}
			}
		}
	}

	function makeResultList(links, attribs) {
		var l, i, html = '';
		for (i = 0; i < links.length; i++) {
			l = links[i];
			if (toString.call(l) !== "[object Array]") l = [l, l]
			html += '<li><a href="' + l[1] + '" target="_blank">' + l[0] + '</a></li>';
		}
		return '<ol ' + (attribs || '') + '>' + html + '</ol>';
	}

	addFrameContents();
	links = links.unique();

	var html = '';
	if (links.length > 0) {
		html += makeResultList(links);
		html += '<hr>';
	}
	html += makeResultList([[
		'Keep Tube',
		'http://keep-tube.com/?url=' + location.href
		], [
		'KeepVid',
		'http://keepvid.com/?url=' + location.href
		], [
		'SaveFrom.net',
		'http://savefrom.net/' + location.href
		], [
		'WebVideoFetcher.com',
		'http://webvideofetcher.com/?url=' + location.href
		]], 'class="e"');

	return new Element.Frame(html);
})();
