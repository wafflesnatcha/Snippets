var fz = new Array();
var z = new Array();

function F(p) {
	var m = new Array();
	for (n = 0; n < p.length; n++) {
		var q = new Array();
		for (ind = 0; ind < p[n].length; ind++) {
			q.push('\'' + p[n][ind] + '\'')
		}
		m[n] = eval('[' + q.join(',') + ']');
	}
	return m;
}
function C(n, cz) {
	var i = -1;
	for (ab = 0; ab < cz.length; ab++) {
		if (cz[ab][1] == n) i = ab;
	}
	return i;
}
function B() {
	fz.length = 0;
	if (!document.forms.length) {
		alert('There are no forms in this page.');
		return;
	}
	for (fi = 0; fi < document.forms.length; fi++) {
		z.length = 0;
		f = document.forms[fi];
		for (i = 0; i < f.length; i++) {
			ip = f.elements[i].type;
			iv = f.elements[i].value;
			ix = f.elements[i].name;
			if (!iv) {
				continue;
			}
			if (ip == 'text' || ip == 'textarea' || ip == 'select-one' || ip == 'password') z.push(['d', ix, iv]);
			if (ip == 'radio' || ip == 'checkbox' || ip == 'select-multiple') {
				x = C(ix, z);
				if (x == -1) {
					if (ip == 'select-multiple') {
						iv = "";
						for (g = 0; g < f.elements[i].length; g++) {
							if (f.elements[i][g].selected) {
								iv += f.elements[i][g].value + "|";
							}
						}
						z.push(['s', ix, iv]);
					}
					if (ip == 'radio') {
						if (f.elements[i].checked) {
							z.push(['c', ix, iv]);
						}
					} else {
						if (f[ix].length) {
							if (f.elements[i].checked) {
								z.push(['c', ix, iv]);
							}
						} else {
							if (f.elements[i].checked) {
								z.push(['n', ix, '']);
							}
						}
					}
				} else {
					if (f.elements[i].checked) {
						z[x][2] += "|" + iv;
					}
				}
			}
		}
		fz.push(F(z));
	}
	bms = new Array();
	for (f = 0; f < fz.length; f++) {
		if (!fz[f].length) {
			continue;
		}
		bm = "java" + "script:function D(a,b){c=b.split('|');d=false;for(q=0;q<c.length;q++){if(c[q]==a)d=true;}return d;}";
		bm += "function E(){f" + f + "=document.forms[" + f + "];";
		for (k = 0; k < fz[f].length; k++) {
			if (fz[f][k][0] == "d") {
				bm += "f" + f + "['" + fz[f][k][1] + "'].value='" + fz[f][k][2] + "';";
			}
			if (fz[f][k][0] == "n") {
				bm += "f" + f + "['" + fz[f][k][1] + "'].checked=true;";
			}
			if (fz[f][k][0] == "c") {
				bm += "for(i=0;i<f" + f + "['" + fz[f][k][1] + "'].length;i++){if(D(f" + f + "['" + fz[f][k][1] + "'][i].value,'" + fz[f][k][2] + "')){f" + f + "['" + fz[f][k][1] + "'][i].checked=true;}}";
			}
			if (fz[f][k][0] == "s") {
				bm += "for(i=0;i<f" + f + "['" + fz[f][k][1] + "'].length;i++){if(D(f" + f + "['" + fz[f][k][1] + "'][i].value,'" + fz[f][k][2] + "')){f" + f + "['" + fz[f][k][1] + "'][i].selected=true;}}";
			}
		}
		bm += "}E()";
		bms.push(bm);
	}
	w = window.open('', '', 'toolbar,width=150,height=100');
	for (f = 0; f < bms.length; f++) {
		w.document.write("<a href=\"" + bms[f] + "\">Form #" + (f + 1) + "</a><br />");
	}
	w.document.write("Drag the link onto your toolbar.");
	w.document.close();
}
B();
