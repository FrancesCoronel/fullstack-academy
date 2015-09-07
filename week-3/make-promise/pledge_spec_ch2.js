describe('Chapter 2: Fulfillment Callback Attachment',function(){});
/*======================================================


                         .d8888b.
                        d88P  Y88b
                               888
                             .d88P
                         .od888P"
                        d88P"
                        888"
                        888888888


Chapter 2: Attaching and Calling Promise Event Handlers
--------------------------------------------------------
We are beginning to see how a deferral can manipulate a
promise. But what does a promise actually do? How can one be
used? By completing this chapter, you will learn the
fundamentals of how promises act on eventual information.
========================================================*/

describe("A promise's .then method", function(){

  var deferral, promise;
  beforeEach(function(){
    deferral = defer();
    promise  = deferral.$promise;
  });
  function successCb (data)   { /* use data */ }
  function errorCb   (reason) { /* handle reason */ }
  function s2 (d) { /* use d */ }
  function e2 (r) { /* handle r */ }

  it('adds groups of handlers (callback functions) to the promise', function(){
    promise.then( successCb, errorCb );
    expect( promise.handlerGroups[0].successCb ).toBe( successCb );
    expect( promise.handlerGroups[0].errorCb   ).toBe( errorCb );
  });

  it('can be called multiple times to add more handlers', function(){
    promise.then( successCb, errorCb );
    expect( promise.handlerGroups[0].successCb ).toBe( successCb );
    expect( promise.handlerGroups[0].errorCb   ).toBe( errorCb );
    promise.then( s2, e2 );
    expect( promise.handlerGroups[1].successCb ).toBe( s2 );
    expect( promise.handlerGroups[1].errorCb   ).toBe( e2 );
  });

  it('attaches a falsy value in place of non-function success or error callbacks', function(){
    promise.then( 'a string', {} );
    expect( promise.handlerGroups[0].successCb ).toBeFalsy();
    expect( promise.handlerGroups[0].errorCb   ).toBeFalsy();
  });

});

// Getting to the main functionality
describe('A promise', function(){

  var fn, numDeferral, promiseForNum, foo;
  fn = {
    setFoo10: function () { foo = 10; },
    addToFoo: function (num) { foo += num; }
  };
  beforeEach(function(){
    numDeferral = defer();
    promiseForNum = numDeferral.$promise;
    foo = 0;
    spyOn( fn, 'setFoo10' ).and.callThrough();
    spyOn( fn, 'addToFoo' ).and.callThrough();
  });

  describe('that is not yet resolved', function(){

    it('does not call any success handlers yet', function(){
      promiseForNum.then( fn.setFoo10 );
      expect( fn.setFoo10 ).not.toHaveBeenCalled();
    });

  });

  describe('that is already resolved', function(){

    beforeEach(function(){
      numDeferral.resolve( 25 );
    });

    // Recommended: add a .callHandlers method to your promise prototype.

    it('calls a success handler added by .then', function(){
      promiseForNum.then( fn.setFoo10 );
      expect( fn.setFoo10 ).toHaveBeenCalled();
    });

    it("calls a success handler by passing in the promise's value", function(){
      promiseForNum.then( fn.addToFoo );
      expect( fn.addToFoo ).toHaveBeenCalledWith( 25 );
    });

    it('calls each success handler once per attachment', function(){
      promiseForNum.then( fn.setFoo10 );
      promiseForNum.then( fn.addToFoo );
      promiseForNum.then( fn.addToFoo );
      expect( fn.setFoo10.calls.count() ).toBe( 1 );
      expect( fn.addToFoo.calls.count() ).toBe( 2 );
      expect( fn.addToFoo ).toHaveBeenCalledWith( 25 );
    });

    it('calls each success handler when added', function(){
      promiseForNum.then( fn.setFoo10 );
      expect( foo ).toBe( 10 );
      promiseForNum.then( fn.addToFoo );
      expect( foo ).toBe( 35 );
    });

  });

  // So we can run callbacks if we already have the value.
  // But what if events occur in opposite order?
  describe('that already has a success handler', function(){

    it('calls that handler when resolved', function(){
      promiseForNum.then( fn.setFoo10 );
      numDeferral.resolve();
      expect( fn.setFoo10 ).toHaveBeenCalled();
    });

    it('calls all its success handlers in order one time when resolved', function(){
      promiseForNum.then( fn.setFoo10 );
      promiseForNum.then( fn.addToFoo );
      numDeferral.resolve( 25 );
      expect( foo ).toBe( 35 );
    });

  });

});

/*
We've just made something nifty. A promise's .then can
attach behavior both before & after the promise is actually
resolved, and we know that the actions will run when they can.
The .then method can also be called multiple times, so you can
attach callbacks to run in different parts of your code, and
they will all run once the promise is resolved.
*/
