// Chrome
(function() {
	function simulateClick(arr) {
		var el = arr.shift();
		console.log("simulateClick", el);
		if (!el) return;
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		console.log("evt", evt, el.dispatchEvent(evt));
		setTimeout(function() { simulateClick(arr); }, 1);
	}
	simulateClick(Array.prototype.slice.call(document.querySelectorAll('a[id^="linkImg"]')));
})()


// Firefox
function() {
	var l = document.querySelectorAll('a[id^="linkImg"]'),
		i = l.length;
	while (i--) {
		document.location = l[i].href;
	}
}()
