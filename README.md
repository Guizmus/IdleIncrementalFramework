# IdleIncrementalFramework

## Features

### Baked with the game, or used as lib
The lib can be used on its own like most libs, or can be baked in a common bundle with the game.
It needs to implement a class that extends IIF.Game, and instanciates.

Example 1 is using the IIF lib directly, and can have any structue for the game itself.

Example 2 is baking IIF with itself, using browserify and will need the following steps :
* run node_modules_install.bat to install the dependancies in the project
* run build.bat to rebuild the IIF.js file from the sources

### Localized texts
Aiming for multilingual or just wanting to centralize texts in an XML file, the lib integrates XML lib loading, and logic for changing language during runtime.

Example 1 uses localization. The title tag is completed from the XML because of that. Using IIF.html.localizedText function, you can use strings from your XMLs in your views.

Example 2 doens't use localization, and will directly put strings in the page.
