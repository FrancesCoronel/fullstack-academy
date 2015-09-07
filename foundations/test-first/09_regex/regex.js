/**
 * finds all occurences of the letter "a" and returns the total
 * finds all occurences of the letter "a" in a phrase
 * finds all occurences of "A" regardless of case type
 * @param  {String} str [what we're evaluating]
 * @return {Number} [occurences of letter]
 */
var findACount = function(str) {
	var total = 0;
	for (var letter in str) {
		if (letter.match(/(A|a)/)) { // if letter in string is equal to A or a, then total is incremented
			total++;
		}
	}
	return total;
};

/**
 * finds all digits in an area code without any special characters
 * finds all digits in an area code when there are () present
 * finds all digits in an area code  when there are - present
 * @return {Number} [correct area code]
 */
var areaCode = function(str) {
	return str.match(/\d{3}/); // get first 3 digits
};

/**
 * adds a query param to a URL with no parameters
 * updates the current query params ID value in a URL
 * adds an additional parameter to a URL
 * @param {URL} [url]
 * @param {Parameter} [param]
 * @return {String URL} [with appropriate modifications]
 */
var adjustUrlParameter = function(url, param) {
	var regex = new RegExp(param.match(/(\w+)=\d+/), 'g');
	if (regex.test(url)) {
		return url.replace(/\w+=\d+/, param);
	} else if (/\?/.test(url)) {
		return url + "&" + param;
	} else {
		return url + "?" + param;
	}
};

/**
 * adds one to the value of a string that ends with a number
 * adds one to the value of a string that ends with a number 00999
 * adds one to the end of a string wherea letter is the last character
 * @param {String} [str] [what we're evaluating & modifying]
 * @return {String} [with appropriate modifications]
 */
var stringPlusPlus = function(str) {
	if (/\d/.test(str)) { // if there are digits in string
		var n = str.match(/\d+/);
		var nStr = toString(n+1);
		while (nStr.length !== n.length) {
			nStr = "0" + nStr;
		}
		str = str.replace(/\d+/, nStr);
		return str;
	} else {
		str += "1";
	}
};