'use strict';

var app = require('./app/app'),
	db = require('./db');

var port = 8080;
var server = app.listen(port, function () {
	console.log('Server awaiting orders on port', port, 'ma\'am/sir');
});

module.exports = server;