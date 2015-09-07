'use strict'; 

var middleware = require('composable-middleware')(),
	bodyParser = require('body-parser');

middleware.use(bodyParser.json());
middleware.use(bodyParser.urlencoded({extended: false}));

module.exports = middleware;