(function() {
	var Util = function() {
			var headEl;
			return {
				appendToHead: function(el, before) {
					headEl = headEl || document.getElementsByTagName('head')[0];
					if (before) headEl.insertBefore(el, headEl.firstChild);
					else headEl.appendChild(el);
				},
				setAttributes: function(el, attribs) {
					for (var i in attribs) el.setAttribute(i, attribs[i]);
					return el;
				},
				addStyleSheet: function(urls) {
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
				addScript: function(urls, callback) {
					if (typeof urls == 'string') urls = [urls];
					var url = urls.shift();
					var el = document.createElement('script');
					Util.setAttributes(el, {
						"src": url,
						"type": "text/javascript"
					});
					el.addEventListener("load", function(e) {
						console.log("Script Loaded %o", url);
						if (urls.length > 0) Util.addScript.apply(this, [urls, callback]);
						else if (callback) callback.apply(this, [e]);
					}, false);
					Util.appendToHead(el);
				},
				addStyle: function() {
					var args = Array.prototype.slice.call(arguments);
					var text = args.join("\n");
					var el = document.createElement('style');
					el.setAttribute("type", "text/css");
					el.innerHTML = text;
					Util.appendToHead(el);
				}
			};
		}();

	var FloatingPanel = function() {
			var styles = {
				'position': 'fixed',
				'bottom': '6px',
				'right': '6px',
				'display': 'none',
				'opacity': 0.9,
				'zIndex': 1000000,
				'MozBorderRadius': '4px',
				'minHeight': '20px',
				'minWidth': '60px',
				'background': '#eee',
				'border': '1px solid #888',
				'MozBoxShadow': '0 0 3px 1px #bbb'
			};

			this.el = null;

			this.show = function(str) {
				if (var el = this.getEl()) {
					if (str) el.innerHTML = txt;
					el.style.display = 'block';
					return el;
				}
			};
			this.update = function(str) {
				this.show(str);
			};
			this.getEl = function() {
				if (!this.el) {
					var el = document.createElement('div');
					el.setAttribute("id", "FloatingPanel");
					for (var p in styles) {
						el.style[p] = styles[p];
					}
					document.body.appendChild(el);
					this.el = el;
				}
				return this.el;
			};

			this.hide = function() {
				if (!this.el) return false;

				this.el.style.display = "none";
				return this.el;
			};

		};

	function Window(url) {
		if (typeof D != "undefined") return D;

		if (!url) {
			D = window.open().document;
			D.write();
			D.close();
			return D;
		} else return window.open(url);
	}

	function CharSet() {
		return (document.charset || document.characterSet);
	}

	// http://api.microsofttranslator.com/V2/Ajax.svc/Translate?oncomplete=someCallback&appId=2BF972B01A946E3B1396C880355F91A6A9F9E7DE&from=&to=en&text=
	var t = '%s' || (window.getSelection && window.getSelection()) || (document.getSelection && document.getSelection()) || (document.selection && document.selection.createRange && document.selection.createRange().text);
	console.log('SELECTION', t);

	if (t != '') {
		console.log('selection found!');
		//console.profile('WHAT');
		Util.addScript('http://www.google.com/jsapi', function(e) {
			console.log('script loaded...');

			google.load("language", "1");

			google.setOnLoadCallback(function() {

				console.log('google onload callback...');

				google.language.translate(t, "", "es", function(result) {
					console.log('translate callback', result);

					var fp = new FloatingPanel();

					if (result.error) fp.show(result.error);
					else fp.show(result.translation);
				});
			});


			//console.profileEnd('WHAT');
		});
	} else {
		console.log('no selection, sending to google translate...');
		Window('http://translate.google.com/translate?u=' + escape(location.href) + '&hl=en&langpair=auto|en&tbb=1&ie=' + CharSet());
	}

})();
