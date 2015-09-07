// In this exercise we're going to create a calculator object
// that can perform certain basic mathematic operations.
// 
// We'll be using a pattern called the factory pattern where
// our function creates an object tailored to our needs.  This function
// is just like the one we built in *01_properties*, except now we're
// creating some useful functions add
describe("Create a Calculator", function() {
  var calculator;

  // Here we're just calling the `createCalculator` function, it returns
  // a calculator object.
  beforeEach(function() {
    calculator = createCalculator();
  });

  // When we call `value()`, it returns us 0 at the start.  We haven't run any math functions
  // yet.
  it("initially has 0", function() {
    expect(calculator.value()).toEqual(0);
  });

  it("can add a number", function() {
    calculator.add(2);
    expect(calculator.value()).toEqual(2);
  });

  it("can add two numbers", function() {
    calculator.add(2);
    calculator.add(3);
    expect(calculator.value()).toEqual(5);
  });

  it("can add many numbers", function() {
    calculator.add(2);
    calculator.add(3);
    calculator.add(4);
    expect(calculator.value()).toEqual(9);
  });

  it("can subtract a number", function() {
    calculator.subtract(2);
    expect(calculator.value()).toEqual(-2);
  });

  it("can add and subtract", function() {
    calculator.add(3);
    calculator.subtract(2);
    expect(calculator.value()).toEqual(1);
  });
});
