let debug = false;
let html = require('./html');
let tplsToLoad = new WeakMap();

class View {
    constructor (params) {
        if (debug)
            console.log("View : creating a new view",params.identifier)
        this.identifier = params.identifier;
        if (!(typeof(params.customTpls) === "undefined")) {
            tplsToLoad.set(this,Object.keys(params.customTpls).length);
            let that = this;
            this.initialized = false;
            Object.keys(params.customTpls).forEach(function(key) {
                html.defineTpl(key,params.customTpls[key],that.finishTplLoading,that)
            })
        } else {
            this.onInitialized();
        }
    }
    finishTplLoading() {
        tplsToLoad.set(this,tplsToLoad.get(this)-1);
        if (tplsToLoad.get(this)<=0) {
            this.onInitialized();
        }
    }
    onInitialized () {
        this.initialized = true;
        if (debug)
            console.log("View : View initialized",this.identifier)
    }
}
module.exports = View;
