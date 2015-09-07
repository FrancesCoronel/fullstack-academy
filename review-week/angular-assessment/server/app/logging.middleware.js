'use strict';

var middleware = require('composable-middleware')(),
	logger = require('morgan');

middleware.use(logger('dev'));

module.exports = middleware;