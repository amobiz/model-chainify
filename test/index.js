'use strict';

var Chai = require('chai');
var expect = Chai.expect;

var _ = require('lodash');

var chainify = require('../');

function join(model) {
	return model;
}

function resolve(model) {
	return model;
}

var mixin = {
	replace: function (model, replacer) {
		return replacer;
	},
	sort: function (model) {
		return model;
	}
};

describe('chainify()', function () {
	it('should accept nothing', function () {
		var actual;

		actual = chainify();
		expect(actual).to.be.a('function');
		expect(actual).to.respondTo('get');
	});
	it('should not accept anonymous functions', function () {
		function expr() {
			return chainify(function (model) {
				return model;
			});
		}
		expect(expr).to.throw(Error);
	});
	it('should accept named functions', function () {
		var actual;

		actual = chainify(join, resolve);
		expect(actual).to.be.a('function');
		expect(actual).to.respondTo('get');
		expect(actual).to.respondTo('join');
		expect(actual).to.respondTo('resolve');
	});
	it('should accept mix-in object', function () {
		var actual;

		actual = chainify(mixin);
		expect(actual).to.be.a('function');
		expect(actual).to.respondTo('get');
		expect(actual).to.respondTo('replace');
		expect(actual).to.respondTo('sort');
	});
	it('should accept any numbers of named functions and mix-in object', function () {
		var actual;

		actual = chainify(join, mixin, resolve);
		expect(actual).to.be.a('function');
		expect(actual).to.respondTo('get');
		expect(actual).to.respondTo('join');
		expect(actual).to.respondTo('replace');
		expect(actual).to.respondTo('sort');
		expect(actual).to.respondTo('resolve');
	});
	it('mix-in methods should be chainable', function () {
		var Ctor, inst, model, replacer;

		model = { name: 'origin-model' };
		replacer = { name: 'changed-model' };

		Ctor = chainify(join, mixin, resolve);
		inst = new Ctor(model);
		expect(inst.get()).to.equal(model);
		inst.join().sort().resolve();
		expect(inst.get()).to.equal(model);
		inst.replace(replacer);
		expect(inst.get()).to.deep.equal(replacer);
	});
	it('lodash function example', function () {
		var Collection, collection, actual;

		Collection = chainify(_.uniq, _.sortBy, _.flatten);
		expect(Collection).to.be.a('function');
		expect(Collection).to.respondTo('uniq');
		expect(Collection).to.respondTo('sortBy');
		expect(Collection).to.respondTo('flatten');

		collection = new Collection([1, 2, [4, 3, 2]]);
		actual = collection.flatten().uniq().sortBy().get();
		expect(actual).to.deep.equal([1, 2, 3, 4]);
	});
	it('lodash mix-in example', function () {
		var Collection, collection, actual;

		Collection = chainify({
			unique: _.uniq,
			sort: _.sortBy,
			flatten: _.flatten
		});
		expect(Collection).to.be.a('function');
		expect(Collection).to.respondTo('unique');
		expect(Collection).to.respondTo('sort');
		expect(Collection).to.respondTo('flatten');

		collection = new Collection([1, 2, [4, 3, 2]]);
		actual = collection.flatten().unique().sort().get();
		expect(actual).to.deep.equal([1, 2, 3, 4]);
	});
});
