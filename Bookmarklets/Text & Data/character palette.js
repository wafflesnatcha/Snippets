function characterPalette() {
	var testwidth = document.createElement("div");
	testwidth.style.position = 'fixed';
	testwidth.style.left = '0';
	testwidth.style.top = '0';
	testwidth.style.width = '100%';
	testwidth.style.height = '100%';
	document.body.appendChild(testwidth);
	var docWidth = testwidth.scrollWidth;
	document.body.removeChild(testwidth);
	var width = 260;
	var div = document.createElement("div");
	var closeButton = document.createElement("div");
	closeButton.style.textAlign = 'right';
	closeButton.style.padding = '3px';
	closeButton.style.color = 'blue';
	closeButton.appendChild(document.createTextNode("close"));
	div.style.border = "1px black solid";
	div.style.textAlign = 'left';
	div.style.position = 'fixed';
	div.style.color = 'black';
	div.style.backgroundColor = 'white';
	div.style.top = '5px';
	div.style.width = width + 'px';
	div.style.left = (docWidth - width - 12) + "px";
	div.style.padding = '3px';
	div.appendChild(closeButton);
	var signs = document.createElement("div");
	signs.id = "characterPalette";
	var symbols = [["—   (em)", "–   (en)"], ["‘", "’", "&ldquo", "&rdquo"], ["á", "é", "à", "è", "ö", "ü", 'â', 'ê', 'û', 'ç'], ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"], ["±", "≠", "≤", "≥", "≈", "∀", "∃", "∅", "∈", "∉", "∑", "∞"], ["¹", "²", "³", "°", "ª"], ["¼", "½", "¾", "œ", "æ"], ["¢", "£", "€", "§", "¶", "©", "®", "™"]];
	var html = "";
	for (var i = 0; i < symbols.length; i++) {
		if (i) html += "<br/>";
		for (var j = 0; j < symbols[i].length; j++) {
			if (j) html += "   ";
			html += symbols[i][j];
		}
	}
	signs.innerHTML = html;
	div.appendChild(signs);
	document.body.appendChild(div);
	closeButton.addEventListener('click', function() {
		document.body.removeChild(div);
	}, true);
};
characterPalette();
