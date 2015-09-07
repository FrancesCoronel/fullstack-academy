/**
 * Create a function called reduceRight that accepts an array, a starting value and an iterating function.  Instead of iterating over the array from left to right, have the reduceRight function start from the last element in the array.
 	* reduceRight takes an array, starting point, and combining function and applies the values in the array starting from the end
 	* concatenates a string
 * @param  {Array} arr
 * @param  {Number} startValue
 * @param  {Function} combiningFunc
 * @return {String} concanated string
 */
var reduceRight = function(arr, startValue, combiningFunc) {
	var currentValue = startValue;
	for (var i = arr.length - 1; i >= 0; i--) {
		currentValue = combiningFunc(currentValue, arr[i]);
	}
	return currentValue;
};

/**
 * concatenates a string and calls itself
 * @param  {Array} arr
 * @param  {Number} startValue
 * @param  {Function} combiningFunc
 * @return {String} concanated string
 */
var reduceRightRecursive = function(arr, startValue, combiningFunc) {
	var currentValue = startValue;
	if (arr.length === 0) {
		return startValue;
	}
	var nextStartValue = combiningFunc(currentValue, arr.pop());
	// Attempt 1
	// var currentValue = startValue;
	// var result = reduceRightRecursive(startValue, currentValue, combiningFunc);
	// // if (arr.length) {
	// // 	return reduceRightRecursive(arr.slice(1), startValue, arr[0];
	// // }
	// Attempt 2
	// if (arr.length === 0) {
	// 	return startValue;
	// }
	// startValue = combiningFunc(startValue, arr[0]);
	// return reduceRightRecursive(arr.slice(1), combiningFunc, startValue);
	// Attempt 3
	// var currentValue = startValue;
	// for (var i = 0; i < arr.length; i++) {
	// 	currentValue = reduceRightRecursive(arr, currentValue, reduceRight);
	// }
	// return currentValue;
};

// From TestFirst
// var reduce = function(arr, startValue, combiningFunc) {
//   var currentValue = startValue;
//   for (var i = 0; i < arr.length; i++) {
//     currentValue = combiningFunc(currentValue, arr[i]);
//   }
//   return currentValue;
// };