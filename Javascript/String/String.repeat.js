/**
 * Return the string repeated {multiplier} times.
 *
 * @param {Number} multiplier Number of times to repeat the string.
 * @returns {String} The repeated string.
 */
if (!String.prototype.repeat) {
	String.prototype.repeat = function (multiplier) {
		return new Array(multiplier + 1).join(this);
	};
}