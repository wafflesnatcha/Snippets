/**
 * Clip the character length of string at the middle.
 *
 * @param {Number} limit Maximum character length of the returned string.
 * @param {String} [separator="..."] String to be placed in the middle of the returned string.
 * @returns {String} The shortened string.
 */
String.prototype.overflow = function (limit, separator) {
	if (limit < 4 || limit >= this.length) {
		return this;
	}
	return this.substring(0, Math.ceil(limit / 2)) + (separator || '...') + this.substring(this.length - Math.floor(limit / 2));
};
