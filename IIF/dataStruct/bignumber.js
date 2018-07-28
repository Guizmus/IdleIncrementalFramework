let debug = true;

let decimal = require('../lib/decimal.js');

let _valueClass = new WeakMap();
let _value = new WeakMap();

function getExponent (value) {
    let split = value.toExponential().split('e')
    let displayExponent = split[1] * 1;
    let displayValue = split[0] * 1;
    let removedExponent = displayExponent%3;
    displayExponent -= removedExponent;
    displayValue *= Math.pow(10,removedExponent);
    return {
        value : displayValue,
        exponent : displayExponent,
    }
}

class BigNumber {
    constructor (valueClass,precision) {

        if (debug)
            console.log("BigNumber : new BigNumber()",precision);

        this.precision = precision;
        this.display_mode = 'toShortSuffix';
        _valueClass.set(this,valueClass);
    }
    setValue (initialValue) {
        _value.set(this,new (_valueClass.get(this))(initialValue))
    }
    setValueObj (valueObj) {
        _value.set(this,valueObj)
    }
    getValue () {
        return _value.get(this);
    }
    add (toAdd) {
        _value.set(this,this.getValue().add(toAdd));
    }
    toStr () {
        return this[this.display_mode]();
    }
    toScientific () {
        return this.getValue().toExponential();
    }
    toEngineering () {
        let valueParts = getExponent(_value.get(this));
        return valueParts.value.toFixed(this.precision)+"e"+(valueParts.exponent > 0 ? '+' : '')+valueParts.exponent;
    }
    toShortSuffix () {
        let valueParts = getExponent(_value.get(this));
        let suffix = "e"+(valueParts.exponent > 0 ? '+' : '')+valueParts.exponent
        switch (valueParts.exponent/3) {
            case -8 : suffix = 'y';break;
            case -7 : suffix = 'z';break;
            case -6 : suffix = 'a';break;
            case -5 : suffix = 'f';break;
            case -4 : suffix = 'p';break;
            case -3 : suffix = 'n';break;
            case -2 : suffix = 'µ';break;
            case -1 : suffix = 'm';break;
            case 0 : suffix = '';break;
            case 1 : suffix = 'k';break;
            case 2 : suffix = 'M';break;
            case 3 : suffix = 'G';break;
            case 4 : suffix = 'T';break;
            case 5 : suffix = 'P';break;
            case 6 : suffix = 'E';break;
            case 7 : suffix = 'Z';break;
            case 8 : suffix = 'Y';break;
            default:break;
        }
        return valueParts.value.toFixed(this.precision)+suffix;
    }
    toLongSuffix () {
        let valueParts = getExponent(_value.get(this));
        let suffix = "e"+(valueParts.exponent > 0 ? '+' : '')+valueParts.exponent
        switch (valueParts.exponent/3) {
            case -8 : suffix = 'yocto';break;
            case -7 : suffix = 'zepto';break;
            case -6 : suffix = 'atto';break;
            case -5 : suffix = 'femto';break;
            case -4 : suffix = 'pico';break;
            case -3 : suffix = 'nano';break;
            case -2 : suffix = 'micro';break;
            case -1 : suffix = 'milli';break;
            case 0 : suffix = '';break;
            case 1 : suffix = 'kilo';break;
            case 2 : suffix = 'mega';break;
            case 3 : suffix = 'giga';break;
            case 4 : suffix = 'tera';break;
            case 5 : suffix = 'peta';break;
            case 6 : suffix = 'exa';break;
            case 7 : suffix = 'zetta';break;
            case 8 : suffix = 'yotta';break;
            default:break;
        }
        return valueParts.value.toFixed(this.precision)+suffix;
    }
}

module.exports = BigNumber;
