/**
 * Return a random color (optionally seeded by a string).
 *
 * @author Scott Buchanan
 * @link http://wafflesnatcha.github.com
 */

function randomHexColor(str) {
	var i, seed = '';
	if (str) {
		for (i = 0; i < str.length; i++) {
			seed += str.charCodeAt(i);
		}
		seed = Math.abs(Math.cos(parseInt(seed)));
	} else {
		seed = Math.random();
	}
	return '#' + Math.floor(seed * 16777215).toString(16);
}
