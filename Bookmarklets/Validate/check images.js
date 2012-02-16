(function() {
	var ims = document.images,
		brokenCount = 0,
		brokenURLs = "",
		text, i;
	for (i = 0; i < ims.length; ++i) if (!(ims[i].naturalHeight || ims[i].fileSize > 0)) {
		++brokenCount;
		brokenURLs += "URL: " + ims[i].src + "\n";
	};
	text = brokenCount + " broken image" + (brokenCount == 1 ? "" : "s");
	if (brokenCount) alert(text + ":\n\n" + brokenURLs);
	else alert("No broken images.");
})()
