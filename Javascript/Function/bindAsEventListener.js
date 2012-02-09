Function.prototype.bindAsEventListener = function () {
	var __method = this,
		args = Array.prototype.slice.call(arguments),
		object = args.shift();
	return function (event) {
		return __method.apply(object, [event || window.event].concat(args));
	}
};
