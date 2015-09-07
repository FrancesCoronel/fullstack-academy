var nodeStartingFunctionFileCode = require("./nodeStartingFunction");
nodeStartingFunctionFileCode.nodeStartingFunction();
var fs = require('fs');
fs.readFile('./file1.txt', function(err, data) {
    console.log(data);  // buffer object
    console.log(data.toString());
});





