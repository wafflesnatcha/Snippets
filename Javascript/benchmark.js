/**
 * Simple benchmarking suite to test DOM and Javascript engine speeds
 * @author Scott Buchanan <buchanan.sc@gmail.com>
 */

if (!Function.prototype.bind) Function.prototype.bind = function(object) {
	var __method = this;
	return function() {
		return __method.apply(object, arguments);
	}
};

var Benchmark = function(config) {
	var defaults = {
		iterations: 10,
		loop: 10,
		delay: 10,
		resultEl: document.body,
		fn: null,
		args: []
	};

	for (var property in defaults) this[property] = config[property] || defaults[property];

	this.args = this.args || [];
	return this;
};


Benchmark.prototype = {

	timer: function() {
		var start = false;
		return {
			start: function() {
				start = new Date();
			},
			end: function(name, resEl) {
				return new Date() - start;
			}
		};
	}(),

	start: function() {

		this.currI = 0;
		this.result = 0;

		this.execute = this.execute.bind(this);
		this.execute();

	},

	execute: function() {
		var f = this.fn;
		var a = this.args;

		this.timer.start();

		for (var i = 0; i < this.iterations; i++) {
			f.apply(window, a);
		}

		this.result += this.timer.end();


		console.log(this.result);

		this.complete();
	},

	complete: function() {

		if (!this.currI || this.currI < this.loop) {
			this.currI++;
			window.setTimeout(this.execute, this.delay);
			return false;
		}

		this.displayResults();
	},

	displayResults: function() {
		if (this.resultEl && typeof this.resultEl == "string") this.resultEl = document.getElementById(this.resultEl);

		if (!this.resultEl) throw {
			toString: function() {
				return "No result element specified";
			}
		};

		this.resultEl.innerHTML = this.iterations + " iterations executed " + this.loop + " times" + "<br/>Total: " + this.result + "ms" + "<br/>Average: " + (this.result / this.loop) + "ms";
	}

};
