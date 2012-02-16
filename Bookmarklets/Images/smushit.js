(function() {
	var _xcompStyle = function(el, st) {
			if (el.ownerDocument && el.ownerDocument.defaultView && document.defaultView.getComputedStyle) {
				_xcompStyle = function(el, st) {
					return el.ownerDocument.defaultView.getComputedStyle(el, '')[st];
				};
			} else if (el.currentStyle) {
				_xcompStyle = function(el, st) {
					return el.currentStyle[st];
				};
			}
			return _xcompStyle(el, st);
		};

	var getXComputedStyle = function(el, st) {
			var res = _xcompStyle(el, st);
			if (typeof res !== 'string' || res.indexOf('url(') !== 0) return false;
			res = res.replace(/url\(/, '');
			res = res.substr(0, res.length - 1);
			if (res.indexOf('"') === 0) res = res.substr(1, res.length - 2);
			return res;
		};

	var getUrls = function(doc, urls) {
			var imgs = doc.getElementsByTagName('img'),
				els = doc.getElementsByTagName('*'),
				interesting = ['backgroundImage', 'listStyleImage', 'content', 'cursor'],
				i = 0,
				j = 0,
				max = 0,
				s = '';
			for (i = 0, max = imgs.length; i < max; i++) {
				if (typeof imgs[i].src == "string" && imgs[i].src.indexOf('http') === 0) {
					urls[imgs[i].src] = 1;
				}
			}
			for (i = 0, max = els.length; i < max; i++) {
				for (j = 0; j < interesting.length; j++) {
					s = getXComputedStyle(els[i], interesting[j]);
					if (s) urls[s] = 1;
				}
			}
			return urls;
		};

	var smushit = {
		docs: [],

		run: function() {
			this.docs = [];
			this.getDocs(window);
			this.getImages();
			this.post();
		},

		getDocs: function(fr) {
			var frames, frames_length, i;
			if (fr) {
				frames = fr.frames;
				frames_length = frames.length;
				if (fr.document) this.docs.push(fr.document);
				for (i = 0; i < frames_length; i++) {
					this.getDocs(frames[i]);
				}
			}
			return this.docs;
		},

		getImages: function() {
			this.images = {};
			for (var i = 0; i < this.docs.length; i++) {
				getUrls(this.docs[i], this.images);
			}
		},

		post: function() {
			var i, imgs = [],
				html, div;
			for (i in this.images) {
				if (this.images.hasOwnProperty(i)) {
					imgs.push(i);
				}
			}

			html = '<form method="post" id="smushit-post-form" action="http://www.smushit.com/ysmush.it/">' + '<input type="hidden" name="img" value="' + imgs.join('\n') + '">' + '</form>';

			div = document.createElement('div');
			div.id = 'smushit-post-div';
			div.innerHTML = html;
			document.body.appendChild(div);
			document.getElementById("smushit-post-form").submit();
		}
	};
	smushit.run();
})();
