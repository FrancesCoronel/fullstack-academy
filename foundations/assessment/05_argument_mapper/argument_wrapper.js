/**
 * createArgumentMap
 	* returns an object
 	* properties on the object returned always assign properties with the convention a0,a1,a2...
 	* returns an object when there is only a function object argument and a string
 	* creates properties and assigns the values for each argument in the proper order
 */
var createArgumentMap = function() {
	createArgumentMap.prototype = function (){};
};

// Alternate Solution

var createArgumentMap = function() {
	var result = {};
	for (var i = arguments.length - 1; i >= 0; i--) {
		var key = result['a' + i];
		result[key] = arguments[i];
	}
	return result;
};

/**
 * Create a Key Adder that loops over an Object's keys, finds all number values, and returns the sum of all the numbers.
 	* keyAdder is a function
 	* can be passed as an argument
 	* returns a number value
 	* is designed to be called within an object's context, do not create conditions if called in the global scope
 	* adds all the keys with number values & returns their sum
 	* skips properties of the object's prototype
 * @param  {Object} obj
 * @return {Number} sum of number values within keys of object
 */
var keyAdder = function(obj) {
	var sum = 0;
	Object.keys(obj).forEach(function(key) {
		if (key.match(/\d+g/)) {
			sum += Number(key);
		}
	});
	return sum;
};

// Alternate Solution

var keyAdder = function() {
	var sum = 0;
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			if (typeof this[k] === 'number') {
				sum += this[k];
			}
		}
	}
	return sum;
};

// Attempt 2

// var keyAdder = function(obj) {
// 	var sum = 0;
// 	for (var key in obj) {
// 		if (key.match(/\d+g/)) {
// 			sum += Number(key);
// 		}
// 	}
// 	return sum;
// };