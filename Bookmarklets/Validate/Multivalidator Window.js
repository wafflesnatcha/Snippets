if (0) void('Multivalidator script (c)2002 Tantek Celik - last modified 2002.03.15');
var p27 = String.fromCharCode(37) + '27',
	d = document.location,
	ft = '<frame ',
	fs = ft + 'src=',
	fe = '\' scrolling=\'auto\'>',
	fc = ft + 'style=\'border:2px solid #ff0\' src=\'http://',
	fm = '</frameset>';
var h = fs + '\'javascript:document.write(' + p27 + '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN"><body style="margin:0;padding:2px 6px">';
var h1 = '<h1 style="display:inline;font-size:18px;margin:0;">';
var e = '></body>' + p27 + ')\' scrolling=\'no\' noresize>';
var q = String.fromCharCode(34);
var r = ' results',
	v = ' validator' + r,
	w = 'validator.w3.org/check';
var ds = '<!DOCTYPE HTML PUBLIC ' + q + '-//W3C//DTD HTML 4.0 Frameset//EN' + q + '><html><head><title>Multivalidator</title></head><frameset cols=\'50%,50%\'><frameset rows=\'24,*\'>';
ds += h + '<div>' + h1 + 'Page:</h1>' + d + '</div' + e;
e = '</h1' + e;
h += '<h1 style="display:inline;font-size:18px;margin:0;">';
ds += h + '<script>document.location="' + d + '"</script>' + e + fm + '<frameset rows=\'24,*,24,*,24,*\'>';
ds += h + 'HTML' + v + '<a title="Refresh to remultivalidate. Click for more info on favelets. -Tantek" href=http://favelets.com/ target=help style="float:right;padding:1px;width:1em;font:10px Avant Garde,Chicago,Times,Arial,serif;text-decoration:none">@</a>' + e;
ds += fc + w + '?uri=' + d + fe;
ds += h + 'CSS' + v + e;
ds += fc + 'jigsaw.w3.org/css-validator/validator?uri=' + d + fe;
ds += h + 'HREF checker' + r + e;
ds += fc + w + 'link?url=' + d + fe;
ds += fm + fm + '</html>';
var w = window.open('about:blank', 'Multivalidator', 'toolbar=yes,status=yes,resizable=yes');
w.document.write(ds);
w.document.close();
w.focus();
void(20020315);
