exports.IIF_version = '0.0.2';

exports.Game = require('./game.js');
exports.dataStruct = {
    BreakInfinity : require('./dataStruct/breakinfinity.js'),
    Decimal : require('./dataStruct/decimal.js'),
}
exports.View = require('./view.js');
exports.html = require('./html.js');
exports.localization = require('./localization.js');
exports.behaviour = {
    Bonus : require('./behaviour/bonus.js'),
    TendsTo : require('./behaviour/tendsto.js'),
}

window.IIF = exports;
