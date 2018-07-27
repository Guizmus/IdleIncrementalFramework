let debug = true;
let SavedValue = require('./savedValue');

class GameValue extends SavedValue {
    constructor (config) {
        if (debug)
            console.log("GameValue : creating a new value",config)
        super(config.data);
        this.id = config.id;
        this.component = config.component;
        if (!(typeof(config.behaviour) === "undefined")) {
            this.behaviour = new config.behaviour (this.getValueObject())
        } else
            this.behaviour = false;
    }
    toStr() {
        return this.getValueObject().toStr();
    }
}
module.exports = GameValue;
