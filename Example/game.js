let _IIF = require("../IIF/main");
let _View = require("./view");
class Game extends _IIF.Game {
    constructor(args) {
        super({
            langs : ['en-EN'], // optional, will default to en-EN. wil be ignored if no libName is given
            libName : 'Example', // optional, set to libName to load lang/libName.xml and activate localization using the _txt function
            viewClass : _View, // main view that will be targeted for redraws on value updates
            gameValues : {
                gold : {
                    component : 'goldDisplay',
                    data : new _IIF.BigNumber(100,0),
                }
            }
        });
    }
}
module.exports = Game;
