/**
 * DOM Element Helper
 *
 * Example, using existing DOM elements:
 * <code>
 * var el1 = new Element(document.body);
 * var el2 = new Element("body > :first-child");
 * </code>
 *
 * Example, creating a new element:
 * <code>
 * var element = new Element({tag: 'div', class: 'some-div'});
 * </code>
 *
 * @author Scott Buchanan
 * @link http://wafflesnatcha.github.com
 * @version r4 2012-06-24
 */

function Element() {
	this.init.apply(this, arguments);
}

Element.prototype = {
	/**
	 * @constructor
	 */
	init: function (config) {
		if (typeof config === "string") {
			var res = [],
				arr = document.querySelectorAll(config);
			if (arr.length == 0) {
				return undefined;
			}
			while (arr.length) {
				res.push(new Element(arr.pop()));
			}
			return (res.length == 1) ? res[0] : res;
		} else if (typeof config === "object") {
			if (config.toString() === "[object Object]") {
				this.element = document.createElement(config.tag);
				this.attr(config);
			} else {
				this.element = config;
			}
		}
		return this;
	},

	destroy: function () {
		this.empty();
		if (this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
		if(this.ondestroy && typeof this.ondestroy === "function") {
			this.ondestroy.call(this);
		}
	},

	empty: function () {
		while (this.element.hasChildNodes()) {
			this.element.removeChild(this.element.firstChild);
		}
	},

	insert: function (content) {
		if (typeof content === "string") {
			this.element.innerHTML += content;
			return this;
		} else if (typeof content === "object") {
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
		return undefined;
	},

	appendTo: function (parent) {
		if (typeof parent !== "object" || !(parent instanceof Element)) {
			parent = new Element(parent);
		}
		return parent.insert(this);
	},

	attr: function (attr, val) {
		if (typeof attr === "string") {
			if (!val) {
				var i, l = this.element.attributes.length;
				for (i = 0; i < l; i++) {
					if (this.element.attributes[i].name == attr) {
						return this.element.attributes[i].value;
					}
				}
				return undefined;

			} else {
				attr = {
					attr: val
				};
			}
		}

		var prop;
		for (prop in attr) {
			if (prop == "text") {
				this.insert(attr[prop]);
			} else if (prop == "children") {
				this.children = [];
				for (var i = 0; i < attr[prop].length; i++) {
					this.children.push(this.insert(attr[prop][i]));
				}
			} else if (prop != "tag") {
				if (attr.hasOwnProperty(prop)) {
					this.element.setAttribute(prop, attr[prop]);
				}
			}
		}

		return this;
	},

	center: function (el) {
		el = el || window;
		this.width(this.width());
		this.height(this.height());
		this.element.style.left = Math.round(((el.innerWidth || el.clientWidth) - this.width()) / 2) + "px";
		this.element.style.top = Math.round(((el.innerHeight || el.clientHeight) - this.height()) / 2) + "px";
	},

	offset: function () {
		var el = this.element,
			offset = {
				left: 0,
				top: 0
			};
		if (el.offsetParent) {
			while (el) {
				offset.left += el.offsetLeft;
				offset.top += el.offsetTop;
				el = el.offsetParent ? el.offsetParent : undefined;
			}
		} else if (el.x && el.y) {
			offset.left += el.x;
			offset.top += el.y;
		} else {
			return undefined;
		}
		return offset;
	},

	height: function (v) {
		if (v) {
			this.element.style.height = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
		}
		return this.element.offsetHeight;
	},

	width: function (v) {
		if (v) {
			this.element.style.width = v + (v.toString().match(/^[0-9]+$/) ? "px" : "");
		}
		return this.element.offsetWidth;
	}
};

/**
 * Shortcut method to
 *
 * Example:
 * <code>
 * $E(document.body).insert('<h1>New Content</h1>');
 * var element = new Element({tag: 'div', class: 'some-div'});
 * </code>
 */

if (!window.hasOwnProperty('$E')) {
	window.$E = function (config) {
		return new Element(config);
	};
}