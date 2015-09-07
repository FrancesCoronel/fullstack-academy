'use strict'; 

var path = require('path');

var app = require('express')();

app.use(require('cors')());

app.use(require('./logging.middleware'));

app.use(require('./statics.middleware'));

app.use(require('./request-state.middleware'));

app.use('/api', require('../api/api.router'));

var pathToIndex = path.join(__dirname, '..', '..', 'public', 'index.html');
['/todos', '/todos/:id', '/todos/:id/edit'].forEach(function (frontendRoute) {
	app.get(frontendRoute, function (req, res, next) {
		res.sendFile(pathToIndex);
	});
});

app.use(require('./error.middleware'));

module.exports = app;