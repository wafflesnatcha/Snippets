(function() {
	if ((document.location.href.length > 9) && (document.location.href.substr(0, 8) != "file:///")) {
		document.location.href = "http://validator.w3.org/feed/check.cgi?url=" + escape(document.location.href);
	};
	void(0);
})();
