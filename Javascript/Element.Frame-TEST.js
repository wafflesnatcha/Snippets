(function() {

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

		empty: function() {
			while (this.element.hasChildNodes()) this.element.removeChild(this.element.firstChild);
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

		offset: function() {
			var el = this.element,
				offset = {
					left: 0,
					top: 0
				};
			if (el.offsetParent) {
				while (1) {
					offset.left += el.offsetLeft;
					offset.top += el.offsetTop;
					if (!el.offsetParent) break;
					el = el.offsetParent;
				}
			} else if (el.x && el.y) {
				offset.left += el.x;
				offset.top += el.y;
			} else return null;
			return offset;
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

	Element.Frame = function (content) {
		var id = 'frame-' + (new Date).getTime();
		this.El = new Element({
			tag: 'div',
			id: id,
			style: ['background:#000', 'background:rgba(0,0,0,.8)', 'bottom:0', 'left:0', 'position:fixed', 'right:0', 'top:0', 'z-index:10000'].join(";"),
			children: [{
				tag: 'div',
				style: ['padding:10px 20px', 'margin:0', 'position:absolute', 'background:#222', 'background:rgba(34,34,34,.95)', 'border-radius:10px', 'border:4px solid #eee', 'box-shadow:inset 0 0 2px #111, 0 1px 2px rgba(0,0,0,.5)', 'min-width:50px', 'min-height:50px', 'max-width:80%', 'max-height:80%'].join(";"),
				children: [{
					tag: 'iframe',
					id: id + '-frame',
					src: 'about:blank',
					style: ['position:absolute', 'left:0', 'top:0', 'right:auto', 'bottom:auto', 'width:100%', 'height:100%', 'border:0', 'margin:0', 'padding:0', 'background:transparent', 'z-index:1'].join(";")
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

		this.center = function () {
			contentEl.center.apply(contentEl, arguments);
		};
		this.height = function () {
			contentEl.height.apply(contentEl, arguments);
		};
		this.width = function () {
			contentEl.width.apply(contentEl, arguments);
		};

		// Close Button
		var close_button = contentEl.insert({
			tag: 'a',
			id: id + '-close',
			href: 'javascript:void(0)',
			text: 'X',
			title: 'Close',
			style: ['background:#d1d1d1', 'border:2px solid #eee', 'border-radius:50%', 'box-shadow:inset 0 0 1px rgba(0,0,0,.5), 0 1px 2px rgba(0,0,0,.5)', 'color:#555', 'font:bold 12px/22px Verdana,sans-serif', 'height:22px', 'margin:0', 'padding:0', 'opacity:1', 'position:absolute', 'top:-14px', 'left:-14px', 'text-align:center', 'text-decoration:none', 'width:22px', 'z-index:1000'].join(";")
		});
		close_button.element.addEventListener("click", function () {
			El.remove.apply(El);
		}, true);

		// Close the frame when clicking on the background
		El.element.addEventListener("click", function (e) {
			if (e.target != El.element) return;
			El.remove.apply(El);
		}, true);

		// CSS Reset
		this.insert('<style type="text/css">body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;}table{border-collapse:collapse;border-spacing:0;}fieldset,img{border:0;}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal;}li{list-style:none;}caption,th{text-align:left;}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}q:before,q:after{content:"";}abbr,acronym{border:0;font-variant:normal;}sup{vertical-align:text-top;}sub{vertical-align:text-bottom;}input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit;}input,textarea,select{*font-size:100%;}legend{color:#000;}a{color:#6cf;text-decoration:none;}a:hover{text-decoration:underline;}</style>');
		this.insert('<style type="text/css">html,body{background:transparent}body{color:#fff;font:13px sans-serif;padding:10px 20px;overflow:auto}</style>');

		if (content) {
			this.insert(content);
			this.width(frameDocument.width || frameDocument.body.scrollWidth);
			this.height(frameDocument.height || frameDocument.body.offsetHeight);
		}

		// Center frame after window resizes
		window.addEventListener("resize", function (e) {
			contentEl.center();
		}, false);

		this.center();
		return this;
	}

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
	


	/**
	 * Test cases
	 */
	var test_data = 'Duis tortor lacus, porttitor non ultrices nec, euismod eu nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac lacus quis urna accumsan faucibus eget at odio. Sed laoreet massa et dolor facilisis sed auctor nibh ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec aliquet consectetur odio non tristique. Aenean nisl tortor, imperdiet at consequat sit amet, porttitor sit amet magna. Integer fringilla, elit quis tincidunt dapibus, nulla magna faucibus nisi, vitae euismod sem mauris ac ante. Donec pharetra nisl eget metus sollicitudin sodales. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed commodo blandit turpis eu interdum. Pellentesque vestibulum fringilla mi sit amet sodales. Nunc dignissim ante eget urna ultricies venenatis. Etiam in rutrum est.';
	test_data+= '<br><br>Testing... <a href="http://www.google.com">google.com</a><br><a href="#">http://www.awwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww-wwwwwwwwwwwwwwwwwshiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiitttttttttt.com/this/is/a/really/lo-ng/url/that/will/probably/fuck/up/the/sizing.html</a>';

	// window.W = new Win();
	// W.insert(test_data);
	// console.log(W);
	window.F = new Element.Frame(test_data);
	console.log(F);

	// window.I = new FrameInline(test_data);
	// console.log(I);
})()
