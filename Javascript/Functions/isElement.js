function isElement(obj) {
	return (obj.htmlElement || (obj.nodeName && obj.nodeType === 1)) ? true : false;
}
