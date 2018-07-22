let debug = false;
let html = require('./html');
let tplsToLoad = new WeakMap();

class View {
    constructor (config) {
        if (debug)
            console.log("View : creating a new view",config.identifier)
        this.config = config;
        if (!(typeof(config.customTpls) === "undefined")) {
            tplsToLoad.set(this,Object.keys(config.customTpls).length);
            let that = this;
            this.initialized = false;
            Object.keys(config.customTpls).forEach(function(key) {
                html.defineTpl(key,config.customTpls[key],that.finishTplLoading,that)
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
        if (!(typeof(this.config.onInitialized) === "undefined"))
            this.config.onInitialized.call(this.config.gameObj);
    }
}
module.exports = View;
