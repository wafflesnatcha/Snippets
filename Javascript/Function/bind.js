if (!Function.prototype.bind) Function.prototype.bind = function (object) {
	var __method = this;
	return function () {
		return __method.apply(object, arguments);
	}
};
