let debug = true;
let SavedValue = require('./savedValue');

class GameValue extends SavedValue {
    constructor (config) {
        if (debug)
            console.log("GameValue : creating a new value",config)
        super(config.data);
        this.id = config.id;
        this.component = config.component;
    }
}
module.exports = GameValue;
