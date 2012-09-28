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
 * @version r3 2012-06-11
 */
/*jshint browser:true*/
/*global Element*/
Element.Frame = function (content) {
	var id = 'frame-' + (new Date).getTime();
	this.element_mask = new Element({
		tag: 'div',
		id: id,
		style: [
			'background: #000',
			'background: rgba(0,0,0,.8)',
			'border: 0',
			'bottom: 0',
			'display: block',
			'float: none',
			'height: auto',
			'left: 0',
			'margin: 0',
			'max-height: none',
			'max-width: none',
			'min-height: 150px',
			'min-width: 0',
			'padding: 0',
			'position: fixed',
			'right: 0',
			'top: 0',
			'visibility: visible',
			'width: auto',
			'z-index: 999999'
			].join(' !important;') + ' !important;',
		children: [{
			tag: 'div',
			style: ([
				'border-radius: 8px',
				'box-shadow: 0 1px 2px rgba(0,0,0,.5)',
				'background: #222',
				'border: 4px solid #eee',
				'display: block',
				'float: none',
				'margin: 0',
				'max-height: 90%',
				'max-width: 90%',
				'min-height: 80px',
				'min-width: 80px',
				'padding: 0',
				'position: absolute',
				'visibility: visible',
				'z-index: 1'
				].join(' !important; ') + ' !important;').replace(/\s*(box-shadow:([^;]+);)/ig, '-moz-$1 -webkit-$1 $1').replace(/\s*(border-radius:([^;]+);)/ig, '-o-$1 -ms-$1 -moz-$1 -webkit-$1 $1'),
			children: [{
				tag: 'iframe',
				id: id + '-frame',
				src: 'about:blank',
				style: ([
					'border-radius: 8px',
					'background: transparent',
					'border: 0',
					'bottom: auto',
					'display: block',
					'float: none',
					'height: 100%',
					'left: 0',
					'margin: 0',
					'max-height: none',
					'max-width: none',
					'min-height: 0',
					'min-width: 0',
					'padding: 0',
					'position: absolute',
					'right: auto',
					'top: 0',
					'visibility: visible',
					'width: 100%',
					'z-index: 1'
					].join('!important;') + '!important;').replace(/\s*(border-radius:([^;]+);)/ig, '-o-$1 -ms-$1 -moz-$1 -webkit-$1 $1')
			}]
		}]
	});

	// document.body.appendChild(this.element_mask.element);
	this.element_mask.appendTo(document.body);

	var me = this,
		element_mask = this.element_mask,
		element_content = element_mask.children[0],
		frame_document = element_content.children[0].element.contentWindow.document;

	frame_document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><body></body></html>');
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
		if (this.ondestroy && typeof this.ondestroy === "function") {
			this.ondestroy.call(this);
		}
	};
	this.height = function (v) {
		if (v) {
			element_content.height.apply(element_content, arguments);
		}
		return this.element.offsetHeight;
	};
	this.width = function (v) {
		if (v) {
			element_content.width.apply(element_content, arguments);
		}
		return this.element.offsetWidth;
	};
	this.resize = function () {
		this.width((frame_document.body.offsetWidth || frame_document.body.scrollWidth || frame_document.width));
		this.height((frame_document.body.offsetHeight || frame_document.body.scrollHeight || frame_document.height));
		this.center();
	};
	this.addCSS = function (css) {
		return new Element(frame_document.getElementsByTagName('head')[0]).insert({
			tag: 'style',
			type: 'text/css',
			text: css
		});
	};

	// Close Button
	var close_button = element_content.insert({
		tag: 'a',
		id: id + '-close',
		href: 'javascript:void(0)',
		text: 'X',
		title: 'Close',
		style: ([
			'border-radius: 6px',
			'box-shadow: 0 1px 2px rgba(0,0,0,.5)',
			'background: #b03131',
			'background: rgba(176,49,49,.9)',
			'border: 0',
			'color: #fff',
			'display: block',
			'float: none',
			'font: 800 12px/23px "Arial Black", Verdana, sans-serif',
			'height: 23px',
			'left: -12px',
			'margin: 0',
			'opacity: 1',
			'padding: 0',
			'position: absolute',
			'right: auto',
			'text-align: center',
			'text-decoration: none',
			'text-shadow: 0 1px 0 rgba(0,0,0,.3)',
			'top: -12px',
			'visibility: visible',
			'width: 23px',
			'z-index: 1000'
			].join(' !important;') + ' !important;').replace(/\s*(box-shadow:([^;]+);)/ig, '-moz-$1 -webkit-$1 $1').replace(/\s*(border-radius:([^;]+);)/ig, '-o-$1 -ms-$1 -moz-$1 -webkit-$1 $1')
	});
	close_button.element.addEventListener("click", function () {
		me.destroy();
	}, true);

	// Close the frame when clicking on the modal background
	element_mask.element.addEventListener("click", function (e) {
		if (e.target == element_mask.element) {
			me.destroy();
		}
	}, true);

	// Frame body styles
	this.addCSS([
		'html,body{background:transparent;padding:0;margin:0}',
		'body{color:#fff;display:inline-block;font:message-box;overflow:auto;padding:8px}',
		'a{color:#6cf;text-decoration:none}',
		'a:hover{text-decoration:underline}',
		'a:visited{color:#ba66ff}',
		'hr{height:2px;border:0;background:#444}'
		].join(''));

	if (content) {
		this.insert(content);
		this.resize();
	}

	// Center frame after window resizes
	window.addEventListener("resize", function (e) {
		me.center();
	}, false);

	return this;
};
