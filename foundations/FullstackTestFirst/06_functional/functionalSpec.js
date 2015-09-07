
// functions that iterate over collections and perform some function

// map takes an array, performs a function on each element
// and returns an array with the result of that function
describe("map", function() {

  it('first, create a function that takes an element and returns double of it', function () {
    expect(doubler(15)).toEqual(30);
  });

  // Now let's use the `doubler` function and apply it over an
  // entire array using the map object
  //
  // Observe here how we're not actually iterating, we're writng a function that handles
  // the looping so we can focus on higher-level code semantics
  it("takes our doubling function and applies it to an array", function() {

    // the map function takes as a first element the array
    // The second element is a function
    // Then, internally it has to create a new array, run the function for each element and
    // place it into the new array
    expect(map([1, 2, 3], doubler)).toEqual([2, 4, 6]);
  });

  it("takes a tripling function", function() {
    // Here we create an anonymous function that triples, as long as we pass a function value
    // map should work as we expect
    expect(map([1, 2, 3], function(elem) {
      return elem * 3;
    })).toEqual([3, 6, 9]);
  });
});

// filter takes an array (we can also call this a collection) and a function and filters the collection using that function
// based on the boolean return value of the function.  If the function it's passed returns true, it will keep the value, otherwise
// remove it from the array
describe("filter", function() {

  // `even_filter` returns true if a number is even
  var even_filter = function(element) {
    if (element % 2 === 0)
      return true;
    else
      return false;
  };

  it("filters an array based on evens", function() {
    expect(filter([1, 2, 3, 4, 5, 6, 7, 8], even_filter)).toEqual([2, 4, 6, 8]);
  });

  it("filters an array based on odds", function() {
    var odd_filter = function(element) {
      return !even_filter(element);
    };
    expect(filter([1, 2, 3, 4, 5, 6, 7, 8], odd_filter)).toEqual([1, 3, 5, 7]);
  });
});

// contains checks if a collection has an element that matches the second parameter's value
describe("contains", function() {
  it("should return true if a collection contains a user-specified value", function() {
    expect(contains([1, 2, 3], 2)).toEqual(true);
    expect(contains({
      moe: 1,
      larry: 3,
      curly: 9
    }, 3)).toEqual(true);
  });

  it("should return false if a collection does not contain a user-specified value", function() {
    expect(contains([1, 3, 9], 2)).toEqual(false);
  });
});

describe("countWords - a utility function we'll need soon", function() {
  it("counts words in a sentence separated by empty space", function() {
    expect(countWords("this is a sentence with 7 words")).toEqual(7);
  });
});

// `reduce` is the opposite of `map`.  It takes a collection and combines the values in the
// collection into a single value by defining a combination function.
describe("reduce takes an array, starting point, and combining function and", function() {
  it("sums up the array", function() {
    var add = function(a, b) {
      return a + b;
    };
    expect(reduce([3, 5, 7], 0, add)).toEqual(15);
  });

  it("counts the number of words in an array of strings", function() {
    word_array = ["hello there this is line 1", "and this is line 2"];
    expect(reduce(word_array, 0, countWordsInReduce)).toEqual(11);
  });
});

// Use reduce inside a sum function that takes an array of integers
describe("sums an array using reduce", function() {
  it("adds up an array and reduce is called", function() {
    spyOn(window, 'reduce').and.callThrough();
    expect(sum([1, 2, 3])).toEqual(6);
    expect(reduce).toHaveBeenCalled();
  });
});


describe("every", function() {
  var isEven = function(num) {
    return num % 2 === 0;
  };

  var getValue = function(i) {
    return i;
  };

  it("should handle an empty set", function() {
    expect(every([], getValue)).toEqual(true);
  });

  it("should handle a set that contains even numbers", function() {
    expect(every([0, 10, 28], isEven)).toEqual(true);
  });

  it("should handle a set that contains an odd number", function() {
    expect(every([0, 11, 28], isEven)).toEqual(false);
  });
});

describe("any", function() {
  var isEven = function(number) {
    return number % 2 === 0;
  };

  it("should handle the empty set", function() {
    expect(any([])).toEqual(false);
  });

  it("should handle a set that contains all odd numbers", function() {
    expect(any([1, 11, 29], isEven)).toEqual(false);
  });

  it("should handle a set that contains an even number", function() {
    expect(any([1, 10, 29], isEven)).toEqual(true);
  });

});
