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
    toStr() {
        return this.getValueObject().toStr();
    }
    toJSON () {
        return datas.get(this).toJSON();
    }
    fromJSON(json) {
        datas.get(this).fromJSON(json);
    }
}
module.exports = SavedValue;
