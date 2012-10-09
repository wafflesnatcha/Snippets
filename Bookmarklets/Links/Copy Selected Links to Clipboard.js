/*jshint browser:true*/
/*global ZeroClipboard*/
(function () {
	function getSelectedLinks() {
		if (!window.getSelection && !window.getSelection().containsNode) {
			return;
		}
		var i, links = document.links,
			dll = links.length,
			hrefs = [],
			t = window.getSelection();
		for (i = 0; i < dll; i++) {
			if (t.containsNode(links[i], true) && !links[i].href.match(/^(javascript|mailto):/i) && hrefs.indexOf(links[i].href) < 0) {
				hrefs.push(links[i].href);
			}
		}
		return hrefs;
	}

	function insertScripts(urls, callback) {
		if (typeof urls == 'string') {
			urls = [urls];
		}
		var url = urls.shift(),
			el = document.createElement('script');
		el.src = url;
		el.type = "text/javascript";
		el.addEventListener("load", function () {
			if (urls.length > 0) {
				insertScripts.apply(this, [urls, callback]);
			} else if (callback) {
				callback.apply(this, arguments);
			}
		}, false);
		document.getElementsByTagName('head')[0].appendChild(el);
	}

	var InlineWindow = function (content, alt) {
		var element, transition_duration = 250,
			mask = document.createElement('div'),
			id = "frame-" + (new Date()).getTime();
		mask.setAttribute('id', id);
		mask.setAttribute('style', 'opacity:0;' + ([
			'background:#000',
			'background:rgba(0,0,0,.8)',
			'border: 0',
			'bottom: 0',
			'display: block',
			'float: none',
			'height: auto',
			'left: 0',
			'margin: 0',
			'max-height: none',
			'max-width: none',
			'min-height: 0',
			'min-width: 0',
			'padding: 0',
			'position: fixed',
			'right: 0',
			'top: 0',
			'transition: opacity ' + (transition_duration / 1000) + 's',
			'visibility: visible',
			'width: auto',
			'z-index: 999999'
			].join(' !important; ') + ' !important;').replace(/\s*(transition:([^;]+);)/ig, '-moz-$1 -o-$1 -webkit-$1 $1'));
		mask.innerHTML = [
			'<style type="text/css">',
			'#' + id + '-content{' + (['background:#' + (alt ? 'c00' : '555'), 'color:#' + (alt ? 'fff' : '6cf'), 'border-radius:6px', 'box-shadow:0 1px 2px rgba(0,0,0,.5),inset 0 -40px 40px -40px rgba(0,0,0,.5)', 'font:700 20px sans-serif', 'padding:8px 12px', 'position:fixed', 'text-align:center', 'text-shadow:0 1px 3px rgba(0,0,0,.5)'].join(' !important; ') + ' !important;') + '}',
			'#' + id + '-content.hover{background:#6cf!important;color:#fff!important}',
			'#' + id + '-content.finished{background:#80ff66!important;color:#222!important}',
			'</style>',
			'<div id="' + id + '-content">' + content + '</div>'
			].join('\n');

		document.body.appendChild(mask);
		element = document.getElementById(id + '-content');
		this.element = element;
		this.mask = mask;

		this.center = function (el) {
			el = el || window;
			element.style.left = Math.round(((el.innerWidth || el.clientWidth) - element.offsetWidth) / 2) + "px";
			element.style.top = Math.round(((el.innerHeight || el.clientHeight) - element.offsetHeight) / 2) + "px";
		};

		this.destroy = function () {
			mask.style.opacity = 0;
			setTimeout(function () {
				if (mask.parentNode) {
					mask.parentNode.removeChild(mask);
				}
			}, transition_duration);
		};

		var me = this;
		mask.addEventListener("click", function () {
			me.destroy();
		}, true);
		if (window.getComputedStyle) {
			element.style.width = window.getComputedStyle(element).width;
			element.style.height = window.getComputedStyle(element).height;
		}
		this.center();
		mask.style.opacity = 1;
		return this;
	};

	// var hrefs = ["http://www.google.com", "http://www.yahoo.com", "http://github.com"];
	var hrefs = getSelectedLinks();
	if (hrefs.length < 1) {
		return new InlineWindow('No links selected!', true);
	}

	var text = hrefs.join("\n"), title = String(hrefs.length + ' link' + (hrefs.length > 1? 's' : ''));
	var overlay = new InlineWindow('Copy');

	var initZeroClipboard = function () {
		ZeroClipboard.setMoviePath("http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.swf");
		var clip = new ZeroClipboard.Client();
		clip.setText(text);
		clip.addEventListener('complete', function (client, text) {
			ZeroClipboard.$(overlay.element).addClass("finished");
			overlay.element.innerHTML = '&#x2714;';
			window.setTimeout(function () {
				clip.destroy();
				overlay.destroy();
			}, 1000);
		});
		clip.addEventListener('onMouseDown', function () {
			clip.setText(text);
		});
		clip.glue(overlay.element, overlay.element.parentNode);
		clip.div.setAttribute('title', title);
	};

	if (typeof ZeroClipboard !== "undefined") {
		initZeroClipboard();
	} else {
		insertScripts('http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.js', initZeroClipboard);
	}
}());
