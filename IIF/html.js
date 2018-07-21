let fs = require('fs');
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
    updatedValue : fs.readFileSync(__dirname + "/html/updatedValue.tpl",'utf8'),
    localizedText :(fs.readFileSync(__dirname + "/html/localizedText.tpl",'utf8'))
                .replace('{{locClass}}',localization.config.class)
                .replace('{{locDataKey}}',localization.config.dataKey),
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
exports.test = function() {
    return getTpl('localizedText');
}
exports.getTpl = getTpl;
exports.localizedText = localizedText;
