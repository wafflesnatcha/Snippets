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
