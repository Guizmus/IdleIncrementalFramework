let debug = true;

let localization = require('./localization');
let view = require('./view');
let GameValue = require('./dataStruct/gamevalue');
let Save = require('./save');
let Time = require('./time');

let _view = new WeakMap();
let _values = new WeakMap();
let _save = new WeakMap();
let _time = new WeakMap();

let reservedValues = ["time"];

class Game {
    constructor(config) {

        if (debug)
            console.log("Game : new Game()",config);

        this.config = config;
        let that = this;

        if (!(typeof(config.libName) === "undefined")) {
            if ((typeof(config.langs) != "undefined") && (config.langs.length > 0)) {
                localization.setLang(config.langs[0]);
            }
            localization.load(config.libName,function(){
                that.localize()
            });
        }

        if(typeof(config.viewClass) === "undefined")
            config.viewClass = view.viewClass;
        let view = new config.viewClass({
            onInitialized : this._onViewInitialized,
            gameObj : this,
        })
        _view.set(this,view);

        _values.set(this,{});
        if (!(typeof(config.gameValues) === "undefined")) {
            Object.keys(config.gameValues).forEach(function(key) {
                that.registerValue(key,config.gameValues[key])
            })
            this.redrawValues();
        }

        if (!(typeof(config.ticks) === "undefined")) {
            _time.set(this,new Time(this,config.ticks));
        }

        _save.set(this,new Save(config.saveKey,this));
    }
    loadDependency (key,path,callback) {
        let that = this;
        fetch(path)
            .then(response => response.text())
            .then(_data => {
                if (debug)
                    console.log("Game : Loaded dependency",path);
                eval(_data);
            })
            .catch(function(error) {
                console.warn("Game : Error while loading a dependency : ",error.message,path);
            })
            .then(()=>{
                callback.call(that)
            });
    }
    // values management
    redrawValue(key) {
        _view.get(this).redrawComponent(_values.get(this)[key]);
    }
    redrawValues() {
        if (this.getView().initialized === false) {
            return true;
        }
        let values = _values.get(this);
        let that = this;
        Object.keys(values).forEach(function(key) {
            _view.get(that).redrawComponent(values[key]);
        });
    }
    registerValue (key,config) {
        if (reservedValues.indexOf(key)>=0) {
            console.error('Game : trying to register a value with a reserved key :',key);
            return false;
        }
        let values = _values.get(this);
        if (!(typeof(values[key]) === "undefined")) {
            console.warn('Game : trying to create a registered value with an already taken identifier :',key)
            return false;
        }
        config.id = key;
        values[key] = new GameValue(config);
        _values.set(this,values);
    }
    listValues() {
        return Object.keys(_values.get(this));
    }
    getValue(key) {
        return _values.get(this)[key].getValueObject();
    }
    // view management
    localize() {
        if (!(typeof(this.config.libName) === "undefined"))
            localization.parsePage(this.config.libName);
    }
    _onViewInitialized () {
        if (debug)
            console.log("Game : View initialized",this)
        if (!(typeof(this.config.libName) === "undefined"))  // if the game is localized, we parse the page now that the view is built. The page is already parsed after the lib is loaded but we prepared the texts before that
            localization.parsePage(this.config.libName);
        this.redrawValues();
        this.localize();
        if (typeof(this.onViewInitialized) === "function")
            this.onViewInitialized();
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
    //save management
    load () {
        _save.get(this).load();
        this.redrawValues();
    }
    save () {
        _save.get(this).save();
    }
    clearSave () {
        _save.get(this).clearSave();
    }
    //time management
    getTicker() {
        if (this.config.ticks)
            return _time.get(this);
    }
    unpause () {
        if (this.config.ticks)
            _time.get(this).unpause();
    }
    pause () {
        if (this.config.ticks)
            _time.get(this).pause();
    }
    restart () {
        if (this.config.ticks)
            _time.get(this).restart();
    }
    tick () {
        if (this.config.ticks)
            _time.get(this).tick();
    }
    processTicks (tickCount) {
        if(debug)
            console.log("Game : processing ticks, tickCount :",tickCount);


    }
}
module.exports = Game;
