let _name = new WeakMap();

class Game {
    constructor(name) {
        _name.set(this,name);
    }
    load () {

    }
    save () {

    }
    draw () {

    }
    update () {

    }
    log() {
        console.log(_name.get(this));
    }
}
module.exports = Game;
