/**
 * Translate to English
 *
 * Chooses what to translate in this order:
 * 1. Text entered after the search keyword (when typing directly into the URL
 *    bar in Firefox, i.e. "übersetzen mir")
 * 2. Selected text
 * 3. The current page
 */

(function(service) {
	var services = {
		'bing': {
			'text': 'http://www.microsofttranslator.com/Default.aspx?svc=LP&loc=en&from=&to=en&dtc=de&text=<%text%>',
			'url': 'http://www.microsofttranslator.com/bv.aspx?ref=&from=&to=en&a=<%url%>'
		},
		'google': {
			'text': 'http://translate.google.com/translate_t?text=<%text%>&hl=en&langpair=auto|en&tbb=1&ie=<%charset%>',
			'url': 'http://translate.google.com/translate?u=<%url%>&hl=en&langpair=auto|en&tbb=1&ie=<%charset%>'
		}
	};

	// Untranslates a page if already viewing a translated page
	if (document.location.href.match(document.location.href.match(/https?:\/\/translate\.google\.com\/translate/))) {
		location.href = decodeURIComponent(location.href.replace(/^.*[&?](trurl|url|u)=/, '').replace(/[&?].*$/, ''));
		return;
	}

	function getQuicksearchTerm() {
		var term = '%s';
		return (term && term != unescape('%25%73')) ? term : false;
	}

	function getSelectedText(f) {
		var i, t, f = f || window,
			frames = Array.prototype.slice.call(f.frames);

		// look for iframes
		var iframes = Array.prototype.slice.call(f.document.getElementsByTagName('iframe'));
		for (i = 0; i < iframes.length; i++) frames.push(iframes[i].contentWindow)

		for (i = 0; i < frames.length; i++) {
			try {
				t = arguments.callee.call(this, frames[i]);
				if (t && t != '') return t;
			} catch (e) {}
		}

		var text = ((f.getSelection && f.getSelection()) || (f.document.getSelection && f.document.getSelection()) || (f.document.selection && f.document.selection.createRange && f.document.selection.createRange().text));
		if(text && text != '') return text.toString().replace(/^\s*/, "").replace(/\s*$/, "");
	}

	var charset = document.charset || document.characterSet,
		url = location.href,
		text = getQuicksearchTerm() || getSelectedText(),
		service = (text && text != '') ? services[service]['text'] : services[service]['url'];

	// Replace placeholders in URL
	service = service.replace('<%url%>', url).replace('<%text%>', text).replace('<%charset%>', charset).replace(/<%[a-z_\-0-9]+%>/ig, '');
	location.href = service;
})('google');