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

	if (!String.prototype.template) {
		String.prototype.template = function (data) {
			var prop, result = this;
			data = data || {};
			for (prop in data) {
				if (data.hasOwnProperty(prop)) {
					result = result.replace('{{' + prop + '}}', data[prop]);
				}
			}
			return result.replace(/\{\{.+?\}\}/ig, '');
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
			if (v) {
				this.element.style.height = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
			}
			return this.element.offsetHeight;
		},

		width: function (v) {
			if (v) {
				this.element.style.width = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
			}
			return this.element.offsetWidth;
		}
	};

	/**
	 * A modal window using Element.js
	 * 
	 * Example usage:
	 * <code>
	 * var el = new Element.Frame('<p>some text <b>bold text</b></p>')
	 * </code>
	 * 
	 * @requires Element.js
	 * @author Scott Buchanan <buchanan.sc@gmail.com>
	 * @link http://wafflesnatcha.github.com
	 * @version r3 2012-06-11
	 */

	Element.Frame = function (content) {
		var id = 'frame-' + (new Date).getTime();
		this.element_mask = new Element({
			tag: 'div',
			id: id,
			style: [
				'background: #000',
				'background: rgba(0,0,0,.8)',
				'border: 0',
				'bottom: 0',
				'display: block',
				'float: none',
				'height: auto',
				'left: 0',
				'margin: 0',
				'max-height: none',
				'max-width: none',
				'min-height: 150px',
				'min-width: 0',
				'padding: 0',
				'position: fixed',
				'right: 0',
				'top: 0',
				'visibility: visible',
				'width: auto',
				'z-index: 999999'
				].join(' !important;') + ' !important;',
			children: [{
				tag: 'div',
				style: ([
					'border-radius: 8px',
					'box-shadow: 0 1px 2px rgba(0,0,0,.5)',
					'background: #222',
					'border: 4px solid #eee',
					'display: block',
					'float: none',
					'margin: 0',
					'max-height: 90%',
					'max-width: 90%',
					'min-height: 80px',
					'min-width: 80px',
					'padding: 0',
					'position: absolute',
					'visibility: visible',
					'z-index: 1'
					].join(' !important; ') + ' !important;').replace(/\s*(box-shadow:([^;]+))/ig, '-moz-$1 -webkit-$1 $1').replace(/\s*(border-radius:([^;]+);)/ig, '-o-$1 -ms-$1 -moz-$1 -webkit-$1 $1'),
				children: [{
					tag: 'iframe',
					id: id + '-frame',
					src: 'about:blank',
					style: ([
						'border-radius: 8px',
						'background: transparent',
						'border: 0',
						'bottom: auto',
						'display: block',
						'float: none',
						'height: 100%',
						'left: 0',
						'margin: 0',
						'max-height: none',
						'max-width: none',
						'min-height: 0',
						'min-width: 0',
						'padding: 0',
						'position: absolute',
						'right: auto',
						'top: 0',
						'visibility: visible',
						'width: 100%',
						'z-index: 1'
						].join('!important;') + '!important;').replace(/\s*(box-shadow:([^;]+))/ig, '-moz-$1 -webkit-$1 $1').replace(/\s*(border-radius:([^;]+);)/ig, '-o-$1 -ms-$1 -moz-$1 -webkit-$1 $1'),
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
			if (v) {
				element_content.height.apply(element_content, arguments);
			}
			return this.element.offsetHeight;
		};
		this.width = function (v) {
			if (v) {
				element_content.width.apply(element_content, arguments);
			}
			return this.element.offsetWidth;
		};
		this.resize = function () {
			this.width((frame_document.body.offsetWidth || frame_document.body.scrollWidth || frame_document.width));
			this.height((frame_document.body.offsetHeight || frame_document.body.scrollHeight || frame_document.height));
		};

		// Close the frame when clicking on the modal background
		element_mask.element.addEventListener("click", function (e) {
			if (e.target == element_mask.element) {
				element_mask.destroy();
			}
		}, true);

		// Frame body styles
		frame_document.getElementsByTagName('head')[0].appendChild(new Element({
			tag: 'style',
			type: 'text/css',
			text: [
				'html,body{background:transparent;padding:0;margin:0;}',
				'body{color:#fff;display:inline-block;font:message-box;overflow:auto;padding:8px}',
				'a{color:#6cf;text-decoration:none;white-space:pre}',
				'a:hover{text-decoration:underline}',
				'a:visited{color:#ba66ff}',
				'hr{height:2px;border:0;background:#444}'
				].join('\n')
		}).element);

		if (content) {
			this.insert(content);
			this.resize();
		}

		// Center frame after window resizes
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

	function makeResultList(links) {
		var item, i, len = links.length,
			html = '';
		for (i = 0; i < len; i++) {
			item = links[i];
			if (typeof item === "string") {
				item = {
					url: links[i]
				};
			} else if (Object.prototype.toString.call(item) === "[object Array]") {
				item = {
					name: item[0],
					url: item.length > 1 ? item[1] : item[0],
					style: item.length > 2 ? item[2] : ''
				};
				console.log(item);
			}
			item['href'] = document.location.href;
			item['target'] = item['target'] || '_blank';
			item['name'] = item['name'] || item['url'];

			html += '<li><a href="{{url}}" target="{{target}}" style="{{style}}">{{name}}</a></li>'.template(item);
		}
		return '<ol style="list-style:none;padding:0;margin:0">' + html + '</ol>';
	}

	addFrameContents(window);
	links = links.unique();

	var html = '';
	if (links.length > 0) {
		html += makeResultList(links) + '<hr>';
	}

	// Third party video download links
	var style = 'color:#ff6669;background:url(\'{{icon}}\') left center no-repeat;padding:0 0 0 20px';
	html += makeResultList([
		{
		name: 'Keep Tube',
		url: 'http://keep-tube.com/?url={{href}}',
		style: style,
		icon: 'http://keep-tube.com/images/keep-tube.ico'
	}, {
		name: 'KeepVid',
		url: 'http://keepvid.com/?url={{href}}',
		style: style,
		icon: 'http://keepvid.com/favicon.ico'
	}, {
		name: 'SaveFrom.net',
		url: 'http://savefrom.net/{{href}}',
		style: style,
		icon: 'http://savefrom.net/favicon.ico'
	}, {
		name: 'WebVideoFetcher.com',
		url: 'http://webvideofetcher.com/d?url={{href}}',
		style: style,
		icon: 'http://webvideofetcher.com/favicon.ico'
	}]);

	return new Element.Frame(html);
})();