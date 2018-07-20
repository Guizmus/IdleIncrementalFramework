fs = require('fs');
let tpls = {
    updatedValue : fs.readFileSync(__dirname + "/html/updatedValue.tpl",'utf8')
}
function loadTpl (tpl) {
    return tpls[tpl];
}
exports.test = function() {return loadTpl('updatedValue')}
