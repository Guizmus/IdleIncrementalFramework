let debug = false;
let localization = require('./localization');
let view = require('./view');

let _name = new WeakMap();
let _view = new WeakMap();

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

        if(typeof(config.viewClass) === "undefined")
            config.viewClass = view.viewClass;
        if(typeof(config.anchor) === "undefined")
            config.anchor = false;
        _view.set(this,new config.viewClass({
            identifier:config.anchor
        }));

    }
    load () {

    }
    save () {

    }
    getView () {
        return _view.get(this);
    }
    draw () {
        _view.get(this).draw();
    }
    update (target) {
        _view.get(this).update(target);
    }
    log() {
        if (debug)
            console.log("Game class log function",this);
    }
}
module.exports = Game;
