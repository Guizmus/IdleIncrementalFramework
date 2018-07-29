let debug = true;

let _data = new WeakMap();
let _gameObj = new WeakMap();

class BaseBehaviour {

    constructor (gameObj) {
        _gameObj.set(this,gameObj);
        _data.set(this,{});
    }
    game () {
        return _gameObj.get(this);
    }
    data () {
        return _data.get(this);
    }
    setData(data) {
        _data.set(this,data);
    }

    toJSON () {
        return this.data();
    }
    fromJSON(json) {
        this.setData(json);
    }

}

module.exports = BaseBehaviour;
