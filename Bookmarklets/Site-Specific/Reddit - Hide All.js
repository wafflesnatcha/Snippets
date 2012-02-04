(function() {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

	function simulateClick(arr) {
		var el = arr.pop();
		if (el && el.dispatchEvent(evt)) setTimeout(function() {
			simulateClick(arr);
		}, 400);
	}

	var l = document.querySelectorAll('form.state-button.hide-button a');
	simulateClick(Array.prototype.slice.call(l));
})()
