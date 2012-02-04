var Cookie = (function() {

	function set(name, val, days) {
		var ex_date = new Date();
		ex_date.setDate(ex_date.getDate() + days);
		document.cookie = name + "=" + escape(value) + (days == null) ? "" : "; expires=" + ex_date.toUTCString();
	}

	function get(name) {
		var i, x, y, cookies = document.cookie.split(";");
		for (i = 0; i < cookies.length; i++) {
			x = cookies[i].substr(0, cookies[i].indexOf("="));
			y = cookies[i].substr(cookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == name) return unescape(y);
		}
	}

	function check(name) {
		var c = get(name);
		return (c != null && c != "");
	}

	return {
		set: set,
		get: get,
		check: check
	};

})();
