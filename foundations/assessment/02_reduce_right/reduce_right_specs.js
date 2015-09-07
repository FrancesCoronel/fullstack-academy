describe("reduceRight takes an array, starting point, and combining function and applies the values in the array starting from the end", function() {
  
  it('concatenates a string', function(){
    var string_concat = function(prev,curr){
      return prev+curr;
    };
    expect(reduceRight(['o','l','l','e','h'],'',string_concat)).toEqual("hello");
  });


});



describe("reduceRight recursive", function(){

  beforeEach(function(){
    spyOn(window, 'reduceRightRecursive').and.callThrough();
  })

  it('concatenates a string and calls itself', function(){
    
    var string_concat = function(prev,curr){
      return prev+curr;
    };
    var finalString = reduceRightRecursive(['o','l','l','e','h'],'',string_concat)
    expect(finalString).toEqual("hello");
    expect(reduceRightRecursive.calls.count()).toBeGreaterThan(1);
  });  
})
