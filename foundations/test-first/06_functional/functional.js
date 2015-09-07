/**
 * first, create a function that takes an element and returns double of it
 * @param  {Number} n
 * @return {Number} double the n value
 */
var doubler = function(n) {
  return 2 * n;
};

// Provided Solution

// var doubler = function(n) {
//   return n * 2;
// };

/**
 * takes our doubling function and applies it to an array
 * takes a tripling function
 * @param  {Array} arr
 * @param  {Function} func
 * @return {Array} array with values the are double that of parameter array
 */
var map = function(arr, func) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(func(arr[i]));
  }
  return result;
};

// forEach function

// var forEach = function(arr, iterator) {
//   for (var i = 0; i < arr.length; i++) {
//     iterator(arr[i]);
//   }
//   return arr;
// };

// Alternate Solution

// var map = function(arr, iterator) {
//   for (var i = 0; i < arr.length; i++) {
//     arr[i] = iterator(arr[i]);
//   }
//   return arr;
// };

// Provided Solution

// var map = function(arr, filterFunc) {
//   var result = [];
//   for (var i = 0; i < arr.length; i++) {
//       result.push(filterFunc(arr[i]));
//     }
//   return result;
// };

/**
 * filters an array based on evens
 * filters an array based on odds
 * @param  {Array} arr
 * @param  {Function} func
 * @return {Boolean} true or false depending on filter function
 */
var filter = function(arr, func) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
};

// Provided Solution

// var filter = function(arr, filterFunc) {
//   var result = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (filterFunc(arr[i])) {
//       arr.push(filterFunc(arr[i]));
//     }
//   }
//   return result;
// };

/**
 * should return true if a collection contains a user-specified value
 * should return false if a collection does not contain a user-specified value
 * @param  {Array} collection
 * @param  {Number} n
 * @return {Boolean} true if value is in collection, false otherwise
 */
var contains = function(arr, n) {
  for (var i in arr) {
    if (arr[i] === n)
      return true;
  }
  return false;
};

// Provided Solution

// var contains = function(collection, searchValue) {
//   for (var key in collection) {
//     if (collection.hasOwnProperty(key)) {
//       if (collection[key] === searchValue) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

/**
 * counts words in a sentence separated by empty space
 * @param  {String} string
 * @return {Number} number of words in sentence
 */
var countWords = function(str) {
  var result = str.split(" ");
  return result.length;
};

// Provided Solution

// var countWords = function(str) {
//   return sentence.split(" ").length;
// };

/**
 * sums up the array
 * @param  {Array} array
 * @param  {Number} start [starting point]
 * @param  {Function} func
 * @return {Number} number of words in array of strings
 */
var reduce = function(arr, start, func) {
  var result = start;
  for (var i = 0; i < arr.length; i++) {
    result = func(result, arr[i]);
  }
  return result;
};

// Provided Solution

// var reduce = function(arr, startValue, combiningFunc) {
//   var currentValue = startValue;
//   for (var i = 0; i < arr.length; i++) {
//     currentValue = combiningFunc(currentValue, arr[i]);
//   }
//   return currentValue;
// };

/**
 * counts the number of words in an array of strings
 * @param  {Number} n
 * @param  {String} str
 * @return {Number} number of words in array of strings
 */
var countWordsInReduce = function(n, str) {
  return n + countWords(str);
};

// var countWordsInReduce = function(currentValue, str) {
//   return currentValue + countWords(str);
// };

/**
 * adds up an array and reduce is called
 * @param  {Array} array
 * @return {Number} sum of array
 */
var sum = function(arr) {
  return reduce(arr, 0, function(a, b) {
    return a + b;
  });
};

// Provided Solution

// var sum = function(arr) {
//   var adder = function(currentSum, nextValue) {
//     return currentSum + nextValue;
//   };
//   return reduce(arr, 0, adder);
// };

/**
 * should handle an empty set
 * should handle a set that contains even numbers
 * should handle a set that contains an odd number
 * @param  {Array} array
 * @param  {Function} func
 * @return {Boolean} true or false depending on parameter function
 */
var every = function(arr, func) {
  for (var i in arr) {
    if (!func(arr[i])) {
      return false;
    }
  }
  return true;
};

// Provided Solution

// var every = function(arr, func) {
//   for (var i in arr) {
//     if (func(arr[i]) === false) {
//       return false;
//     }
//   }
//   return true;
// };

/**
 * should handle the empty set
 * should handle a set that contains all odd numbers
 * should handle a set that contains an even number
 * @param  {Array} array
 * @param  {Function} func
 * @return {Boolean} true or false depending on function
 */
var any = function(arr, func) {
  for (var i in arr) {
    if (func(arr[i])) {
      return true;
    }
  }
  return false;
};

// var any = function(arr, func) {
//   for (var i in arr) {
//     if (func(arr[i]) === true) {
//       return true;
//     }
//   }
//   return false;
// };