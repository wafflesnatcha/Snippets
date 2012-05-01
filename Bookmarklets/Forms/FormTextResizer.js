TxtRsz = {
	formEl: null,
	adEv: function(t, ev, fn) {
		if (typeof document.addEventListener != 'undefined') {
			t.addEventListener(ev, fn, false)
		} else {
			t.attachEvent('on' + ev, fn)
		}
	},
	rmEv: function(t, ev, fn) {
		if (typeof document.removeEventListener != 'undefined') {
			t.removeEventListener(ev, fn, false)
		} else {
			t.detachEvent('on' + ev, fn)
		}
	},
	init: function() {
		var textareas = document.getElementsByTagName('textarea');
		for (var i = 0; i < textareas.length; i++) {
			textareas[i].style.cursor = 'se-resize'
		}
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].type == 'text') {
				inputs[i].style.cursor = 'e-resize'
			}
		}
		TxtRsz.adEv(document, 'mousedown', TxtRsz.initResize)
	},
	initResize: function(event) {
		if (typeof event == 'undefined') {
			event = window.event
		}
		var target = event.target || event.srcElement;
		if (target.nodeName.toLowerCase() == 'textarea' || (target.nodeName.toLowerCase() == 'input' && target.type == 'text')) {
			TxtRsz.formEl = target;
			TxtRsz.formEl.startWidth = TxtRsz.formEl.clientWidth;
			TxtRsz.formEl.startHeight = TxtRsz.formEl.clientHeight;
			TxtRsz.formEl.startX = event.clientX;
			TxtRsz.formEl.startY = event.clientY;
			TxtRsz.adEv(document, 'mousemove', TxtRsz.resize);
			TxtRsz.adEv(document, 'mouseup', TxtRsz.stopResize);
			try {
				event.preventDefault()
			} catch (e) {}
		}
	},
	resize: function(event) {
		if (typeof event == 'undefined') {
			event = window.event
		}
		try {
			TxtRsz.formEl.style.width = event.clientX - TxtRsz.formEl.startX + TxtRsz.formEl.startWidth + 'px'
		} catch (e) {}
		if (TxtRsz.formEl.nodeName.toLowerCase() == 'textarea') {
			TxtRsz.formEl.style.height = event.clientY - TxtRsz.formEl.startY + TxtRsz.formEl.startHeight + 'px'
		}
	},
	stopResize: function(event) {
		TxtRsz.rmEv(document, 'mousedown', TxtRsz.initResize);
		TxtRsz.rmEv(document, 'mousemove', TxtRsz.resize);
		var textareas = document.getElementsByTagName('textarea');
		for (var i = 0; i < textareas.length; i++) {
			textareas[i].style.cursor = 'text'
		}
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].type == 'text') {
				inputs[i].style.cursor = 'text'
			}
		}
	}
};
TxtRsz.init();