(function() {
	var shadowWidth = 5;
	var shadowHeight = 17;

	function bookmaplet() {
		var txt = extractSelection();

		if (txt == "") {
			alert("Nothing selected");
			return;
		}

		txt = txt.replace(/\r\n|\r|\n/g, ", ");
		txt = encodeURIComponent(txt).replace(/ /g, "+");

		installViewElements(txt);
	}

	function extractSelection() {
		var txt;
		if (window.getSelection) {
			txt = '' + window.getSelection();
		} else if (document.selection) {
			txt = document.selection.createRange().text;
		} else if (document.selection) {
			txt += document.selection.createRange().text;
		}

		return txt;
	}

	function installViewElements(txt) {
		var bmp_container = createDiv();
		bmp_container.id = "bmp_container";
		bmp_container.style.position = "absolute";
		bmp_container.style.top = scrollPos().y + "px";
		bmp_container.style.right = "0";
		bmp_container.style.width = "auto";
		bmp_container.style.zIndex = 100000;

		var bmp_shadow = createDiv(bmp_container);
		bmp_shadow.id = "bmp_shadow";
		bmp_shadow.style.backgroundColor = "black";
		bmp_shadow.style.position = "absolute";
		bmp_shadow.style.zIndex = 0;
		bmp_shadow.style.top = "0";
		bmp_shadow.style.right = "0";
		setOpacity(bmp_shadow, 0.3);

		var bmp_map = createDiv(bmp_container);
		bmp_map.id = "bmp_map";
		bmp_map.style.backgroundColor = "white";
		bmp_map.style.zIndex = 2;
		bmp_map.style.width = "450px";
		bmp_map.style.height = "290px";
		bmp_map.innerHTML = '<iframe src="http://www.bookmaplet.com/mapping?a=' + txt + '&o=' + location.href + '" frameborder="0" id="bmp_iframe" style="width:100%;height:100%;border:0px;padding:0px;margin:0px"></iframe>';
		//		bmp_map.innerHTML = '<iframe src="http://localhost:8888/mapping?a=' + txt + '&o=' + location.href + '" frameborder="0" id="bmp_iframe" style="width:100%;height:100%;border:0px;padding:0px;margin:0px"></iframe>';
		document.body.appendChild(bmp_container);

		bmp_shadow.style.width = (bmp_map.offsetWidth + shadowWidth) + "px";
		bmp_shadow.style.height = (bmp_map.offsetHeight + shadowHeight) + "px";

		window.onscroll = function() {
			bmp_container.style.top = scrollPos().y + "px";
		};

		var closeElement = document.createElement("img");
		closeElement.style.position = "relative";
		closeElement.style.left = "405px";
		closeElement.src = 'http://www.bookmaplet.com/images/close.png';
		//		closeElement.src = 'http://localhost:8888/images/close.png';
		closeElement.onclick = function() {
			var node = document.getElementById("bmp_container");
			node.parentNode.removeChild(node);
		}
		bmp_container.appendChild(closeElement);

		var openingooglemapsElement = document.createElement("a");
		openingooglemapsElement.style.position = "relative";
		openingooglemapsElement.style.left = "205px";
		openingooglemapsElement.style.backgroundColor = "white";
		openingooglemapsElement.style.foregroundColor = "white";
		openingooglemapsElement.href = 'http://maps.google.com/maps?q=' + txt;
		openingooglemapsElement.innerHTML = '<img style="border-style: none" src=\"http://www.bookmaplet.com/images/openingooglemaps.png\">';
		//		openingooglemapsElement.innerHTML = '<img style="border-style: none" src=\"http://localhost:8888/images/openingooglemaps.png\">';		
		bmp_container.appendChild(openingooglemapsElement);
	}

	function createDiv(parent) {
		var element = document.createElement("div");
		element.style.padding = "0";
		element.style.margin = "0";
		element.style.border = "0";
		element.style.position = "relative";
		if (parent) {
			parent.appendChild(element);
		}
		return element;
	}

	function scrollPos() {
		if (self.pageYOffset !== undefined) {
			return {
				x: self.pageXOffset,
				y: self.pageYOffset
			};
		}
		var doc_element = document.documentElement;
		return {
			x: doc_element.scrollLeft,
			y: doc_element.scrollTop
		};
	}

	function setOpacity(element, opacity) {
		if (navigator.userAgent.indexOf("MSIE") != -1) {
			var normalized = Math.round(opacity * 100);
			element.style.filter = "alpha(opacity=" + normalized + ")";
		} else {
			element.style.opacity = opacity;
		}
	}

	bookmaplet();
})();