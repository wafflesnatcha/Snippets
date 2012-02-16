if (!String.prototype.leftPad) String.prototype.leftPad = function(l, c) {
	return new Array(l - this.length + 1).join(c || '0') + this;
}