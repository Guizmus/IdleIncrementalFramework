let localization = require('./localization');

let _name = new WeakMap();

class Game {
    constructor(config) {

        this.config = config;

        _name.set(this,config.name);

        if (!(typeof(config.libName) === "undefined")) {
            if ((typeof(config.langs) != "undefined") && (config.langs.length > 0)) {
                localization.setLang(config.langs[0]);
            }
            localization.load(config.libName,function(){localization.parsePage(config.libName)});
        }

    }
    load () {

    }
    save () {

    }
    draw () {

    }
    update () {

    }
    log() {
        console.log("Game class log function",this,_name.get(this));
    }
}
module.exports = Game;
