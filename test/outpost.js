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
})
