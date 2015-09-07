/**
 * FVCproductions
 * @since May 17, 2015
 * @see HelloSpec.js
 */

/**
 * Talk about Function
 	* (1) says hello
 	* (2) says hello to someone
 */

var hello = function(name) {
    if (typeof name === "undefined") {
        return "Hello!";
    } else {
        return "Hello, " + name + "!";
    }
};