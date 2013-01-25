/**
 * Debug console fallback
 *
 * Add this code to prevent errors when using functions like console.log() in
 * browsers that don't support console.
 * 
 * @author Scott Buchanan
 * @link http://wafflesnatcha.github.com
 */

if (!window.console) {
	window.console = (function () {
		var i, console = {},
			fn = function () {},
			members = ['assert', 'clear', 'close', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'open', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'],
			l = members.length;
		for (i = 0; i < l; i++) {
			console[members[i]] = fn;
		}
		return console;
	})();
}