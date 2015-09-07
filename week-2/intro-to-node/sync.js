// console.log("Node starting...");
// var greeter = require('./greeter');
// greeter.greet('Frank');
// greeter.shout('Frank');
// var fs = require('fs');
// // console.log(fs.readFileSync('./file1.txt', 'utf8'));
// fs.readFile('./file1.txt', 'utf8', function(err, data) {
// 	console.log(data);
// 	// console.log(data.toString());
// });

var buffer = '';
var fs = require('fs');
fs.readFile('./file1.txt', function(err, data) {
     buffer = data.toString();  // buffer object
});
setTimeout(function() {
	console.log(buffer);
}, 100);
