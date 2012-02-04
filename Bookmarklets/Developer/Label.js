function fnStartLabel(sUrl) {
	var nScript = document.createElement('script');
	nScript.setAttribute('language', 'JavaScript');
	nScript.setAttribute('src', sUrl);
	document.body.appendChild(nScript);
}
fnStartLabel('http://www.sprymedia.co.uk/design/label/media/js/label-loader.js');
