(function () {
	window._BMRK_NAV_INC = window._BMRK_NAV_INC ? parseInt(window._BMRK_NAV_INC) : 0;
	window._BMRK_NAV_INC++;

	var c, b, oldNum, newNum, href = document.location.href,
		href_length = href.length;

	for (c = href_length - 1; c >= 0; --c) {
		if (href.charAt(c).match(/[0-9]/)) {
			for (b = c - 1; b >= 0; --b) {
				if (!href.charAt(b).match(/[0-9]/)) break;
			}
			break;
		}
	}

	b++;

	if (c < 0) return;

	oldNum = href.substring(b, c + 1);
	newNum = "" + (parseInt(oldNum, 10) + window._BMRK_NAV_INC);

	while (newNum.length < oldNum.length) {
		newNum = "0" + newNum;
	}

	document.location = href.substring(0, b) + newNum + href.slice(c + 1)
})();