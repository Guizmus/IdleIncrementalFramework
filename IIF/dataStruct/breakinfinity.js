let debug = true;

let _value = new WeakMap();
let break_infinity = require('../lib/break_infinity.js');
let BigNumber = require('./bignumber.js');

class BreakInfinity extends BigNumber {
    constructor (initialValue,precision) {
        super(break_infinity,precision);
        this.setValue(initialValue);
    }
    toJSON () {
        let value = this.getValue();
        return {
            mantissa : value.mantissa,
            exponent : value.exponent,
        };
    }
    fromJSON(json) {
        if (!((typeof(json.mantissa) === "undefined") || (typeof(json.exponent) === "undefined")))
            this.setValueObj((new break_infinity()).fromMantissaExponent(json.mantissa,json.exponent));
    }
}

module.exports = BreakInfinity;
