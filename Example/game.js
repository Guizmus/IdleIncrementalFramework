let _IIF = require("../IIF/main");
let _View = require("./view");
class Game extends _IIF.Game {
    constructor(args) {
        super({
            langs : ['en-EN'], // optional, will default to en-EN. wil be ignored if no libName is given
            libName : 'Example', // optional, set to libName to load lang/libName.xml and activate localization using the _txt function
            viewClass : _View, // main view that will be targeted for redraws on value updates
            saveKey : 'example', // necessary for the save/load functions to work
            gameVersion : '0.1',
            gameValues : {
                gold : {
                    component : 'goldValueDisplay',
                    data : new _IIF.BigNumber(100,0),
                }
            }
        });
    }
    upgradeSave (saveData,fromVersion) {
        console.log("upgrading savedata from game",saveData,"from game version",fromVersion);
        // if saveData changes structure from one game version to another, you can alter the saved games here.
        switch(fromVersion) {
            case '0.1' : // put here the necessary changes from version 0.1 to the next. Don't use a break, so following upgrades will trigger too
            default:;
        }

        return saveData;
    }
    addGold (quantity) {
        this.getValue('gold').add(quantity);
        this.redrawValue('gold')
    }
    multGold (exponent) {
        let goldValue = this.getValue('gold')
        let currentGold = goldValue.getValue();
        currentGold = currentGold*Math.pow(10,exponent);
        goldValue.setValue(currentGold);
        this.redrawValue('gold')
    }
}
module.exports = Game;
