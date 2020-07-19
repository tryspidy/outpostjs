## Quick start

Clone the github repo `git clone https://github.com/tryspidy/outpostjs.git` and under the `dest` folder, you can find the minified version of the `Outpost`. Add it to your HTML as you would add any JavaScript files or use the `npm` to use it with NodeJS.

Or use CDN link

```html
<script src="https://cdn.jsdelivr.net/gh/tryspidy/outpostjs@0.0.1/dest/outpost.min.js"></script>
```

[![Build Status](https://travis-ci.org/tryspidy/outpostjs.svg?branch=master)](https://travis-ci.org/tryspidy/outpostjs)
[![License](https://img.shields.io/github/license/tryspidy/outpostjs.svg)](https://github.com/tryspidy/outpostjs/blob/master/LICENSE)
[![Version](https://img.shields.io/github/release/tryspidy/outpostjs.svg)](https://github.com/tryspidy/outpostjs/releases/latest)


# Utility Methods

Outpost has some utility methods to make development easier.


- [any(arr, callback)](#util-method-any)
- [random(min, max=null)](#util-method-random)
- [toObject(jsonString)](#util-method-toObject)
- [toJson(collec)](#util-method-toJson)
- [toNumber(s)](#util-method-toNumber)
- [toString(obj)](#util-method-toString)
- [toArray(obj)](#util-method-toArray)
- [isArray(obj)](#util-method-isArray)
- [isElement(obj)](#util-method-isElement)
- [isString(obj)](#util-method-isString)
- [isNumber(obj)](#util-method-isNumber)
- [isEmpty(obj)](#util-method-isEmpty)
- [isEqual(obj1, obj2)](#util-method-isEqual)
- [isFunction(obj)](#util-method-isFunction)
- [isIterable(obj)](#util-method-isIterable)
- [isSameObject(obj1, obj2)](#util-method-isSameObject)
- [escape(s)](#util-method-escape)
- [unescape(s)](#util-method-unescape)
- [keys(s)](#util-method-keys)
- [values(s)](#util-method-values)
- [isContains(arr, o)](#util-method-isContains)
- [range(min, max=null)](#util-method-range)
- [map(min, max=null)](#util-method-map)
- [reduce(collec, callback)](#util-method-reduce)
- [reduceRight(collec, callback)](#util-method-reduceRight)
- [find(collec, callback)](#util-method-find)
- [filter(arr, callback)](#util-method-filter)
- [where(arr, obj)](#util-method-where)
- [reject(arr, callback)](#util-method-reject)
- [all(arr, callback)](#util-method-all)
- [any(arr, callback)](#util-method-any)
- [invoke(...arguments)](#util-method-invoke)
- [extend(...arguments)](#util-method-extend)
- [clone(collec)](#util-method-clone)
- [has(collec, key)](#util-method-has)
- [forEach(collec, callback)](#util-method-forEach)
- [dropLast(o, num=1)](#util-method-dropLast)
- [dropFirst(o, num=1)](#util-method-dropFirst)
