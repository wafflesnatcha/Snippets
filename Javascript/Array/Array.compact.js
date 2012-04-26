/**
 * Array.compact
 * Remove null (undefined) values from the array
 */
if (!Array.prototype.compact) Array.prototype.compact = function() {
	var i = this.length;
	for (i; i > 0; i--) if (this[i] === null || this[i] === undefined) this.splice(i, 1);
	return this;
};

/**
 * Array.compact
 * Remove from the array: null, undefined, empty string, false, 0
 */
if (!Array.prototype.compact) Array.prototype.compact = function() {
	var v, i = this.length;
	for (i; i > 0; i--) if (this[i] === null || this[i] === undefined || this[i] === "" || this[i] === false || this[i] === 0) this.splice(i, 1);
	return this;
};