exports.IIF_version = '0.0.1';

exports.Game = require('./game.js');
exports.dataStruct = {
    BigNumber : require('./dataStruct/bignumber.js'),
    BreakInfinity : require('./dataStruct/breakinfinity.js'),
}
exports.View = require('./view.js');
exports.html = require('./html.js');
exports.localization = require('./localization.js');

window.IIF = exports;
