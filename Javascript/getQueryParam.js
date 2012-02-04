function getQueryParam(key, url) {
	url = url || window.location.href;
	var query = url.substr(url.indexOf("?") + 1),
		params = query.split("&");

	for (var i = 0; i < params.length; i++) {
		var param = params[i].split("=");
		if (param.shift() == key) return param.join("");
	}
	return false;
}
