var b = document.body;
var GR________bookmarklet_domain = 'http://www.google.com';
if (b && !document.xmlVersion) {
	void(z = document.createElement('script'));
	void(z.src = 'http://www.google.com/reader/ui/subscribe-bookmarklet.js');
	void(b.appendChild(z));
} else {
	location = 'http://www.google.com/reader/view/feed/' + encodeURIComponent(location.href)
}
