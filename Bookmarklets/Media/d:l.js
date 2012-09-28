/**
 * Find media files in the current page.
 *
 * Search entire page source for anything that might be a media file. Including
 * links, embedded plugins, and even the plain text.
 *
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 * @link http://wafflesnatcha.github.com
 * @version r2 2012-05-29
 */
/*jshint browser:true, nonstandard:true*/ (function () {
	if (typeof window.__DL_BOOKMARKLET !== "undefined" && window.__DL_BOOKMARKLET.destroy) {
		window.__DL_BOOKMARKLET.destroy();
		return false;
	}

	String.prototype._template = function (data) {
		var prop, result = this;
		data = data || {};
		for (prop in data) {
			if (data.hasOwnProperty(prop)) {
				result = result.replace(new RegExp('\\$\\{' + prop + '\\}', 'gi'), data[prop]);
			}
		}
		return result.replace(/\$\{[^\s\{\}\$]+?\}/ig, '');
	};

	function Element() {
		this.init.apply(this, arguments);
	}

	Element.prototype = {
		init: function (config) {
			if (typeof config === "string") {
				var res = [],
					arr = document.querySelectorAll(config);
				if (arr.length === 0) {
					return undefined;
				}
				while (arr.length) {
					res.push(new Element(arr.pop()));
				}
				return (res.length == 1) ? res[0] : res;
			} else if (typeof config === "object") {
				if (config.toString() === "[object Object]") {
					this.element = document.createElement(config.tag);
					this.attr(config);
				} else {
					this.element = config;
				}
			}
			return this;
		},

		destroy: function () {
			this.empty();
			if (this.element.parentNode) {
				this.element.parentNode.removeChild(this.element);
			}
			if (this.ondestroy && typeof this.ondestroy === "function") {
				this.ondestroy.call(this);
			}
		},

		empty: function () {
			while (this.element.firstChild) {
				this.element.removeChild(this.element.firstChild);
			}
		},

		insert: function (content) {
			if (typeof content === "string") {
				this.element.innerHTML += content;
				return this;
			} else if (typeof content === "object") {
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
			return undefined;
		},

		appendTo: function (parent) {
			if (typeof parent !== "object" || !(parent instanceof Element)) {
				parent = new Element(parent);
			}
			return parent.insert(this);
		},

		attr: function (attr, val) {
			var i, prop;
			if (typeof attr === "string") {
				if (!val) {
					var l = this.element.attributes.length;
					for (i = 0; i < l; i++) {
						if (this.element.attributes[i].name == attr) {
							return this.element.attributes[i].value;
						}
					}
					return undefined;

				} else {
					attr = {
						attr: val
					};
				}
			}

			for (prop in attr) {
				if (prop == "text") {
					this.insert(attr[prop]);
				} else if (prop == "children") {
					this.children = [];
					for (i = 0; i < attr[prop].length; i++) {
						this.children.push(this.insert(attr[prop][i]));
					}
				} else if (prop != "tag") {
					if (attr.hasOwnProperty(prop)) {
						this.element.setAttribute(prop, attr[prop]);
					}
				}
			}

			return this;
		},

		center: function (el) {
			el = el || window;
			this.width(this.width());
			this.height(this.height());
			this.element.style.left = Math.round(((el.innerWidth || el.clientWidth) - this.width()) / 2) + "px";
			this.element.style.top = Math.round(((el.innerHeight || el.clientHeight) - this.height()) / 2) + "px";
		},

		offset: function () {
			var el = this.element,
				offset = {
					left: 0,
					top: 0
				};
			if (el.offsetParent) {
				while (el) {
					offset.left += el.offsetLeft;
					offset.top += el.offsetTop;
					el = el.offsetParent ? el.offsetParent : undefined;
				}
			} else if (el.x && el.y) {
				offset.left += el.x;
				offset.top += el.y;
			} else {
				return undefined;
			}
			return offset;
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

	Element.Frame = function (content) {
		var id = 'frame-' + (new Date()).getTime();
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
					'min-height: 46px',
					'min-width: 50px',
					'padding: 0',
					'position: absolute',
					'visibility: visible',
					'z-index: 1'
					].join(' !important; ') + ' !important;').replace(/\s*(box-shadow:([^;]+);)/ig, '-moz-$1 -webkit-$1 $1').replace(/\s*(border-radius:([^;]+);)/ig, '-o-$1 -ms-$1 -moz-$1 -webkit-$1 $1'),
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
						].join('!important;') + '!important;').replace(/\s*(border-radius:([^;]+);)/ig, '-o-$1 -ms-$1 -moz-$1 -webkit-$1 $1')
				}]
			}]
		});

		// document.body.appendChild(this.element_mask.element);
		this.element_mask.appendTo(document.body);

		var me = this,
			element_mask = this.element_mask,
			element_content = element_mask.children[0],
			frame_document = element_content.children[0].element.contentWindow.document;

		frame_document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><body></body></html>');
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
			if (this.ondestroy && typeof this.ondestroy === "function") {
				this.ondestroy.call(this);
			}
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
			this.center();
		};
		this.addCSS = function (css) {
			return new Element(frame_document.getElementsByTagName('head')[0]).insert({
				tag: 'style',
				type: 'text/css',
				text: css
			});
		};

		element_mask.element.addEventListener("click", function (e) {
			if (e.target == element_mask.element) {
				me.destroy();
			}
		}, true);

		this.addCSS([
			'html,body{background:transparent;padding:0;margin:0}',
			'body{color:#fff;display:inline-block;font:message-box;overflow:auto;padding:8px}',
			'a{color:#6cf;text-decoration:none}',
			'a:hover{text-decoration:underline}',
			'a:visited{color:#ba66ff}',
			'hr{height:2px;border:0;background:#444}'
			].join(''));

		if (content) {
			this.insert(content);
			this.resize();
		}

		// Center frame after window resizes
		window.addEventListener("resize", function (e) {
			me.center();
		}, false);

		return this;
	};

	function addFrameContents(f) {
		try {
			scanText(f.document.documentElement.innerHTML);
			scanText(unescape(f.document.documentElement.innerHTML));
		} catch (err) {
			return;
		}
		var frames;

		// find frames
		frames = Array.prototype.slice.call(f.frames);
		while (frames.length) {
			try {
				addFrameContents(frames.shift());
			} catch (err) {}
		}

		// find iframes
		frames = Array.prototype.slice.call(f.document.getElementsByTagName('iframe'));
		while (frames.length) {
			try {
				addFrameContents(frames.shift().contentWindow);
			} catch (err) {}
		}
	}

	function scanText(text, pattern) {
		if (!pattern) {
			var i, pl = patterns.length;
			for (i = 0; i < pl; i++) {
				scanText.call(this, text, patterns[i]);
			}
			return;
		}
		var match;
		while (pattern.test(text)) {
			if (match && match.index >= 0 && match.length >= 0) {
				text = text.substr(match.index + match.length);
			}
			match = text.match(pattern);
			if (!match) {
				continue;
			}
			if (Object.prototype.toString.call(match) === "[object Array]") {
				if (match.length > 1) {
					links.push({
						'url': match[1],
						'type': (match.length > 2) ? match[2].toUpperCase() : null
					});
				} else {
					links.push(match[0]);
				}
			} else {
				links.push(match);
			}
		}
	}

	function makeResultList(links, list_class) {
		var n, i, urls = [],
			ll = links.length,
			html = '';
		if (ll < 1) {
			return "";
		}
		for (i = 0; i < ll; i++) {
			n = links[i];
			if (urls.indexOf((typeof n === "string") ? n : n.url) > -1) {
				continue;
			}
			urls.push(n.url);
			html += '<li><a href="${url}" target="${target}" style="${css}"${download}>${type}${name}</a></li>'._template((typeof n === "string") ? {
				'url': n
			} : {
				'url': n.url,
				'target': n.target || '_blank',
				'name': n.name || n.url,
				'css': (n.css ? n.css : '') + (n.icon ? ";background-image:url('" + n.icon + "');" : ''),
				'type': n.type ? '<span>' + n.type + '</span>' : '',
				'download': n.type ? ' download="' + document.title + '.' + n.type.toLowerCase() + '"' : ''
			});
		}
		return '<ol' + (list_class ? ' class="' + list_class + '"' : '') + '>' + html + '</ol>';
	}

	var links = [];
	// /(?:<param[^>]*?)((?:(?:http|https|ftp)\:\/\/[^'"\?\&]*\.(?:[a-z]+)(?:\?[^\s'"]*)?(?=[^a-zA-Z0-9\-\_]|$)))/i
	var patterns = [
		/((?:http|https|ftp)\:\/\/[^'"\?\&]*\.(aac|ac3|asf|avi|flac|flv|m2v|m4a|m4v|mid|midi|mkv|mov|mp3|mp4|mp4v|mpeg|mpg|ogg|ogm|qt|ra|rmvb|wav|wma|wmv)(?:\?(?:(?!&amp;|http:\/\/)[^\s'"])*)?(?=[^a-z0-9\-\_]|$))/i
		];

	addFrameContents(window);

	// Third party video download links
	// { name: 'WebVideoFetcher.com', url: 'http://webvideofetcher.com/d?url=${href}', icon: 'http://webvideofetcher.com/favicon.ico' }
	var html = "", h = document.location.href;
	html += makeResultList(links, 'links');
	html += makeResultList([{
		'name': 'Savevid.com',
		'url': 'http://www.savevid.com/?url=' + h,
		'icon': 'http://www.savevid.com/favicon.ico'
	}, {
		'name': 'Keep Tube',
		'url': 'http://keep-tube.com/?url=' + document.location.href,
		'icon': 'http://keep-tube.com/images/icon/16x16.png',
		'css': 'opacity:.7'
	}, {
		'name': 'KeepVid',
		'url': 'http://keepvid.com/?url=' + h,
		'icon': 'http://keepvid.com/favicon.ico',
		'css': 'opacity:.7'
	}, {
		'name': 'SaveFrom.net',
		'url': 'http://savefrom.net/' + h,
		'icon': 'http://savefrom.net/favicon.ico',
		'css': 'opacity:.4'
	}], 'third-party');

	window.__DL_BOOKMARKLET = new Element.Frame(html);
	window.__DL_BOOKMARKLET.addCSS([
		'body{font-family:Arial,sans-serif}',
		'ol{list-style:none;padding:0;margin:0}',
		'li{white-space:nowrap;clear:both}',
		'li a span{font:bold 11px/16px "Arial Narrow",sans-serif;color:#999;padding:0 4px;min-width:30px;float:left;text-align:right}',
		'li a:hover{opacity:1!important}',
		'li a:hover span{color:#cef}',
		'.third-party{font-size:110%;text-align:center;margin:0 -8px;padding:4px 20px 4px;line-height:30px}',
		'.third-party li{display:inline}',
		'.third-party a{color:#f66;padding:2px 2px 2px 22px;margin:0 3px;background-position:2px center;background-repeat:no-repeat;background-size:16px;}',
		'.links + .third-party{border-top:2px solid #444}',
		'.links{padding:0 0 8px}'
		].join(''));
	window.__DL_BOOKMARKLET.ondestroy = function () {
		delete window.__DL_BOOKMARKLET;
	};
	window.__DL_BOOKMARKLET.resize();
}());
