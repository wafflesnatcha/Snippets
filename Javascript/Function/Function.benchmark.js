/**
 * Simple function benchmarking
 *
 * @example
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
 *
 * // or simply:
 * console.log("test1.benchmark", test1.benchmark(500));
 */

if (!Function.prototype.benchmark) Function.prototype.benchmark = function(c) {
	var i, start, end, config = {
		'iterations': (c && typeof c !== "object") ? c : 1000,
		'args': []
	};
	if (c && typeof c === "object") for (var property in c) config[property] = c[property];
	i = config.iterations;
	start = new Date();
	while (i--) {
		this.apply(this, config.args);
	}
	end = new Date();
	return (end - start);
}
