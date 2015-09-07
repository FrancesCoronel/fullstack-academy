/**
 * Create a function, which returns an array of functions. Each function returns their index in the array.
 	* createFunction returns an array of functions
 	* all indexes in arry are functions
 	* when functions in array are invoked, they return correct number
 	* random values for n
 * @return {Array} [array of functions]
 */
var createFunctions = function(n) {
	// var myArray = Array(n);
	// n.forEach(function(arr) {
	// 	myArray.push(arr);
	// });
	// return myArray;
	for (i = 0; i < array_of_functions.length; i++) {
    	array_of_functions[i]();
	}
};

// Alternate Solution 1

var createFunctions = function(n) {
	var result = [];
	for (var i = 0; i < n; i ++) {
		(function (index) {
			result.push(function() {
				return index;
			});
		})(i);
		pushOne(i);
	}
	return result;
};

// Alternate Solution 2

var createFunctions = function(n) {
	for (var i = 0; i < n; i++) {
		result.push(i);
	}
	result = result.map(function(n) {
		return function(n) {
			return n;
		};
	});
	return result;
};