void((function() {
	var d = document;
	var head = d.getElementsByTagName('head')[0];
	if (typeof head == 'undefined') {
		alert('Hey, wait coupla seconds while the page loads..');
		return;
	}(_s = d.createElement('script')).setAttribute('src', 'http://means.googlecode.com/svn/trunk/sitehilite/sitehilite.js');
	head.appendChild(_s);
	return false;
}))();
