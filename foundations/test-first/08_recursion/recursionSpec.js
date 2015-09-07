//
// Given some number, n, factorial should
// compute n * (n-1) * (n-2) ... * 1
///
describe('factorial', function() {
  //
  // The iterative approach is probably the one you
  // are more familiar with--it involves looping.
  ///
  describe('iterative approach', function() {
    it('correctly computes factorial', function() {
      var result = factorialIterative(10),
        expected = 3628800;
      expect(result).toEqual(expected);
    });
    it('never calls itself', function() {
      spyOn(window, 'factorialIterative');
      factorialIterative(5);
      expect(factorialIterative.calls.count()).toEqual(1);
    });
  });
  //
  // A recursive function handles some base case and
  // otherwise calls itself with different arguments.
  ///
  describe('recursive approach', function() {
    it('handles the base case', function() {
      expect(factorial(0)).toEqual(1);
    });
    it('correctly comptues factorial', function() {
      expect(factorial(10)).toEqual(3628800);
    });
    //
    // This is where we check that you've actually
    // created a recursive function.
    ///
    it('calls itself n + 1 times', function() {
      spyOn(window, 'factorial').and.callThrough();
      var n = 5;
      factorial(n);
      expect(factorial.calls.count()).toEqual(n + 1);
    });
  });
});

//
// In the fibonacci sequence, the first and second
// numbers are both equal to 1.
//
// Each following number is the sum of the previous two. 
// For example, this means the third number should be 2.
///
describe('recursive fibonacci', function() {
  it('handles the base cases', function() {
    //
    // Remember, to programmers the first element of an 
    // array is at index 0, the second at index 1, etc.
    ///
    expect(fib(0)).toEqual(1);
    expect(fib(1)).toEqual(1);
  });
  it('correctly computes the third fibonacci number', function() {
    expect(fib(2)).toEqual(2);
  });
  it('calls itself', function() {
    spyOn(window, 'fib').and.callThrough();
    fib(2)
    expect(fib.calls.count()).toBeGreaterThan(1);
  });
  it('correctly computes the 23rd fibonacci number', function() {
    expect(fib(22)).toEqual(28657);
  });
  //
  // The following should pass if you've implemented your
  // recursive solution properly.
  ///
  it('calls itself fib(n)*2-1 times', function() {
    spyOn(window, 'fib').and.callThrough();
    var n = 10;
    var fibN = fib(n);
    expect(fib.calls.count()).toEqual(fibN * 2 - 1);
  });
});

var und = undefined,
  nll = null,
  bool = true,
  num = 123,
  str = "abc",
  fnc = function() {},
  arr = [],
  obj = {};

//
// The 'type' function will behave a lot like JavaScript's 
// typeof operator. See more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//
// But don't use typeof in your solution!
///
describe('type', function() {
  it('returns the correct type of its input', function() {
    expect(type(und)).toEqual('Undefined');
    expect(type(nll)).toEqual('Null');
    expect(type(bool)).toEqual('Boolean');
    expect(type(num)).toEqual('Number');
    expect(type(str)).toEqual('String');
    expect(type(fnc)).toEqual('Function');
    expect(type(arr)).toEqual('Array');
    expect(type(obj)).toEqual('Object');

  });
  it('does not use typeof', function() {
    // this assertion looks for "typeof" anywhere in type function's body,
    // but it'll exclude comments from the search
    var commentsRemoved = type.toString()
      .replace(/\/\/[\s\S]*?\n/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    var bodyContainsTypeOf = /typeof/.test(commentsRemoved);
    expect(bodyContainsTypeOf).toBe(false);
  });
  //
  // Hmmm...if you can't use typeof what can you do?
  //
  // Well, go to a JS console and call .toString() on some object.
  // You should get something like "[object Object]". Neat, maybe
  // we can get the type from this?
  //
  // But, wait, if you .toString() an Array, or a Number, something 
  // different happens. We'd really like to use Object's toString
  // method on some input.
  //
  // Look into the .call method that every function has, and see
  // if you can figure out a way to make this happen. See the 
  // docs here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
  ///
  it('invokes "Object\'s" toString method', function() {
    spyOn(Object.prototype.toString, 'call').and.callThrough();
    type();
    expect(Object.prototype.toString.call).toHaveBeenCalled();
  });
});

//
// Stringify should convert anything into a string.
///
describe('stringify', function() {
  //
  // We'll need different approaches for different types of
  // data, so it only makes sense that we'll use our very own
  // type function on stringify's input.
  ///
  it('invokes our custom "type" function', function() {
    spyOn(window, 'type');
    stringify(null);
    expect(type).toHaveBeenCalled();
  });
  //
  // Things that aren't Arrays and Objects we'll simply cast
  // into strings.
  ///
  it('handles everything but Arrays and Objects', function() {
    expect(stringify(und)).toEqual('undefined');
    expect(stringify(nll)).toEqual('null');
    expect(stringify(bool)).toEqual('true');
    expect(stringify(num)).toEqual('123');
    expect(stringify(str)).toEqual('"abc"');
    expect(stringify(fnc)).toEqual('function () {}');
  });
  describe('on Arrays', function() {
    beforeEach(function() {
      spyOn(window, 'stringify').and.callThrough();
    });
    it('invokes itself on each element', function() {
      var testArr = [1, 'something', []];
      stringify(testArr);
      expect(stringify.calls.count()).toEqual(testArr.length + 1); // + 1 because of the array itself
    });
    it('can handle nesting', function() {
      var testArr = [1, 'a', [true, 'b', [null], 'c'], 3];
      stringify(testArr);
      // we expect it to be called 10 times because there
      // are 3 arrays with (all combined) 7 elements
      expect(stringify.calls.count()).toEqual(10);
    });
    it('wraps with brackets and concatenates with commas', function() {
      var result = stringify([1, 'a', [true, 'b', [null], 'c'], 3]),
        expected = '[1,"a",[true,"b",[null],"c"],3]';
      expect(result).toEqual(expected);
    });
    //
    // The native Array.prototype.toString method actually does
    // exactly what we want. But we'd like you to figure it out
    // yourself.
    //
    // You might find Array.prototype.join useful.
    ///
    it('does not use native string conversion', function() {
      spyOn(Array.prototype, 'toString');
      stringify([1, 2, 3]);
      expect(Array.prototype.toString).not.toHaveBeenCalled();
    });
  });
  describe('on Objects', function() {
    it('invokes itself on each value', function() {
      var testObj = {
        a: 1,
        b: 2
      };
      spyOn(window, 'stringify').and.callThrough();
      stringify(testObj);
      expect(stringify.calls.count()).toEqual(Object.keys(testObj).length + 1);
    });
    it('wraps with curly braces, inserts colons, and concatenates with commas', function() {
      var result = stringify({
          a: 1,
          b: 2
        }),
        expected = '{"a": 1,"b": 2}';
      expect(result).toEqual(expected);
    });
    it('can handle arbitrary nesting', function() {
      var result = stringify({
          a: {
            b: true,
            c: [null, {
              d: 1
            }],
            e: {
              f: "abc"
            }
          },
          g: undefined
        }),
        expected = '{"a": {"b": true,"c": [null,{"d": 1}],"e": {"f": "abc"}},"g": undefined}';
      expect(result).toEqual(expected);
    });
  });
});
