let debug = true;

let decimal = require('../lib/decimal.js');
let BigNumber = require('./bignumber.js');

let _value = new WeakMap();

class Decimal extends BigNumber {
    constructor (initialValue,precision) {

        if (debug)
            console.log("Decimal : new Decimal()",initialValue,precision);

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
