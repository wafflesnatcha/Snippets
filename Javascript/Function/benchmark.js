/**
 * Javascript benchmark
 * 
 * @link http://www.webtoolkit.info
 */

Function.prototype.benchmark = function (name, times, args) {
	var start = new Date();
	var iteration;

	for (iteration = 0; iteration < times; iteration++) {
		if (args) {
			var result = this.apply(this, args);
		} else {
			var result = this.apply(this);
		}
	}

	var end = new Date();

	/**
	 * Change code below to anything you want
	 * to show the result maybe it could be an el.innerHTML
	 */
	alert(name + " : " + (end - start));

	return result;
}
