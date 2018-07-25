let debug = false;

let innerPrecision = Number.MAX_SAFE_INTEGER.toExponential().split("e+")[1] -1; // usually 14

let _value = new WeakMap();

class BigNumber {
    constructor (initialValue,displayPrecision) {
        let preciseValue = initialValue.toExponential().split('e');
        this.display_mode = 'toShortSuffix';
        _value.set(this,{
            preciseValue : Math.floor(preciseValue[0]*Math.pow(10,innerPrecision-1)),
            exponent : (preciseValue[1])*1 -innerPrecision+1,
            precision : displayPrecision,
        })
    }
    setValue (initialValue) {
        let preciseValue = initialValue.toExponential().split('e');
        let value = _value.get(this);
        value.preciseValue = Math.floor(preciseValue[0]*Math.pow(10,innerPrecision-1));
        value.exponent = (preciseValue[1])*1 -innerPrecision+1,
        _value.set(this,value);
    }
    setPrecision (precision) {
        let value = _value.get(this);
        value.precision = precision;
        _value.set(this,value);
    }
    getValue () {
        let value = _value.get(this);
        return value.preciseValue*Math.pow(10,value.exponent);
    }
    add (toAdd) {
        let value = this.getValue();
        value += toAdd;
        this.setValue(value);
    }
    toStr () {
        return this[this.display_mode]();
    }
    toScientific () {
        let value = _value.get(this);
        let preciseSplit = value.preciseValue.toExponential().split('e')
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1).toFixed(value.precision);
        return displayValue+"e"+(displayExponent > 0 ? '+' : '')+displayExponent;
    }
    toEngineering () {
        let value = _value.get(this);
        let preciseSplit = value.preciseValue.toExponential().split('e');
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1);
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed(value.precision);
        return displayValue+"e"+(displayExponent > 0 ? '+' : '')+displayExponent;
    }
    toShortSuffix () {
        let value = _value.get(this);
        let preciseSplit = value.preciseValue.toExponential().split('e');
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1);
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed(value.precision);
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
        let preciseSplit = value.preciseValue.toExponential().split('e');
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1);
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed(value.precision);
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
}

module.exports = BigNumber;
