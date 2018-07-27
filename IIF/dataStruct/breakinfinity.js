let debug = true;

let _value = new WeakMap();
let break_infinity = require('../lib/break_infinity.js');

class BreakInfinity {
    constructor (initialValue) {
        this.setValue(initialValue);
        this.display_mode = 'toShortSuffix';
    }
    setValue (initialValue) {
        _value.set(this,new break_infinity(initialValue))
    }
    getValue () {
        return _value.get(this);
    }
    add (toAdd) {
        _value.set(this,this.getValue().add(toAdd));
    }
    toStr () {
        return this[this.display_mode]();
        // return this.getValue().toString();
    }
    toScientific () {
        return this.getValue().toExponential();
    }
    toEngineering () {
        let value = _value.get(this);
        let displayExponent = value.exponent;
        let displayValue = value.mantissa;
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed();
        return displayValue+"e"+(displayExponent > 0 ? '+' : '')+displayExponent;
    }
    toShortSuffix () {
        let value = _value.get(this);
        let displayExponent = value.exponent;
        let displayValue = value.mantissa;
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed();
        let suffix = "e"+(displayExponent > 0 ? '+' : '')+displayExponent
        switch (displayExponent/3) {
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
        return displayValue+suffix;
    }
    toLongSuffix () {
        let value = _value.get(this);
        let displayExponent = value.exponent;
        let displayValue = value.mantissa;
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed();
        let suffix = "e"+(displayExponent > 0 ? '+' : '')+displayExponent
        switch (displayExponent/3) {
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
        return displayValue+suffix;
    }
    toJSON () {
        let value = _value.get(this);
        return {
            mantissa : value.mantissa,
            exponent : value.exponent,
        };
    }
    fromJSON(json) {
        _value.set(this,(new break_infinity()).fromMantissaExponent(json.mantissa,json.exponent));
    }
}

module.exports = BreakInfinity;
