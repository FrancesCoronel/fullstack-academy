/**
 * FVCproductions
 * @since May 15, 2015
 * @see calculatorSpec.js
 */

/**
 * calling the `createCalculator` function
 * @returns {Object} calculator
 */
var createCalculator = function() {

    var calculator = {};

    /**
     * initially has value of 0
     */

    calculator.result = 0;

    /**
     * @return value, which in this case is the variable result because we can't overload the variable value
     */
    calculator.value = function() {
        return this.result;
    };

    /**
     * can add a number
     * can add two numbers
     * can add many numbers
     * can add and subtract
     * @param {Number} n
     * @return value + n
     */
    calculator.add = function(n) {
        return this.result += n;
    };

    /**
     * can subtract a number
     * can subtract two numbers
     * can subtract many numbers
     * can add and subtract
     * @param {Number} n
     * @return value - n
     */
    calculator.subtract = function(n) {
        return this.result -= n;
    }

    return calculator;
}