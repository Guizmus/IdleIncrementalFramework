let debug = true;

let IIF = require("./main");

class Save {
    constructor (saveKey,gameObj) {

        if (debug)
            console.log("Save : new Save()",saveKey,gameObj);

        this.saveKey = saveKey+"_IIFSave";
        this.gameObj = gameObj;
        if (this.hasSaveData()) {
            this.load();
        } else {
            this.data = this.newSave();
            this.save();
            this.load();
        }
    }
    hasSaveData () {
        return !(localStorage.getItem(this.saveKey) === null);
    }
    clearSave () {
        localStorage.removeItem(this.saveKey);
        window.location.reload();
    }
    newSave () {
        return {
            meta : {
                IIF_version : IIF.IIF_version,
                game_version : this.gameObj.config.gameVersion
            },
            values : {},
        }
    }
    save() {
        let that = this;
        this.gameObj.listValues().forEach(function(key) {
            that.data.values[key] = that.gameObj.getValue(key).toJSON();
        });
        if (this.gameObj.config.ticks) {
            this.data.time = this.gameObj.getTicker().toJSON();
        }

        if (debug)
            console.log('Save : saving data to localstorage',this.data);

        localStorage.setItem(this.saveKey,JSON.stringify(this.data));
    }
    load() {
        let that = this;
        this.data = JSON.parse(localStorage.getItem(this.saveKey));
        this.upgradeSave_IIF();
        this.upgradeSave_Game();
        if (debug)
            console.log('Save : loading data from localstorage',this.data);
        this.gameObj.listValues().forEach(function(key) {
            that.gameObj.getValue(key).fromJSON(that.data.values[key]);
        });
        if ((this.gameObj.config.ticks) && !(typeof(this.data.time) === "undefined")) {
            this.gameObj.getTicker().fromJSON(this.data.time);
        }
        return this.data;
    }
    upgradeSave_IIF() {

        if (this.data.meta.IIF_version === IIF.IIF_version)
            return;

        if (debug)
            console.log('Save : migrating IIF savedData from ',this.data.meta.IIF_version,'to',IIF.IIF_version);

        switch(this.data.meta.IIF_version) {
            case '0.0.1' : ;// add here the migration code for saveData from 0.0.1 to the next version. Don't put a break, and put versions in chronological order to trigger all the upgrades necessary
                // this.data.values = this.data.data;
                // delete(this.data.data);
            default:break;
        }
        this.data.meta.IIF_version = IIF.IIF_version;

    }
    upgradeSave_Game () {

        if (this.data.meta.game_version === this.gameObj.config.gameVersion)
            return;

        if (debug)
            console.log('Save : migrating game savedData from ',this.data.meta.game_version,'to',this.gameObj.config.gameVersion);

        if (!(typeof(this.gameObj.upgradeSave) === 'undefined')) {
            this.data.values = this.gameObj.upgradeSave(this.data.values,this.data.meta.game_version);
        }
        this.data.meta.game_version = this.gameObj.config.gameVersion;

    }
}

module.exports = Save;
