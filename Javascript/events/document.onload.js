/**
 * This code covers all your bases when trying to capture the page load event 
 */

function init() {
	// page is loaded!
}

if (document.body) init();
else {
	try {
		window.addEventListener("load", init, false);
	} catch (e) {
		try {
			window.onload = init;
		} catch (e) {}
	}
}