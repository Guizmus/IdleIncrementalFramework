let debug = true;

let _data = new WeakMap();

class BaseBehaviour {

    constructor (valueObject) {
        this.valueObject = valueObject;
        _data.set(this,{});
    }

    toJSON () {
        return _data.get(this);
    }
    fromJSON(json) {
        _data.set(this,json);
    }

    tick () {}
}

module.exports = BaseBehaviour;
