/**
 * FVCproductions
 * @since May 20, 2015
 * @see functionsSpec.js
 */

/**
 * The Arguments Array
 	* (1) allows you to call a function with arguments like
 	* (2) allows you to call a function with as many arguments as you want
 * @return {String} [concanated arguments]
 */
var concat_string = function() {
	var str = "";
	for (var i = 0; i < arguments.length; i++) {
		str += arguments[i];
	}
	return str;
};

/**
 * Higher Order Functions
 	* (1) means that a function can take a function as an argument
 * @return {String} [arguments from function concanated together]
 */
var yourFunctionRunner = function() {
	var str = "";
	for (var i = 0; i < arguments.length; i++) {
		str += arguments[i]();
	}
	return str;
};

/**
 * Closures
 	* (1) takes an argument A and returns a function that adds A to any value it's passed
 * @param  {Number} i, j [first and seconds arguments]
 * @return {Number} adderFunction() [sum of i and j]
 */
var makeAdder = function(i) {
	var adderFunction = function(j) {
		return i + j;
	};
	return adderFunction();
};

/**
 * Once Functions
 	* (1) should only increment num one time
 * @param  {Function} runOnce [decorated function?]
 * @return {Function} runOnce [only running one time and that's it]
 */
var once = function(runOnce) {
	var done = true;
	return function() {
		if (done === false) {
			runOnce();
			done = true;
		}
	};
};

// var twice = function(runTwice) {
// 	var call = 0;
// 	return function() {
// 		if (call < 2) {
// 			call++;
// 			twice();
// 		}
// 		else {
// 			twice();
// 		}
// 	};
// };

/**
 * Shared Contexts
 	* (1) should return an object with two functions
 	* (2) should let two functions call the same value
 * @return {Number} [object sum value of two closures]
 */
var createObjectWithTwoClosures = function() {
	var n = 0;
	return {
		oneIncrementer: function() {
			n += 1;
		},
		tensIncrementer: function() {
			n += 10;
		},
		getValue: function() {
			return n;
		}
	};
};

// Provided Solution

var concat_string = function() {
	var finalString = "";
	for (var i = 0; i < arguments.length; i++) {
		finalString += arguments[i];
	}
	return finalString;
};

// OR

var concat_string = function() {
	return Array.prototype.slice.call(arguments).join("");
};

var yourFunctionRunner = function() {
	var finalString = "";
	for (var i = 0; i < arguments.length; i++) {
		finalString += arguments[i];
	}
	return finalString;
};

var makeAdder = function(numToRemember) {
	return function (numToAdd) {
		return numToAdd + numberToRemember;
	};
};

var once = function(functionRunOnce) {
	var ran = false;
	return function() {
		if (hasRan === false) {
			functionRunOnce();
			ran = true;
		}
	};
};