/**
 * Array.unique (fastest)
 */
if (!Array.prototype.unique) Array.prototype.unique = function() {
	var obj = {},
		i = this.length,
		arr = [],
		t;
	while (i--) t = this[i], obj[t] = t;
	for (i in obj) arr.push(obj[i]);
	return arr;
};

/**
 * Array.unique (retains original order)
 */
if (!Array.prototype.unique) Array.prototype.unique = function() {
	for (var i = 0; i < this.length; i++) {
		var n = this[i];
		for (x = i + 1; x < this.length; x++) {
			while (n == this[x]) this.splice(x, 1)
		}
	}
	return this;
};
