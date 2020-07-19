const assert = require("chai").assert;
const Outpost = require("../src/outpost.js").Outpost;


describe("Outpost", function() {
    const outpost = new Outpost();
    
    it("toObject", function() {
        assert.deepEqual(outpost.toObject('{"num": 1}'), {num: 1});
    });
    
    it("toJson", function() {
        assert.equal(outpost.toJson({num: 1}), '{"num":1}');
    });
    
    it("toNumber", function() {
        assert.equal(outpost.toNumber("1"), 1);
        assert.equal(outpost.toNumber("1.1"), 1.1);
        assert.deepEqual(outpost.toNumber("abc"), NaN);
    });
    
    it("toString", function() {
        assert.equal(outpost.toString({num: 1}), '{"num":1}');
        assert.equal("abc", "abc");
    });
    
    it("toArray", function() {
        assert.deepEqual(outpost.toArray("abc"), ["a", "b", "c"]);
    });
    
    it("isArray", function() {
        assert.equal(outpost.isArray([1, 2, 3]), true);
    });
    
    it("isString", function() {
        assert.equal(outpost.isString("abc"), true);
        assert.equal(outpost.isString(1), false);
        assert.equal(outpost.isString([1]), false);
        assert.equal(outpost.isString({num: 1}), false);
    });

    it("isNumber", function() {
        assert.equal(outpost.isNumber("abc"), false);
        assert.equal(outpost.isNumber(1), true);
        assert.equal(outpost.isNumber(1.1), true);
        assert.equal(outpost.isNumber([1]), false);
        assert.equal(outpost.isNumber({num: 1}), false);
    });

    it("isEmpty", function() {
        assert.equal(outpost.isEmpty("abc"), false);
        assert.equal(outpost.isEmpty(""), true);
        assert.equal(outpost.isEmpty([]), true);
        assert.equal(outpost.isEmpty({}), true);
        assert.equal(outpost.isEmpty({num:1}), false);
        assert.equal(outpost.isEmpty([1]), false);
    });

    it("isEqual", function() {
        assert.equal(outpost.isEqual("abc", "abc"), true);
        assert.equal(outpost.isEqual([], []), true);
        assert.equal(outpost.isEqual({}, {}), true);
        assert.equal(outpost.isEqual({num:1}, {num: 1}), true);
        assert.equal(outpost.isEqual([1], [1]), true);
    });

    it("isFunction", function() {
        assert.equal(outpost.isFunction(function() {}), true);
        assert.equal(outpost.isFunction({}), false);
        assert.equal(outpost.isFunction([]), false);
        assert.equal(outpost.isFunction("abc"), false);
    });

    it("isIterable", function() {
        assert.equal(outpost.isIterable(function() {}), false);
        assert.equal(outpost.isIterable({}), false);
        assert.equal(outpost.isIterable([]), true);
        assert.equal(outpost.isIterable("abc"), true);
    });

    it("isSameObject", function() {
        const obj = {num1:1};
        const func = function() {};
        assert.equal(outpost.isSameObject(function() {}, function() {}), false);
        assert.equal(outpost.isSameObject({}, {}), false);
        assert.equal(outpost.isSameObject(obj, obj), true);
        assert.equal(outpost.isSameObject(func, func), true);
    });

    it("escape", function() {
        assert.equal(outpost.escape("<h1>abc</h1>"), "&lt;h1&gt;abc&lt;/h1&gt;");
    });

    it("unescape", function() {
        assert.equal(outpost.unescape("&lt;h1&gt;abc&lt;/h1&gt;"), "<h1>abc</h1>");
    });

    it("keys", function() {
        assert.deepEqual(outpost.keys({num:1}), ["num"]);
        assert.deepEqual(outpost.keys([1]), ["0"]);
        assert.deepEqual(outpost.keys("abc"), ["0","1","2"]);
    });

    it("keys", function() {
        assert.deepEqual(outpost.keys({num:1}), ["num"]);
        assert.deepEqual(outpost.keys([1]), ["0"]);
        assert.deepEqual(outpost.keys("abc"), ["0","1","2"]);
    });

    it("values", function() {
        assert.deepEqual(outpost.values({num:1}), [1]);
        assert.deepEqual(outpost.values([1]), [1]);
        assert.deepEqual(outpost.values("abc"), ["a","b","c"]);
    });

    it("isContains", function() {
        assert.equal(outpost.isContains({num:1}, 1), true);
        assert.equal(outpost.isContains([1], 1), true);
        assert.equal(outpost.isContains("abc", "b"), true);
        assert.equal(outpost.isContains("abc", "d"), false);
    });

    it("random", function() {
        assert.include([1, 2, 3], outpost.random(1, 3));
        assert.include([1, 2, 3], outpost.random([1, 2, 3]));
    });

    it("range", function() {
        assert.deepEqual(outpost.range(1, 3), [1, 2, 3]);
        assert.deepEqual(outpost.range("a", "c"), ["a", "b", "c"]);
    });

    it("map", function() {
        assert.deepEqual(outpost.map([1, 2], i => i+1), [2, 3]);
        assert.deepEqual(outpost.map(["a", "b", "c"], c => c+1), ["a1", "b1", "c1"]);
        assert.deepEqual(outpost.map({num:1}, i => i+1), {num:2});
        assert.equal(outpost.map("abc", c => c+1), "a1b1c1");
    });

    it("reduce", function() {
        assert.equal(outpost.reduce([1, 2, 3], (oldV, newV) => oldV+newV), 6);
        assert.equal(outpost.reduce(["a", "b", "c"], (oldV, newV) => oldV+newV), "abc");
    });

    it("reduceRight", function() {
        assert.equal(outpost.reduceRight([1, 2, 3], (oldV, newV) => oldV+newV), 6);
        assert.equal(outpost.reduceRight(["a", "b", "c"], (oldV, newV) => oldV+newV), "cba");
    });

    it("find", function() {
        assert.equal(outpost.find([1, 2, 3], v => v == 2), 2);
        assert.equal(outpost.find([1, 2, 3], v => v == 4), null);
        assert.equal(outpost.find(["a", "b", "c"], v => v == "c"), "c");
        assert.equal(outpost.find(["a", "b", "c"], v => v == "d"), null);
    });

    it("filter", function() {
        assert.deepEqual(outpost.filter([1, 2, 3, 4, 5], v => v % 2 == 1), [1, 3, 5]);
        assert.deepEqual(outpost.filter(["a", "A", "b", "B"], v => v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122), ["a", "b"]);
    });

    it("where", function() {
        assert.deepEqual(outpost.where([1, 2, 3], 3), [3]);
        assert.deepEqual(outpost.where([{name: "John", age: 31}, {name: "Meera", age: 27}], {name: "John"}), [{name: "John", age: 31}]);
    });

    it("reject", function() {
        assert.deepEqual(outpost.reject([1, 2, 3, 4, 5], v => v % 2 == 1), [2, 4]);
        assert.deepEqual(outpost.reject(["a", "A", "b", "B"], v => v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122), ["A", "B"]);
    });

    it("all", function() {
        assert.equal(outpost.all([1, 3, 5], v => v % 2 == 1), true);
        assert.equal(outpost.all([1, 2, 3, 4, 5], v => v % 2 == 1), false);
        assert.deepEqual(outpost.all(["a", "b", "c"], v => v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122), true);
        assert.deepEqual(outpost.all(["a", "B", "c"], v => v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122), false);
    });

    it("any", function() {
        assert.equal(outpost.any([1, 3, 5], v => v % 2 == 1), true);
        assert.equal(outpost.any([1, 2, 3, 4, 5], v => v % 2 == 1), true);
        assert.equal(outpost.any([2, 4], v => v % 2 == 1), false);
        assert.deepEqual(outpost.any(["a", "b", "c"], v => v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122), true);
        assert.deepEqual(outpost.any(["a", "B", "c"], v => v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122), true);
        assert.deepEqual(outpost.any(["A", "B", "C"], v => v.charCodeAt(0) >= 97 && v.charCodeAt(0) <= 122), false);
    });

    it("invoke", function() {
        assert.deepEqual(outpost.invoke("hello", s => s + " world"), ["hello world"]);
        assert.deepEqual(outpost.invoke(5, n => n-2), [3]);
    });

    it("extend", function() {
        assert.deepEqual(outpost.extend([1, 2], [3, 4], [5, 6]), [1, 2, 3, 4, 5, 6]);
        assert.deepEqual(outpost.extend(["a", "b"], ["c"]), ["a", "b", "c"]);
        assert.deepEqual(outpost.extend([{name: "john"}], [{name: "meera"}]), [{name: "john"}, {name: "meera"}]);
    });

    it("clone", function() {
        let a = [1, 2];
        let b = outpost.clone(a);
        a.push(3);
        assert.deepEqual(b, [1, 2]);
    });

    it("has", function() {
        assert.equal(outpost.has({name: "john", age: 31}, "name"), true);
        assert.equal(outpost.has({name: "john", age: 31}, "job"), false);
    });

    it("forEach", function() {
        let s = "";
        outpost.forEach("abc", c => s += c);
        let arr = [];
        outpost.forEach([{name: "john"}, {name: "meera"}], c => arr.push(c));
        assert.equal(s, "abc");
        assert.deepEqual(arr, [{name: "john"}, {name: "meera"}]);
    });

    it("dropLast", function() {
        assert.equal(outpost.dropLast("abc"), "ab");
        assert.equal(outpost.dropLast("abc", 2), "a");
    });

    it("dropFirst", function() {
        assert.equal(outpost.dropFirst("abc"), "bc");
        assert.equal(outpost.dropFirst("abc", 2), "c");
    });
})
