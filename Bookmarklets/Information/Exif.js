var form = document.createElement("form");
form.action = "http:" + "//regex" + ".info/exif.cgi";
form.method = "get";
form.target = "exif";
var O = document.createElement("input");
O.type = "hidden";
O.name = "b";
O.value = 3;
form.appendChild(O);
O = document.createElement("input");
O.type = "hidden";
O.name = "referer";
O.value = document.location;
form.appendChild(O);
O = null;

function f1(obj) {
	if (obj.links.length > 0) {
		var R = /.(jpe?g|nef|raw|tiff)$/i;
		var count = 0;
		var url;
		for (i = 0; i < obj.links.length; i++) {
			if (R.test(obj.links[i].href)) {
				count++;
				url = obj.links[i].href
			}
		}
		if (count == 1) {
			var O = document.createElement("input");
			O.type = "hidden";
			O.name = "imgurl";
			O.value = url;
			return O;
		}
	}
	return null;
}
function f2(obj) {
	if (obj.images.length == 1) {
		var O = obj.createElement("input");
		O.type = "hidden";
		O.name = "imgurl";
		O.value = obj.images[0].src;
		return O;
	}
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
	if (img) {
		O = obj.createElement("input");
		O.type = "hidden";
		O.name = "imgurl";
		O.value = img.src;
		return O;
	}
	return null;
}
function f5(FRAMES) {
	for (var fr = 0; O == null && fr < FRAMES.length; fr++) {
		try {
			var O = f1(FRAMES[fr].document);
			if (O) return O;
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
		if (img) {
			O = obj.createElement("input");
			O.type = "hidden";
			O.name = "imgurl";
			O.value = img.src;
			return O;
		}
	}
	return null
}
var O = f1(document);
if (!O) O = f2(document);
if (!O) O = f4(document);
if (!O) O = f5(frames);
if (O) {
	form.appendChild(O);
	document.body.appendChild(form);
	form.submit();
} else {
	alert("Sorry,I could not find out an image to report on");
}
