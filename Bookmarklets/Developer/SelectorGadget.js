(function() {
	var s = document.createElement('div');
	s.innerHTML = 'Loading...';
	s.style.color = 'black';
	s.style.padding = '20px';
	s.style.position = 'fixed';
	s.style.zIndex = '9999';
	s.style.fontSize = '3.0em';
	s.style.border = '2px solid black';
	s.style.right = '40px';
	s.style.top = '40px';
	s.setAttribute('class', 'selector_gadget_loading');
	s.style.background = 'white';
	document.body.appendChild(s);
	s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', 'http://www.selectorgadget.com/stable/lib/selectorgadget.js?raw=true');
	document.body.appendChild(s);
})();
