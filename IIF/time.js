let debug = true;

let _running = new WeakMap();
let _lastTotalTicks = new WeakMap();

class Time {
    constructor (tickedObject,ticksPerSecond) {

        if (debug)
            console.log("Time : new Time()",tickedObject,ticksPerSecond);

        let that = this;
        this.tickedObject = tickedObject;
        this.ticksPerSecond = ticksPerSecond;
        this.worker = new Worker('IIFWorker.js');
        this.worker.onmessage = function(e) {
            that.handleWorkerMessage.call(that,e);
        }
        _running.set(this,false);
        _lastTotalTicks.set(this,0);
    }
    isRunning () {
        return _running.get(this);
    }
    unpause () {
        _running.set(this,true);
        this.worker.postMessage({action:'unpause'});
    }
    pause () {
        _running.set(this,false);
        this.worker.postMessage({action:'pause'});
    }
    restart () {
        _running.set(this,false);
        this.worker.postMessage({
            action:'restart',
            ticksPerSecond:ticksPerSecond,
        });
    }
    tick () {
        this.worker.postMessage({action:'tick'});
    }
    handleWorkerMessage(e) {
        if (debug)
            console.log("Time : recieving a message from the worker",e.data,this);
        let response = e.data;
        switch (response[0]) {
            case 'doTick' :
                _lastTotalTicks.set(this,response[2]);
                if (response[1] > 0)
                    this.tickedObject.processTicks(response[1]);
                break;
            default : break;
        }
    }
    toJSON() {
        return {
            running : this.isRunning(),
            lastTicks : _lastTotalTicks.get(this),
        }
    }
    fromJSON(json) {
        if (!((typeof(json.running) === "undefined") || (typeof(json.lastTicks) === "undefined"))) {
            if (debug)
                console.log("Time : loading from json",json);
            _running.set(this,json.running);
            this.worker.postMessage({
                action:'setState',
                ticks:json.lastTicks,
                running:json.running,
            });
        }

    }
}

module.exports = Time;
