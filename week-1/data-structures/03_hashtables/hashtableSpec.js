describe("Hash", function() {
  var hash;

  beforeEach(function() {
    hash = new Hash();
  });

  it("should have 25 buckets",function() {
    expect(hash.numBuckets).toEqual(25);
  });

  it("should have methods named 'set', 'get', and 'hasKey'", function() {
    expect(hash.set instanceof Function).toBeTruthy();
    expect(hash.get instanceof Function).toBeTruthy();
    expect(hash.hasKey instanceof Function).toBeTruthy();
  });

  it("should hash correctly", function() {
    expect(hash._hash('foo')).toEqual(24);
    expect(hash._hash('this is a key')).toEqual(7)
    expect(hash._hash('what about this one')).toEqual(8)
  });

  it("should throw an error when given non-string keys", function() {
    expect(function() {
      hash.set({a:'foo'})
    }).toThrow('Keys must be strings');
  });

  it("should store and retrieve values", function() {
    hash.set('key1','val1');
    hash.set('key2','val2');
    hash.set('this is a very different string',44.4);

    expect(hash.get('key1')).toEqual('val1');
    expect(hash.get('key2')).toEqual('val2');
    expect(hash.get('this is a very different string')).toEqual(44.4);
  });

  it("should handle collisions", function() {
    hash.set('foo','bar1');
    hash.set('ofo','bar2');
    expect(hash.get('ofo')).toEqual('bar2');
    expect(hash.get('foo')).toEqual('bar1');
  });

  it("should overwrite keys", function() {
    hash.set('foo','bar1');
    hash.set('foo','bar2');
    expect(hash.get('foo')).toEqual('bar2');
  });

  it("should return booleans for #hasKey", function() {
    hash.set('foobar','fluf cats')
    expect(hash.hasKey('foobar')).toBe(true)
  });

});