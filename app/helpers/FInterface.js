// FInterface.js

var FInterface = (function() {

  /**
      Code copyright Dustin Diaz and Ross Harmes, Pro JavaScript Design Patterns.
      http://my.safaribooksonline.com/book/programming/javascript/9781590599082/chapter-2-interfaces/the_interface_class
  **/

  /*
    based on:
    https://gist.github.com/1057989
    http://www.javascriptbank.com/how-implement-interfaces-in-javascript.html
  */

  /*
   * Constructor that creates a new Interface object for checking a function implements the required methods.
   * @param objectName | String | the instance name of the Interface
   * @param methods | Array | methods that should be implemented by the relevant function
   */
  var Interface = function (objectName, methods) {

    // Check that the right amount of arguments are provided
    if (arguments.length != 2) {

      throw new Error ("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");

    }
   
    // Create the public properties
    this.name = objectName;

    this.methods = [];
   
    // Loop through provided arguments and add them to the 'methods' array
    for (var i = 0, len = methods.length; i < len; i++) {

      // Check the method name provided is written as a String
      if (typeof methods[i] !== 'string') {

        throw new Error ("Interface constructor expects method names to be " + "passed in as a string.");
      }

      // If all is as required then add the provided method name to the method array
      this.methods.push(methods[i]);

    }
  };
   
  /*
   * Adds a static method to the 'Interface' constructor
   * @param object | Object Literal | an object literal containing methods that should be implemented
   */
  Interface.ensureImplements = function (object) {

    // Check that the right amount of arguments are provided
    if (arguments.length < 2) {
      throw new Error ("Interface.ensureImplements was called with " + arguments.length + "arguments, but expected at least 2.");

    }
   
    // Loop through provided arguments (notice the loop starts at the second argument)
    // We start with the second argument on purpose so we miss the data object (whose methods we are checking exist)
    for (var i = 1, len = arguments.length; i < len; i++) {

      // Check the object provided as an argument is an instance of the 'Interface' class
      var interface = arguments[i];
      if (interface.constructor !== Interface) {

        throw new Error ("Interface.ensureImplements expects the second argument to be an instance of the 'Interface' constructor.");
      }
   
      // Otherwise if the provided argument IS an instance of the Interface class then

      var methodNotFoundArr = [];

      // loop through provided arguments (object) and check they implement the required methods
      for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {

        var method = interface.methods[j];
   
        // Check method name exists and that it is a function (e.g. test[getTheDate]) 

        // if false is returned from either check then throw an error
        if (!object[method] || typeof object[method] !== 'function') {

          // catch all not found
          methodNotFoundArr.push(method);

          //throw new Error ("This Class does not implement the '" + interface.name + "' interface correctly. The method '" + method + "' was not found.");

        }
      }

      var methodNotFoundLen = methodNotFoundArr.length;
      if(methodNotFoundLen > 0) {

        var msg = '';

        msg += "\nThis Class does not implement the '" + interface.name + "' interface correctly.\n";
        msg += "The method";
        if(methodNotFoundLen > 1) msg += "s";
        msg += " [ " + methodNotFoundArr.join(', ') + " ] was not found.\n";

        throw new Error(msg);

      }

    }
  };

  return Interface;

})();

//---

module.exports = FInterface;  
