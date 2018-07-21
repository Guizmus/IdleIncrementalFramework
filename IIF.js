(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./localization":3}],2:[function(require,module,exports){

let tpls = {
    updatedValue : "<span id=\"{{id}}\">{{val}}</span>\r\n"
}
function loadTpl (tpl) {
    return tpls[tpl];
}
exports.test = function() {return loadTpl('updatedValue')}

},{}],3:[function(require,module,exports){
let debug = true;
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
                console.log("Localization : Error while loading the XML: ",error.message,libPath);
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
exports.libs = libs;

},{}],4:[function(require,module,exports){
exports.Game = require('./Game.js');
exports.html = require('./html.js');
exports.localization = require('./localization.js');

},{"./Game.js":1,"./html.js":2,"./localization.js":3}],5:[function(require,module,exports){
window.IIF = require("./IIF/main");

},{"./IIF/main":4}]},{},[5]);
