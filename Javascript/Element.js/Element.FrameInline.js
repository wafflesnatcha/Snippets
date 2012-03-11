/**
 * Element.FrameInline
 *
 * @requires Element.js
 */

Element.FrameInline = function(content) {
	var id = "frame-" + (new Date).getTime();
	var mask_element = new Element({
		tag: "div",
		id: id,
		style: [
			'background: #000',
			'background: rgba(0,0,0,.8)',
			'bottom: 0',
			'left: 0',
			'position: fixed',
			'right: 0',
			'top: 0',
			'z-index: 999999'
			].join(";"),
		children: [{
			tag: "style",
			type: "text/css",
			text: "#" + id + "-content a{color:#6CF;}"
		}, {
			tag: "div",
			id: id + "-content",
			style: [
				'background: #222',
				'border-radius: 8px',
				'border: 4px solid #eee',
				'box-shadow: 0 1px 2px rgba(0,0,0,.5)',
				'color: #fff',
				'font: normal normal normal 13px/normal sans-serif',
				'margin: 0',
				'max-height: 80%',
				'max-width: 80%',
				'min-height: 30px',
				'min-width: 30px',
				'padding: 8px',
				'position: absolute'
				].join(";")
		}]
	});

	document.body.appendChild(mask_element.element);

	var content_element = mask_element.children[1];
	for (var prop in content_element) this[prop] = content_element[prop];
	
	// Override some functions
	this.destroy = function() {
		mask_element.destroy.apply(mask_element, arguments);
	};
	
	// Close the frame when clicking on the background
	mask_element.element.addEventListener("click", function(e) {
		if (e.target == mask_element.element) mask_element.destroy.apply(mask_element);
	}, true);
	
	if (content) {
		this.insert(content);
		this.center();
	}
	return this;
}
