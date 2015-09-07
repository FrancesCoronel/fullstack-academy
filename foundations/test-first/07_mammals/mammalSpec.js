describe("Mammal class", function() {
  var myMammal;

  // Mammal is a constructor function
  beforeEach(function() {
    myMammal = new Mammal("Joe");
  });

  // myMammal is an instance of Mammal
  it("should take name as a parameter", function() {
    expect(myMammal.name).toEqual("Joe");
  });

  it("should have an array called offspring", function() {
    expect(myMammal.offspring).toEqual([]);
  });

  // myMammal's prototype is the prototype of its contructor function which is Mammal.prototype
  it("should have a sayHello function on it's prototype", function() {
    expect(myMammal.sayHello()).toEqual("My name is Joe, I'm a Mammal");
    // these functions should be on Mammal.prototype
    expect(myMammal.hasOwnProperty("sayHello")).toEqual(false);
  });

  it("should have a haveBaby function", function() {
    child = myMammal.haveBaby()
    expect(child.name).toEqual("Baby Joe");
    expect(myMammal.offspring).toEqual([child]);

    // these functions should be on Mammal.prototype
    expect(myMammal.hasOwnProperty("haveBaby")).toEqual(false);
  });
});


// Cat instances inherit from Mammals, all the properties
// Mammals have, Cat's will have as well.
describe("Cat class", function() {
  var cat;

  // Cat is a constructor function
  beforeEach(function() {
    spyOn(Mammal, 'call').and.callThrough();
    cat = new Cat("Garfield", "yellow");
  });

  // Review how .call() and .apply() work.
  it("calls the Mammal Constructor Function", function() {
    // Inside the Cat constructor function, you should also call `Mammal.call`
    // and use the Mammal constructor function to create the basic properties of a `Cat` instance
    expect(Mammal.call).toHaveBeenCalled();
  });

  it("should have an array called offspring and name property from the Mammal constructor function", function() {
    expect(cat.offspring).toEqual([]);
    expect(cat.name).toEqual("Garfield");
  });

  it("should have a color in its constructor function", function() {
    expect(cat.color).toEqual("yellow");
  });
  
  // Testing if new Mammal vs Object.create(Mammal) is used to set up the chain or inheritance
  // of the prototype chain.  (In the lecture videos we covered how to impelement inheritance 
  // using the classical model, in the earlier videos we demonstrated how to chain prototypes with
  // Object.create() )

  it("should use Object.create to inherit methods from Mammal", function() {
    expect(typeof Cat.prototype.sayHello).toEqual('function');
    expect(Cat.prototype.offspring).toEqual(undefined);
  });

  // What is the constructor property? We did not cover this in the lecture video.
  it('should have its prototype object and a constructor property that points back to Cat', function() {
    expect(Cat.prototype.constructor).toEqual(Cat);
  });


  // Even though Cat inherits many of its properties from Mammal, we can override methods
  // to perform different actions (polymorphism).
  it("should have it's own haveBaby method that takes only a color", function() {
    green_cat = cat.haveBaby("green");
    expect(cat.offspring).toEqual([green_cat]);
    expect(green_cat.name).toEqual("Baby Garfield");
    expect(green_cat.color).toEqual("green");

  });

  // Research the constructor property
  it("the cat haveBaby is actually a Cat and not a Mammal", function() {
    blue_cat = cat.haveBaby("blue");
    expect(blue_cat instanceof Cat).toEqual(true);
    expect(blue_cat.constructor).toEqual(Cat);
  });

});
