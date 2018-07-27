let _IIF = require("../IIF/main");

class Mana extends _IIF.behaviour.Bonus {
    constructor(valueObject) {
        super(valueObject,{
            getFinalEarning : function (baseValue,bonuses) {
                return (baseValue + bonuses.additive) * bonuses.multiplicative;
            },
            buildings : { // buildings are modifiers
                manaTower : {
                    component : 'manaTower',
                    bonuses : [
                        {
                            type : 'additive',
                            value : function (state) {
                                return state.buildings.manaTower.level * 0.5;
                            },
                        },
                    ],
                    cost : {
                        resource : 'mana',
                        quantity : function(state) {
                            return state.buildings.manaTower.level * 3;
                        }
                    }
                },
                archmage : {
                    component : 'archmage',
                    bonuses : [
                        {
                            type : 'multiplicative',
                            value : function (state) {
                                return 1 + state.buildings.archmage.level * 0.1;
                            },
                        },
                    ],
                    cost : {
                        resource : 'mana',
                        quantity : function(state) {
                            return state.buildings.archmage.level * 5 + 1;
                        }
                    }
                },
            }
        })
    }
}
module.exports = Mana;
