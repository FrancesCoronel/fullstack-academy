'use strict';

var Promise = require('bluebird');
var exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile;
var promisifiedReadFile = exerciseUtils.promisifiedReadFile;

var green = exerciseUtils.green;
var red = exerciseUtils.red;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * A. log poem one stanza one
 *
 */

// callback version
// readFile('poem-one/stanza-01.txt', function (err, stanza) {
// 	console.log('-- A. callback version --');
// 	green(stanza);
// });

// promise version

// promisifiedReadFile('poem-one/stanza-01.txt')
// .then(function(stanza) {
// 		// console.log(stanza.toString());
// 		green(stanza);
// });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * B. log poem one stanza two and three, in any order
 *
 */

// callback version
// readFile('poem-one/stanza-02.txt', function (err, stanza2) {
// 	console.log('-- B. callback version (stanza two) --');
// 	green(stanza2);
// });
// readFile('poem-one/stanza-03.txt', function (err, stanza3) {
// 	console.log('-- B. callback version (stanza three) --');
// 	green(stanza3);
// });

// promise version

// promisifiedReadFile('poem-one/stanza-02.txt')
// .then(function(contents) {
// 	// console.log(contents.toString());
// 	green(contents);
// });

// promisifiedReadFile('poem-one/stanza-03.txt')
// .then(function(contents) {
// 	// console.log(contents.toString());
// 	green(contents);
// });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * C. log poem one stanza two and *then* stanza three
 *    log 'done' when both are done
 *
 */

// callback version
// readFile('poem-one/stanza-02.txt', function (err, stanza2) {
// 	console.log('-- C. callback version (stanza two) --');
// 	green(stanza2);
// 	readFile('poem-one/stanza-03.txt', function (err, stanza3) {
// 		console.log('-- C. callback version (stanza three) --');
// 		green(stanza3);
// 		console.log('-- C. callback version done --');
// 	});
// });

// promise version

// promisifiedReadFile('poem-one/stanza-02.txt')
// .then(function(stanza2) {
// 		// console.log(stanza2.toString());
// 		green(stanza2);
// 		return promisifiedReadFile('poem-one/stanza-03.txt');
// })
// .then(function(stanza3) {
// 	// console.log(stanza3.toString());
// 	green(stanza3);
// 	console.log("done");
// });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * D. log poem one stanza four or an error if it occurs
 *
 */

// callback version
// readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
// 	console.log('-- D. callback version (stanza four) --');
// 	if (err) red(err);
// 	else green(stanza4);
// });

// promise version

// promisifiedReadFile('poem-one/wrong-file-name.txt')
// // .finally(function() {
// // 	console.log(' -- D. promise version (stanza four) -- ')
// // })
// .then(function(stanza4) {
// 	console.log(stanza4.toString());
// }, function(err) {
// 	console.log(err);
// });

// // alternative solution

// promisifiedReadFile('poem-one/stanza-04.txt')
// finally will print out whatever is in function regardless of end result
// .finally(function() {
// 	console.log('D - Promise Version');
// })
// .then(green);
// .catch(red);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * E. log poem one stanza three and *then* stanza four
 *    or log an error if it occurs for either file read
 *
 */

// callback version
// readFile('poem-one/stanza-03.txt', function (err, stanza3) {
// 	console.log('-- E. callback version (stanza three) --');
// 	if (err) return red(err);
// 	green(stanza3);
// 	readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
// 		console.log('-- E. callback version (stanza four) --');
// 		if (err) return red(err);
// 		green(stanza4);
// 	});
// });

// promise version

promisifiedReadFile('poem-one/stanza-03.txt')
.then(function(stanza3) {
	console.log(stanza3.toString());
	return promisifiedReadFile('poem-one/wrong-file-name.txt');
})
.then(function(stanza4) {
	console.log(stanza4.toString());
}), function(err) {
	console.log(err);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * F. log poem one stanza three and *then* stanza four
 *    or log an error if it occurs for either file read
 *    always log 'done' when everything is done
 *
 */

// callback version
// readFile('poem-one/stanza-03.txt', function (err, stanza3) {
// 	console.log('-- F. callback version (stanza three) --');
// 	if (err) {
// 		red(err);
// 		console.log('-- F. callback version done --');
// 		return;
// 	}
// 	green(stanza3);
// 	readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
// 		console.log('-- F. callback version (stanza four) --');
// 		if (err) red(err);
// 		else green(stanza4);
// 		console.log('-- F. callback version done --');
// 	});
// });

// promise version

promisifiedReadFile('poem-one/stanza-03.txt')
.then(function(stanza3) {
	console.log(stanza3.toString());
	return promisifiedReadFile('poem-one/wrong-file-name.txt');
})
.then(function(stanza4) {
	console.log(stanza4.toString());

})
.then(null, function(err) {
	console.log('done');
	console.log(err);
})