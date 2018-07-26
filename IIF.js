(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let debug = false;

let innerPrecision = Number.MAX_SAFE_INTEGER.toExponential().split("e+")[1] -1; // usually 14

let _value = new WeakMap();

class BigNumber {
    constructor (initialValue,displayPrecision) {
        let preciseValue = initialValue.toExponential().split('e');
        this.display_mode = 'toShortSuffix';
        _value.set(this,{
            preciseValue : Math.floor(preciseValue[0]*Math.pow(10,innerPrecision-1)),
            exponent : (preciseValue[1])*1 -innerPrecision+1,
            precision : displayPrecision,
        })
    }
    setValue (initialValue) {
        let preciseValue = initialValue.toExponential().split('e');
        let value = _value.get(this);
        value.preciseValue = Math.floor(preciseValue[0]*Math.pow(10,innerPrecision-1));
        value.exponent = (preciseValue[1])*1 -innerPrecision+1,
        _value.set(this,value);
    }
    setPrecision (precision) {
        let value = _value.get(this);
        value.precision = precision;
        _value.set(this,value);
    }
    getValue () {
        let value = _value.get(this);
        return value.preciseValue*Math.pow(10,value.exponent);
    }
    add (toAdd) {
        let value = this.getValue();
        value += toAdd;
        this.setValue(value);
    }
    toStr () {
        return this[this.display_mode]();
    }
    toScientific () {
        let value = _value.get(this);
        let preciseSplit = value.preciseValue.toExponential().split('e')
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1).toFixed(value.precision);
        return displayValue+"e"+(displayExponent > 0 ? '+' : '')+displayExponent;
    }
    toEngineering () {
        let value = _value.get(this);
        let preciseSplit = value.preciseValue.toExponential().split('e');
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1);
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed(value.precision);
        return displayValue+"e"+(displayExponent > 0 ? '+' : '')+displayExponent;
    }
    toShortSuffix () {
        let value = _value.get(this);
        let preciseSplit = value.preciseValue.toExponential().split('e');
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1);
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed(value.precision);
        let suffix = "e"+(displayExponent > 0 ? '+' : '')+displayExponent
        switch (displayExponent/3) {
            case -8 : suffix = 'y';break;
            case -7 : suffix = 'z';break;
            case -6 : suffix = 'a';break;
            case -5 : suffix = 'f';break;
            case -4 : suffix = 'p';break;
            case -3 : suffix = 'n';break;
            case -2 : suffix = 'µ';break;
            case -1 : suffix = 'm';break;
            case 0 : suffix = '';break;
            case 1 : suffix = 'k';break;
            case 2 : suffix = 'M';break;
            case 3 : suffix = 'G';break;
            case 4 : suffix = 'T';break;
            case 5 : suffix = 'P';break;
            case 6 : suffix = 'E';break;
            case 7 : suffix = 'Z';break;
            case 8 : suffix = 'Y';break;
            default:break;
        }
        return displayValue+suffix;
    }
    toLongSuffix () {
        let value = _value.get(this);
        let preciseSplit = value.preciseValue.toExponential().split('e');
        let displayExponent = preciseSplit[1]*1+value.exponent;
        let displayValue = (preciseSplit[0]*1);
        let removedExponent = displayExponent%3;
        displayExponent -= removedExponent;
        displayValue *= Math.pow(10,removedExponent);
        displayValue = displayValue.toFixed(value.precision);
        let suffix = "e"+(displayExponent > 0 ? '+' : '')+displayExponent
        switch (displayExponent/3) {
            case -8 : suffix = 'yocto';break;
            case -7 : suffix = 'zepto';break;
            case -6 : suffix = 'atto';break;
            case -5 : suffix = 'femto';break;
            case -4 : suffix = 'pico';break;
            case -3 : suffix = 'nano';break;
            case -2 : suffix = 'micro';break;
            case -1 : suffix = 'milli';break;
            case 0 : suffix = '';break;
            case 1 : suffix = 'kilo';break;
            case 2 : suffix = 'mega';break;
            case 3 : suffix = 'giga';break;
            case 4 : suffix = 'tera';break;
            case 5 : suffix = 'peta';break;
            case 6 : suffix = 'exa';break;
            case 7 : suffix = 'zetta';break;
            case 8 : suffix = 'yotta';break;
            default:break;
        }
        return displayValue+suffix;
    }
    toJSON () {
        return _value.get(this);
    }
    fromJSON(json) {
        _value.set(this,json);
    }
}

module.exports = BigNumber;

},{}],2:[function(require,module,exports){
let debug = true;
let localization = require('./localization');
let view = require('./view');
let GameValue = require('./gamevalue');
let Save = require('./save');

let _view = new WeakMap();
let _values = new WeakMap();
let _save = new WeakMap();

class Game {
    constructor(config) {

        if (debug)
            console.log("Game : new game",config)

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
            onInitialized : this.onViewInitialized,
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

        _save.set(this,new Save(config.saveKey,this));
    }
    localize() {
        if (!(typeof(this.config.libName) === "undefined"))
            localization.parsePage(this.config.libName);
    }
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
    onViewInitialized () {
        if (debug)
            console.log("Game : View initialized",this)
        if (!(typeof(this.config.libName) === "undefined"))  // if the game is localized, we parse the page now that the view is built. The page is already parsed after the lib is loaded but we prepared the texts before that
            localization.parsePage(this.config.libName);
        this.redrawValues();
        this.localize();
    }
    registerValue (key,config) {
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
    load () {
        _save.get(this).load();
        this.redrawValues();
    }
    save () {
        _save.get(this).save();
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

},{"./gamevalue":3,"./localization":5,"./save":7,"./view":9}],3:[function(require,module,exports){
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

},{"./savedValue":8}],4:[function(require,module,exports){
let debug = true;

let localization = require('./localization');

class Tpl {
    constructor (tplStr) {
        this.str = tplStr;
        this.keys = [];
        this.values = {};
        let match = false;
        while (match = tplStr.match((/{{([a-z]+)}}/))) {
            this.keys.push(match[1]);
            tplStr = tplStr.substr(match.index + 1);
        }
    }
    set (key,val) {
        this.values[key] = val;
    }
    getHtml () {
        let html = this.str;
        let values = this.values;
        Object.keys(this.values).forEach(function(key) {
            html = html.replace("{{"+key+"}}",values[key]);
        })
        return html;
    }
}
let tpls = {
    updatedValue : "<span id=\"{{id}}\">{{val}}</span>\r\n",
    localizedText :("<span class=\"{{locClass}}\" data-{{locDataKey}}=\"{{path}}\">{{text}}</span>\r\n")
                .replace('{{locClass}}',localization.config.class)
                .replace('{{locDataKey}}',localization.config.dataKey),
}

function loadTpl (path,callback) {
    let data = false;

    fetch(path)
        .then(response => response.text())
        .then(_data => {
            if (debug)
                console.log("html : Loaded tpl",path,_data);
            data = _data;
        })
        .catch(function(error) {
            console.warn("html : Error while loading a tpl : ",error.message,path);
        })
        .then(()=>{
            callback.call(this,data)
        });
}
function defineTpl (tplKey,tplPath,callback,ctx) {
    if (typeof(callback) === "undefined")
        callback = (()=>{});
    loadTpl(tplPath,function(tplStr) {
        tpls[tplKey] = tplStr;
        callback.call(ctx);
    })
}
function getTpl (tpl,datas) {
    if(typeof(tpls[tpl]) === "undefined") {
        if(debug)
            console.warn("html : Trying to use a tpl that isn't declared, or loaded yet :",tpl)
        return false;
    }
    if (tpls[tpl] === false)
        return false;
    if (typeof(datas) === "undefined")
        return new Tpl(tpls[tpl]);

    tpl = new Tpl(tpls[tpl]);
    Object.keys(datas).forEach(function(key) {
        tpl.set(key,datas[key])
    });
    return tpl.getHtml();
}
function localizedText (path,lib) {
    return getTpl('localizedText',{
    	path : path,
        text : localization.getText(path,lib)
    });
}
exports.getTpl = getTpl;
exports.defineTpl = defineTpl;
exports.localizedText = localizedText;

},{"./localization":5}],5:[function(require,module,exports){
let debug = false;
let defaultLang = 'en-EN';
let supportedLang = 'en-EN';

let htmlSelector = 'loc'; // class to add to the html tag to localize
let htmlDataKey = 'lk'; // data key to use to store the path to text

let key = 'lang'; // key used in the get parameter of the URL to set a specific language

let currentLang = undefined;
let currentLib = undefined;
let libs = {};
let listeners = {};

function setLang (lang) {
    if (typeof(lang) === "undefined") {
        currentLang = (typeof(currentLang) === "undefined") ? defaultLang : currentLang;
    } else currentLang = lang;
}

function setCurrentLib (libName) {
    currentLib = libName;
}

function fireListeners(loadedLib) {
    while (toFire = listeners[loadedLib].pop()) {
        toFire.call();
    }
}

function load (libName,callback) {

    // preparing the lang and lib to load
    let libToLoad = libName;
    if (typeof(libToLoad) === "undefined") {
        if (typeof(currentLib) === "undefined") {
            console.error("Localization : Trying to load XML file without providing a libName");
        }
        libToLoad = currentLib;
    }
    if (Object.keys(libs).length == 0)
        setCurrentLib(libToLoad);

    if (typeof(currentLang) === "undefined")
        setLang();

    let libPath = currentLang+'/'+libToLoad;

    //checking if the lib is loaded
    if (typeof(libs[libPath]) === "undefined") { // if the lib isn't already loaded
        libs[libPath] = false;
        listeners[libPath] = typeof(callback) === "undefined" ? [] : [callback];
        fetch('lang/'+libPath+'.xml')
            .then(response => response.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(data => {
                libs[libPath] = XMLtoJSON(data).body;
                if (debug)
                    console.log("Localization : Loaded lib",libPath,libs[libPath]);
                fireListeners(libPath);
            })
            .catch(function(error) {
                console.warn("Localization : Error while loading the XML: ",error.message,libPath);
            });
    } else { // library is already loaded
        if (!(typeof(callback) === "undefined")) {
            listeners[libPath].push(callback);
            if (libs[libPath])
                fireListeners(libPath);
        }
    }
}

function isArray(o) {
    return Object.prototype.toString.apply(o) === '[object Array]';
}

function parseNode(xmlNode, result) {
    if (xmlNode.nodeName == "#text") {
        var v = xmlNode.nodeValue;
        if (v.trim()) {
           result['#text'] = v;
        }
        return;
    }

    var jsonNode = {};
    var existing = result[xmlNode.nodeName];
    if(existing) {
        if(!isArray(existing)) {
            result[xmlNode.nodeName] = [existing, jsonNode];
        }
        else {
            result[xmlNode.nodeName].push(jsonNode);
        }
    }
    else {
            result[xmlNode.nodeName] = jsonNode;
    }

    if(xmlNode.attributes) {
        var length = xmlNode.attributes.length;
        for(var i = 0; i < length; i++) {
            var attribute = xmlNode.attributes[i];
            jsonNode[attribute.nodeName] = attribute.nodeValue;
        }
    }

    var length = xmlNode.childNodes.length;
    for(var i = 0; i < length; i++) {
        parseNode(xmlNode.childNodes[i], jsonNode);
    }
}

function XMLtoJSON (xml) {
    var result = {};
    if(xml.childNodes.length) {
        parseNode(xml.childNodes[0], result);
    }

    return result;
}

function getLib (lib) {
    if (typeof(lib) === "undefined")
        lib = currentLib;
    let libPath = currentLang+'/'+lib;
    if(!libs[libPath]) {
        if (debug)
            console.warn("Localization : Trying to get an unloaded lib : "+libPath)
        return false;
    }
    return libs[libPath];
}

function getText(_path,lib) {
    lib = getLib(lib);
    try {
        let path = _path.split(">");
        while (part = path.shift()) {
            lib = lib[part];
        }
        return lib['#text'];
    } catch (error) {
        if (debug)
            console.log("Localization : Error retrieving the text for the key",_path)
        return "["+_path+"]";
    }
}

function parsePage (libName) {
    let elems = document.getElementsByClassName(htmlSelector)
    for(let i = 0; i < elems.length;i++) {
        let path = elems[i].attributes["data-"+htmlDataKey].value;
        elems[i].innerHTML = getText(path,libName)
    }

}

exports.setLang = setLang; // used to change the language
exports.setLib = setCurrentLib;
exports.load = load;
exports.parsePage = parsePage;
exports.getLib = getLib;
exports.getText = getText;
exports.config = {
    class : htmlSelector,
    dataKey : htmlDataKey,
}

},{}],6:[function(require,module,exports){
exports.IIF_version = '0.0.1';

exports.Game = require('./game.js');
exports.BigNumber = require('./bignumber.js');
exports.View = require('./view.js');
exports.html = require('./html.js');
exports.localization = require('./localization.js');

window.IIF = exports;

},{"./bignumber.js":1,"./game.js":2,"./html.js":4,"./localization.js":5,"./view.js":9}],7:[function(require,module,exports){
let debug = true;

let _IIF = require("./main");

class Save {
    constructor (saveKey,gameObj) {
        this.saveKey = saveKey+"_IIFSave";
        this.gameObj = gameObj;
        if (this.hasSaveData()) {
            this.load();
        } else
            this.newSave();
    }
    hasSaveData () {
        return !(localStorage.getItem(this.saveKey) === null);
    }
    newSave () {
        return {
            meta : {IIF_version : _IIF.IIF_version,game_version : window.game.config.gameVersion},
            values : {},
        }
    }
    save() {
        let that = this;
        this.gameObj.listValues().forEach(function(key) {
            that.data.values[key] = that.gameObj.getValue(key).toJSON();
        });

        if (debug)
            console.log('Save : saving data to localstorage',this.data);

        localStorage.setItem(this.saveKey,JSON.stringify(this.data));
    }
    load() {
        let that = this;
        this.data = JSON.parse(localStorage.getItem(this.saveKey));
        this.upgradeSave_IIF();
        this.upgradeSave_Game();
        if (debug)
            console.log('Save : loading data from localstorage',this.data);
        this.gameObj.listValues().forEach(function(key) {
            that.gameObj.getValue(key).fromJSON(that.data.values[key]);
        });
        return this.data;
    }
    upgradeSave_IIF() {

        if (this.data.meta.IIF_version === _IIF.IIF_version)
            return;

        if (debug)
            console.log('Save : migrating IIF savedData from ',this.data.meta.IIF_version,'to',_IIF.IIF_version);

        switch(this.data.meta.IIF_version) {
            case '0.0.1' : ;// add here the migration code for saveData from 0.0.1 to the next version. Don't put a break, and put versions in chronological order to trigger all the upgrades necessary
                // this.data.values = this.data.data;
                // delete(this.data.data);
            default:break;
        }
        this.data.meta.IIF_version = _IIF.IIF_version;

    }
    upgradeSave_Game () {

        if (this.data.meta.game_version === this.gameObj.config.gameVersion)
            return;

        if (debug)
            console.log('Save : migrating game savedData from ',this.data.meta.game_version,'to',this.gameObj.config.gameVersion);

        if (!(typeof(this.gameObj.upgradeSave) === 'undefined')) {
            this.data.values = this.gameObj.upgradeSave(this.data.values,this.data.meta.game_version);
        }
        this.data.meta.game_version = this.gameObj.config.gameVersion;

    }
}

module.exports = Save;

},{"./main":6}],8:[function(require,module,exports){
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
        return this.getValueObject().toJSON();
    }
    fromJSON(json) {
        this.getValueObject().fromJSON(json);
    }
}
module.exports = SavedValue;

},{}],9:[function(require,module,exports){
let debug = true;
let html = require('./html');
let tplsToLoad = new WeakMap();

class View {
    constructor (config) {
        if (debug)
            console.log("View : creating a new view",config)
        this.config = config;
        this.components = {};
        if (!(typeof(config.customTpls) === "undefined")) {
            tplsToLoad.set(this,Object.keys(config.customTpls).length);
            let that = this;
            this.initialized = false;
            Object.keys(config.customTpls).forEach(function(key) {
                html.defineTpl(key,config.customTpls[key],that.finishTplLoading,that)
            })
        } else {
            this.onInitialized();
        }
    }
    finishTplLoading() {
        tplsToLoad.set(this,tplsToLoad.get(this)-1);
        if (tplsToLoad.get(this)<=0) {
            this.onInitialized();
        }
    }
    onInitialized () {
        let that = this;
        if (!document.body) {
          window.addEventListener("load", function(event) {
            that.onInitialized();
          });
          return false;
        }
        this.initialized = true;
        if (debug)
            console.log("View : View initialized",this.config)

        // tpls are loaded, we build the components
        if (!(typeof(this.config.components) === "undefined")) {
            let that = this;
            Object.keys(this.config.components).forEach(function(key) {
                that.addComponent(key,that.config.components[key]);
            })
        }

        if (!(typeof(this.config.onInitialized) === "undefined"))
            this.config.onInitialized.call(this.config.gameObj);
    }
    addComponent (componentID,config) {
        this.components[componentID] = config;
        this.buildComponent(componentID);
    }
    buildComponent (componentID) {
        let config = this.components[componentID];
        let element = document.getElementById(config.anchor);
        if (element === null) {
            if(debug)
                console.log("View ; trying to build an element but the anchor can't be found",componentID,config,document.getElementById(config.anchor))
            return false;
        }
        let innerHTML = html.getTpl(config.tpl,config.tplBindings);
        if (innerHTML)
            element.innerHTML = innerHTML;
    }
    redrawComponent (componentObj) {
        if (this.components[componentObj.component].tpl === 'updatedValue') {
            document.getElementById(this.components[componentObj.component].tplBindings.id).innerHTML = componentObj.toStr();
        } else this.buildComponent(componentObj.component);
    }
    redraw () {
        let that = this;
        Object.keys(this.config.components).forEach(function(key) {
            that.redrawComponent(key);
        })
    }
}
module.exports = View;

},{"./html":4}]},{},[6]);
