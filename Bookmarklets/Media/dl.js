/**
 * Bookmarklet to find media files in the current page.
 * 
 * Search entire page source for anything that might be a media file. Including
 * links, embedded plugins, and even the plain text.
 * 
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 * @link http://wafflesnatcha.github.com
 * @version r2 2012-05-29
 */

(function () {

	if (!Array.prototype.unique) {
		Array.prototype.unique = function () {
			var i, x, l = this.length;
			for (i = 0; i < this.length; i++) {
				for (x = i + 1; x < this.length; x++) {
					while (this[i] == this[x]) this.splice(x, 1);
				}
			}
			return this;
		};
	}

	function Element(config) {
		this.init.apply(this, arguments);
	}

	Element.prototype = {
		init: function (config) {
			if (typeof config === "string") {
				var res = [],
					arr = document.querySelectorAll(config);
				if (arr.length == 0) return undefined;
				for (var i = 0; i < arr.length; i++) {
					res.push(new Element(arr[i]));
				}
				return (res.length == 1) ? res[0] : res;
			} else if (typeof config === "object") {
				if (config.toString() === "[object Object]") {
					this.element = document.createElement(config.tag);
					this.setAttributes(config);
				} else this.element = config;
			}
			return this;
		},

		destroy: function () {
			if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
		},

		insert: function (content) {
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

		setAttributes: function (attr) {
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

		center: function (el) {
			var el = el || window;
			this.width(this.width());
			this.height(this.height());
			this.element.style.left = Math.round(((el.innerWidth || el.clientWidth) - this.width()) / 2) + "px";
			this.element.style.top = Math.round(((el.innerHeight || el.clientHeight) - this.height()) / 2) + "px";
		},

		height: function (v) {
			if (v) this.element.style.height = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
			return this.element.offsetHeight;
		},

		width: function (v) {
			if (v) this.element.style.width = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
			return this.element.offsetWidth;
		}
	};

	Element.Frame = function (content) {
		var id = 'frame-' + (new Date).getTime();
		this.element_mask = new Element({
			tag: 'div',
			id: id,
			style: ['background: #000', 'background: rgba(0,0,0,.8)', 'bottom: 0', 'left: 0', 'min-height: 150px', 'position: fixed', 'right: 0', 'top: 0', 'z-index: 999999'].join('!important;') + '!important;',
			children: [{
				tag: 'div',
				style: ['background: #222', 'border: 4px solid #eee', 'border-radius: 8px', 'box-shadow: 0 1px 2px rgba(0,0,0,.5)', 'margin: 0', 'max-width: 90%', 'max-height: 90%', 'min-width: 80px', 'min-height: 80px', 'padding: 0', 'position: absolute'].join('!important;') + '!important;',
				children: [{
					tag: 'iframe',
					id: id + '-frame',
					src: 'about:blank',
					style: ['background: transparent', 'border: 0', 'bottom: auto', 'height: 100%', 'left: 0', 'margin: 0', 'padding: 0', 'position: absolute', 'right: auto', 'top: 0', 'width: 100%'].join('!important;') + '!important;'
				}]
			}]
		});

		document.body.appendChild(this.element_mask.element);

		var element_mask = this.element_mask,
			element_content = element_mask.children[0],
			frame_document = element_content.children[0].element.contentWindow.document;

		frame_document.write();
		frame_document.close();

		for (var prop in this.element_mask) {
			this[prop] = this.element_mask[prop];
		}
		this.element = frame_document.body;

		// Function overrides
		this.center = function () {
			this.width(this.width());
			this.height(this.height());
			element_content.element.style.left = Math.round((element_mask.width() - element_content.width()) / 2) + "px";
			element_content.element.style.top = Math.round((element_mask.height() - element_content.height()) / 2) + "px";
		};
		this.destroy = function () {
			element_mask.destroy();
		};
		this.height = function (v) {
			if (v) element_content.height.apply(element_content, arguments);
			return this.element.offsetHeight;
		};
		this.width = function (v) {
			if (v) element_content.width.apply(element_content, arguments);
			return this.element.offsetWidth;
		};
		this.resize = function () {
			this.width((frame_document.body.offsetWidth || frame_document.body.scrollWidth || frame_document.width));
			this.height((frame_document.body.offsetHeight || frame_document.body.scrollHeight || frame_document.height));
		};

		// Close the frame when clicking on the modal background
		element_mask.element.addEventListener("click", function (e) {
			if (e.target != element_mask.element) return;
			element_mask.destroy();
		}, true);

		// Frame body styles
		frame_document.head.appendChild(new Element({
			tag: 'style',
			type: 'text/css',
			text: [
				'html,body{background:transparent;padding:0;margin:0;}',
				'body{color:#fff;display:inline-block;font:message-box;overflow:auto;padding:8px}',
				'ol,li{list-style:none;margin:0;padding:0;white-space:pre}',
				'a{color:#6cf;text-decoration:none}',
				'a:hover{text-decoration:underline}',
				'a:visited{color:#ba66ff}',
				'hr{height:2px;border:0;background:#444}'
				].join('\n')
		}).element)

		if (content) {
			this.insert(content);
			this.resize();
		}

		var me = this;
		window.addEventListener("resize", function (e) {
			me.center();
		}, false);

		this.center();
		return this;
	}



	var links = [];
	var patterns = [
		/((?:http|https|ftp)\:\/\/[^'"\?\&]*\.(?:aac|ac3|asf|avi|flac|flv|m2v|m4a|m4v|mid|midi|mkv|mov|mp3|mp4|mp4v|mpeg|mpg|ogg|ogm|qt|ra|rmvb|wav|wma|wmv)(?:\?(?:(?!&amp;)[^\s'"])*)?(?=[^a-z0-9\-\_]|$))+/gi
		];
	// // /(?:<param[^>]*?)((?:(?:http|https|ftp)\:\/\/[^'"\?\&]*\.(?:[a-z]+)(?:\?[^\s'"]*)?(?=[^a-zA-Z0-9\-\_]|$)))/gi,
	function addFrameContents(f) {
		try {
			scanText(f.document.documentElement.innerHTML);
			scanText(unescape(f.document.documentElement.innerHTML));
		} catch (err) {
			return;
		}

		// find frames
		var frames = Array.prototype.slice.call(f.frames);
		while (frames.length) {
			try {
				arguments.callee.call(this, frames.shift());
			} catch (err) {}
		}

		// find iframes
		var frames = Array.prototype.slice.call(f.document.getElementsByTagName('iframe'));
		while (frames.length) {
			try {
				arguments.callee.call(this, frames.shift().contentWindo);
			} catch (err) {}
		}
	}

	function scanText(text) {
		var i, x, match, pl = patterns.length;
		for (i = 0; i < pl; i++) {
			match = text.match(patterns[i]);
			if (match) for (x = 0; x < match.length; x++) {
				links.push(match[x]);
			}
		}
	}

	function makeResultList(links, attribs) {
		var l, i, len = links.length,
			html = '';
		for (i = 0; i < len; i++) {
			l = links[i];
			if (typeof l === "string") l = [l, l];
			html += '<li><a href="' + (l[1] || l[0]) + '" target="_blank"' + (l[2] || '') + '>' + l[0] + '</a></li>';
		}
		return '<ol ' + (attribs || '') + '>' + html + '</ol>';
	}

	addFrameContents(window);
	links = links.unique();

	var html = '';
	if (links.length > 0) html += makeResultList(links) + '<hr>';

	// Third party video download links
	var extra = 'style="color:#ff6669"';
	html += makeResultList([
		['Keep Tube', 'http://keep-tube.com/?url=' + location.href, extra],
		['SaveFrom.net', 'http://savefrom.net/' + location.href, extra],
		['KeepVid', 'http://keepvid.com/?url=' + location.href, extra],
		['WebVideoFetcher.com', 'http://webvideofetcher.com/d?url=' + location.href, extra]
		]);

	return new Element.Frame(html);
})();