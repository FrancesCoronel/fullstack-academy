describe('Chapter 3: Rejection Callback Attachment',function(){});
/*=======================================================


                         .d8888b.
                        d88P  Y88b
                             .d88P
                            8888"
                             "Y8b.
                        888    888
                        Y88b  d88P
                         "Y8888P"


Chapter 3: Completing the Handlers: Rejection & Catch
---------------------------------------------------------
With .resolve sending and .then acting on data, we have
a major part of promises working. Rejection is similar;
finish the "callback aggregation" of promises in this chapter.
========================================================*/

describe('Another promise', function(){

  var fn, thingDeferral, promiseForThing, log;
  fn = {
    logOops: function () { log.push({ code: 'oops' }); },
    logInput: function (input) { log.push( input ); }
  };
  beforeEach(function(){
    thingDeferral = defer();
    promiseForThing = thingDeferral.$promise;
    log = [];
    spyOn( fn, 'logOops' ).and.callThrough();
    spyOn( fn, 'logInput' ).and.callThrough();
  });

  describe('that is not yet rejected', function(){

    it('does not call error handlers yet', function(){
      promiseForThing.then( null, fn.logOops );
      expect( fn.logOops ).not.toHaveBeenCalled();
    });

  });

  describe('that is already rejected', function(){

    var theReason = { code: 'timed out' };
    beforeEach(function(){
      thingDeferral.reject( theReason );
    });

    // if you get "not a function" errors, think carefully about
    // what happens when you call `.then`. What is getting added
    // to the `handlerGroups`? What is your code trying to do with
    // those `handlerGroups`? There is going to have to be some
    // sort of "safety check" somewhere…

    it('does not call any success handlers', function(){
      promiseForThing.then( fn.logOops );
      expect( fn.logOops ).not.toHaveBeenCalled();
    });

    it('calls an error handler added by .then', function(){
      promiseForThing.then( null, fn.logOops );
      expect( fn.logOops ).toHaveBeenCalled();
    });

    it("calls an error handler by passing in the promise's value", function(){
      promiseForThing.then( null, fn.logInput );
      expect( fn.logInput ).toHaveBeenCalledWith( theReason );
    });

    it('calls each error handler once per attachment', function(){
      promiseForThing.then( null, fn.logOops );
      promiseForThing.then( null, fn.logInput );
      promiseForThing.then( null, fn.logInput );
      expect( fn.logOops.calls.count() ).toBe( 1 );
      expect( fn.logInput.calls.count() ).toBe( 2 );
      expect( fn.logInput ).toHaveBeenCalledWith( theReason );
    });

    it('calls each error handler in the order added', function(){
      promiseForThing.then( null, fn.logOops );
      promiseForThing.then( null, fn.logInput );
      expect( log ).toEqual( [{ code: 'oops'}, {code: 'timed out'}] );
    });

  });

  describe('that already has an error handler', function(){

    var theReason = { code: 'unauthorized' };

    it('calls that handler when rejected', function(){
      promiseForThing.then( null, fn.logInput );
      thingDeferral.reject( theReason );
      expect( fn.logInput ).toHaveBeenCalledWith( theReason );
    });

    it('calls all its error handlers in order one time when rejected', function(){
      promiseForThing.then( null, fn.logInput );
      promiseForThing.then( null, fn.logOops );
      thingDeferral.reject( theReason );
      expect( log ).toEqual( [{code: 'unauthorized'}, {code: 'oops'}] );
    });

  });

  describe('with both success and error handlers', function(){

    var ui;
    beforeEach(function(){
      ui = {
        animals: ['kitten', 'puppy'],
        warning: null
      };

      promiseForThing.then(
        function thingSuccess (thing) {
          ui.animals.push( thing.animal );
        },
        function thingError (reason) {
          ui.warning = reason.message;
        }
      );

    });

    // Demonstration — the next two specs should pass already
    it('can do stuff with resolved data', function(){
      thingDeferral.resolve({ animal: 'duckling' });
      expect( ui.animals[2] ).toBe( 'duckling' );
    });

    it('can deal with rejection reasons', function(){
      thingDeferral.reject({ message: 'unauthorized' });
      expect( ui.warning ).toBe( 'unauthorized' );
    });

    // Optional but recommended garbage collection
    it('discards handlers that are no longer needed', function(){
      thingDeferral.resolve({ animal: 'chipmunk' });
      expect( promiseForThing.handlerGroups ).toEqual( [] );
    });

  });

});

// A quick detour while we are finishing rejections:
// add a .catch(fn) convenience method to your promise prototype.
// The internals of this method can be coded as one short line.
describe("A promise's .catch(errorFn) method", function(){

  var deferral, promise;
  beforeEach(function(){
     deferral = defer();
     promise = deferral.$promise;
     spyOn( promise, 'then' ).and.callThrough();
  });
  function myFunc (reason) { console.log(reason); }

  it('attaches errorFn as an error handler', function(){
    promise.catch( myFunc );
    expect( promise.then ).toHaveBeenCalledWith( null, myFunc );
  });

  /* This spec will probably already pass at this point, because
  by default all functions return undefined. However, as you start
  Ch. 4, this may fail. If that happens, you will have to return here
  and fix .catch — this time, taking the Ch. 4 specs into account. */
  it('returns the same kind of thing that .then would', function(){
    var return1 = promise.catch( myFunc );
    var return2 = promise.then( null, myFunc );
    expect( return1 ).toEqual( return2 );
  });

});

/*
That finishes the attachment and triggering of our handlers!
In the next chapter, we will dive deeply into how .then
chaining actually works. This behavior is what drives promises
beyond being just portable callback sinks and transforms them
into dynamic, versatile, powerful, manipulatable machines.
*/
