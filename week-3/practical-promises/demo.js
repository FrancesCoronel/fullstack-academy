'use strict';

var fs = require('fs');
var promisifiedReadFile = require('./utils').promisifiedReadFile;

var filepath = 'demo-poem.txt';

// // synchronous
// console.log('...synchronous...');
// console.log('- I am first -');
// try {
// 	var contents = fs.readFileSync(filepath)
// 	console.log(contents.toString());
// } catch (err) {
// 	console.error(err);
// }
// console.log('- I am last -');

// // async with callbacks
// console.log('...asynchronous with callbacks...');
// fs.readFile(filepath, function (err, contents) {
// 	if (err) console.error(err);
// 	else console.log(contents.toString());
// 	console.log('- I am last -');
// });
// console.log('- I am first -');

// // async with promises
// console.log('...asynchronous with promises...');
// promisifiedReadFile(filepath)
// .then(function (contents) {
// 	console.log(contents.toString());
// }, function (err) {
// 	console.error(err);
// })
// .then(function () {
// 	console.log('- I am last -')
// });
// console.log('- I am first -');