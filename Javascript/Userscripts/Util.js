/**
 * @example
 * Util.addStyleSheet([
 *     "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/themes/start/jquery-ui.css"
 * ]);
 * Util.addScript([
 *     "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js",
 *     "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.min.js"
 * ], function() {
 *     jQuery = $ = unsafeWindow.jQuery;
 *     // your code here
 * });
 *  
 */
var Util = function () {
	var headEl;
	return {
		$$: function (xpath, root) {
			xpath = xpath.replace(/((^|\|)\s*)([^/|\s]+)/g, '$2.//$3').replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').replace(/#([\w-]+)/g, '[@id="$1"]').replace(/\/\[/g, '/*[');
			str = '(@\\w+|"[^"]*"|\'[^\']*\')';
			xpath = xpath.replace(new RegExp(str + '\\s*~=\\s*' + str, 'g'), 'contains($1,$2)').replace(new RegExp(str + '\\s*\\^=\\s*' + str, 'g'), 'starts-with($1,$2)').replace(new RegExp(str + '\\s*\\$=\\s*' + str, 'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
			var got = document.evaluate(xpath, root || document, null, 5, null),
				result = [];
			while (next = got.iterateNext())
			result.push(next);
			return result;
		},

		$: function (el, parent) {
			if (typeof el == "string") {
				if (!parent) el = document.getElementById(el);
				else el = parent.document.getElementById(el);
			}
			if (!el) return false;
			if (!el.update) {
				el.update = function (str) {
					el.innerHTML = str;
				}
				el.append = function (str) {
					el.innerHTML += str;
				}
			}
			return el;
		},

		simulateClick: function (el) {
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			return !el.dispatchEvent(evt);
		},

		getQueryVariable: function (key, url) {
			url = url || window.location.href;
			var query = url.substr(url.indexOf("?") + 1);
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == key) return pair[1];
			}
			return false;
		},

		createElement: function (type, attributes) {
			var node = document.createElement(type);
			if (attributes) Util.setAttributes(node, attributes)
			return node;
		},

		appendToHead: function (el, before) {
			headEl = headEl || document.getElementsByTagName('head')[0];
			if (before) headEl.insertBefore(el, headEl.firstChild);
			else headEl.appendChild(el);
		},

		setAttributes: function (el, attribs) {
			for (var i in attribs)
			el.setAttribute(i, attribs[i]);
			return el;
		},

		addStyleSheet: function (urls) {
			if (typeof urls == 'string') urls = [urls];
			var el;
			for (var i = 0; i < urls.length; i++) {
				el = document.createElement('link');
				Util.setAttributes(el, {
					"rel": "stylesheet",
					"href": urls[i],
					"type": "text/css",
					"media": "screen"
				});
				Util.appendToHead(el);
			}
		},

		addScript: function (urls, callback) {
			if (typeof urls == 'string') urls = [urls];
			var url = urls.shift();
			var el = document.createElement('script');
			Util.setAttributes(el, {
				"src": url,
				"type": "text/javascript"
			});
			el.addEventListener("load", function (e) {
				console.log("Script Loaded", url);
				if (urls.length > 0) Util.addScript.apply(this, [urls, callback]);
				else if (callback) callback.apply(this, [e]);
			}, false);
			Util.appendToHead(el);
		},

		addStyle: function () {
			var args = Array.prototype.slice.call(arguments);
			var text = args.join("\n");

			var el = document.createElement('style');
			el.setAttribute("type", "text/css");
			el.innerHTML = text;
			Util.appendToHead(el);
		}
	};
}();
