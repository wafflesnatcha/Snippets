void((function() {
	var d = document;
	var head = d.getElementsByTagName('head')[0];
	if (typeof head == 'undefined') {
		alert('Hey, try a different location..');
		return;
	}(_s = d.createElement('script')).setAttribute('src', 'http://siteflow.googlecode.com/svn/trunk/payload.v1.2.js');
	head.appendChild(_s);
	return false;
}))();