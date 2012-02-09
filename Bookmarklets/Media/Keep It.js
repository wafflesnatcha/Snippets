(a = (b = document).createElement('script')).src = 'http://keepvid.com/js/bm.js', b.body.appendChild(a);
void(0);

// http://keepvid.com/js/bm.js
/*
function i(a, b, c) {
	try {
		var a1 = a.split(b);
		var a2 = a1[1].split(c);
		return a2[0];
	} catch (err) {
		return '';
	}
}

function finishkv() {
	var gd = d.createElement("div");
	gd.innerHTML = "<form method='post' action='http://keepvid.com/?url=" + escape(document.location) + "&bm=y' id='kvdl'><input type='hidden' name='vid' value='" + video_id + "' /><input type='hidden' name='title' value='" + title + "' /><input type='hidden' name='fmt' value='" + fmt + "' /><input class='master-sprite-new yt-uix-button yt-uix-tooltip' type='submit' value='Download with KeepVid' /></form>";
	d.body.appendChild(gd);
	document.forms["kvdl"].submit();
}
var d = document;
if (d.location.href.match(/youtube.com/i)) {
	var video_id = i(d.body.innerHTML, ';video_id=', '&');
	if (video_id == '') video_id = i(d.body.innerHTML, '"video_id": "', '"');
	var title = i(d.body.innerHTML, 'title" content="', '"');
	if (title == '') title = i(d.body.innerHTML, 'ltr" title="', '"');
	var fmt = i(d.body.innerHTML, 'fmt_stream_map=', '&');
	if (fmt == '') fmt = i(kvajax.responseText, 'fmt_stream_map": "', '"').replace("\\/", "/");
	if (fmt == '') {
		var kvajax = false;
		if (!kvajax && typeof XMLHttpRequest != 'undefined') {
			kvajax = new XMLHttpRequest();
		}
		kvajax.open("GET", "http://www.youtube.com/get_video_info?video_id=" + video_id + "&fmt=18", true);
		kvajax.onreadystatechange = function() {
			if (kvajax.readyState == 4) {
				title = i(kvajax.responseText, '&title=', '&');
				if (title == '') title = i(kvajax.responseText, 'title=', '&');
				fmt = i(kvajax.responseText, 'fmt_stream_map=', '&');
				if (fmt == '') fmt = i(kvajax.responseText, 'fmt_stream_map": "', '"').replace("\\/", "/");
				finishkv();
			}
		}
		kvajax.send();
	} else {
		finishkv();
	}
} else {
	document.location.href = 'http://keepvid.com/?url=' + escape(window.location);
}
*/
