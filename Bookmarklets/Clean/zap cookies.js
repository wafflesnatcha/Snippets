(function() {
	C = document.cookie.split("; ");
	for (d = "." + location.host; d; d = ("" + d).substr(1).match(/\..*$/)) for (sl = 0; sl < 2; ++sl) for (p = "/" + location.pathname; p; p = p.substring(0, p.lastIndexOf('/'))) for (i in C) if (c = C[i]) {
		document.cookie = c + "; domain=" + d.slice(sl) + "; path=" + p.slice(1) + "/" + "; expires=" + new Date((new Date).getTime() - 1e11).toGMTString()
	}
})()
