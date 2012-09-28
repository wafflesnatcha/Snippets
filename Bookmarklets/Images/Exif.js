/*jshint browser:true*/
(function () {
	function f1(obj) {
		var i, l = obj.links.length,
			R = /\.(jpe?g|nef|raw|tiff)$/i;
		for (i = 0; i < l; i++) {
			if (R.test(obj.links[i].href)) {
				return obj.links[i].href;
			}
		}
		return null;
	}

	function f2(obj) {
		if (obj.images.length == 1) {
			return obj.images[0].src;
		}
		return null;
	}

	function f3(obj) {
		if (obj.images.length < 1) {
			return null;
		}
		var img, i, s, max = 0;
		for (i = 0; i < obj.images.length; i++) {
			s = obj.images[i].width * obj.images[i].height;
			if (s > max) {
				max = s;
				img = obj.images[i];
			}
		}
		return img;
	}

	function f4(obj) {
		var img = f3(obj);
		if (img) {
			return img.src;
		}
		return null;
	}

	function f5(FRAMES) {
		var fr, img, max = 0;
		for (fr = 0; fr < FRAMES.length; fr++) {
			try {
				var url = f1(FRAMES[fr].document);
				if (url) {
					return url;
				}
			} catch (er) {}
		}
		for (fr = 0; fr < FRAMES.length; fr++) {
			try {
				var I = f3(FRAMES.document);
				if (I && I.width * I.height > max) {
					img = I;
					max = I.width * I.height;
				}
			} catch (er) {}
			if (img) {
				return img.src;
			}
		}
		return null;
	}

	var img_url = f1(document) || f2(document) || f4(document) || f5(frames);
	if (img_url) {
		window.open("http://regex.info/exif.cgi?imgurl=" + encodeURIComponent(img_url));
	} else {
		window.alert("Sorry,I could not find out an image to report on");
	}
}());
