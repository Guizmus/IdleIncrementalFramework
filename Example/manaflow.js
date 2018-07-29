let _IIF = require("../IIF/main");
let BonusList = require("./bonuslist.js");

class ManaFlow extends _IIF.behaviour.Bonus {

    constructor(gameObj) {
        super(gameObj,BonusList); // we detail how each bonus/building woks in bonusList.js
    }

    // this function is tasked with regrouping bonuses that share the same bonus ID in a single value
    compoundBonus (bonusID,values) {
        let compound = 0;
        switch (bonusID) { // bonusID is the type of bonus you used in bonusList. You can create new types of bonuses, those are just example.
            case 'additive' :
                values.forEach(function(bonus){
                    compound += bonus;
                });
                break;
            case 'multiplicative' :
                values.forEach(function(bonus){
                    compound *= bonus;
                });
                break;
            default :
                return false;
        }
        return compound;
    }

    // and then you can declare how the different bonus types apply their componded bonus values to the gameValue
    finalEarning  (value,valueID,bonuses) {
        // in case of mutiple earnings, you can custumize each formula
        // switch (valueID) {
        //     case 'mana' : break;
        //     case 'gold' : break;
        // }
        return (value + bonuses.additive) * bonuses.multiplicative;
    }

}
module.exports = ManaFlow;
