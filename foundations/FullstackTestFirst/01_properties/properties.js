/**
 * FVCproductions
 * @since May 14, 2015
 * @see propertiesSpec.js
 */

/**
 * Properties on Object Literal
 */

var setPropertiesOnObjLiteral = function(object) {

    /**
     * sets x to 7
     */
    object.x = 7; //sets x to 7

    /**
     * sets y to 8 (and we can use a string to access it)
     * @type {Number}
     */
    object.y = 8;
    // object.['y'] = 8;

    /**
     * sets the property 'onePlus' to a function that adds one to its parameter
     * @param  {Number} number
     * @return {Number} number+1
     */
    object.onePlus = function(number) {
        return number + 1;
    };
    // return object;

};

/**
 * Properties on an Array Object
 */

var setPropertiesOnArrayObj = function(arrayObject) {

    /**
     * sets the property `hello` to a function that returns the string `Hello!`
     * @return {string} [Hello!]
     */
    arrayObject.hello = function() {
        return "Hello!";
    };

    /**
     * sets the property `full` to stack (and we can use a string to access it)
     * @type {String}
     */
    arrayObject.full = "stack";

    /**
     * accesses the zeroth index value in the array
     * sets this value to 5
     */
    arrayObject[0] = 5;

    /**
     * sets the property 'twoTimes' to a function that multiplies its parameter by 1
     * @param  {Number} number
     * @return {Number} number * 2
     */
    arrayObject.twoTimes = function(number) {
        return number * 2;
    };

};

/**
 * Properties on Function Objects
 */
function setPropertiesOnFunctionObj(functionObj) {

    /**
     * returns the proper string the `functionObject` function returns declared in the beforeEach Function defined in test specs
     * @return {String}
     */
    functionObj.functionObject = function() {
        return "I am a function object, all functions are objects! Function can have their own properties too!";

    };

    /**
     * sets year to 2015
     * @type {Number}
     */
    functionObj.year = 2015;

    /**
     * sets `divideByTwo` to a function that accepts a number and returns the value divided by two
     * @param  {Number} number
     * @return {Number} number / 2
     */
    functionObj.divideByTwo = function(number) {
        return number / 2;
    };

    /**
     * adds a property to the existing prototype object only on Function Objects
     * @return {String}
     */
    functionObj.prototype.helloWorld = function() {
        return "Hello World";
    };

}