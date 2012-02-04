(function() {
	if (typeof VisualEvent != 'undefined') {
		if (document.getElementById('Event_display')) {
			VisualEvent.fnClose();
		} else {
			VisualEvent.fnInit();
		}
	} else {
		var n = document.createElement('script');
		n.setAttribute('language', 'JavaScript');
		n.setAttribute('src', 'http://www.sprymedia.co.uk/design/event/media/js/event-loader.js');
		document.body.appendChild(n);
	}
})();;
