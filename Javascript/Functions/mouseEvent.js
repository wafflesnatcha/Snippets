/**
 * Trigger a mouse event on an element or a set of document coordinates.
 *
 * Example:
 * <code>
 * mouseEvent('mousedown', '.some-element-class > button');
 * mouseEvent('click', document.body.childNodes[0]);
 * </code>
 *
 * Example using coordinates:
 * <code>
 * mouseEvent('mouseover', 35, 600);
 * </code>
 *
 * @returns {Boolean}
 * @author Scott Buchanan
 * @link http://wafflesnatcha.github.com
 */

function mouseEvent(name, x, y) {
	var el;
	if (typeof x === "number" && typeof y === "number") {
		el = document.elementFromPoint(x, y);
	} else if (typeof x === "string") {
		el = document.querySelector(x);
		x = 0;
		y = 0;
	} else if (typeof x === "object") {
		el = x;
		x = 0;
		y = 0;
	}
	if (!el) {
		return false;
	}
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent(name, true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
	return el.dispatchEvent(evt);
}