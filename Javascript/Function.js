// awesome default function argument trick 
// http://parentnode.org/javascript/default-arguments-in-javascript-functions/
if (!Function.prototype.defaults) Function.prototype.defaults = function() {
	var _f = this;
	var _a = Array(_f.length - arguments.length).concat(Array.prototype.slice.apply(arguments));
	return function() {
		return _f.apply(_f, Array.prototype.slice.apply(arguments).concat(_a.slice(arguments.length, _a.length)));
	}
}


if (!Function.prototype.bind) Function.prototype.bind = function(object) {
	var __method = this;
	return function() {
		return __method.apply(object, arguments);
	}
};

Function.prototype.bindAsEventListener = function() {
	var __method = this;
	args = $A(arguments), object = args.shift();
	return function(event) {
		return __method.apply(object, [event || window.event].concat(args));
	}
};

function $A(iterable) {
	if (!iterable) return [];
	if (iterable.toArray) return iterable.toArray();
	var length = iterable.length || 0,
		results = new Array(length);
	while (length--) results[length] = iterable[length];
	return results;
}
