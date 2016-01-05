# model-chainify

Converts a bunch of functions into a method-chainable calss with a shared data model.

[![MIT](http://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/amobiz/model-chainify/blob/master/LICENSE) [![npm version](https://badge.fury.io/js/model-chainify.svg)](http://badge.fury.io/js/model-chainify) [![David Dependency Badge](https://david-dm.org/amobiz/model-chainify.svg)](https://david-dm.org/amobiz/model-chainify)

[![NPM](https://nodei.co/npm/model-chainify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/model-chainify.png?downloads=true&downloadRank=true&stars=true) [![NPM](https://nodei.co/npm-dl/model-chainify.png?months=6&height=3)](https://nodei.co/npm/model-chainify/)

## Install
``` bash
$ npm install model-chainify
```

## API

### `chainify(functions ...)`
Converts a bunch of functions into a method-chainable calss with a shared data model.

#### Context
Don't care.
#### Parameters
##### `functions/mix-ins`
Any number of named functions or objects with methods.
Note that functions can't be anonymous or will throw Error.
All functions must take first argument as a data model object (or so called "[object-based](https://en.wikipedia.org/wiki/Object-based_language)" functions) and return a (new) data model object.
#### Returns
A constructor with signature `function (model)`. That can be invoked with `new` operator to create an object with given model object. Objects created via the contructor owns all the mix-in functions plus a `get()` method that returns the shared data model object.
#### Example

Pass named functions:
``` javascript
var _ = require('lodash');
var chainify = require('model-chainify');
var Collection = chainify(_.flatten, _.uniq, _.sortBy);
var collection = new Collection([1, 2, [4, 3, 2]]);
collection.flatten().uniq().sortBy().get(); // => [1, 2, 3, 4]
```

Pass mix-ins Object:
``` javascript
var _ = require('lodash');
var chainify = require('model-chainify');
var Collection = chainify({
	flatten: _.flatten,
	unique: _.uniq,
	sort: _.sortBy
});
var collection = new Collection([1, 2, [4, 3, 2]]);
collection.flatten().unique().sort().get(); // => [1, 2, 3, 4]
```

## Test
``` bash
$ npm test
```

## License
MIT

## Author
[Amobiz](https://github.com/amobiz)
