describe("binarySearchTree", function() {
  var tree;
 
  beforeEach(function() {
    tree = new BinarySearchTree(20);
  });
 
  it("should have methods named 'insert', 'contains', and 'depthFirstForEach", function() {
    expect(tree.insert).toEqual(jasmine.any(Function));
    expect(tree.contains).toEqual(jasmine.any(Function));
    expect(tree.depthFirstForEach).toEqual(jasmine.any(Function));
    expect(tree.breadthFirstForEach).toEqual(jasmine.any(Function));
    expect(tree.size).toEqual(jasmine.any(Function));
  });
 
  it("should take values and report size correctly", function () {
    tree.insert(12);
    expect(tree.size()).toEqual(2);
  });
 
  it("should make nodes on the correct branches", function () {
    tree.insert(12);
    tree.insert(22);
    expect(tree.left.value).toEqual(12);
    expect(tree.right.value).toEqual(22);
  });
 
  it("should sort values when adding", function() {
    expect(tree.value).toEqual(20);
    tree.insert(15);
    expect(tree.left.value).toEqual(15);
    tree.insert(25);
    expect(tree.right.value).toEqual(25);
    tree.insert(5);
    expect(tree.left.left.value).toEqual(5);
    tree.insert(17);
    tree.insert(21);
    tree.insert(28);
    tree.insert(0);
    tree.insert(14);
    tree.insert(50);
    tree.insert(1);
    tree.insert(45);
    tree.insert(13);
    tree.insert(12);
    tree.insert(11);
    expect(tree.left.left.right.left.left.left.value).toEqual(11);
    tree.insert(30);
    tree.insert(35);
    tree.insert(33);
    tree.insert(31);
    tree.insert(34);
    expect(tree.right.right.right.left.left.right.left.right.value).toEqual(34);
  });
 
  it("should return true if a contains is passed a value in the tree", function() {
    tree.insert(15);
    tree.insert(25);
    tree.insert(5);
    tree.insert(17);
    tree.insert(21);
    tree.insert(28);
    tree.insert(0);
    tree.insert(14);
    tree.insert(50);
    tree.insert(1);
    tree.insert(45);
    tree.insert(13);
    tree.insert(12);
    tree.insert(11);
    tree.insert(30);
    tree.insert(35);
    tree.insert(33);
    tree.insert(31);
    tree.insert(34);
    expect(tree.contains(30)).toEqual(true);
    expect(tree.contains(34)).toEqual(true);
    expect(tree.contains(20)).toEqual(true);
    expect(tree.contains(35)).toEqual(true);
    expect(tree.contains(11)).toEqual(true);
    expect(tree.contains(13)).toEqual(true);
    expect(tree.contains(45)).toEqual(true);
    expect(tree.contains(2)).toEqual(false);
    expect(tree.contains(22)).toEqual(false);
    expect(tree.contains(27)).toEqual(false);
    expect(tree.contains(16)).toEqual(false);
    expect(tree.contains(32)).toEqual(false);
  });
 
  it("should run depth first when depthFirstForEach() is run", function() {
    tree.insert(15);
    tree.insert(25);
    tree.insert(5);
    tree.insert(17);
    tree.insert(21);
    tree.insert(28);
    tree.insert(0);
    tree.insert(14);
    tree.insert(50);
    tree.insert(1);
    tree.insert(45);
    tree.insert(13);
    tree.insert(12);
    tree.insert(11);
    tree.insert(30);
    tree.insert(35);
    tree.insert(33);
    tree.insert(31);
    tree.insert(34);
    var depth = [];
    tree.depthFirstForEach(function(val){depth.push(val);});
    expect(depth).toEqual([20,15,5,0,1,14,13,12,11,17,25,21,28,50,45,30,35,33,31,34]);
  });
 
  it("should run breadth first when breadthFirstForEach() is run", function() {
    tree.insert(15);
    tree.insert(25);
    tree.insert(5);
    tree.insert(17);
    tree.insert(21);
    tree.insert(28);
    tree.insert(0);
    tree.insert(14);
    tree.insert(50);
    tree.insert(1);
    tree.insert(45);
    tree.insert(13);
    tree.insert(12);
    tree.insert(11);
    tree.insert(30);
    tree.insert(35);
    tree.insert(33);
    tree.insert(31);
    tree.insert(34);
    var depth = [];
    tree.breadthFirstForEach(function(val){depth.push(val);});
    expect(depth).toEqual([20,15,25,5,17,21,28,0,14,50,1,13,45,12,30,11,35,33,31,34]);
  });
});