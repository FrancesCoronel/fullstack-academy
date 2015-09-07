describe('interleave', function () {

	it('is a function', function () {
		expect(typeof interleave).toEqual('function');
	});

	it('interleaves two single-character strings, in the same order they are passed', function () {
		var result = interleave('a', 'B');
		expect(result).toEqual('aB');
	});

	it('interleaves two two-character strings, again preserving order', function () {
		var result = interleave('ac', 'BD');
		expect(result).toEqual('aBcD');
	});

	it('interleaves two longer strings of equal length', function () {
		var result = interleave('abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		expect(result).toEqual('aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ');
	});

	it('if the first string is longer, it will add the remaining characters to the end', function () {
		var result = interleave('abcdefg', 'ABC');
		expect(result).toEqual('aAbBcCdefg');
	});

	it('if the second string is longer, it will add the remaining characters to the end', function () {
		var result = interleave('abc', 'ABCDEFG');
		expect(result).toEqual('aAbBcCDEFG');
	});

	it('interleaves three strings', function () {
		var result = interleave('abc', 'XYZ', '123');
		expect(result).toEqual('aX1bY2cZ3');
	});

	it('interleaves n strings', function () {
		var result = interleave('aB', 'cD', 'eF', 'gH', 'iJ', 'kL', 'mN', 'oP', 'qR', 'sT');
		expect(result).toEqual('acegikmoqsBDFHJLNPRT');
	});

});