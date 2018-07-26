let debug = true;

class Time {
    constructor (tickedObject) {
        let that = this;
        this.tickedObject = tickedObject;
        this.worker = new Worker('IIFWorker.js');
        this.worker.onmessage = function(e) {
            that.handleWorkerMessage.call(that,e);
        }
        this.running = false;
    }
    unpause () {
        this.worker.postMessage('unpause');
    }
    pause () {
        this.worker.postMessage('pause');
    }
    restart () {
        this.worker.postMessage('restart');
    }
    tick () {
        this.worker.postMessage('tick');
    }
    handleWorkerMessage(e) {
        if (debug)
            console.log("Time : recieving a message from the worker",e.data,this)
        let response = e.data;
        switch (response[0]) {
            case 'doTick' :
                if (response[1] > 0)
                    this.tickedObject.processTicks(response[1]);
                break;
            default : break;
        }
    }
}

module.exports = Time;
