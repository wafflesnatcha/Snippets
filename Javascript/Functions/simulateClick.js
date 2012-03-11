function simulateClick(elm) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var canceled = !elm.dispatchEvent(evt);
	if (canceled) {
		console.log('cancelled', evt);
	} else {
		console.log('ran successfully', evt);
	}
}

function simulateClick(x, y) {
    var el = document.elementFromPoint(x, y);
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,
        1, 0, 0,
        x, y,
        false, false, false, false, 0, null);
    el.dispatchEvent(evt);
}