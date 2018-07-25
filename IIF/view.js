let debug = true;
let html = require('./html');
let tplsToLoad = new WeakMap();

class View {
    constructor (config) {
        if (debug)
            console.log("View : creating a new view",config)
        this.config = config;
        this.components = {};
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
        let that = this;
        if (!document.body) {
          window.addEventListener("load", function(event) {
            that.onInitialized();
          });
          return false;
        }
        this.initialized = true;
        if (debug)
            console.log("View : View initialized",this.config)

        // tpls are loaded, we build the components
        if (!(typeof(this.config.components) === "undefined")) {
            let that = this;
            Object.keys(this.config.components).forEach(function(key) {
                that.addComponent(key,that.config.components[key]);
            })
        }

        if (!(typeof(this.config.onInitialized) === "undefined"))
            this.config.onInitialized.call(this.config.gameObj);
    }
    addComponent (componentID,config) {
        this.components[componentID] = config;
        this.buildComponent(componentID);
    }
    buildComponent (componentID) {
        let config = this.components[componentID];
        let element = document.getElementById(config.anchor);
        if (element === null) {
            if(debug)
                console.log("View ; trying to build an element but the anchor can't be found",componentID,config,document.getElementById(config.anchor))
            return false;
        }
        let innerHTML = html.getTpl(config.tpl,config.tplBindings);
        if (innerHTML)
            document.getElementById(config.anchor).innerHTML = innerHTML;
    }
    redrawComponent (componentObj) {
        if (this.components[componentObj.component].tpl === 'updatedValue') {
            document.getElementById(this.components[componentObj.component].tplBindings.id).innerHTML = componentObj.toStr();
        } else this.buildComponent(componentObj.component);
    }
    redraw () {
        let that = this;
        Object.keys(this.config.components).forEach(function(key) {
            that.redrawComponent(key);
        })
    }
}
module.exports = View;
