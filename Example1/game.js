(()=>{
    class Game extends IIF.Game {
        constructor(args) {
            super({
                name : "Example 1", // used as identifier on the object, no use other than test
                langs : ['en-EN'], // optional, will default to en-EN. wil be ignored if no libName is given
                libName : 'Examples', // optional, set to libName to load lang/libName.xml and activate localization using the _txt function
                viewClass : window.viewClass, // main view that will be targeted for redraws on value updates
                anchor : 'example1',
            });
        }
    }
    window.gameClass = Game;
})()
