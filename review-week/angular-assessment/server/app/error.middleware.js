'use strict';

var middleware = require('composable-middleware')();
var HttpError = require('../utils/HttpError');

middleware.use(HttpError.middleware(404));

middleware.use(function (err, req, res, next) {
	err.status = err.status || 500;
	console.error(err.stack);
	res.status(err.status).send(err);
});

module.exports = middleware;