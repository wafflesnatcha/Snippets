/**
 * Element.Window
 * 
 * @requires Element.js
 */

Element.Window = function(content) {
	var windowEl = window.open(),
		documentEl = windowEl.document;
	documentEl.write();
	documentEl.close();
	this.element = documentEl.body;
	if (content) this.insert(content);
	return this;
}
Element.Window.prototype = Element.prototype
