let debug = true;

let running = false;
let ticksPerSecond = 50;
let currentTick = 0;
let currentTime = false;
let relicat = 0;

function initialize (tps) {
    running = false;
    currentTick = 0;
    currentTime = false;
    relicat = 0;
    if (!(typeof(tps) === "undefined"))
        ticksPerSecond = tps;
}

function start () {
    if (!running) {
        running = true;
        currentTime =  new Date();
        relicat = 0;
    }
}

// returns the number of ticks since the timer started or was last checked
function getTicks() {
    if (!running)
        return 0;
    previousTime = currentTime.getTime();
    console.log("IIF Worker : getting ticks. Reference date :",previousTime)
    let newTime = new Date();
    let ticks = (newTime.getTime() - previousTime) * ticksPerSecond / 1000;
    ticks = ticks + relicat;
    relicat = ticks - Math.floor(ticks);
    ticks = Math.floor(ticks);
    currentTick = currentTick + ticks;
    currentTime = newTime;
    return ticks;
}

function pause () {
    let ticks = getTicks();
    running = false;
    return ticks;
}

self.addEventListener('message',  e => {
    let ticks = 0;
    switch(e.data.action) {
        case 'setState' :
            if (debug)
                console.log("IIF Worker : setting state",e.data);
            initialize();
            currentTick = e.data.ticks;
            if (e.data.running)
                start();
            break;
        case 'restart' :
            if (debug)
                console.log("IIF Worker : restarting the time");
            initialize(e.data.ticksPerSecond);
            break;
        case 'unpause' :
            if (debug)
                console.log("IIF Worker : unpausing the time");
            start();
            break;
        case 'pause' :
            if (debug)
                console.log("IIF Worker : pausing the time");
            ticks = pause();
            postMessage(['doTick',ticks,currentTick]);
            break;
        case 'tick' :
            if (debug)
                console.log("IIF Worker : ticking");
            ticks = getTicks();
            postMessage(['doTick',ticks,currentTick]);
            break;
    }
})
