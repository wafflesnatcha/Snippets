function simulateClick(elm) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var canceled = !elm.dispatchEvent(evt);
	if (canceled) {
		// A handler called preventDefault
		// uh-oh, did some XSS hack your site?
	} else {
		// None of the handlers called preventDefault
		// do stuff
	}
}
