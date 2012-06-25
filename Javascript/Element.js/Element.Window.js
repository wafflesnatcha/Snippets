/**
 * Open a new window and manage its content with Element.js
 *
 * Example usage:
 * <code>
 * var el = new Element.Window('<p>some text <b>bold text</b></p>');
 * el.insert('<p>Some <i>more</i> text</p>');
 * </code>
 *
 * @requires Element.js
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 * @link http://wafflesnatcha.github.com
 * @version r2 2012-06-24
 */

Element.Window = function (content) {
	var documentEl = window.open().document;
	documentEl.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><body></body></html>');
	documentEl.close();
	this.element = documentEl.body;
	if (content) {
		this.insert(content);
	}
	return this;
};

Element.Window.prototype = Element.prototype;
