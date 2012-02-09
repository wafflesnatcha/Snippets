(function() {
	function tn(e) {
		e = e ? e : window.event;
		open(this.href);
		focus();
		return false;
	}
	var dl = document.links,
		i;
	for (i = 0; i < dl.length; ++i) dl[i].onclick = tn;
})();
