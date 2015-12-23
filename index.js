'use strict';

function chainify() {
	var i, n;

	function Ctor(model) {
		this.model = model;
	}

	for (i = 0, n = arguments.length; i < n; ++i) {
		func(arguments[i]) || mixin(arguments[i]);
	}

	Ctor.prototype.get = function () {
		return this.model;
	};

	return Ctor;

	function func(fn, name) {
		if (typeof fn === 'function') {
			if (!(name || fn.name)) {
				throw new Error("Can't mix-in anonymous function.");
			}
			Ctor.prototype[name || fn.name] = method(fn);
			return true;
		}
	}

	function mixin(obj) {
		var keys;

		keys = Object.keys(obj);
		if (keys.length) {
			keys.forEach(function (name) {
				func(obj[name], name);
			});
			return true;
		}
	}

	function method(fn) {
		return function () {
			var args;

			args = Array.prototype.splice.call(arguments, 0);
			args.unshift(this.model);
			this.model = fn.apply(null, args);
			return this;
		};
	}
}

module.exports = chainify;
