let debug = true;

let BaseBehaviour = require('./behaviour')

class Bonus extends BaseBehaviour {
    constructor(valueObject,config) {
        super(valueObject);
        this.config = config;
        // if (typeof(config.buildings))
    }

        // getFinalEarning : function (baseValue,bonuses) {
        //     return (baseValue + bonuses.additive) * bonuses.multiplicative;
        // },
        // buildings : { // buildings are modifiers
        //     manaTower : {
        //         component : 'manaTower',
        //         bonuses : [
        //             {
        //                 type : 'additive',
        //                 value : function (state) {
        //                     return state.buildings.manaTower.level * 0.5;
        //                 },
        //             },
        //         ],
        //         cost : {
        //             resource : 'mana',
        //             quantity : function(state) {
        //                 return state.buildings.manaTower.level * 3;
        //             }
        //         }
        //     },
}

module.exports = Bonus;
