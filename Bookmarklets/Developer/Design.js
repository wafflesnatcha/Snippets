function fnStartDesign(sUrl) {
	var nScript = document.createElement('script');
	nScript.setAttribute('language', 'JavaScript');
	nScript.setAttribute('src', sUrl);
	document.body.appendChild(nScript);
}
fnStartDesign('http://www.sprymedia.co.uk/design/design/media/js/design-loader.js');
