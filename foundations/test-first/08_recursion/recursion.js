/**
 * correctly computes factorial
 * never calls itself
 * @param {Number} n
 * @return {Number} result of factorial on n
 */
var factorialIterative = function(n) {
    var result = n;
    for (var i = 1; i < n; i++) {
        result *= i;
    }
    return result;
};

// Provided Solution

// var factorialIterative = function(n) {
//     var total = 1;
//     for (n; n >= 2; n--) {
//         total *= n;
//     }
//     return total;
// };

/**
 * handles the base case
 * correctly comptues factorial
 * calls itself n + 1 times
 * @param  {Number} n
 * @return {Number} result of factorial on n
 */
var factorial = function(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
};

// Provided Solution

// var factorial = function(n) {
//     if (n === 0) {
//         return 1;
//     }
//     return n * factorial(n-1);
// };

/**
 * handles the base cases
 * correctly computes the third fibonacci number
 * calls itself
 * correctly computes the 23rd fibonacci number
 * calls itself fib(n)*2-1 times
 * @param  {Number} n
 * @return {[type]}   [description]
 */
var fib = function(n) {
    if (n < 2) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
};

// Provided Solution

// var fib = function(n) {
//     if (n === 0 || n === 1) {
//         return 1;
//     }
//     return fib(n-1) + fib(n-2);
//  };

/**
 * returns the correct type of its input
 * does not use typeof
 * invokes "Object\'s" toString method
 * @param  {Object} obj
 * @return {String} array of string
 * I DONT GET IT.
 */
var type = function(obj) {
    var result = Object.prototype.toString.call(obj);
    result = result.split(" ")[1];
    return result.slice(0,-1);
};

// Provided Solution

// var type = function(value) {
//     return Object.prototype.toString.call(value).slice(8, -1);
// };

/**
 * invokes our custom "type" function
 * handles everything but Arrays and Objects
 * invokes itself on each element
 * can handle nesting
 * wraps with brackets and concatenates with commas
 * does not use native string conversion
 * invokes itself on each value
 * wraps with curly braces, inserts colons, and concatenates with commas
 * can handle arbitrary nesting
 * @return {String} result
 */
var stringify = function(value) {
    var result = "";
    var typeOf = type(value);
    if (typeOf == "String") {
        result = '"' + value + '"';
    } else if (typeOf !== "Array" && typeOf !== "Object") {
        result = value + "";
    } else if (typeOf == "Array") {
        var arr = [];
        for (var i = 0; i < value.length; i++) {
            arr.push(stringify(value[i]));
        }
        result += "[" + arr.join(",") + "]";
    } else if (typeOf == "Object") {
        var obj = [];
        for (var j in value) {
            obj.push('"' + j + '": ' + stringify(value[j]));
        }
        result += "{" + obj.join(",") + "}";
    }
    return result;
};

// Provided Solution

var stringify = function(obj) {
    if (type(obj) === "String") {
        return '"' + obj + '"';
    }
    if (type(obj) == "Array") {
        return "[" +
            obj.map(function(o) {
                return stringify(o);
            }).join(',') + "]";
    }
    if (type(obj) == "Object") {
        var result = [];
        Object.keys(obj).forEach(function(key) {
            var value = stringify(obj[key]);
            if (val !== null) {
                result.push('"' + key + '": ' + val);
            }
        });
        return "{" + result.join(",") + "}";
    }
    return obj + "";
};