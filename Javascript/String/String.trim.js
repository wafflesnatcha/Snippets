/**
 * Removes whitespace from both ends of the string.
 *
 * @returns {String} The trimmed string.
 */
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}
