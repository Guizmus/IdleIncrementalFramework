let debug = false;

let datas = new WeakMap();

class SavedValue {
    constructor (data) {
        if (debug)
            console.log("SavedValue : creating a new value",config);
        datas.set(this,data);
    }
    getValueObject() {
        return datas.get(this);
    }
    toJSON () {
        return this.getValueObject().toJSON();
    }
    fromJSON(json) {
        this.getValueObject().fromJSON(json);
    }
}
module.exports = SavedValue;
