var t = '%s' || ( window.getSelection && window.getSelection()
	|| document.getSelection && document.getSelection()
	|| (document.selection && document.selection.createRange && document.selection.createRange().text));
location.href = 
	(t == "" || t == unescape('%25%73'))?
	'http://www.microsofttranslator.com/Default.aspx?InputTextVal=' + t
	: 'http://www.microsofttranslator.com/bv.aspx?ref=&from=&to=en&a=' + escape(location.href)
