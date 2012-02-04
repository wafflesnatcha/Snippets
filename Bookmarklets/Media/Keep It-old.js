function inbtwn(a, b, c) {
	try {
		var a1 = a.split(b);
		var a2 = a1[1].split(c);
		return a2[0];
	} catch (err) {
		return '';
	}
}
function inbtwn2(a, b, c) {
	try {
		var a1 = a.split(b);
		var a2 = a1[2].split(c);
		return a2[0];
	} catch (err) {
		return '';
	}
}
var src = document.body.innerHTML.toString();
if (window.location.toString().toLowerCase().match('youtube.com/')) {
	var v = inbtwn(src, 'video_id=', '&');
	var t = inbtwn(src, '&t=', '&');
	var fl = inbtwn(src, '&fmt_list=', '&');
	var title = inbtwn2(src, 'title="', '"');
	if (title == '') {
		title = inbtwn(src, '<h1 id="vt">', '<');
	};
	if (v != '' && t != '') {
		document.location = 'http://www.keepvid.com/?url=http://www.youtube.com/watch?v=' + v + '&vid=' + v + '&tid=' + t + '&flid=' + fl + '&titleid=' + title;
	} else {
		document.location = 'http://www.keepvid.com/?url=' + escape(window.location);
	}
} else {
	document.location = 'http://www.keepvid.com/?url=' + escape(window.location);
}
