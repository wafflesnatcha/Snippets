/**
 * Trigger a mouse event on an element or a set of coordinates.
 * 
 * Example:
 * <code>
 * mouseEvent('mousedown', '.summary > button');
 * mouseEvent('click', "button[command='#sort-command']");
 * </code>
 * 
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 * @link http://wafflesnatcha.github.com
 */

function mouseEvent(event, x, y) {
	var el;
	if (typeof x === "number" && typeof y === "number") {
		el = document.elementFromPoint(x, y);
	} else if (typeof x === "string") {
		el = document.querySelector(x);
		x = 0, y = 0;
	} else if (typeof x === "object") {
		el = x;
		x = 0, y = 0;
	}
	if (!el) return false;
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent(event, true, true, window, 1, 0, 0, x, y, false, false, false, false, 0, null);
	return el.dispatchEvent(evt);
}