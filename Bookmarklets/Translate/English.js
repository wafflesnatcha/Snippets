/**
 * Google Translate to English
 *
 * Chooses what to translate in this order:
 * 1. Text entered after the search keyword (when typing directly into the URL
 *    bar in Firefox, i.e. "übersetzen mir")
 * 2. Selected text
 * 3. The current page
 */

(function() {

	// Untranslates a page if already viewing a translated page
	if (document.location.href.match(document.location.href.match(/https?:\/\/translate\.google\.com\/translate/))) {
		location.href = decodeURIComponent(location.href.replace(/^.*[&?](trurl|url|u)=/, '').replace(/[&?].*$/, ''));
		return;
	}

	function getQuicksearchTerm() {
		var term = '%s';
		if (term && term != unescape('%25%73')) return term;
		return false;
	}

	function getSelectedText(frame) {
		var frame = frame || window;
		// console.info('getSelectedText(%o)', frame);
		// look for iframes
		var f = frame.document.getElementsByTagName('iframe');
		if (f.length > 0) {
			for (var i = 0; i < f.length; i++) {
				try {
					var t = getSelectedText(f[i].contentWindow);
					if (t != '') return t;
				} catch (e) {}
			}
		}

		// look for actual framesets
		var f = frame.frames;
		if (f.length > 0) {
			for (var i = 0; i < f.length; i++) {
				try {
					var t = getSelectedText(f[i]);
					if (t != '') return t;
				} catch (e) {}
			}
		}

		return ((frame.getSelection && frame.getSelection()) || (frame.document.getSelection && frame.document.getSelection()) || (frame.document.selection && frame.document.selection.createRange && frame.document.selection.createRange().text));
	}

	var text = getQuicksearchTerm() || getSelectedText();
	var charset = document.charset || document.characterSet;
	var url = 'http://translate.google.com/' + ((text == "") ? 'translate?u=' + escape(location.href) + '&hl=en&langpair=auto|en&tbb=1&ie=' + charset : 'translate_t?text=' + text + '&hl=en&langpair=auto|en&tbb=1&ie=' + charset);
	location.href = url;
})();
