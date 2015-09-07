describe("Loops", function() {

  // Let's repeat ourselves several times
  describe("repeat", function() {
    it("is empty with 0 repeats", function() {
      expect(repeat("yo", 0)).toEqual("");
    });
    it("repeats its argument once", function() {
      expect(repeat("yo", 1)).toEqual("yo");
    });
    it("repeats its argument twice", function() {
      expect(repeat("yo", 2)).toEqual("yoyo");
    });
      it("repeats its argument many times", function() {
      expect(repeat("yo", 10)).toEqual("yoyoyoyoyoyoyoyoyoyo");
    });
  });

  // Let's iterate over all the elements of an array
  describe("sum", function() {
    it("computes the sum of an empty array", function() {
      expect(sum([])).toEqual(0);
    });

    it("computes the sum of an array of one number", function() {
      expect(sum([7])).toEqual(7);
    });

    it("computes the sum of an array of two numbers", function() {
      expect(sum([7, 11])).toEqual(18);
    });

    it("computes the sum of an array of many numbers", function() {
      expect(sum([1, 3, 5, 7, 9])).toEqual(25);
    });
  });
});

describe("Looping over nested Loops", function(){
  it("returns an empty string when input is 0", function(){
    expect(gridGenerator(0)).toEqual("");
  });
  // all characters (even whitespaces) are values of the grid
  it("creates a grid with 3 columns and rows when input is 3", function(){
    expect(gridGenerator(3)).toEqual("# #\n # \n# #\n");
  });
  it("creates a grid with 2 columns and rows when input is 2", function(){
    expect(gridGenerator(2)).toEqual("# \n #\n")
  });

  // Research what a Pythagorean Triplet is.  What would make a PT larger than another?
  it("finds the largest Pythagorean Triplet of a given value and returns an array of the Triplet", function(){
    expect(largestTriplet(25)).toEqual([7,24,25]); // [15,20,25] Is smaller based on its b value
  });
  it("finds the largest Pythagorean Triplet of a given value", function(){
    expect(largestTriplet(65)).toEqual([16,63,65]);
  });
  it("finds the largets Pythagorean Triplet within 'n' (aka the number argument passed)", function(){
    expect(largestTriplet(66)).toEqual([16,63,65]);
  })
});

describe("More looping over arrays", function() {

  // try to implement this join() function without using the built-in String#join function
  describe("join", function() {
    it("turns an empty array into an empty string", function() {
      expect(join([])).toEqual("");
    });

    it("turns an array with one element into a string", function() {
      expect(join(['a'])).toEqual("a");
    });

    it("turns an array with many elements into a string", function() {
      expect(join(['apple', 'banana', 'cherry'])).toEqual("applebananacherry");
    });

    it("inserts a delimiter between elements", function() {
      expect(join(['apple', 'banana', 'cherry'], '/')).toEqual("apple/banana/cherry");
    });

    // This test is to make sure you don't use "for (var i in a)" on an array
    // Remember how we can add any type of key/value to an array object
    // since it's just like a regular object?
    it("ignores non-indexed properties set on the array object", function() {
      var array = ['apple', 'banana', 'cherry'];

      array.type = 'fruits';
      expect(array.type).toEqual('fruits');

      array.first = function() {
        return this[0];
      };

      expect(array.first()).toEqual('apple');

      expect(join(array)).toEqual("applebananacherry");
    });

  });
});


// Let's practice looping over objects using the for(var i in obj) since
// Here we have to also be aware of the `__proto__` relationship
describe("looping over objects", function() {
  describe("paramify", function() {
    it("works on an empty object", function() {
      expect(paramify({})).toEqual("");
    });

    it("converts an object with one element", function() {
      expect(paramify({
        size: 14
      })).toEqual("size=14");
    });

    it("converts an object with two elements", function() {
      expect(paramify({
        height: 74,
        width: 12
      })).toEqual("height=74&width=12");
    });

    it("converts an object with many elements", function() {
      var object = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
      expect(paramify(object)).toEqual("a=1&b=2&c=3&d=4&e=5&f=6");
    });

    // this one might be a bit tricky ;-)
    it("outputs the parameters in alphabetical order", function() {
      var object = {f: 6, e: 5, d: 4, c: 3, b: 2, a: 1 };
      expect(paramify(object)).toEqual("a=1&b=2&c=3&d=4&e=5&f=6");
    });

    // This one is also tricky, here we want you to only `paramify` the properties 
    // of the object and avoid any that are on the object's __proto__ object.
    // To do that, use the `hasOwnProperty` method of `sObject`
    it("skips properties of the object's prototype", function() {

      // Alphabet is a constructor function that will use the `new` method of
      // object creation
      var Alphabet = function() {
        this.a = 1;
        this.b = 2;
      };

      Alphabet.prototype = {
        c: 3
      };

      var alphabet = new Alphabet();
      // see how we're skipping `c` ?
      expect(paramify(alphabet)).toEqual("a=1&b=2");
    });
  });
});
