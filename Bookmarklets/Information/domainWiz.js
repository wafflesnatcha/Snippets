void((function() {
	var d = document;
	var head = d.getElementsByTagName("head")[0];
	if (typeof head == 'undefined') {
		alert('This tool will not work on images or binary files.. \nPlease, try another location within this website..');
		return;
	}(_s = d.createElement('script')).setAttribute('src', 'http://www.smallmeans.com/apps/pretty.whois/whois.js?dom=' + document.domain + "&t=" + new Date().getTime());
	_s.id = 'Whois__script';
	head.appendChild(_s);
	return false;
}))();
