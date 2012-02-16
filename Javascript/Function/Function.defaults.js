/**
 * awesome default function argument trick
 *
 * @link http://parentnode.org/javascript/default-arguments-in-javascript-functions/
 */

if (!Function.prototype.defaults) Function.prototype.defaults = function () {
	var _f = this;
	var _a = Array(_f.length - arguments.length).concat(Array.prototype.slice.apply(arguments));
	return function () {
		return _f.apply(_f, Array.prototype.slice.apply(arguments).concat(_a.slice(arguments.length, _a.length)));
	}
}
