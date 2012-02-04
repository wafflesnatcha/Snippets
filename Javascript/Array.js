function is_array(obj) {
	return toString.call(obj) === "[object Array]"
}

/**
 * Array extensions
 */

/**
 * Array.each
 */
if (!Array.prototype.each) Array.prototype.each = function(fn, bind) {
	for (var i = 0; i < this.length; i++) fn.call(bind, this[i], i);
};

/**
 * Array.each (alternative)
 */
if (!Array.prototype.each) Array.prototype.each = function(fun) {
	var len = this.length;
	if (typeof fun != "function") throw new TypeError();
	var thisp = arguments[1];
	for (var i = 0; i < len; i++) {
		if (i in this) fun.call(thisp, this[i], i, this);
	}
};

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

/**
 * Array.compact
 *
 * Remove null values from the array
 */
if (!Array.prototype.compact) Array.prototype.compact = function() {
	for (var i = this.length; i > 0; i--) {
		if (this[i] == null) this.splice(i, 1);
	}
	return this;
};
