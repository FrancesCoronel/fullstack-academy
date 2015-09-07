describe('Find Characters', function(){

	describe("findACount", function(){
		it('finds all occurences of the letter "a" and returns the total', function(){
			expect(findACount('aaaaaaaaaaaaaaaaaa')).toEqual(18);
		});

		it('finds all occurences of the letter "a" in a phrase', function(){
			expect(findACount('Hello World!')).toEqual(0);
		});

		it('finds all occurences of "A" regardles of case type', function(){
			expect(findACount('fullstackacademy'.toUpperCase())).toEqual(3);
			expect(findACount('FULLSTACKACADEMY'.toLowerCase())).toEqual(3);
			expect(findACount('FULLSTaCKAcAdemy')).toEqual(3);
		});
	});

	describe('areaCode', function(){
		it('finds all digits for in an area code without any special characters', function(){
			expect(areaCodeFinder("4107264589")).toEqual(410);
		});

		it('finds all digits in an area code when there are parentheses are present', function(){
			expect(areaCodeFinder("(201)4447777")).toEqual(201);
		})

		it('finds all digits in an area code when there are hyphens present', function(){
			expect(areaCodeFinder('586-222-2345')).toEqual(586);
		});

	});

	describe('adjustUrlParameter', function() {

		it('adds a query param to a URL with no parameters', function(){

			var url = "http://www.google.com";
			var param = "ID=555";

			expect(adjustUrlParameter(url, param)).toEqual('http://www.google.com?ID=555');

		});

		it('updates the current query params ID value in a URL', function() {

			var url = "http://www.google.com?ID=555";
			var param = "ID=201";

			expect(adjustUrlParameter(url, param)).toEqual('http://www.google.com?ID=201');

		});

		it("adds an additional parameter to a URL", function() {

			var url = "http://www.google.com?ID=201";
			var param = "TYPE=555";

			expect(adjustUrlParameter(url, param)).toEqual('http://www.google.com?ID=201&TYPE=555');

		});

	});

	describe("stringPlusPlus", function(){

		it('adds one to the value of a string that ends with a number', function() {
			expect(stringPlusPlus('helloWorld000')).toEqual('helloWorld001');
		});

		it('adds one to the value of a string that ends with a number 00999', function() {
			expect(stringPlusPlus("1")).toEqual("2");
			expect(stringPlusPlus('foo00999')).toEqual('foo01000');
		});

		it("adds one to the end of a string where a letter is the last character", function() {
			expect(stringPlusPlus('helloWorld')).toEqual('helloWorld1');
		});
	});

});