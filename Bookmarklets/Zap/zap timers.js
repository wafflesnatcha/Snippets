(function() {
	var c, tID, iID;
	tID = setTimeout(function() {}, 0);
	for (c = 1; c < 1000 && c <= tID; ++c) clearTimeout(tID - c);
	iID = setInterval(function() {}, 1000);
	for (c = 0; c < 1000 && c <= iID; ++c) clearInterval(iID - c);
})()
