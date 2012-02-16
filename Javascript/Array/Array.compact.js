/**
 * Array.compact
 * Remove null values from the array
 */
if (!Array.prototype.compact) Array.prototype.compact = function() {
	for (var i = this.length; i > 0; i--) {
		if (this[i] == null) this.splice(i, 1);
	}
	return this;
};
