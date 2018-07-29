let debug = true;

let SavedValue = require('./savedValue');

class GameValue extends SavedValue {
    constructor (config) {

        if (debug)
            console.log("GameValue : new GameValue()",config);

        super(config.data);
        this.id = config.id;
        this.component = config.component;
        if (!(typeof(config.behaviour) === "undefined")) {
            this.behaviour = new config.behaviour (this.getValueObject())
        } else
            this.behaviour = false;
    }
    toNumber() {
        return this.getValue().toNumber();
    }
    toStr() {
        return this.getValueObject().toStr();
    }
}
module.exports = GameValue;
