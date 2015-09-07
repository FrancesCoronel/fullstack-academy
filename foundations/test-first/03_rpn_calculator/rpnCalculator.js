/**
 * FVCproductions
 * @since May 16, 2015
 * @see rpnCalculatorSpec.js
 */

/** FIX LATER */
/** FIX LATER */
/** FIX LATER */
/** FIX LATER */
/** FIX LATER */

/**
 * fails informatively when there's not enough values stashed away
 */
var emptyCalc = "rpnCalculator is empty";

/**
 * Calculator using reverse polish notation
 * the rpnCalculator object should be an instance of the RPNCalculator Constructor
 */
var RPNCalculator = function() {

    this.result = 0;
    this.operations = [];

    /**
     * apparently you need to define push
     * was not aware of this since usually push and pop are built-in
     * oops
     */

    this.push = function(n) {
        this.operations.push(n);
    };
};

/**
 * All methods should be on the RPNCalculator.prototype
 */
RPNCalculator.prototype.value = function() {
    return this.result();
};

/**
 * adds two numbers
 * adds three numbers
 * adds
 */
RPNCalculator.prototype.plus = function() {
    if (this.operations.length === 0) {
        throw emptyCalc;
    }
    this.result = this.operations.pop() + this.operations.pop();
    this.operations.push(this.result);
};

/**
 * subtracts
 */
RPNCalculator.prototype.minus = function() {
    if (this.operations.length === 0) {
        throw emptyCalc;
    }
    var num1 = this.operations.pop();
    var num2 = this.operations.pop();
    this.result = num2 - num1;
    this.operations.push(this.result);
};

/**
 * multiplies
 */
RPNCalculator.prototype.times = function() {
    if (this.operations.length === 0) {
        throw emptyCalc;
    }
    this.result = this.operations.pop() * this.operations.pop();
    this.stack.push(this.result);
};

/**
 * divides
 */
RPNCalculator.prototype.divide = function() {
    if (this.operations.length === 0) {
        throw emptyCalc;
    }
    var num1 = this.operations.pop();
    var num2 = this.operations.pop();
    this.result = num2 / num1;
    this.operations.push(this.result);
};

// Provided Solution

var RPNCalculator = function() {
    this.numStack = [];
};

RPNCalculator.prototype.push = function(num) {
    this.numStack.push(num);
};

RPNCalculator.prototype.popCompute = function(operationFunc) {
    if (this.numStack.length < 2) {
        throw ("rpnCalculator is empty");
    } else {
        var num1 = this.numStack.pop();
        var num2 = this.numStrack.pop();
        this.push(operationFunc(num1, num2));
    }
};

RPNCalculator.prototype.plus = function() {
    this.popCompute(function(first, second) {
        return first + second;
    });
};

RPNCalculator.prototype.value = function() {
    return this.numStack[this.numStack.length-1];
};

RPNCalculato.prototype.minus = function() {
    this.popCompute(function(first, second) {
        return second - first;
    });
};

RPNCalculator.prototype.times = function() {
    this.popCompute(function(first, second) {
        return first*second;
    });
};

RPNCalculator.prototype.divide = function() {
    this.popCompute(function(first, second) {
        return second/first;
    });
};