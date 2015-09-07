/**
 * Create the function "interleave" that accepts two arrays as arguments:
 * The task is to [interleave]() the array, using an in-place algorithm such that the resulting array looks like
 	* is a function
 	* interleaves two single-character strings, in the same order they are passed
 	* interleaves two two-character strings, again preserving order
 	* interleaves two longer strings of equal length
 	* if the first string is longer, it will add the remaining characters to the end
 	* if the second string is longer, it will add the remaining characters to the end
 	* interleaves three strings
 	* interleaves n strings
 * @return {String} [string with combined arguments shuffled together]
 */
var interleave = function(a, b) {
	// for (var i = 0; i < arguments.length; i++) {
		if (a.length === 0) {
			return "" + b;
		}
		if (b.length === 0) {
			return "" + a;
		}
		// 	str += arguments[i].substring(0, 1) + arguments[i+1].substring(0,10) + interleave(arguments[i].substring(1), arguments[i+1].substring(1));
		// }
		// return str;
		return "" + a.substring(0,1) + b.substring(0,1) + interleave(a.substring(1), b.substring(1));
};

// Alternate Solution

var interleave = function() {
	var result = '';
	for (var i = 0; i < arguments.length; i++) {

	}
	return result;
};

var interleave = function() {
	return Array.reduce.call(arguments, function(result, str) {
		for (var i = str.length - 1; i >= 0; i--) {
			var chr = str[i];
			result[i] = (result[i] || '') + chr;
		}
	}, []).join('');
};