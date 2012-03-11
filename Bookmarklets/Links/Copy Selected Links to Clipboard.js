(function() {

	function getSelectedLinks() {
		if (!window.getSelection && !window.getSelection().containsNode) return;
		var i, links = document.links,
			dll = links.length,
			hrefs = [],
			t = window.getSelection();
		for (i = 0; i < dll; i++) {
			if (t.containsNode(links[i], true) && !links[i].href.match(/^(javascript|mailto):/i) && hrefs.indexOf(links[i].href) < 0) hrefs.push(links[i].href);
		}
		return hrefs;
	}

	function insertScripts(urls, callback) {
		if (typeof urls == 'string') urls = [urls];
		var thisFn = arguments.callee,
			url = urls.shift(),
			el = document.createElement('script');
		el.src = url;
		el.type = "text/javascript";
		el.addEventListener("load", function() {
			if (urls.length > 0) thisFn.apply(this, [urls, callback]);
			else if (callback) callback.apply(this, arguments);
		}, false);
		document.getElementsByTagName('head')[0].appendChild(el);
	}

	function inlineWindow(content) {
		var id = "frame-" + (new Date).getTime();
		var html = [
			'<style type="text/css">'
			, '#' + id + '{background:#000;background:rgba(0,0,0,.75);bottom:0;left:0;position:fixed;right:0;top:0;z-index:10000;}'
			, '#' + id + '-content{background:#555;border-radius:6px;box-shadow:0 1px 2px rgba(0,0,0,.5),inset 0 -30px 30px -30px rgba(0,0,0,.5);color:#6cf;font:700 20px sans-serif;padding:8px 12px;position:fixed;text-align:left;text-shadow:0 1px 3px rgba(0,0,0,.2);}'
			, '#' + id + '-content.hover{background:#6cf;color:#fff;}'
			, '#' + id + '-content.finished{background:#80ff66;color:#222;}'
			, '</style>'
			, '<div id="' + id + '">'
			, '<div id="' + id + '-content">'
			, content
			, '</div>'
			, '</div>'
			].join('');
		document.body.innerHTML += html;

		var maskElement = document.getElementById(id),
			element = document.getElementById(id + '-content');
			
		this.element = element;
		this.maskElement = maskElement
		this.center = function(el) {
			var el = el || window;
			element.style.left = Math.round(((el.innerWidth || el.clientWidth) - element.offsetWidth) / 2) + "px";
			element.style.top = Math.round(((el.innerHeight || el.clientHeight) - element.offsetHeight) / 2) + "px";
		}		
		this.destroy = function() {
			if (maskElement.parentNode) maskElement.parentNode.removeChild(maskElement);
		}
		
		this.center();
		return this;
	}

	// var hrefs = ["http://www.google.com", "http://www.yahoo.com", "http://github.com"];
	var hrefs = getSelectedLinks();

	if (hrefs.length < 1) {
		alert("No links selected!");
		return;
	}

	var text = hrefs.join("\n");
	var overlay = new inlineWindow('Copy');

	insertScripts('http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.js', function() {
		ZeroClipboard.setMoviePath("http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.swf");
		var clip = new ZeroClipboard.Client();
		clip.setText(text);
		clip.addEventListener('complete', function(client, text) {
			ZeroClipboard.$(overlay.element).addClass("finished");
			overlay.element.innerHTML = '&#x2714;';
			overlay.center();
			window.setTimeout(function() {
				clip.destroy();
				overlay.destroy();
			}, 1500);
		});
		clip.addEventListener('onMouseDown', function() {
			clip.setText(text);
		});
		clip.glue(overlay.element, overlay.element.parentNode);
	});

})();
