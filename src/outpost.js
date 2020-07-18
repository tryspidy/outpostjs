const root = typeof window !== "undefined" && typeof window.document !== "undefined" ? window : module.exports;

class Outpost {
    constructor() {
        // List of HTML entities for escaping.
        this.escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        }
    }

    toObject(jsonString) {
        return JSON.parse(jsonString);
    }
    
    toJson(collec) {
        return JSON.stringify(collec);
    }
    
    toNumber(s) {
        return Number(s);
    }
    
    toString(collec) {
        return this.isString(collec) ? collec : JSON.stringify(collec);
    }
    
    toArray(o) {
        return Array.from(o);
    }
    
    isArray(o) {
        return Array.isArray(o);
    }
    
    isElement(o) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return o instanceof HTMLElement;
        }
        catch(e){
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have (works on IE7)
            return (typeof o==="object") &&
                (o.nodeType===1) && (typeof o.style === "object") &&
                (typeof o.ownerDocument ==="object");
        }
    }
    
    isString(o) {
        return typeof o === "string";
    }
    
    isNumber(num) {
        return typeof num === "number";
    }
    
    isEmpty(o) {
        return this.keys(o).length === 0;
    }
    
    isEqual(o1, o2) {
        return JSON.stringify(o1) == JSON.stringify((o2));
    }
    
    isFunction(obj) {
        return obj && {}.toString.call(obj) === '[object Function]';
    }
    
    isIterable(o) {
        return !this.isEmpty(o);
    }
    
    isSameObject(o1, o2) {
        return (this.isElement(o1) && this.isElement(o2)) ? o1.isSameNode(o2) : o1 == o2;
    }
    
    escape(s) {
        let newS = s;
        this.forEach(escapeMap, function(el, key) {
            newS = newS.replace(new RegExp(key, "g"), el);
        });
        return newS;
    }
    
    unescape(s) {
        let newS = s;
        loop(escapeMap, function(el, key) {
            newS = newS.replace(new RegExp(el, "g"), key);
        });
        return newS;
    }
    
    keys(o) {
        return Object.keys(o);
    }
    
    values(o) {
        let vals = [];
        let keys = this.keys(o);
        
        for (let i = 0; i < keys.length; i++) {
            vals.push(o[keys[i]]);
        }
        
        return vals;
    }
    
    isContains(arr, o) {
        let ret = false;
        this.forEach(arr, function(el) {
            if(this.isSameObject(el, o)) {
                ret = true;
                return true;
            }
        });
        return ret;
    }
    
    random(min, max=null) {
        if (isArray(min)) {
            let rand = 0 + Math.floor(Math.random() * (min.length));
            return min[rand];
        }
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    
    range(min, max=null) {
        const rng = [];
        
        if (this.isString(min)) {
            min = min.charCodeAt(0);
            max = max.charCodeAt(0);
            
            for (let i = min; i <= max; i++) {
                rng.push(String.fromCharCode(i));
            }
            return rng;
        }
        
        if (max == null) {
            max = min;
            min = 0;
        }
        
        for (let i = min; i <= max; i++) {
            rng.push(i);
        }
        return rng;
    }
    
    
    map(collec, callback) {
        let newCollec = Object.assign({}, collec);
        let keys = this.keys(collec);
        
        for (let i = 0; i < keys.length; i++) {
            newCollec[keys[i]] = callback(collec[keys[i]], keys[i], collec);
        }
        return newCollec;
    }
    
    reduce(collec, callback) {
        let keys = this.keys(collec);
        let startValue = collec[keys[0]];
        for (let i = 1; i < keys.length; i++) {
            startValue = callback(startValue, collec[keys[i]], collec);
        }
        return startValue;
    }
    
    reduceRight(collec, callback) {
        let keys = this.keys(collec);
        let startValue = collec[keys[keys.length - 1]];
        for (let i = keys.length - 2; i >= 0; i--) {
            startValue = callback(startValue, collec[keys[i]], collec);
        }
        return startValue;
    }
    
    find(collec, callback) {
        let retValue = null;
        this.forEach(collec, function(el, key) {
            let ret = callback(el, key, collec);
            if (ret) {
                retValue = el;
                return true;
            }
        });
        return retValue;
    }
    
    filter(arr, callback) {
        let newArr = [];
        this.forEach(arr, function(el, key) {
            let ret = callback(el, key, arr);
            if (ret) {
                newArr.push(el);
            }
        });
        return newArr;
    }
    
    
    where(arr, obj) {
        let newArr = [];
        let keys = this.keys(obj);
        this.forEach(arr, function(el) {
            let canIAdd = true;
            for (let i = 0; i < keys.length; i++) {
                if (el[keys[i]] !== obj[keys[i]]) {
                    canIAdd = false;
                    break;
                }
            }
            
            if (canIAdd) {
                newArr.push(el);
            }
        });
        return newArr;
    }
    
    reject(arr, callback) {
        let newArr = [];
        this.forEach(arr, function(el, key) {
            let ret = callback(el, key, arr);
            if (!ret) {
                newArr.push(el);
            }
        });
        return newArr;
    }
    
    all(arr, callback) {
        let isAllOk = true;
        this.forEach(arr, function(el, i) {
            let ret = callback(el, i, arr);
            if (!ret) {
                isAllOk = false;
                return true;
            }
        });
        return isAllOk;
    }
    
    any(arr, callback) {
        let isAllOk = false;
        this.forEach(arr, function(el, i) {
            let ret = callback(el, i, arr);
            if (ret) {
                isAllOk = true;
                return true;
            }
        });
        return isAllOk;
    }
    
    invoke() {
        let args = arguments;
        let arr = args[0];
        this.forEach(arr, function(el, index) {
            for (let i = 1; i < args.length; i++) {
                arr[index] = this[args[i]]();
            }
        });
        return arr;
    }
    
    extend() {
        let newArr = [];
        for (let i = 0; i < arguments.length; i++) {
            newArr = newArr.concat(arguments[i])
        }
        return newArr;
    }
    
    clone(collec) {
        return this.isArray(collec) ? [].concat(collec) : Object.assign({}, collec);
    }
    
    has(collec, key) {
        return this.isContains(keys(collec), key);
    }
    
    forEach(o, callback) {
        if (this.isArray(o)) {
            for (let i = 0; i < o.length; i++) {
                let ret = false;
                ret = callback(o[i], i, o);
                if (ret === true) break;
            }
        }else if (this.isIterable(o)) {
            let keys = this.keys(o);
            for (let i = 0; i < keys.length; i++) {
                const ret = callback(o[keys[i]], keys[i], o);
                
                if (ret === true) break;
            }
        }
    }
    
    $drop(o, num, isEnd=false) {
        let arr;
        let itWasString = false;
        
        if (this.isString(o)) {
            itWasString = true;
            arr = o.split("");
        } else {
            arr = o;
        }
        
        isEnd ? arr.splice(arr.length - num, num) : arr.splice(0, num);
        
        return itWasString ? arr.join("") : arr;
    }
    
    dropLast(o, num=1) {
        return this.$drop(o, num, true);
    }
    
    dropFirst(o, num=1) {
        return this.$drop(o, num, false);
    }
}

Outpost.__proto__.plugin = function(callback) {
    callback(Outpost.prototype);
}


root.Outpost = Outpost;
