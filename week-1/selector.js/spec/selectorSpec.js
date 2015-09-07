describe("selectorTypeMatcher", function() {
  it("should return the 'id' type for an id selector", function() {
    var type = selectorTypeMatcher('#pagetitle');
    expect(type).toEqual("id");
  });

  it("should return the 'class' type for a class selector", function() {
    var type = selectorTypeMatcher('.image');
    expect(type).toEqual("class");
  });

  it("should return the 'tag.class' type for a tag.class selector", function() {
    var type = selectorTypeMatcher('img.thumbnail');
    expect(type).toEqual("tag.class");
  });

  it("should return the 'tag' type for a tag selector", function() {
    var type = selectorTypeMatcher('div');
    expect(type).toEqual("tag");
  });
});

describe("matchFunctionMaker", function() {

  it("should return a ID matching function that returns TRUE if the element matches the ID", function() {
    var selector = "#price";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("DIV");
    sampleDivEl.id = "price"; // element has three different classes on it
    expect(matcher(sampleDivEl)).toEqual(true);
  });

  it("should return a ID matching function that returns FALSE if the element does not match the ID", function() {
    var selector = "#price";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("DIV");
    sampleDivEl.id = "logo"; // element has three different classes on it
    expect(matcher(sampleDivEl)).toEqual(false);
  });

  it("should return a CLASS matching function that returns TRUE if the element matches the className", function() {
    var selector = ".heading";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("DIV");
    sampleDivEl.className = "heading";
    expect(matcher(sampleDivEl)).toEqual(true);
  });

  it("should return a CLASS matching function that returns TRUE if the element matches the className, even when there are multiple classes on the element", function() {
    var selector = ".heading";
    var matcher = matchFunctionMaker(selector);
    var sampleEl = document.createElement("H1");
    sampleEl.className = "lead heading lightback"; // element has three different classes on it
    expect(matcher(sampleEl)).toEqual(true);
  });

  it("should return a TAG matching function that returns TRUE when the element matches the tagName", function() {
    var selector = 'div';
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("div");
    expect(matcher(sampleDivEl)).toEqual(true);
  });

  it("should return a TAG.CLASS matching function that returns TRUE if the element matches the tagName AND Class", function() {
    var selector = "img.thumbnail";
    var matcher = matchFunctionMaker(selector);
    var sampleDivEl = document.createElement("img");
    sampleDivEl.className = "thumbnail"; // element has three different classes on it
    expect(matcher(sampleDivEl)).toEqual(true);
  });
});

describe("$ selector function", function() {
  var elements;

  it("should select one element by tag name (the root el in this case)", function() {
    elements = $('body');
    expect(elements[0].tagName.toLowerCase()).toEqual("body");
  });

  it("should select one element by id", function() {
    elements = $('#pagetitle');
    expect(elements.length).toEqual(1);
  });

  it("should select the right element by id", function() {
    elements = $('#pagetitle');
    expect(elements[0].innerHTML).toEqual("My Photos");
  });

  it("should select tag names", function() {
    elements = $('h2');
    expect(elements.length).toEqual(3);
  });

  it("should select class", function() {
    elements = $('.photo');
    expect(elements.length).toEqual(4);
  });

  it("should select class, including elements that have multiple classes", function() {
    elements = $('.lead');
    expect(elements.length).toEqual(3);
  });

  it("should select by tag AND className", function() {
    elements = $('h2.small');
    expect(elements.length).toEqual(2);
  });
  
});
