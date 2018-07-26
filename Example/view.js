let _IIF = require("../IIF/main");
let _txt = _IIF.html.localizedText;

class View extends _IIF.View {
    constructor (params) {
        // in this example, we will use a custom TPL
        params.customTpls = {
            control : 'Example/tpl/control.tpl',
            monitor : 'Example/tpl/monitor.tpl',
        }
        // you can also define tpl during runtime with :
        // _IIF.html.defineTpl('control','Example/tpl/control.tpl');

        // we then will use that component for 2 controls
        params.components = {
            addGold : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.addGold(10)',
                    text : _txt("test_output>controls>addGold"),
                },
                anchor : 'addGold',
            },
            multiplyGold : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.multGold(1)',
                    text : _txt("test_output>controls>multGold"),
                },
                anchor : 'multGold',
            },
            resetGold : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.resetGold()',
                    text : _txt("test_output>controls>resetGold"),
                },
                anchor : 'resetGold',
            },
            save : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.save()',
                    text : _txt("test_output>controls>save"),
                },
                anchor : 'save',
            },
            load : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.load()',
                    text : _txt("test_output>controls>load"),
                },
                anchor : 'load',
            },
            clearSave : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.clearSave()',
                    text : _txt("test_output>controls>clearSave"),
                },
                anchor : 'clearSave',
            },

            startTime : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.unpause()',
                    text : _txt("test_output>controls>unpause"),
                },
                anchor : 'unpause',
            },
            stopTime : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.pause()',
                    text : _txt("test_output>controls>pause"),
                },
                anchor : 'pause',
            },
            tick : {
                tpl : 'control',
                tplBindings : {
                    onclick : 'game.tick()',
                    text : _txt("test_output>controls>tick"),
                },
                anchor : 'tick',
            },

            goldDisplay : {
                tpl : 'monitor',
                tplBindings : {
                    label : _txt("test_output>resource>gold>label"),
                    value : '',
                    valueId : 'goldValueDisplay',
                },
                anchor : 'goldDisplay',
            },
            goldValueDisplay : {
                tpl : 'updatedValue',
                tplBindings : {
                    id : 'goldDisplay_value',
                    val : '',
                },
                anchor : 'goldValueDisplay',
            },
        }
        super(params)
    }
}
module.exports = View;
