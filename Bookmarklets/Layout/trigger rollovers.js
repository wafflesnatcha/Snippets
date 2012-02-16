(function() {
	function k(x) {
		if (x.onmouseover) {
			x.onmouseover();
			x.backupmouseover = x.onmouseover;
			x.backupmouseout = x.onmouseout;
			x.onmouseover = null;
			x.onmouseout = null;
		} else if (x.backupmouseover) {
			x.onmouseover = x.backupmouseover;
			x.onmouseout = x.backupmouseout;
			x.onmouseover(); /*for MM_swapImgRestore*/
			x.onmouseout();
		}
	}
	var i, x;
	for (i = 0; x = document.links[i]; ++i) k(x);
	for (i = 0; x = document.images[i]; ++i) k(x);
})()
