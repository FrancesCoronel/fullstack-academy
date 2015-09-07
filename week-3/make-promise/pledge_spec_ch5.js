describe('Chapter 5: Notification Handlers',function(){});
/*=======================================================

                        cuuu....uK
                        888888888
                        8*888**"
                        >  .....
                        Lz"  ^888Nu
                        F     '8888k
                        ..     88888>
                       @888L   88888
                      '8888F   8888F
                       %8F"   d888"
                        ^"===*%"`

Chapter 5: Extra Credit: Deferral-Style Notifications
---------------------------------------------------------
In $q and Q, promises can take a third handler function:
an update or notification handler. In essence, this acts
like a built-in event emitter that uses the promise as a
kind of communication channel, usually for sending information
about a pending promise. There is some disagreement as to
how such a system should work or notifiers even belongs in
promises at all. If you want to understand more, however,
this chapter will implement a basic notification system.
========================================================*/

describe("A promise's .then method", function(){

  var deferral, promise;
  beforeEach(function(){
    deferral = defer();
    promise  = deferral.$promise;
  });
  function updateCb (info) { /* act on info */ }
  function u2 (i) { /* act on i */ }

  xit('adds update handlers to the promise', function(){
    promise.then( null, null, updateCb );
    expect( promise.updateCbs[0] ).toBe( updateCb );
  });

  xit('can be called multiple times to add more handlers', function(){
    promise.then( null, null, updateCb );
    expect( promise.updateCbs[0] ).toBe( updateCb );
    promise.then( null, null, u2 );
    expect( promise.updateCbs[1] ).toBe( u2 );
  });

  xit("won't bother to attach an update callback if the handler is not a function", function() {
    promise.then( null, null, 'something' );
    promise.then( null, null, {} );
    promise.then( null, null, false );
    promise.then( null, null, [function() {}] );
    promise.then( null, null, 12345 );
    expect( promise.updateCbs ).toEqual( [] );
  });

});

describe("A deferral's .notify method", function(){

  var fn, downloadDeferral, promiseForDownload;
  fn = {
    setLoadingBar: function (num) { /* update the loading bar */ },
  };
  beforeEach(function(){
    downloadDeferral = defer();
    promiseForDownload = downloadDeferral.$promise;
    spyOn( fn, 'setLoadingBar' ).and.callThrough();
  });

  xit("calls a promise's update handler attached via .then", function(){
    promiseForDownload.then(null, null, fn.setLoadingBar);
    expect( fn.setLoadingBar ).not.toHaveBeenCalled();
    downloadDeferral.notify();
    expect( fn.setLoadingBar ).toHaveBeenCalled();
  });

  xit('calls an update handler with some information', function(){
    promiseForDownload.then(null, null, fn.setLoadingBar);
    expect( fn.setLoadingBar ).not.toHaveBeenCalled();
    downloadDeferral.notify( 17 );
    expect( fn.setLoadingBar ).toHaveBeenCalledWith( 17 );
  });

  xit("never affects the promise's value", function(){
    promiseForDownload.then( fn.setLoadingBar );
    downloadDeferral.notify( 50 );
    expect( promiseForDownload.value ).toBe( undefined );
  });

  xit('calls all attached update handlers once per attachment', function(){
    promiseForDownload.then(null, null, fn.setLoadingBar);
    promiseForDownload.then(null, null, fn.setLoadingBar);
    expect( fn.setLoadingBar ).not.toHaveBeenCalled();
    downloadDeferral.notify();
    expect( fn.setLoadingBar.calls.count() ).toBe( 2 );
  });

  xit('only works while the promise is pending', function(){
    promiseForDownload.then(null, null, fn.setLoadingBar);
    downloadDeferral.notify( 50 );
    expect( fn.setLoadingBar ).toHaveBeenCalledWith( 50 );
    downloadDeferral.resolve( 'now I am resolved' );
    downloadDeferral.notify( 75 );
    expect( fn.setLoadingBar ).not.toHaveBeenCalledWith( 75 );
    expect( fn.setLoadingBar.calls.count() ).toBe( 1 );
  });

  xit('can be called multiple times before resolution/rejection', function(){
    promiseForDownload.then(null, null, fn.setLoadingBar);
    downloadDeferral.notify( 12 );
    expect( fn.setLoadingBar.calls.count() ).toBe( 1 );
    downloadDeferral.notify( 38 );
    expect( fn.setLoadingBar.calls.count() ).toBe( 2 );
    downloadDeferral.reject( 'corrupted data' );
    downloadDeferral.notify( 54 );
    expect( fn.setLoadingBar.calls.count() ).toBe( 2 );
  });

});
