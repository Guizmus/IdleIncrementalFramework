// for each bonus, we detail the comportment.
// can be implemented the following keys / methods :
// bonus : called once for each tick processed, to apply its returned values. if not defined, this bonus won't be called on tick.
// cost : called to know how much of each GameValue will be consumed upon buying. if not defined, bonus is free (the function levelUp is still called)
// maxLevel : called to know the maximum times this bonus can be bought. if not defined, max level is infinite
// levelUp : if defined, called after this.level has been uped and the cost have been applied
// you can access the behaviour with this.behaviour, the game with this.game, and this.level.
// other bonuses details are accessible through this.behaviours.bonuses.{{bonusName}}
exports.ManaTower = {
    bonus : function () {
        return [{
            gameValue : 'mana',
            type : 'additive',
            value : this.level * 0.5,
        }]
    },
    cost : function () {
        return [{
            gameValue : 'gold',
            value : 10 + this.level,
        }]
    },
    levelUp : function () {
        console.log("ManaTower : level up, here is my state",this);
    }
};
exports.ArchMage = {
    bonus : function () {
        return [{
            gameValue : 'mana',
            type : 'multiplicative',
            value : 1 + this.level * 0.1,
        }]
    },
    cost : function () {// we can set multiple costs. we could also award bonus for multiple gameValues
        return [
            {
                gameValue : 'gold',
                value : Math.max(10,10 * this.level),
            },
            {
                gameValue : 'mana',
                value : this.level,
            },
        ]
    },
    levelUp : function () {
        console.log("ArchMage : level up, here is my state",this);
    }
};
