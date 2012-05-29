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
 * @version r1 2012-05-26
 */

Element.Window = function (content) {
	var documentEl = window.open().document;
	documentEl.write();
	documentEl.close();

	this.element = documentEl.body;
	if (content) this.insert(content);
	return this;
}
Element.Window.prototype = Element.prototype