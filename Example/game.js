let _IIF = require("../IIF/main");
let _View = require("./view");

let Hammer = require("./lib/hammer.min.js");
let Mana = require("./mana")

class Game extends _IIF.Game {
    constructor(args) {
        super({
            langs : ['en-EN'], // optional, will default to en-EN. wil be ignored if no libName is given
            libName : 'Example', // optional, set to libName to load lang/libName.xml and activate localization using the _txt function
            viewClass : _View, // main view that will be targeted for redraws on value updates
            saveKey : 'example', // necessary for the save/load functions to work
            gameVersion : '0.1', // used for save migration/versioning
            ticks : 50,// if set to a value, activates the worker to tick when needed, activates the functions game.unpause, game.pause and game.restart. Target as many ticks per second as the value
            gameValues : { // game values are saved, and are linked to a view component for redraw. it gives handles like game.getValue(valueKey) (passed as reference) and game.redrawValue(valueKey) for a targeted redraw

                gold : {
                    // let's define the gold values
                    component : 'goldValueDisplay',
                     // the component that will be used. Needs to be declared in the view using the same componentID or will raise errors

                    data : new _IIF.dataStruct.Decimal(100,3),
                    // params are initial value and precision to display
                    // depending on what you do with this value, you may want to use
                    // IIF.dataStruct.Decimal for more precise values, with big numbers
                    // IIF.dataStruct.BreakInfinity for fast calculation, with big numbers
                    // another class that you build, that presents the methods toStr() for drawing, toJSON() and fromJSON(json) for save and load behaviour
                },
            },

                // mana : {
                //     component : 'manaValueDisplay',
                //     data : new _IIF.dataStruct.BigNumber(1,3),
                //     behaviour : Mana, // linking a behaviour class will make the resource react to ticks. This needs the game to have set the ticks param to true. A Behaviour class must implement a tick function at least, you can extends one of the IIF.behaviour class to use some built in features.
                //     // The behaviour Bonus (that Mana extends here) is built for a resource that is earned every tick, and has an increasing earning based on a list of bonuses (like buildings in common clickers)
                //     // The behaviour TendsTo is built for a value that tends to something. For example, stamina going down towards 0 at a constant step of -1 per second, or -5% per second. different steps can be declared to trigger special functions then
                // },
        });
    }
    onViewInitialized () {
        this.hammerTest();
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
    resetGold () {
        this.getValue('gold').setValue(100);
        this.redrawValue('gold')
    }
    hammerTest() {
        var element = document.getElementById('hammerDisplay');
        var mc = new Hammer(element);
        mc.on("panleft panright tap press", function(ev) {
            element.textContent = ev.type +" gesture detected.";
        });
    }
}
module.exports = Game;
