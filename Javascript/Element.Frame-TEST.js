(function() {

	/**
	 * @requires Element, Element.Frame
	 */

	function Win(url) {
		if (url) return window.open(url);
		var w = window.open().document;
		w.write();
		w.close();
		this.element = w.body;
		return this;
	}
	Win.prototype.insert = Element.prototype.insert;

	function FrameInline(content) {
		var id = "frame-" + (new Date).getTime();

		this.El = new Element({
			tag: "div",
			id: id,
			children: [{
				tag: "style",
				type: "text/css",
				text: "#" + id + "{background:#000;background:rgba(0,0,0,.75);bottom:0;left:0;position:fixed;right:0;top:0;z-index:10000;}#" + id + "-content{background:#222;border-radius:6px;border:4px solid #eee;box-shadow:0 1px 2px rgba(0,0,0,.5);color:#fff;font:14px sans-serif;padding:8px 12px;position:fixed;}#" + id + "-content a{color:#6CF;}"
			}, {
				tag: "div",
				id: id + "-content"
			}]
		});

		document.body.appendChild(this.El.element);
		this.El = this.El.children[1];
		for (var prop in this.El) this[prop] = this.El[prop];
		if (content) this.insert(content);
		this.center();
		return this;
	}


	/**
	 * Test cases
	 */
	var test_data = 'Duis tortor lacus, porttitor non ultrices nec, euismod eu nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac lacus quis urna accumsan faucibus eget at odio. Sed laoreet massa et dolor facilisis sed auctor nibh ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec aliquet consectetur odio non tristique. Aenean nisl tortor, imperdiet at consequat sit amet, porttitor sit amet magna. Integer fringilla, elit quis tincidunt dapibus, nulla magna faucibus nisi, vitae euismod sem mauris ac ante. Donec pharetra nisl eget metus sollicitudin sodales. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed commodo blandit turpis eu interdum. Pellentesque vestibulum fringilla mi sit amet sodales. Nunc dignissim ante eget urna ultricies venenatis. Etiam in rutrum est.';
	test_data += '<br><br>Testing... <a href="http://www.google.com">google.com</a><br><a href="#">http://www.awwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww-wwwwwwwwwwwwwwwwwshiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiitttttttttt.com/this/is/a/really/lo-ng/url/that/will/probably/fuck/up/the/sizing.html</a>';

	// window.W = new Win();
	// W.insert(test_data);
	// console.log(W);
	// window.F = new Element.Frame(test_data);
	// console.log(F);
	window.I = new FrameInline(test_data);
	console.log(I);

})()
