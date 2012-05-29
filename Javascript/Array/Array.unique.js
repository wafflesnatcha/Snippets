/**
 * Array.unique
 * 
 * faster
 */
if (!Array.prototype.unique) {
	Array.prototype.unique = function () {
		var obj = {},
			i = this.length,
			arr = [],
			t;
		while (i--) t = this[i], obj[t] = t;
		for (i in obj) arr.push(obj[i]);
		return arr;
	};
}

/**
 * Array.unique
 * 
 * retains original order
 * modifies source array
 */
if (!Array.prototype.unique) {
	Array.prototype.unique = function () {
		var i, x, l = this.length;
		for (i = 0; i < this.length; i++) {
			for (x = i + 1; x < this.length; x++) {
				while (this[i] == this[x]) this.splice(x, 1);
			}
		}
		return this;
	};
}