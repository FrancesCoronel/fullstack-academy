// See http://en.wikipedia.org/wiki/Reverse_Polish_notation
// 
// constructor functions, new keyword, how it relates to this
describe("Calculator using reverse polish notation", function() {
  var rpnCalculator;

  beforeEach(function() {
    rpnCalculator = new RPNCalculator();
  });

  it("adds two numbers", function() {
    rpnCalculator.push(2);
    rpnCalculator.push(3);
    rpnCalculator.plus();
    expect(rpnCalculator.value()).toEqual(5);
  });

  it("adds three numbers", function() {
    rpnCalculator.push(2);
    rpnCalculator.push(3);
    rpnCalculator.push(4);
    rpnCalculator.plus();
    expect(rpnCalculator.value()).toEqual(7);
    rpnCalculator.plus();
    expect(rpnCalculator.value()).toEqual(9);
  });

  it("adds and subtracts", function() {
    rpnCalculator.push(2);
    rpnCalculator.push(3);
    rpnCalculator.push(4);
    rpnCalculator.minus();
    expect(rpnCalculator.value()).toEqual(-1);
    rpnCalculator.plus();
    expect(rpnCalculator.value()).toEqual(1);
  });

  it("multiplies and divides", function() {
    rpnCalculator.push(2);
    rpnCalculator.push(3);
    rpnCalculator.push(4);
    rpnCalculator.divide();
    expect(rpnCalculator.value()).toEqual(0.75);
    rpnCalculator.times();
    expect(rpnCalculator.value()).toEqual(1.5);
  });

  it("fails informatively when there's not enough values stashed away", function() {
    expect(function() {
      rpnCalculator.plus();
    }).toThrow("rpnCalculator is empty");

    expect(function() {
      rpnCalculator.minus();
    }).toThrow("rpnCalculator is empty");

    expect(function() {
      rpnCalculator.times();
    }).toThrow("rpnCalculator is empty");

    expect(function() {
      rpnCalculator.divide();
    }).toThrow("rpnCalculator is empty");
  });

  it("All methods should be on the RPNCalculator.prototype", function() {
    expect(typeof RPNCalculator.prototype.plus).toEqual("function");
    expect(typeof RPNCalculator.prototype.minus).toEqual("function");
    expect(typeof RPNCalculator.prototype.divide).toEqual("function");
    expect(typeof RPNCalculator.prototype.value).toEqual("function");
  });

  // Here we're using the `instanceof` keyword in JS so see if `rpnCalculator` is 
  // an "instance" of capital RPNCalculator.  `instanceof` tests to see if 
  // somewhere in the `__proto__` chain of `rpnCalculator` matches `RPNCalculator.prototype`
  it("the rpnCalculator object should be an instance of the RPNCalculator Constructor", function() {
    expect(rpnCalculator instanceof RPNCalculator).toEqual(true);
  });


});
