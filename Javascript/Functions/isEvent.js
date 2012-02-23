function isEvent(obj) {
	return (window.Event && obj instanceof Event) || (Aurora.isObject(obj) && Aurora.isUndefined(obj.constructor) && (window.event && obj.clientX && obj.clientX === window.event.clientX));
}
