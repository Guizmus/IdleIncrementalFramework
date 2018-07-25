let _IIF = require("../IIF/main");
_IIF.html.defineTpl('control','Example/tpl/control.tpl');
let _txt = _IIF.html.localizedText;

class View extends _IIF.View {
    constructor (params) {
        // in this example, we will use a custom TPL
        params.customTpls = {
            example1control : 'Example/tpl/control.tpl',
        }
        // we then will use that component for 2 controls
        params.components = {
            addGold : {
                tpl : 'control',
                tplBindings : {
                    onclick : '',
                    text : _txt("test_output>controls>addGold"),
                },
                anchor : 'addGold',
            },
            multiplyGold : {
                tpl : 'control',
                tplBindings : {
                    onclick : '',
                    text : _txt("test_output>controls>multGold"),
                },
                anchor : 'multGold',
            },
            goldDisplay : {
                tpl : 'updatedValue',
                tplBindings : {
                    id : 'goldDisplay_value',
                    val : 0,
                },
                anchor : 'goldDisplay',
            }
        }
        super(params)
    }
}
module.exports = View;
