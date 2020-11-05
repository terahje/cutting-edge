# watch-object

[![npm version](https://badge.fury.io/js/watch-object.svg)](https://badge.fury.io/js/watch-object)
[![Build Status](https://travis-ci.org/themekit/watch-object.svg?branch=master)](https://travis-ci.org/themekit/watch-object)
[![Coverage Status](https://coveralls.io/repos/github/themekit/watch-object/badge.svg?branch=master)](https://coveralls.io/github/themekit/watch-object?branch=master)

Observe changes on JavaScript objects. Based on [Watch.JS](https://github.com/melanke/Watch.JS) with a few differences.

- Supports only ES5-compliant browsers (IE9+)
- Proxies the original descriptors (getters and setters) on observed objects
- No interval loop, no dirty checking
- Ignores new or removed properties

## Installation
```bash
npm install watch-object
```

## Usage
### Global
```html
<script src="node_modules/watch-object/dist/watch-object.js"></script>
<script>
  WatchObject.watch()
  WatchObject.unwatch()
</script>
```

### CommonJS
```js
var watchObject = require('watch-object')
var watch = watchObject.watch
var unwatch = watchObject.unwatch
```

### ES6
```js
import { watch, unwatch } from 'watch-object'
```

## Watch a single object property
```js
var obj = {
  a: 'initial value for a',
  b: 'initial value for b'
}
watch(obj, 'a', function (newVal, oldVal) {
  console.log(newVal, oldVal)
})

obj.a = 'new value for a'
// => 'new value for a', 'initial value for a'

obj.b = 'new value for b'
// the 'b' property is not observed
```

## Watch many object properties
```js
var obj = {
  a: 'initial value for a',
  b: 'initial value for b'
}
watch(obj, ['a', 'b'], function (newVal, oldVal, propName) {
  console.log(newVal, oldVal, propName)
})
```

## Watch arrays
```js
var obj = {
  a: [1,2,3,4,5]
}
var list = [1,2,3,4,5]

watch(obj, 'a', function (added, removed, index, action) {
  console.log(added, removed, index, action)
})

obj.a.push(6)
// => [6], undefined, 5, 'push'

watch(list, function (added, removed, index, action) {
  console.log(added, removed, index, action)
})

list.pop()
// => undefined, [5], 4, 'pop'

list.splice(2,2,'a','b','c')
// => ['a','b','c'], [3,4], 2, 'splice'
```

## Remove watchers
```js
// remove a watcher for an observed property
unwatch(obj, 'propName', callback)

// remove a watcher for all properties of an observed object
unwatch(obj, callback)

// remove all watchers for all properties of an observed object
unwatch(obj)
```

## Property descriptors
```js
var obj = {
  _a: 1
}

Object.defineProperty(obj, 'a', {
  get: function () {
    return this._a
  },
  set: function () {
    this._a = 2
  },
  enumerable: true,
  configurable: true
})

watch(obj, 'a', function() {})
// => obj.a === 1

obj.a = 'x'
// => obj.a === 2
```