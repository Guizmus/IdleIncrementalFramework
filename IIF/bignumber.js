let innerPrecision = Number.MAX_SAFE_INTEGER.toExponential().split("e+")[1] -1; // usually 14

let _value = new WeakMap();

class BigNumber {
    constructor (initialValue,displayPrecision) {
        let preciseValue = initialValue.toExponential().split('e');
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
}
// let test  = new BigNumber(184243.12474561108754,3);
// console.log(test.toEngineering())
// console.log(test.toScientific())
exports = BigNumber
