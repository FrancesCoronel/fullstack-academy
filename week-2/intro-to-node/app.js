// // for (var i = 2; i < process.argv.length; i++) {
// // 	console.log(process.argv[i]);
// // }
// // // console.log(process.argv);

// console.log("Node starting...");
// var buffer = '';
// var fs = require('fs');
// fs.readFile('./file1.txt', function(err, data) {
//      buffer = data.toString();  // buffer object
//      console.log(buffer);
// });

// fs.watchFile('./file1.txt', {
// 	interval:10
// }, function(prev, curr) {
//   console.log('updated file');
//   console.log(fs.readFileSync('./file1.txt', 'utf8'));
//   console.log(curr);
//   // display an update was made, then console.log the new updated file!
// });

// /**
//  * This utility will walk you through creating a package.json file.
//  * It only covers the most common items, and tries to guess sensible defaults.
//  * See `npm help json` for definitive documentation on these fields
// and exactly what they do.
// Use `npm install <pkg> --save` afterwards to install a package and save it as a dependency in the package.json file.
//  */

var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var ejs = require('ejs');

// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
var filenames = Array.prototype.slice.call(process.argv, 2);
console.log(filenames);

// create the express app
var app = express();

// connect the Morgan logging middleware to our app
app.use( logger('dev') ); // predefined format of dev

// start a server listening on port 1234
app.listen( 1234 );

// support for templating enjine in ejs
app.set('view engine', 'ejs');

// when someone requests http://localhost:1234/, run the callback
// function listed here and respond with the data
// we call this the "/" (or "Root") route.

// you cannot use a for loop because you can only have 1 `response.send()` statement

// app.get("/", function(request, response) {
// 	fs.readFile(filenames[0], function(err, data) {
// 		if (err) return console.log(err);
// 		response.send('<pre>' + data.toString() + '</pre>');
// 	});
// });

app.get('/', function (request, response) {

  var mapFilenamesToContent = function(...) {
    // your code here, and in parameter list above
  };

  async.map(filenames, mapFilenamesToContent, function (err, results) {
    if (err) console.log('async.map error:', err);
    response.send( '<pre>' + results.join("\n\n") + '</pre>' );
  });

});

async.map(fileNames, )