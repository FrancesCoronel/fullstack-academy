/**
 * FVCproductions
 * @since May 17, 2015
 * @see LoopsSpec.js
 */

/**
 * Let's repeat ourselves several times
     * (1) is empty with 0 repeats
     * (2) repeats its argument once
     * (3) repeats its argument twice
     * (4) repeats its argument many times
 * @param  {String} str
 * @param  {Number} n
 * @return {String} result [string n number of times]
 */
var repeat = function(str, n) {
    var result = "";
    for (var i = 0; i < n; i++) {
        result += str;
    }
    return result;
};

/**
 * Let's iterate over all the elements of an array
     * (1) computes the sum of an empty array
     * (2) computes the sum of an array of one number
     * (3) computes the sum of an array of two numbers
     * (4) computes the sum of an array of many numbers
 * @param  {Array} arr
 * @return {Number} result [sum of all elements in array]
 */
var sum = function(arr) {
    var result = 0;
    for (var ele in arr) {
        total += arr[ele];
    }
    return result;
};

/**
 * Looping over nested loops
     * (1) returns an empty string when input is 0
     * (2) creates a grid with 3 columns and rows when input is 3
     * (3) creates a grid with 2 columns and rows when input is 2
 * @param  {Number} n
 * @return {Grid} with n number of columns and rows
 */
var gridGenerator = function(n) {
    var result = ""; // (1)
    for (var row = 0; row < n; row++) {
        for (var col = 0; col < n; col++) {
            if (row % 2 === 0) {
                if (col % 2 === 0) {
                    result += "#";
                } else {
                    result += " ";
                }
            } else {
                if (col % 2 === 0) {
                    result += " ";
                } else {
                    result += "#";
                }
            }
        }
        result += "\n";
    }
    return result;
};

// Provided Solution
// var gridGenerator = function(size) {
//     var board = "";
//     for (var i = 0; i < size; i++) {
//         for (var j = 0; j < size; j++) {
//             if ((i+j) % 2 === 0) {
//                 board += "#";
//             } else {
//                 board += " ";
//             }
//             board += "\n";
//         }
//     }
//     return board;
// };

/**
 * Research what a Pythagorean Triplet is.
     * (1) finds the largest Pythagorean Triplet of a given value and returns an array of the Triplet
     * (2) finds the largest Pythagorean Triplet of a given value
     * (3) finds the largets Pythagorean Triplet within 'n' (aka the number argument passed)
 * @param  {Number} n
 * @return {Array} result [Triplet of n]
 */
var largestTriplet = function(n) {

    result = [];
    var num1, num2, num3;

    for (var i = n; i >= 2; i--) {
        for (var j = i - 1; j >= 1; j--) {
            num1 = (i * i) - (j * j);
            num2 = 2 * (i * j);
            num3 = (i * i) + (j * j);
            if (((num1 * num1) + (num2 * num2) == (num3 * num3)) && (num3 <= n)) {
                if (num1 < num2) {
                    result.push(num1);
                    result.push(num2);
                } else if (num2 > num1) {
                    result.push(num2);
                    result.push(num1);
                } else {
                    result.push(num3);
                }
                return result;
            }
        }
    }
};

// Brute Force Provided Solution

// var largestTriplet = function(n) {
//     var arr = [0,0,0];
//     var square = function(base) {
//         return base*base;
//     };
//     for (var a = 1; a < n; a++) {
//         for (var b = 1; b < n; b++) {
//             for (var c = 1; i < n; c++) {
//                 if (a < b && b >= tripletArray[1]) {
//                     if (square(a) + square(b) === square(c)) {
//                         tripletArray = [a, b, c];
//                     }
//                 }
//             }
//         }
//     }
//     return tripletArray;
// };

/**
 * Try to implement this join() function without using the built-in String#join function
     * (1) turns an empty array into an empty string
     * (2) turns an array with one element into a string
     * (3) turns an array with many elements into a string
     * (4) inserts a delimiter between elements
     * (5) ignores non-indexed properties set on the array object
 * @param  {Array} arr
 * @param  {String} del [delimiter]
 * @return {String} result
 */
var join = function(arr, del) {
    var result = ""; // (1)
    for (var ele = 0; ele < (arr.length - 1); ele++) { // (5)
        if ((typeof del !== 'undefined') && (ele !== arr.length - 1)) {
            result += (arr[ele] + del);
        } else {
            result += (arr[ele]);
        }
    }
    return result;
};

// Provided Solution

// var join = function(arr, del) {
//     var result = "";
//     for (var i in arr) {
//         result += arr[i];
//         if (typeof del === "undefined") {
//             del = "";
//         }
//         if (i !== arr.length - 1) {
//             result += del;
//         }
//     }
//     return result;
// };

/**
 * Let's practice looping over objects using the for(var i in obj)
 * Here we have to also be aware of the `__proto__` relationship
 * (1) works on an empty object
 * (2) converts an object with one element
 * (3) converts an object with two elements
 * (4) converts an object with many elements
 * (5) outputs the parameters in alphabetical order
 * (6) skips properties of the object's prototype
 * @param  {Object} obj
 * @return {String} result
 */
var paramify = function(obj) {
    var result = "";
    var arr = [];

    for (var ele in obj) {
        arr.push(ele);
    }

    arr.sort();

    var count = 0;

    for (ele in obj) {
        if (obj.hasOwnProperty(ele)) {
            result += arr[count] + "=" + obj[arr[ele]] + "&";
            count++;
        }
    }

    return result.substring(0, result.length - 1);
};

// Provided Solution

// var paramify = function(obj) {
//     var arr = [];
//     for (var ele in obj) {
//         if (Object.hasOwnProperty.call(obj, ele)) {
//             arr.push(ele + "=" + obj[ele]);
//         }
//     }
//     arr.sort();
//     return join(arr, "&");
// };