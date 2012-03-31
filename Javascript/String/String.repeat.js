if (!String.prototype.repeat) String.prototype.repeat = function(multiplier) {
	return new Array(multiplier + 1).join(this);
}
