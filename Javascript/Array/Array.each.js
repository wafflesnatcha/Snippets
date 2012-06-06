/**
 * Array.each
 */
if (!Array.prototype.each) {
	Array.prototype.each = function (fn, bind) {
		var i, l = this.length;
		for (i = 0; i < l; i++) {
			fn.call(bind || this, this[i], i);
		}
	};
}

/**
 * Array.each
 * (alternative)
 */
if (!Array.prototype.each) {
	Array.prototype.each = function (callback) {
		if (typeof callback !== "function") {
			throw new TypeError();
		}
		var i, l = this.length,
			thisp = arguments[1];
		for (i = 0; i < l; i++) {
			if (i in this) {
				callback.call(thisp, this[i], i, this);
			}
		}
	};
}