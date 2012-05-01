(function() {
	var x, i;
	x = document.forms;
	for (i = 0; i < x.length; ++i) x[i].method = "get";
	alert("Changed " + x.length + " forms to use the GET method.  After submitting a form from this page, you should be able to bookmark the result.");
})();