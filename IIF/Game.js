let debug = true;
let localization = require('./localization');
let view = require('./view');

let _name = new WeakMap();
let _view = new WeakMap();

class Game {
    constructor(config) {

        if (debug)
            console.log("Game : new game",config)

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
            identifier:config.anchor,
            onInitialized : this.onViewInitialized,
            gameObj : this,
        }));
    }
    onViewInitialized () {
        if (debug)
            console.log("Game : View initialized",_name.get(this))
        if (!(typeof(this.config.libName) === "undefined"))  // if the game is localized, we parse the page now that the view is built. The page is already parsed after the lib is loaded but we prepared the texts before that
            localization.parsePage(this.config.libName);
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
            console.log("Game : log function",this);
    }
}
module.exports = Game;
