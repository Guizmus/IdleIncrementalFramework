# IdleIncrementalFramework

## Features

### Baked with the game, or used as lib
The lib can be used on its own like most libs, or can be baked in a common bundle with the game.

The example is baking IIF with itself, using browserify and will need the following steps :
* run node_modules_install.bat to install the dependancies in the project
* run build.bat to rebuild the example.js file from the sources.

### Using the lib
The example is documented to help use the lib.
To effectively use the features of the lib, you will need to instance the IIF.Game class providing valid parameters. The example extends the Game class to add functionalities.

### Localized texts
Aiming for multilingual or just wanting to centralize texts in an XML file, the lib integrates XML lib loading, and logic for changing language during runtime.

The title tag is completed from the XML because of that. Using IIF.html.localizedText function, you can use strings from your XMLs in your views.
view.js uses this a lot in the example.

### BigNumber Data Structure
Using exponentially growing numbers is a common thing in Incrementals. The IIF.DataStruct classes store a big number. You can use the Decimal structure for precision, or the breakInfinity structure for calculation speed.

It gives multiple formating output :
* Scientific through toScientific
* Engineering though toEngineering
* Short suffix thought toShortSuffix
* Long suffix throught toLongSuffix

It can also return its internal values for custom formating.

it exposes the methods :

* setValue : the value to be used initialy
* add : to add a given number to the current value
* setPrecision : the displayed precision
* getValue : the Float value, calculated on call

### gameValues
GameValues are objects built from the constructor of the Game class that link a data structure, like BigNumber, and a view component.
Every game value has its data saved and loaded with the built in save system.

The data structure needs to have the methods :
* toStr() : to display the value
* toJSON() : to export the data for saving purpose
* fromJSON(json) : to load datas that were previously saved. The json recieved is the same that you returned in toJSON.

The component needs to be defined in the view

### Behaviours
 
### View templates and targeted redraw
The provided view class has access to built in templates for updated value and localized text.
When declaring you Game object, using a custom view class extending the IIF.View class will let you declare custom tpls.
Custom Tpls are loaded at the start of runtime, so using this feature will wait for the templates to be loaded before building components out of it.

 ### Time
