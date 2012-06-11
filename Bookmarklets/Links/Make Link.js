(function () {
	var url = window.prompt("URL:");
	console.log(url);

	if (!url) {
		return;
	}

	if (url.indexOf("://") == -1) {
		url = "http://" + url;
	}
	var doc = window.open().document;
	doc.write();
	doc.close();

	var el = doc.createElement('a');
	el.href = url;
	el.innerText = url;

	doc.body.appendChild(el);
})()