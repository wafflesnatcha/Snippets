uls = document.getElementsByTagName("ul");
for (i = uls.length - 1; i >= 0; --i) {
	oldul = uls[i];
	newol = document.createElement("ol");
	for (j = 0; j < oldul.childNodes.length; ++j) newol.appendChild(oldul.childNodes[j].cloneNode(true));
	oldul.parentNode.replaceChild(newol, oldul);
}
void 0
