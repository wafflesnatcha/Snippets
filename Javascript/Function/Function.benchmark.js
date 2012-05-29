/**
 * Simple function benchmarking
 *
 * Example:
 * <code>
 * function test1(array_size) {
 *     var a = [],
 *         s = array_size || 3000;
 *     while (s--) {
 *         a.push(Math.round(Math.random() * 1000));
 *     }
 *     a.sort();
 * }
 * var result = test1.benchmark({
 *     'iterations': 500,
 *     'args': [3000]
 * });
 * console.log("test1.benchmark", result);
 * </code>
 *
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 * @link http://wafflesnatcha.github.com
 */

if (!Function.prototype.benchmark) {
	Function.prototype.benchmark = function (c) {
		var i, prop, start, end, config = {
			'iterations': (c && typeof c !== "object") ? c : 1000,
			'args': []
		};
		if (c && typeof c === "object") {
			for (prop in c) {
				if (config[prop]) {
					config[prop] = c[prop];
				}
			}
		}
		i = config.iterations;
		start = new Date();
		while (i--) {
			this.apply(this, config.args);
		}
		end = new Date();
		return (end - start);
	};
}