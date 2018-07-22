let _IIF = require("../IIF/main");
_IIF.html.defineTpl('example2control','Example2/tpl/control.tpl')
class View extends _IIF.View {
    constructor (params) {
        params.customTpls = {
            example2control : 'Example2/tpl/control.tpl',
        }
        super(params)
    }
}
module.exports = View;
