let _IIF = require("../IIF/main");
_IIF.html.defineTpl('control','Example/tpl/control.tpl');
let _txt = _IIF.html.localizedText;

class View extends _IIF.View {
    constructor (params) {
        // in this example, we will use a custom TPL
        params.customTpls = {
            control : 'Example/tpl/control.tpl',
            monitor : 'Example/tpl/monitor.tpl',
        }
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
