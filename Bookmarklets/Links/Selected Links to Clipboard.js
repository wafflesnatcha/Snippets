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
	
	var maskEl;
	function inlineWindow(content) {
		var id = "frame-" + (new Date).getTime();
		var html = [
			'<style type="text/css">'
			, '#' + id + '{background:#000;background:rgba(0,0,0,.75);bottom:0;left:0;position:fixed;right:0;top:0;z-index:10000;}'
			, '#' + id + '-content{background:#555;border-radius:6px;box-shadow:0 1px 2px rgba(0,0,0,.5),inset 0 -30px 30px -30px rgba(0,0,0,.5);color:#6cf;font:14px sans-serif;padding:8px 12px;position:fixed;text-align:left;text-shadow:0 1px 0 rgba(0,0,0,.2);}'
			, '#' + id + '-content.hover{background:#6cf;color:#fff;}'
			, '#' + id + '-content.finished{background:#80ff66;color:#222;}'
			, '#' + id + '-content a{color:inherit;text-decoration:none;}'
			, '</style>'
			, '<div id="' + id + '">'
			, '<div id="' + id + '-content">'
			, content
			, '</div>'
			, '</div>'
			];
		document.body.innerHTML += html.join('');
		
		maskEl = document.getElementById(id);
		
		var el = document.getElementById(id + '-content');
		var w = window.innerWidth || window.clientWidth,
			h = window.innerHeight || window.clientHeight;
		el.style.left = Math.round((w - el.offsetWidth) / 2) + "px";
		el.style.top = Math.round((h - el.offsetHeight) / 2) + "px";
		return el;
	}

	var hrefs = getSelectedLinks();
	// var hrefs = ["http://www.google.com", "http://www.yahoo.com", "http://github.com"];
	
	if (hrefs.length < 1) alert("no links selected");
	else {
		var text = hrefs.join("\n");
		var el = inlineWindow('<a href="#" id="button">Copy into the clipboard</a>');
		
		insertScripts('http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.js', function() {
			ZeroClipboard.setMoviePath("http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.swf");
			
			var clip = new ZeroClipboard.Client();
			clip.setText(text);
			
			clip.addEventListener('complete', function (client, text) {
				ZeroClipboard.$(el).addClass("finished");
				window.setTimeout(function() {
					clip.destroy();
					if (maskEl.parentNode) maskEl.parentNode.removeChild(maskEl);
				}, 1500);
			});
			
			clip.addEventListener('onMouseDown', function() {
				clip.setText(text);
			});
			
			clip.glue(el, maskEl);			
		})
	}

})();
