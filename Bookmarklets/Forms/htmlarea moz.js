(function() {
	for (i = 0; f = document.forms[i]; ++i) for (j = 0; t = f[j]; ++j) if (t.tagName == "TEXTAREA" && !t.midasified) {
		var m = document.createElement("iframe");
		t.parentNode.insertBefore(m, t);
		Midas(m, t.value);
		m.style.background = "white";
		m.style.width = getComputedStyle(t, "").getPropertyValue("width");
		m.style.height = getComputedStyle(t, "").getPropertyValue("height");
		m.style.border = "2px inset green";
		m.oldTextarea = t;
		t.midasified = true;
		t.style.display = "none";
		var U = makeUpdate(m);
		setInterval(U, 50);
		f.addEventListener("submit", U, false);
		if (q = f.posttype) {
			q.selectedIndex = 1;
			q.style.background = "#dfd";
		}
	}

	function makeUpdate(M) {
		return function() {
			M.oldTextarea.value = M.contentDocument.body.innerHTML;
		}
	}

	function Midas(M, V) {
		M.onload = function() {
			M.contentDocument.body.innerHTML = V;
			M.contentDocument.designMode = "on";
			this.onload = function() {
				M.contentDocument.body.innerHTML = V;
			}
		}
	}
})()