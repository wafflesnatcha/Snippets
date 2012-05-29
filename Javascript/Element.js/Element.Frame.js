/**
 * A modal window using Element.js
 * 
 * Example usage:
 * <code>
 * var el = new Element.Frame('<p>some text <b>bold text</b></p>')
 * </code>
 * 
 * @requires Element.js
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 * @link http://wafflesnatcha.github.com
 * @version r2 2012-05-29
 */

Element.Frame = function (content) {
	var id = 'frame-' + (new Date).getTime();
	this.element_mask = new Element({
		tag: 'div',
		id: id,
		style: ['background: #000', 'background: rgba(0,0,0,.8)', 'bottom: 0', 'left: 0', 'min-height: 150px', 'position: fixed', 'right: 0', 'top: 0', 'z-index: 999999'].join('!important;') + '!important;',
		children: [{
			tag: 'div',
			style: ['background: #222', 'border: 4px solid #eee', 'border-radius: 8px', 'box-shadow: 0 1px 2px rgba(0,0,0,.5)', 'margin: 0', 'max-width: 90%', 'max-height: 90%', 'min-width: 80px', 'min-height: 80px', 'padding: 0', 'position: absolute'].join('!important;') + '!important;',
			children: [{
				tag: 'iframe',
				id: id + '-frame',
				src: 'about:blank',
				style: ['background: transparent', 'border: 0', 'bottom: auto', 'height: 100%', 'left: 0', 'margin: 0', 'padding: 0', 'position: absolute', 'right: auto', 'top: 0', 'width: 100%'].join('!important;') + '!important;'
			}]
		}]
	});

	document.body.appendChild(this.element_mask.element);

	var element_mask = this.element_mask,
		element_content = element_mask.children[0],
		frame_document = element_content.children[0].element.contentWindow.document;

	frame_document.write();
	frame_document.close();

	for (var prop in this.element_mask) {
		this[prop] = this.element_mask[prop];
	}
	this.element = frame_document.body;

	// Function overrides
	this.center = function () {
		this.width(this.width());
		this.height(this.height());
		element_content.element.style.left = Math.round((element_mask.width() - element_content.width()) / 2) + "px";
		element_content.element.style.top = Math.round((element_mask.height() - element_content.height()) / 2) + "px";
	};
	this.destroy = function () {
		element_mask.destroy();
	};
	this.height = function (v) {
		if (v) element_content.height.apply(element_content, arguments);
		return this.element.offsetHeight;
	};
	this.width = function (v) {
		if (v) element_content.width.apply(element_content, arguments);
		return this.element.offsetWidth;
	};
	this.resize = function () {
		this.width((frame_document.body.offsetWidth || frame_document.body.scrollWidth || frame_document.width));
		this.height((frame_document.body.offsetHeight || frame_document.body.scrollHeight || frame_document.height));
	};

	// Close Button
	var close_button = element_content.insert({
		tag: 'a',
		id: id + '-close',
		href: 'javascript:void(0)',
		text: 'X',
		title: 'Close',
		style: ['background: #d1d1d1', 'border: 0', 'border-radius: 50%', 'box-shadow: 0 1px 2px rgba(0,0,0,.5)', 'color: #555', 'font: 800 12px/23px "Arial Black",Verdana,sans-serif', 'height: 23px', 'margin: 0', 'padding: 0', 'opacity: 1', 'position: absolute', 'top: -12px', 'left: -12px', 'text-align: center', 'text-decoration: none', 'width: 23px', 'z-index: 1000'].join(";")
	});
	close_button.element.addEventListener("click", function () {
		element_mask.destroy();
	}, true);

	// Close the frame when clicking on the modal background
	element_mask.element.addEventListener("click", function (e) {
		if (e.target != element_mask.element) return;
		element_mask.destroy();
	}, true);

	// Frame body styles
	frame_document.head.appendChild(new Element({
		tag: 'style',
		type: 'text/css',
		text: [
			'html,body{background:transparent;padding:0;margin:0;}',
			'body{color:#fff;display:inline-block;font:message-box;overflow:auto;padding:8px}',
			'ol,li{list-style:none;margin:0;padding:0;white-space:pre}',
			'a{color:#6cf;text-decoration:none}',
			'a:hover{text-decoration:underline}',
			'a:visited{color:#ba66ff}',
			'hr{height:2px;border:0;background:#444}'
			].join('\n')
	}).element)

	if (content) {
		this.insert(content);
		this.resize();
	}

	// Center frame after window resizes
	var me = this;
	window.addEventListener("resize", function (e) {
		me.center();
	}, false);

	this.center();
	return this;
}