function Element(config) {
	if (typeof config === "string") {
		var res = [],
			arr = document.querySelectorAll(config);
		if (arr.length == 0) return;
		for (var i = 0; i < arr.length; i++) {
			res.push(new Element(arr[i]));
		}
		return res;
	} else if (typeof config === "object") {
		this.config = config;
		if (config.toString() === "[object Object]") {
			this.element = document.createElement(config.tag);
			this.setAttributes(config);
		} else {
			this.element = config;
		}
	}
	return this;
}

Element.prototype = {

	center: function(el) {
		var el = el || window,
			w = el.innerWidth || el.clientWidth,
			h = el.innerHeight || el.clientHeight;
		this.element.style.left = Math.round((w - this.width()) / 2) + "px";
		this.element.style.top = Math.round((h - this.height()) / 2) + "px";
	},

	empty: function() {
		while (this.element.hasChildNodes()) this.element.removeChild(this.element.firstChild);
	},

	height: function(v) {
		if (v >= 0) this.element.style.height = v + "px";
		return this.element.offsetHeight;
	},

	insert: function(content) {
		if (typeof content == "string") this.element.innerHTML += content;
		else if (typeof content == "object") {
			if (content instanceof Element) {
				this.element.appendChild(content.element);
				return content;
			} else if (content.toString() === "[object Object]") {
				var d = new Element(content);
				this.element.appendChild(d.element);
				return d;
			} else {
				this.element.appendChild(content);
				return new Element(content);
			}
		}
	},

	offset: function() {
		var el = this.element,
			offset = {
				left: 0,
				top: 0
			};
		if (el.offsetParent) {
			while (1) {
				offset.left += el.offsetLeft;
				offset.top += el.offsetTop;
				if (!el.offsetParent) break;
				el = el.offsetParent;
			}
		} else if (el.x && el.y) {
			offset.left += el.x;
			offset.top += el.y;
		} else return null;
		return offset;
	},

	remove: function() {
		if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
	},

	setAttributes: function(attr) {
		for (var prop in attr) {
			if (prop == "tag") continue;
			else if (prop == "text") this.insert(attr[prop]);
			else if (prop == "children") {
				this.children = [];
				for (var i = 0; i < attr[prop].length; i++) {
					this.children.push(this.insert(attr[prop][i]));
				}
			} else this.element.setAttribute(prop, attr[prop]);
		}
		return this;
	},

	width: function(v) {
		if (v >= 0) this.element.style.width = v + "px";
		return this.element.offsetWidth;
	}

};
