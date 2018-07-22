(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let debug = false;

let innerPrecision = Number.MAX_SAFE_INTEGER.toExponential().split("e+")[1] -1; // usually 14

let _value = new WeakMap();

class BigNumber {
    constructor (initialValue,displayPrecision) {
        let preciseValue = initialValue.toExponential().split('e');
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
}

exports = BigNumber

},{}],2:[function(require,module,exports){
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

},{"./localization":4,"./view":6}],3:[function(require,module,exports){
let debug = false;

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
    fetch(path)
        .then(response => response.text())
        .then(data => {
            if (debug)
                console.log("html : Loaded tpl",path,data);
            callback.call(this,data)
        })
        .catch(function(error) {
            console.warn("html : Error while loading a tpl : ",error.message,path);
            callback.call(this,false)
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

},{"./localization":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
exports.Game = require('./game.js');
exports.BigNumber =require('./bignumber.js');
exports.View = require('./view.js');
exports.html = require('./html.js');
exports.localization = require('./localization.js');
window.IIF = exports;

},{"./bignumber.js":1,"./game.js":2,"./html.js":3,"./localization.js":4,"./view.js":6}],6:[function(require,module,exports){
let debug = false;
let html = require('./html');
let tplsToLoad = new WeakMap();

class View {
    constructor (params) {
        if (debug)
            console.log("View : creating a new view",params.identifier)
        this.identifier = params.identifier;
        if (!(typeof(params.customTpls) === "undefined")) {
            tplsToLoad.set(this,Object.keys(params.customTpls).length);
            let that = this;
            this.initialized = false;
            Object.keys(params.customTpls).forEach(function(key) {
                html.defineTpl(key,params.customTpls[key],that.finishTplLoading,that)
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
        this.initialized = true;
        if (debug)
            console.log("View : View initialized",this.identifier)
    }
}
module.exports = View;

},{"./html":3}]},{},[5]);
