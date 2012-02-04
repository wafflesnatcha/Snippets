(function() {
	var s, F, j, f, i;
	s = "";
	F = document.embeds;
	for (j = 0; j < F.length; ++j) {
		f = F[j];
		s = f.getAttribute("src");
		if (confirm("Download this movie:\n\n" + s)) window.location = s;
	}
})();
