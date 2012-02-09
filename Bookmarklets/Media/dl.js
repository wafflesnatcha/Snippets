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
			this.config = config;
			if (config.toString() === "[object Object]") {
				this.element = document.createElement(config.tag);
				this.setAttributes(config);
			} else {
				this.element = config;
			}
		}
		return this;
	}

	Element.prototype = {

		center: function(el) {
			var el = el || window,
				w = el.innerWidth || el.clientWidth,
				h = el.innerHeight || el.clientHeight;
			this.element.style.left = Math.round((w - this.width()) / 2) + "px";
			this.element.style.top = Math.round((h - this.height()) / 2) + "px";
		},

		height: function(v) {
			if (v >= 0) this.element.style.height = v + "px";
			return this.element.offsetHeight;
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

		remove: function() {
			if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
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

		width: function(v) {
			if (v >= 0) this.element.style.width = v + "px";
			return this.element.offsetWidth;
		}

	};

	Element.Frame = function(content) {
		var id = 'frame-' + (new Date).getTime();
		this.El = new Element({
			tag: 'div',
			id: id,
			style: ['background:#000', 'background:rgba(0,0,0,.8)', 'bottom:0', 'left:0', 'position:fixed', 'right:0', 'top:0', 'z-index:10000'].join(";"),
			children: [{
				tag: 'div',
				style: ['padding:10px 20px', 'margin:0', 'position:absolute', 'background:#222', 'border-radius:10px', 'border:4px solid #eee', 'box-shadow:0 1px 2px rgba(0,0,0,.5)', 'min-width:50px', 'min-height:50px', 'max-width:80%', 'max-height:80%'].join(";"),
				children: [{
					tag: 'iframe',
					id: id + '-frame',
					src: 'about:blank',
					style: ['position:absolute', 'left:0', 'top:0', 'right:auto', 'bottom:auto', 'width:100%', 'height:100%', 'border:0', 'margin:0', 'padding:0', 'border-radius:10px', 'background:#222', 'z-index:1'].join(";")
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
			this.width(frameDocument.width || frameDocument.body.scrollWidth);
			this.height(frameDocument.height || frameDocument.body.offsetHeight);
		};

		// Close the frame when clicking on the background
		El.element.addEventListener("click", function(e) {
			if (e.target != El.element) return;
			El.remove.apply(El);
		}, true);

		// CSS Reset
		this.insert('<style type="text/css">body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;}table{border-collapse:collapse;border-spacing:0;}fieldset,img{border:0;}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal;}li{list-style:none;}caption,th{text-align:left;}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}q:before,q:after{content:"";}abbr,acronym{border:0;font-variant:normal;}sup{vertical-align:text-top;}sub{vertical-align:text-bottom;}input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit;}input,textarea,select{*font-size:100%;}legend{color:#000;}a{color:#6cf;text-decoration:none;}a:hover{text-decoration:underline;}</style>');
		this.insert('<style type="text/css">body{color:#fff;font:13px sans-serif;padding:10px 20px;overflow:auto}</style>');

		if (content) {
			this.insert(content);
			this.resize();
		}

		this.center();
		return this;
	}

	var links = [],
		re = new RegExp(/((?:http|https|ftp)\:\/\/[^'"\?\&]*\.(?:aac|ac3|asf|avi|flac|flv|m2v|m4a|m4v|mid|midi|mkv|mov|mp3|mp4|mp4v|mpeg|mpg|ogg|ogm|qt|ra|rmvb|wav|wma|wmv)(\?[^\s'"]*)?(?=(?:[^a-zA-Z0-9\-\_]|$)))+/gi);

	function addFrameContents(f) {
		var f = f || window;
		try {
			scanText(f.document.documentElement.innerHTML);
			scanText(decodeURIComponent(f.document.documentElement.innerHTML));
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
		var matches = text.match(re);
		if (matches && matches.length > 0) links = links.concat(matches)
	}

	function makeResultList(links) {
		var l, i, html = '';
		for (i = 0; i < links.length; i++) {
			l = links[i];
			if (toString.call(l) !== "[object Array]") l = [l, l]
			html += '<li><a href="' + l[1] + '" target="_blank">' + l[0] + '</a></li>';
		}
		return '<ol style="white-space:pre">' + html + '</ol>';
	}

	addFrameContents();
	links = links.unique();

	var html = '';
	if (links.length > 0) {
		html += makeResultList(links);
		html += '<hr style="height:2px;border:0;background:#444">';
	}
	html += makeResultList([
		["Keep Tube", "http://keep-tube.com/?url=" + location.href],
		["KeepVid", "http://keepvid.com/?url=" + location.href],
		["SaveFrom.net", "http://savefrom.net/" + location.href],
		["WebVideoFetcher.com", "http://webvideofetcher.com/?url=" + location.href],
	]);

	return new Element.Frame(html);

})();
