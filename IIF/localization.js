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
