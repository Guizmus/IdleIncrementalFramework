(()=>{
    let _txt = IIF.html.localizedText;
    class View extends IIF.View {
        constructor (params) {
            // in this example, we will use a custom TPL
            params.customTpls = {
                example1control : 'Example1/tpl/control.tpl',
            }
            // we then will use that component for 2 controls
            params.components = {
                addGold : {
                    tpl : 'example1control',
                    tplBindings : {
                        onclick : '',
                        text : _txt("test_output>controls>addGold"),
                    },
                    anchor : 'example1addGold',
                },
                multiplyGold : {
                    tpl : 'example1control',
                    tplBindings : {
                        onclick : '',
                        text : _txt("test_output>controls>multGold"),
                    },
                    anchor : 'example1multGold',
                }
            }
            super(params)
        }
    }
    window.viewClass = View;
})()
