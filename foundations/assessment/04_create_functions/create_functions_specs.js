describe('createFunction', function() {
  var callbacks;
  
  beforeEach(function(){
    callbacks = createFunctions(10);  
  });
    
  it('createFunctions returns an array of functions', function() {
    expect(Array.isArray(callbacks)).toEqual(true);    
  });

  it('all indexes in the array are functions', function(){ 
    // everything must be a function (hence the .every function)
    var onlyFuncs = callbacks.every(function(fn){
      if(typeof fn === 'function'){
        return true;
      } 
    })
    expect(onlyFuncs).toEqual(true);

  });
  
  it('when functions in the array are invoked they return the correct number', function() {
    
    var returnValsForEachFunc = callbacks.map(function(fn){
      return fn();
    });
    var callFunctionsMoreThanOnce = callbacks.map(function(fn){
      return fn();
    })
    expect(returnValsForEachFunc).toEqual([0,1,2,3,4,5,6,7,8,9]);
    expect(callFunctionsMoreThanOnce).toEqual([0,1,2,3,4,5,6,7,8,9]);

  });
  
  it('random values for n', function() {
    
    var n = Math.floor(Math.random() * 20)+1;
    var randomCallbacks = createFunctions(n);
    var properValues = randomCallbacks.every(function(fn,index){
      return fn() === index;
    });
    var calledMoreThanOnce = randomCallbacks.every(function(fn,index){
      return fn() === index;
    });

    expect(properValues).toEqual(true);
    expect(calledMoreThanOnce).toEqual(true);
  
  });



})
