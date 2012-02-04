function loadScript(scriptURL) {
	var scriptElem = document.createElement('SCRIPT');
	scriptElem.setAttribute('language', 'JavaScript');
	scriptElem.setAttribute('src', scriptURL);
	document.body.appendChild(scriptElem);
}
loadScript('http://westciv.com/mri/theMRI.js');
