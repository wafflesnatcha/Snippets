/**
 * Element.Frame
 * 
 * @requires Element.js
 */

Element.Frame = function(content) {
	var id = 'frame-' + (new Date).getTime();
	this.El = new Element({
		tag: 'div',
		id: id,
		style: [
			'background:#000',
			'background:rgba(0,0,0,.8)',
			'bottom:0',
			'left:0',
			'position:fixed',
			'right:0',
			'top:0',
			'z-index:10000'
			].join(";"),
		children: [{
			tag: 'div',
			style: [
				'background:#222',
				'border:4px solid #eee',
				'border-radius:8px',
				'box-shadow:0 1px 2px rgba(0,0,0,.5)',
				'margin:0',
				'max-width:80%',
				'max-height:80%',
				'min-width:30px',
				'min-height:30px',
				'padding:0',
				'position:absolute'
				].join(";"),
			children: [{
				tag: 'iframe',
				id: id + '-frame',
				src: 'about:blank',
				style: [
					'border:0',
					'bottom:auto',
					'height:100%',
					'left:0',
					'margin:0',
					'padding:0',
					'position:absolute',
					'right:auto',
					'top:0',
					'width:100%'
					].join(";")
			}]
		}]
	});

	document.body.appendChild(this.El.element);

	var El = this.El,
		contentEl = El.children[0],
		frameEl = contentEl.children[0],
		frameDocument = frameEl.element.contentWindow.document;

	frameDocument.write();
	frameDocument.close();

	for (var prop in this.El) this[prop] = this.El[prop];
	this.element = frameDocument.body;

	// Override some functions
	this.center = function() {
		contentEl.center.apply(contentEl, arguments);
	};
	this.height = function() {
		contentEl.height.apply(contentEl, arguments);
	};
	this.width = function() {
		contentEl.width.apply(contentEl, arguments);
	};
	this.resize = function() {
		this.width((frameDocument.body.scrollWidth || frameDocument.body.offsetWidth || frameDocument.width) + 25);
		this.height((frameDocument.body.scrollHeight || frameDocument.body.offsetHeight || frameDocument.height));
	};

	// Close Button
	var close_button = contentEl.insert({
		tag: 'a',
		id: id + '-close',
		href: 'javascript:void(0)',
		text: 'X',
		title: 'Close',
		style: ['background:#d1d1d1', 'border:0', 'border-radius:50%', 'box-shadow:0 1px 2px rgba(0,0,0,.5)', 'color:#555', 'font:800 12px/23px "Arial Black",Verdana,sans-serif', 'height:23px', 'margin:0', 'padding:0', 'opacity:1', 'position:absolute', 'top:-12px', 'left:-12px', 'text-align:center', 'text-decoration:none', 'width:23px', 'z-index:1000'].join(";")
	});
	close_button.element.addEventListener("click", function() {
		El.destroy.apply(El);
	}, true);

	// Close the frame when clicking on the background
	El.element.addEventListener("click", function(e) {
		if (e.target != El.element) return;
		El.destroy.apply(El);
	}, true);

	// CSS Reset
	this.insert({
		tag: 'style',
		type: 'text/css',
		text: 'html,body{padding:0;margin:0}body{color:#fff;display:inline-block;font:13px sans-serif;padding:8px;overflow:auto}ol,li{list-style:none;margin:0;padding:0;white-space:pre}a{color:#6cf;text-decoration:none}a:visited{color:#ba66ff}.e a{color:#ff6669}hr{height:2px;border:0;background:#444}'
	});
	
	if (content) {
		this.insert(content);
		this.resize();
	}

	// Center frame after window resizes
	window.addEventListener("resize", function(e) {
		contentEl.center();
	}, false);

	this.center();
	return this;
}
