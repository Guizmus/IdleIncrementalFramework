(()=>{
    class View extends IIF.View {
        constructor (params) {
            params.customTpls = {
                example1control : 'Example1/tpl/control.tpl',
            }
            super(params)
        }
    }
    window.viewClass = View;
})()
