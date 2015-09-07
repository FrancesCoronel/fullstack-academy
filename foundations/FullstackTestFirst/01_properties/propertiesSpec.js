describe("Properties on Object Literal", function() {
  var object;

  // beforeEach is a Jasmine helper that runs 
  // the code inside the passed function before each test below
  // It's helpful for not having to repeat yourself constantly
  // in your test specs
  beforeEach(function() {

    // for each test, create a new empty object
    object = {};

    // then run the setPropertiesOnObjLiteral function that you've written in properties.js
    setPropertiesOnObjLiteral(object);
  });

  describe("setPropertiesOnObjLiteral", function() {
    it("sets x to 7", function() {
      expect(object.x).toEqual(7);
    });

    it("sets y to 8 (and we can use a string to access it)", function() {
      expect(object['y']).toEqual(8);
    });

    it("sets the property 'onePlus' to a function that adds one to its parameter", function() {
      expect(object.onePlus(4)).toEqual(5);
      expect(object['onePlus'](123)).toEqual(124);
    });
  });
});


// Now let's explore the idea of using Arrays instead of Objects.
// One of the coolest things about JavaScript is that Arrays are just 
// a specific type of Object that has more features.  Everything that you can do
// with objects, you can also do with arrays.
describe("Properties on an Array Object", function() {
  var arrayObject;

  beforeEach(function() {
    arrayObject = [];
    setPropertiesOnArrayObj(arrayObject);
  });

  describe("setPropertiesOnArrayObj", function() {
    it("sets the property `hello` to a function that returns the string `Hello!`", function() {
      expect(arrayObject.hello()).toEqual("Hello!");
    });

    it("sets the property `full` to stack (and we can use a string to access it)", function() {
      expect(arrayObject['full']).toEqual("stack");
    });

    it("accesses the zeroth index value in the array", function() {
      expect(arrayObject[0]).toEqual(5);
    });

    it("sets the property 'twoTimes' to a function that multiplies its parameter by 1", function() {
      expect(arrayObject.twoTimes(4)).toEqual(8);
      expect(arrayObject['twoTimes'](123)).toEqual(246);
    });

  });
});


// It's the same with functions, they're also Objects.
// 
// This is an idea that we'll explore a lot more when we get to inheritance in the
// Mammals exercise.
describe("Properties on a Function Object", function() {
  var functionObject;

  beforeEach(function() {
    functionObject = function() {
      return "I am a function object, all functions are objects! Function can have their own properties too!";
    };
    setPropertiesOnFunctionObj(functionObject);
  });

  describe("`functionObject` function", function() {
    it("returns the proper string the `functionObject` function returns declared in the beforeEach Function above", function() {
      expect(functionObject()).toEqual("I am a function object, all functions are objects! Function can have their own properties too!");
    });
  });

  describe("setPropertiesOnFunctionObj", function() {
    it("sets year to 2015", function() {
      expect(functionObject.year).toEqual(2015);
    });

    it("sets `divideByTwo` to a function that accepts a number and returns the value divided by two ", function() {
      expect(functionObject.divideByTwo(6)).toEqual(3);
    })

    // Whenever you define a function in JavaScript, that "function object" also has a built-in property
    // similar to `Array.length`.  This property is called `prototype` and it has some special behavior
    // when used in conjunction with the `new` keyword.  We'll cover this later in _Mammals_
    // 
    // However, just like any other object, we can do whatever we want to this `prototype` object 
    it("adds a property to the existing prototype object only on Function Objects", function() {
      expect(functionObject.prototype.helloWorld()).toEqual("Hello World");
    });
  });

});
