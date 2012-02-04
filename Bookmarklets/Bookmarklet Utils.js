(function() {

	function Element(config) {
		if (typeof config === "string") {
			var res = [],
				arr = document.querySelectorAll(config);
			for (var i = 0; i < arr.length; i++) {
				res.push(new Element(arr[i]));
			}
			return (res.length == 1) ? res[0] : res;
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
		setAttributes: function(attr) {
			for (var prop in attr) {
				if (prop == "tag") continue;
				else if (prop == "text") this.insert(attr[prop]);
				else if (prop == "children") {
					this.children = [];
					for (var i = 0; i < attr[prop].length; i++) {
						var e = this.insert(attr[prop][i]);
						this.children.push(e);
					}
				} else this.element.setAttribute(prop, attr[prop]);
			}
			return this;
		},

		insert: function(content) {
			if (typeof content == "string") {
				this.element.innerHTML += content;
			} else if (typeof content == "object") {
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

		center: function(relative) {
			var relative = relative || window,
				relw = relative.innerWidth || relative.clientWidth
				relh = relative.innerHeight || relative.clientHeight
				this.element.style.left = Math.round((relw - this.element.clientWidth) / 2) + "px";
			this.element.style.top = Math.round((relh - this.element.clientHeight) / 2) + "px";
		},

		empty: function() {
			while (this.element.hasChildNodes()) this.element.removeChild(this.element.firstChild);
		},

		remove: function() {
			if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
		}
	};

	function Win(url) {
		if (url) return window.open(url);
		var w = window.open().document;
		w.write();
		w.close();
		this.element = w.body;
		return this;
	}
	Win.prototype.insert = Element.prototype.insert;

	function FrameInline(content) {
		var id = "frame-" + (new Date).getTime();

		this.El = new Element({
			tag: "div",
			id: id,
			children: [{
				tag: "style",
				type: "text/css",
				text: "#" + id + "{background:#000;background:rgba(0,0,0,.75);bottom:0;left:0;position:fixed;right:0;top:0;z-index:10000;}#" + id + "-content{background:#222;border-radius:6px;border:4px solid #eee;box-shadow:0 1px 2px rgba(0,0,0,.5);color:#fff;font:14px sans-serif;padding:8px 12px;position:fixed;}#" + id + "-content a{color:#6CF;}"
			}, {
				tag: "div",
				id: id + "-content"
			}]
		});

		document.body.appendChild(this.El.element);
		this.El = this.El.children[1];
		for (var prop in this.El) this[prop] = this.El[prop];
		if (content) this.insert(content);
		this.center();
		return this;
	}

	function Frame(content) {
		var id = 'frame-' + (new Date).getTime();
		this.El = new Element({
			tag: 'div',
			id: id,
			style: 'background:#000;background:rgba(0,0,0,.75);bottom:0;left:0;position:fixed;right:0;top:0;z-index:10000;',
			children: [{
				tag: 'div',
				style: 'padding:10px;margin:0;position:absolute;background:#222;background:rgba(34,34,34,.95);border-radius:10px;border:4px solid #eee;box-shadow:inset 0 0 2px #111, 0 1px 2px 0 rgba(0,0,0,.5);margin:0;min-width:50%;min-height:150px;',
				children: [{
					tag: 'iframe',
					id: id + '-frame',
					style: 'position:absolute;left:0;top:0;right:auto;bottom:auto;width:100%;height:100%;border:0;margin:0;padding:0;background:transparent;z-index:1;'
				}]
			}]
		});

		document.body.appendChild(this.El.element);

		var El = this.El,
			contentEl = El.children[0],
			frameEl = contentEl.children[0];

		var frameDocument = frameEl.element.contentWindow.document;
		frameDocument.write();
		frameDocument.close();

		for (var prop in this.El) this[prop] = this.El[prop];
		this.element = frameDocument.body;
		this.center = function() {
			contentEl.center.apply(contentEl, arguments);
		};

		var close_button = contentEl.insert({
			tag: 'a',
			id: id + '-close',
			href: 'javascript:void(0)',
			text: 'X',
			title: 'Close',
			style: ['background: #333', 'border: 3px solid #6a6a6a', 'border-radius: 50%', 'bottom: -14px', 'box-shadow: 0 -12px 14px -10px #1f1f1f inset, 0 0 2px #333', 'color: #ddd', 'font: bold 12px/22px Verdana,sans-serif', 'height: 24px', 'margin: 0', 'padding: 0', 'opacity: 1', 'position: absolute', 'right: -14px', 'text-align: center', 'text-decoration: none', 'text-shadow: 0 -1px 0 #000', 'width: 24px', 'z-index: 1000', ].join(";")
		});
		close_button.element.addEventListener("click", function() {
			console.log("close_button.element.click", this, arguments);
			El.remove.apply(El);
		}, true);

		// Close the frame when clicking on the background
		// El.element.addEventListener("click", function(e) { if (e.target != El.element) return; El.remove.apply(El); }, true);
		this.insert('<style type="text/css">html,body{background:transparent;margin:0;padding:0;}body{color:#fff;font:13px sans-serif;}a{color:#6cf;text-decoration:none;}a:hover{text-decoration:underline;}</style>');
		if (content) this.insert(content);
		this.center();
		return this;
	}


	/**
	 * Test cases
	 */

	var test_data = 'Testing... <a href="http://www.google.com">google.com</a><br><a href="">http://www.awwwwwwwwshiiiiiiiiitttttttttt.com/this/is/a/really/long/url/that/will/probably/fuck/up/the/sizing.html</a>';

	// window.W = new Win();
	// W.insert(test_data);
	// console.log(W);
	window.F = new Frame(test_data);
	console.log(F);

	// window.I = new FrameInline(test_data);
	// console.log(I);
})()
