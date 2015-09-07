'use strict';

var Promise = require('bluebird');
var async = require('async');
var exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile;
var promisifiedReadFile = exerciseUtils.promisifiedReadFile;

var green = exerciseUtils.green;
var red = exerciseUtils.red;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * A. log poem two stanza one and stanza two, in any order
 *    but log 'done' when both are done
 *
 */

// callback version
// async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
// 	function (filename, eachDone) {
// 		readFile(filename, function (err, stanza) {
// 			console.log('-- A. callback version --');
// 			green(stanza);
// 			eachDone();
// 		});
// 	},
// 	function (err) {
// 		console.log('-- A. callback version done --');
// 	}
// );

// promise version

// promisifiedReadFile('poem-two/stanza-01.txt')
// .then(function(stanza3) {
// 	console.log(stanza3.toString());
// })

// promisifiedReadFile('poem-two/stanza-02.txt')
// .then(function(stanza4) {
// 	console.log(stanza4.toString());
// 	console.log('done');
// })

// .then(null, function(err) {
// 	console.log(err);
// })

// var printStanza1 = promisifiedReadFile('poem-two/stanza-01.txt')
// .then(function success1 (stanza1) {
// 	console.log(stanza1.toString());
// });

// var printStanza2 = promisifiedReadFile('poem-two/stanza-02.txt')
// .then(function success2 (stanza2) {
// 	console.log(stanza2.toString());
// });

// Promise.all([printStanza1, printStanza2])
// .then(function() {
// 	console.log("done");
// }, function(err) {
// 	console.log(err);
// });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * B. log all the stanzas in poem two, in any order
 *    and log 'done' when they're all done
 *
 */

// var filenames = [1,2,3,4,5,6,7,8].map(function (n) {
// 	return 'poem-two/' + 'stanza-0' + n + '.txt';
// });

// // callback version
// async.each(filenames,
// 	function (filename, eachDone) {
// 		readFile(filename, function (err, stanza) {
// 			console.log('-- B. callback version --');
// 			green(stanza);
// 			eachDone();
// 		});
// 	},
// 	function (err) {
// 		console.log('-- B. callback version done --');
// 	}
// );

// promise version

// var fileNames = [1,2,3,4,5,6,7,8].map(function(n) {
// 	return 'poem-two/stanza-0' + n + '.txt';
// });

// var promisesArray = fileNames.map(function(fileName) {
// 	return promisifiedReadFile(fileName)
// 	.then(function(contents) {
// 			console.log(contents.toString());
// 	});
// });

// Promise.all(promisesArray)
// .then(function() {
// 	console.log("done");
// }, function(err) {
// 	console.log(err);
// });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * C. log all the stanzas in poem two, *in order*
 *    and log 'done' when they're all done
 *
 */

// callback version
// async.eachSeries(filenames,
// 	function (filename, eachDone) {
// 		readFile(filename, function (err, stanza) {
// 			console.log('-- C. callback version --');
// 			green(stanza);
// 			eachDone();
// 		});
// 	},
// 	function (err) {
// 		console.log('-- C. callback version done --');
// 	}
// );

// promise version

// var fileNames = [1,2,3,4,5,6,7,8].map(function(n) {
// 	return 'poem-two/stanza-0' + n + '.txt';
// });

// var promisesArray = fileNames.map(function(fileName) {
// 	return promisifiedReadFile(fileName);
// });

// Promise.each(promisesArray, function (stanza) {
// 	console.log(stanza.toString());
// })
// .then(function() {
// 	console.log("done");
// }, function(err) {
// 	console.log(err);
// });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * D. log all the stanzas in poem two, *in order*
 *    making sure to fail for any error and log it out
 *    and log 'done' when they're all done
 *
 */

// var randIdx = Math.floor(Math.random() * fileNames.length);
// fileNames[randIdx] = 'wrong-file-name.txt';

// callback version
// async.eachSeries(filenames,
// 	function (filename, eachDone) {
// 		readFile(filename, function (err, stanza) {
// 			console.log('-- D. callback version --');
// 			if (err) return eachDone(err);
// 			green(stanza);
// 			eachDone();
// 		});
// 	},
// 	function (err) {
// 		if (err) red(err);
// 		console.log('-- D. callback version done --');
// 	}
// );

// promise version

// var fileNames = [1,2,3,4,5,6,7,8].map(function(n) {
// 	return 'poem-two/stanza-0' + n + '.txt';
// });

// var randIdx = Math.floor(Math.random() * fileNames.length);
// fileNames[randIdx] = 'wrong-file-name.txt';

// var promisesArray = fileNames.map(function(fileName) {
// 	return promisifiedReadFile(fileName);
// });

// Promise.each(promisesArray, function (stanza) {
// 	console.log(stanza.toString());
// })
// .then(function() {
// 	console.log("done");
// }, function(err) {
// 	console.log(err);
// });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * E. make a promisifed version of fs.writeFile
 *
 */

var fs = require('fs');

function promisifiedWriteFile (filename, str) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(filename, str, function(err) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

promisifiedWriteFile("poem-two/stanza-09.txt", "lololo");

// utils.promisifiedReadFile = function (filename) {
// 	return new Promise(function (resolve, reject) {
// 		utils.readFile(filename, function (err, str) {
// 			if (err) reject(err);
// 			else resolve(str);
// 		});
// 	});
// };