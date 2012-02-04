(function() {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

	function simulateClick(arr) {
		var el = arr.shift();
		if (el && el.dispatchEvent(evt)) {
			var nextfn = function() {
				simulateClick(arr);
			}
			setTimeout(function() {
				if (window.votewin) {
					window.votewin.focus();
					window.votewin.close();
					setTimeout(nextfn, 2000);
				} else nextfn.call(this);
			}, 12500);
		}
	}

	var links = Array.prototype.slice.call(document.querySelectorAll('.sg_votelink_main a'));
	simulateClick(links);
})()
