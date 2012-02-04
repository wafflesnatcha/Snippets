if (!String.prototype.leftPad) String.prototype.leftPad = function(l, c) {
	return new Array(l - this.length + 1).join(c || '0') + this;
}


if (!String.prototype.substr) String.prototype.substr = function(f_start, f_length) {
	f_string = this + '';
	if (f_start < 0) f_start += f_string.length;
	if (f_length == undefined) f_length = f_string.length;
	else if (f_length < 0) f_length += f_string.length;
	else f_length += f_start;
	if (f_length < f_start) f_length = f_start;
	return f_string.substring(f_start, f_length);
};

if (!String.prototype.trim) String.prototype.trim = function() {
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
