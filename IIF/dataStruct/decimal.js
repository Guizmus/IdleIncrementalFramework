let debug = true;

let _value = new WeakMap();
let decimal = require('../lib/decimal.js');
let BigNumber = require('./bignumber.js');

class Decimal extends BigNumber {
    constructor (initialValue,precision) {
        super(decimal,precision);
        this.setValue(initialValue);
    }
    toJSON () {
        return {
            value : this.getValue().toString(),
        };
    }
    fromJSON(json) {
        if (!(typeof(json.value) === "undefined"))
            this.setValue(json.value);
    }
}

module.exports = Decimal;
