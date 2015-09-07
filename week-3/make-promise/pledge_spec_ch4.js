describe('Chapter 4: Promise Chaining and Transformation',function(){});
/*=======================================================


                            d8888
                           d8P888
                          d8P 888
                         d8P  888
                        d88   888
                        8888888888
                              888
                              888


Chapter 4: Promises Can Return Values and Chain Together
---------------------------------------------------------
A crucial aspect of promises is that .then always returns
a new promise. When values are returned from promise A's
handler, they are exported and represented by the return
promise B. This leads to remarkably versatile behavior:
choosing when to catch errors, chaining promises together,
easily passing around promised values and acting on them
where convenient… even returning new values.
This chapter may be challenging.
========================================================*/

describe('For a given promiseA (pA)', function(){

  var deferralA, promiseA;
  beforeEach(function(){
    deferralA = defer();
    promiseA = deferralA.$promise;
  });
  function thisReturnsHi () { return 'hi'; }
  function thisThrowsErr () { throw 'err'; }

  it('.then adds a new deferral to its handler group', function(){
    promiseA.then();
    expect( promiseA.handlerGroups[0].forwarder instanceof Deferral ).toBe( true );
    // each handler group has its own forwarder
    promiseA.then();
    expect( promiseA.handlerGroups[1].forwarder instanceof Deferral ).toBe( true );
    expect( promiseA.handlerGroups[1].forwarder )
      .not.toBe( promiseA.handlerGroups[0].forwarder );
  });

  // Passing this may break your .catch from chapter 3. If that happens,
  // you will have to go back and fix .catch, taking this spec into account.
  it('.then returns the promise from that deferral', function(){
    var promiseB = promiseA.then(); // defer().$promise.then();
    expect( promiseB ).toBe( promiseA.handlerGroups[0].forwarder.$promise );
    // expect defer().$promise.then() === defer().$promise.handlerGroups[0].forwarder.$promise
  });

  describe('that returns promiseB (pB) via .then:', function(){

    // Resolution bubbles down to the first available success handler.
    xit("if pA is resolved but has no success handler, pB is resolved with pA's value", function(){
      var promiseB = promiseA.then();
      deferralA.resolve( 9001 );
      // do not set state manually; 'resolve' should be called somewhere!
      expect( promiseB.state ).toBe( 'resolved' );
      expect( promiseB.value ).toBe( 9001 );
    });

    // Rejection bubbles down to the first available error handler.
    xit("if pA is rejected but has no error handler, pB is rejected with pA's reason", function(){
      var promiseB = promiseA.then();
      deferralA.reject( 'darn' );
      // do not set state manually; 'reject' should be called somewhere!
      expect( promiseB.state ).toBe( 'rejected' );
      expect( promiseB.value ).toBe( 'darn' );
    });

    // This is for normal (synchronous / non-promise) return values
    xit("if pA's success handler returns a value x, pB is resolved with x", function(){
      var promiseB = promiseA.then( thisReturnsHi );
      deferralA.resolve( 'an ordinary value' );
      expect( promiseB.state ).toBe( 'resolved' );
      expect( promiseB.value ).toBe( 'hi' );
    });

    // This is for normal (synchronous / non-promise) return values
    xit("if pA's error handler returns a value x, pB is resolved with x", function(){
      /* Why resolved? This is similar to try-catch. If promiseA is
      rejected (equivalent to `try` failure), we pass the reason to
      promiseA's error handler (equivalent to `catch`). We have now
      successfully handled the error, so promiseB should represent
      the error handler returning something useful, not a new error.
      promiseB should only be rejected if the error handler itself
      fails somehow (which we already addressed in a previous test). */
      var promiseB = promiseA.catch( thisReturnsHi );
      deferralA.reject();
      expect( promiseB.state ).toBe( 'resolved' );
      expect( promiseB.value ).toBe( 'hi' );
    });

    // Exceptions cause the returned promise to be rejected with the error.
    // Hint: you will need to use `try` & `catch` to make this work.
    xit("if pA's success handler throws an error `e`, pB is rejected with `e`", function(){
      var promiseB = promiseA.then( thisThrowsErr );
      deferralA.resolve();
      expect( promiseB.state ).toBe( 'rejected' );
      expect( promiseB.value ).toBe( 'err' );
    });

    xit("if pA's error handler throws an error `e`, pB is rejected with `e`", function(){
      var promiseB = promiseA.catch( thisThrowsErr );
      deferralA.reject();
      expect( promiseB.state ).toBe( 'rejected' );
      expect( promiseB.value ).toBe( 'err' );
    });

    /* What if promiseA returns a promiseZ? You could handle pZ like a
    normal value, but then you have to start writing .then inside .then.
    Instead, we want to make promiseB to "become" pZ by copying
    pZ's behavior — aka assimilation. This test is a brain-bender. */
    xit("if pA's success handler returns promiseZ, pB mimics pZ", function(){
      var deferralZ = defer();
      var promiseZ = deferralZ.$promise;
      var promiseB = promiseA.then(function(){
        return promiseZ;
      });
      deferralA.resolve();
      deferralZ.resolve( 'testing' );
      expect( promiseB.value ).toBe( 'testing' );
    });

    xit("if pA's error handler returns promiseZ, pB mimics pZ", function(){
      var deferralZ = defer();
      var promiseZ = deferralZ.$promise;
      var promiseB = promiseA.catch(function(){
        return promiseZ;
      });
      deferralA.reject();
      deferralZ.resolve( 'testing' );
      expect( promiseB.value ).toBe( 'testing' );
    });

    // To really test assimilation properly would require many more specs.
    // But we won't be that strict.

  });

  // Another demonstration. This should work if the previous specs passed.
  xit('.then can be chained many times', function(){
    var add1 = function (num) { return ++num; };
    var test = 0;
    promiseA.then( add1 ).then( add1 ).then().then( function (data) {
      test = data;
    });
    deferralA.resolve( 0 );
    expect( test ).toBe( 2 );
  });

  // You could bubble notifications too, but we will skip that.
  // In fact there is some disagreement as to how notifications should work.
});

/*
Wow! If you got this far, congratulations. We omitted certain
details (e.g. handlers must always be called in a true async
wrapper), but you have built a promise library with most of
the standard behavior. In the next (optional) chapter, we'll
be adding in some relatively nonstandard behavior — notifiers.
*/
