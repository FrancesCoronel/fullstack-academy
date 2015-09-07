'use strict';

var http = require('http');

function HttpError (status, message) {
	var err = new Error(message || http.STATUS_CODES[status]);
	err.status = status;
	err.__proto__ = HttpError.prototype;
	return err;
}

HttpError.middleware = function () {
	var err = HttpError.apply(null, arguments);
	return function (req, res, next) {
		next(err);
	};
};

HttpError.prototype = Object.create(Error);
HttpError.prototype.contrusctor = HttpError;

module.exports = HttpError;