/**
 * Returns # of vowels string contains
 	* do not count y as a vowel
 	* should handle an empty string
 	* should handle a string with no vowels
 	* should a string with multiple words & vowels
 	* should a string with all vowels
 * @param  {String} str [description]
 * @return {[type]}     [description]
 */
var vowelsCount = function(str) {
	var vowelArray = ['a', 'e', 'i', 'o', 'u'];
	var count = 0;
	for (var letter in vowelArray) {
		for (var i in str) {
			if (vowelArray[letter] === str[i].toLowerCase()) {
				count += 1;
			}
		}
	}
	return count;
};

// Alternate Solution

function vowelsCount(str) {
	var answer = str.match(/[aeiou]/gi); // i allows you to ignore case
	if (answer === null) { // takes care of null spec
		return 0;
	}
	return answer.length;
}