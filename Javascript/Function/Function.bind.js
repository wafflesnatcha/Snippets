/**
 * Bind a function to an object.
 * 
 * Returns a new function that when called, will always have `this` set to the
 * bound object.
 */
if (!Function.prototype.bind) {
	Function.prototype.bind = function (object) {
		var __method = this;
		return function () {
			return __method.apply(object, arguments);
		};
	};
}