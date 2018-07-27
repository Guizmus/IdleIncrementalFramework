let debug = false;

let _datas = new WeakMap();

class SavedValue {
    constructor (data) {

        if (debug)
            console.log("SavedValue : new SavedValue()",data);

        _datas.set(this,data);
    }
    getValueObject() {
        return _datas.get(this);
    }
    toJSON () {
        return this.getValueObject().toJSON();
    }
    fromJSON(json) {
        this.getValueObject().fromJSON(json);
    }
}
module.exports = SavedValue;
