/**
 * Open the current page in a popup window.
 *
 * @author Scott Buchanan
 * @link http://wafflesnatcha.github.com
 */
/*jshint browser:true, devel:true*/

(function () {
	try {
		window.open(location.href, null, 'location=no,menubar=no,personalbar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,width=' + window.innerWidth + ',height=' + window.outerHeight);
	} catch (e) {
		if (console) {
			console.error(e);
		}
	}
}());
