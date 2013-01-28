/**
 * Compact a string in the center (with ellipsis).
 *
 * @returns {String}
 */
String.prototype.overflow = function (max) {
	if (max < 4 || max >= this.length) {
		return this;
	}
	var l = this.length,
		m = Math.floor(l / 2),
		b = Math.floor((l - max) / 2);
	return this.substring(0, m - b) + '...' + this.substring(m + l - max - b);
};
