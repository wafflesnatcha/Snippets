(function() {
	var str = '';
	if (document.innerHTML) str += document.innerHTML;
	else {
		if (document.doctype) {
			str += '<!DOCTYPE ';
			str += document.doctype.name;
			if (document.doctype.publicId) {
				str += ' PUBLIC "' + document.doctype.publicId + '"';
				if (document.doctype.systemId) str += ' "' + document.doctype.systemId + '"';
			} else if (document.doctype.systemId) {
				str += ' SYSTEM "' + document.doctype.systemId + '"';
			}
			str += '>\n';
		}
		var dummy = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
		dummy.appendChild(document.documentElement);
		str += dummy.innerHTML;
	}
	var form = document.createElementNS('http://www.w3.org/1999/xhtml', 'form');
	form.enctype = 'multipart/form-data';
	form.method = 'post';
	form.acceptCharset = 'utf-8';
	form.action = 'http://html5.validator.nu/';
	form.innerHTML = '<input name="parser"/><input name="showsource" value="yes"/><textarea name="content"></textarea>';
	form.parser.value = document.createElement('div').tagName == 'DIV' ? 'html' : 'xml';
	form.content.value = str;
	if (document.documentElement) document.documentElement.appendChild(form);
	else document.appendChild(form);
	form.submit();
})()
