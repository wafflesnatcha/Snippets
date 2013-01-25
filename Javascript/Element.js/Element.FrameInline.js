/**
 * A modal window using Element.js
 * 
 * The window's content is not contained in an iframe like {Element.Frame}.
 * 
 * Example usage:
 * <code>
 * var el = new Element.FrameInline('<p>some text <b>bold text</b></p>')
 * el.insert('<p>Some <i>more</i> text</p>');
 * el.center();
 * </code>
 * 
 * @requires Element.js
 * @author Scott Buchanan
 * @link http://wafflesnatcha.github.com
 * @version r2 2012-06-24
 */

/**
 * @param {String|Object} [content] Initial frame content.
 */
Element.FrameInline = function (content) {
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
			].join('!important;') + '!important;',
		children: [{
			tag: 'style',
			type: 'text/css',
			text: [
				/** YUI CSS Reset (3.5.1) */
				"%% html{color:#000;background:#FFF}%% body,%% div,%% dl,%% dt,%% dd,%% ul,%% ol,%% li,%% h1,%% h2,%% h3,%% h4,%% h5,%% h6,%% pre,%% code,%% form,%% fieldset,%% legend,%% input,%% textarea,%% p,%% blockquote,%% th,%% td{margin:0;padding:0}%% table{border-collapse:collapse;border-spacing:0}%% fieldset,%% img{border:0}%% address,%% caption,%% cite,%% code,%% dfn,%% em,%% strong,%% th,%% var{font-style:normal;font-weight:normal}%% ol,%% ul{list-style:none}%% caption,%% th{text-align:left}%% h1,%% h2,%% h3,%% h4,%% h5,%% h6{font-size:100%;font-weight:normal}%% q:before,%% q:after{content:''}%% abbr,%% acronym{border:0;font-variant:normal}%% sup{vertical-align:text-top}%% sub{vertical-align:text-bottom}%% input,%% textarea,%% select{font-family:inherit;font-size:inherit;font-weight:inherit}%% input,%% textarea,%% select{*font-size:100%}%% legend{color:#000}#yui3-css-stamp.cssreset-context{display:none}",
				].join('').replace(/%%/g, '#' + id + '-content') + '\n\r' + [
				/** custom styles for the frame ('%%' is replace with the frame elements ID selector) */
				'%% ol, %% ul { list-style: initial; margin: 0 0 0 40px; }',
				'%% a { color: #6cf; text-decoration: none; }',
				'%% a:hover { text-decoration: underline; }',
				'%% a:visited { color: #ba66ff; }',
				'%% hr { height: 2px; border: 0; background: #444; }',
				].join('\n\r').replace(/%%/g, '#' + id + '-content').replace(/;/g, '!important;')
		}, {
			tag: 'div',
			id: id + '-content',
			style: [
				'background: #222',
				'border-radius: 8px',
				'border: 4px solid #eee',
				'box-shadow: 0 1px 2px rgba(0,0,0,.5)',
				'color: #fff',
				'font: message-box',
				'margin: 0',
				'max-height: 80%',
				'max-width: 80%',
				'min-height: 30px',
				'min-width: 30px',
				'overflow:auto',
				'padding: 8px',
				'position: absolute',
				'text-align: left'
				].join('!important;') + '!important;'
		}]
	});

	document.body.appendChild(mask_element.element);

	var content_element = mask_element.children[1];
	for (var prop in content_element) {
		this[prop] = content_element[prop];
	}

	// Override some functions
	this.destroy = function () {
		mask_element.destroy.apply(mask_element, arguments);
	};

	// Close the frame when clicking on the background
	mask_element.element.addEventListener("click", function (e) {
		if (e.target == mask_element.element) {
			mask_element.destroy.apply(mask_element);
		}
	}, true);

	if (content) {
		this.insert(content);
		this.center();
	}
	return this;
}