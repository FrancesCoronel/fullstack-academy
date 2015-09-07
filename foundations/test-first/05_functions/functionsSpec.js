// Let's start with some interesting facts about functions.
// The first thing to be aware of is that inside a function,
// there is a special variable called `arguments`
//
// `arguments` looks and feels like an array (though be careful, it's not
// actually an array).
describe("The arguments array", function() {
  it("allows you to call a function with arguments like normal", function() {
    var result = concat_string("David", " ", "Yang");
    expect(result).toEqual("David Yang");
  });

  it("allows you to call a function with as many arguments as you want", function() {
    var result = concat_string("This", " ", "should", " ", "be done with join");
    expect(result).toEqual("This should be done with join");
  });
});


// This will explore the idea that JS' functions are just values that can be passed aroudn.
// For example, here we can have a function that creates another function.
describe("higher-order functions", function() {
  it('means that a function can take a function as an argument', function() {
    var callThisFunction = function() {
      return "Called Value";
    };

    // Create a function that runs functions and returns their "return" value
    expect(yourFunctionRunner(callThisFunction)).toEqual("Called Value");

    var andThisFunction = function() {
      return " and Other Value";
    };

    // `yourFunctionRunner` should run as many functions as it gets and concatenate their return values
    // You should try to use the `arguments` array here.
    expect(yourFunctionRunner(callThisFunction, andThisFunction)).toEqual("Called Value and Other Value");
  });
});

// Now we'll explore the idea of closure
// Closures describe functions that remember variables that were in scope
// when they were defined (defined being the operative word).
//
// Then, even if the scope that the function was defined in goes away, it continues to have access
// to have scope.
describe("makeAdder", function() {
  it("takes an argument A and returns a function that adds A to any value it's passed", function() {
    var adderOf2function = makeAdder(2);

    // Now let's call the function that we got back and add 5 to the closed-over value
    expect(adderOf2function(5)).toEqual(7);
  });
});

// Functions that decorate other functions.  These functions return a version of the function
// with some changed behavior.  This will depend on closure since the function needs to
// remember information that in a scope that will eventually go away.
//
// Given a function, return a new function will only run once, no matter how many times it's called
describe("once", function() {
  it("should only increment num one time", function() {
    var num = 0;
    var increment = once(function() {
      num++;
    });

    // run this function twice, but since it's a new function that's been modified by "once"
    // it will only run once and num won't be incremented again.
    increment();
    increment();

    expect(num).toEqual(1);
  });
});


// Closures are a bit stranger than you'd expect.  Here let's create
// an object that has two functions.  These functions can share a piece of information
// (that's not in the object itself).
//
// What's interesting about closure is that both of these functions have closed over
// the same value and can both read and modify it.
describe("Shared contexts", function() {
  it("should return an object with two functions", function() {
    var sharedObj = createObjectWithTwoClosures();
    expect(typeof sharedObj.oneIncrementer).toBe("function");
    expect(typeof sharedObj.tensIncrementer).toBe("function");
    expect(typeof sharedObj.getValue).toBe("function");
    // Here we're testing that you're not storing anything
    // besides these three functions.  The value that will
    // be incremented/decremented (and returned by getValue)
    // should be only in scope during the createObjectWithTwoClosures function call and then
    // closed over by the three functions returned in the object
    expect(Object.keys(sharedObj).length).toBe(3);
  });


  it('should let two functions call the same value', function() {
    var sharedObj = createObjectWithTwoClosures();
    sharedObj.oneIncrementer();
    sharedObj.tensIncrementer();
    expect(sharedObj.getValue()).toEqual(11);
  });
});
