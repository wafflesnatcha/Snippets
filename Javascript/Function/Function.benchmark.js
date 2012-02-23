/**
 * Simple function benchmarking
 * 
 * @example
 * function test1(array_size) {
 *     var a = [],
 *         s = array_size || 2000;
 *     while (s--) {
 *         a.push(Math.round(Math.random() * 1000));
 *     }
 *     a.sort();
 * }
 * var result = test1.benchmark({
 *     'iterations': 1000,
 *     'args': [2000]
 * });
 * console.log("test1.benchmark", result);
 */

if (!Function.prototype.benchmark) Function.prototype.benchmark = function(c) {
	var config = {
		'iterations': 1000,
		'args': []
	};
	for (var property in c) config[property] = c[property];
	var i = config.iterations,
		start = new Date();
	while (i--) {
		this.apply(this, config.args);
	}
	var end = new Date();
	return (end - start);
}
