Element.Frame = function(content) {
	var id = 'frame-' + (new Date).getTime();
	this.El = new Element({
		tag: 'div',
		id: id,
		style: ['background:#000', 'background:rgba(0,0,0,.8)', 'bottom:0', 'left:0', 'position:fixed', 'right:0', 'top:0', 'z-index:10000'].join(";"),
		children: [{
			tag: 'div',
			style: ['padding:10px 20px', 'margin:0', 'position:absolute', 'background:#222', 'background:rgba(34,34,34,.95)', 'border-radius:10px', 'border:4px solid #eee', 'box-shadow:inset 0 0 2px #111, 0 1px 2px 0 rgba(0,0,0,.5)', 'min-width:50px', 'min-height:50px', 'max-width:80%', 'max-height:80%'].join(";"),
			children: [{
				tag: 'iframe',
				id: id + '-frame',
				src: 'about:blank',
				style: ['position:absolute', 'left:0', 'top:0', 'right:auto', 'bottom:auto', 'width:100%', 'height:100%', 'border:0', 'margin:0', 'padding:0', 'background:transparent', 'z-index:1'].join(";")
			}]
		}]
	});

	document.body.appendChild(this.El.element);

	var El = this.El,
		contentEl = El.children[0],
		frameEl = contentEl.children[0],
		frameDocument = frameEl.element.contentWindow.document;

	frameDocument.write();
	frameDocument.close();

	for (var prop in this.El) this[prop] = this.El[prop];
	this.element = frameDocument.body;

	this.center = function() {
		contentEl.center.apply(contentEl, arguments);
	};
	this.height = function() {
		contentEl.height.apply(contentEl, arguments);
	};
	this.width = function() {
		contentEl.width.apply(contentEl, arguments);
	};

	// Close Button
	var close_button = contentEl.insert({
		tag: 'a',
		id: id + '-close',
		href: 'javascript:void(0)',
		text: 'X',
		title: 'Close',
		style: ['background:#333', 'border:2px solid #6a6a6a', 'border-radius:50%', 'box-shadow:0 -12px 14px -10px #1f1f1f inset,0 0 2px #333', 'color:#ddd', 'font:bold 12px/19px Verdana,sans-serif', 'height:22px', 'margin:0', 'padding:0', 'opacity:1', 'position:absolute', 'top:-14px', 'left:-14px', 'text-align:center', 'text-decoration:none', 'text-shadow:0 -1px 0 #000', 'width:22px', 'z-index:1000'].join(";")
	});
	close_button.element.addEventListener("click", function() {
		El.remove.apply(El);
	}, true);

	// Close the frame when clicking on the background
	El.element.addEventListener("click", function(e) {
		if (e.target != El.element) return;
		El.remove.apply(El);
	}, true);

	// CSS Reset
	this.insert('<style type="text/css">body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;}table{border-collapse:collapse;border-spacing:0;}fieldset,img{border:0;}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal;}li{list-style:none;}caption,th{text-align:left;}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}q:before,q:after{content:"";}abbr,acronym{border:0;font-variant:normal;}sup{vertical-align:text-top;}sub{vertical-align:text-bottom;}input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit;}input,textarea,select{*font-size:100%;}legend{color:#000;}a{color:#6cf;text-decoration:none;}a:hover{text-decoration:underline;}</style>');
	this.insert('<style type="text/css">html,body{background:transparent}body{color:#fff;font:13px sans-serif;padding:10px 20px}</style>');

	if (content) {
		this.insert(content);
		this.height(frameDocument.height);
		this.width(frameDocument.width);
	}


	// Center frame after window resizes
	window.addEventListener("resize", function(e) {
		contentEl.center();
	}, false);


	this.center();
	return this;
}
