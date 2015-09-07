describe("vowelsCount", function() {

	it("should handle an empty String", function(){
		expect(vowelsCount("")).toEqual(0);
	});
	it("should handle a String with no Vowels", function(){
		expect(vowelsCount("http://")).toEqual(0);
	});

	it("should handle a String with Vowels", function(){
		expect(vowelsCount("Hello")).toEqual(2);
	});

	it("should handle a String with multiple words and Vowels", function(){
		expect(vowelsCount("Hello World!")).toEqual(3);
	});

	it("should handle a String with all vowels", function(){
		expect(vowelsCount("AeIoU")).toEqual(5);
	});
});


