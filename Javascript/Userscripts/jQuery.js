/**
 * jQuery.com [http://code.jquery.com]
 *  - http://code.jquery.com/jquery.min.js
 *  - http://code.jquery.com/jquery.js
 * Google Libraries API [http://code.google.com/apis/libraries/devguide.html#jquery]
 *  - https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
 *  - https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
 */

/**
 * Basic Method in anonymous function
 */

(function() {
	var script = document.createElement('script');
	script.setAttribute('src', 'http://code.jquery.com/jquery.min.js');
	script.setAttribute('type', 'text/javascript');
	document.getElementsByTagName('body')[0].appendChild(script);
});

/**
 * With callback on jQuery load
 */

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://code.jquery.com/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
addJQuery(function() {
	// your code here
	console.log(this, arguments);
});
