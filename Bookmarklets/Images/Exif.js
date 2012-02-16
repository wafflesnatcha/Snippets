(function () {

	function f1(obj) {
		if (obj.links.length > 0) {
			var R = /.(jpe?g|nef|raw|tiff)$/i;
			for (i = 0; i < obj.links.length; i++) {
				if (R.test(obj.links[i].href)) {
					return obj.links[i].href;
				}
			}
		}
		return null;
	}

	function f2(obj) {
		if (obj.images.length == 1) return obj.images[0].src;
		return null;
	}

	function f3(obj) {
		if (obj.images.length >= 1) {
			var img;
			var max = 0;
			for (i = 0; i < obj.images.length; i++) {
				size = obj.images[i].width * obj.images[i].height;
				if (size > max) {
					max = size;
					img = obj.images[i];
				}
			}
			return img;
		}
		return null;
	}

	function f4(obj) {
		var img = f3(obj);
		if (img) return img.src;
		return null;
	}

	function f5(FRAMES) {
		for (var fr = 0; O == null && fr < FRAMES.length; fr++) {
			try {
				var url = f1(FRAMES[fr].document);
				if (url) return url;
			} catch (er) {}
		}
		var max = 0;
		var img;
		for (var fr = 0; O == null && fr < FRAMES.length; fr++) {
			try {
				var I = f3(FRAMES.document);
				if (I && I.width * I.height > max) {
					img = I;
					max = I.width * I.height;
				}
			} catch (er) {}
			if (img) return img.src;
		}
		return null
	}

	var img_url = f1(document) || f2(document) || f4(document) || f5(frames);
	if (img_url) {
		window.open("http://regex.info/exif.cgi?imgurl=" + encodeURIComponent(img_url));
	} else {
		alert("Sorry,I could not find out an image to report on");
	}

})()
