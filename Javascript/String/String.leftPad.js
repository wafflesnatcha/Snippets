/**
 * Pad a string to a certain length with another string.
 *
 * @param {Number} size The resulting padded string length.
 * @param {String} [str=" "] String to use as padding.
 * @returns {String} The padded string.
 */
if (!String.prototype.leftPad) {
	String.prototype.leftPad = function (length, str) {
		if (this.length >= length) return this;
		var str = str || ' ';
		return (new Array(Math.ceil((length - this.length) / str.length) + 1).join(str)).substr(0, (length - this.length)) + this;
	};
}