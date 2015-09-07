'use strict';

var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/angular-assessment').connection;

db.on('open', function () {
	console.log('Database connection successfully opened');
});

db.on('error', function (err) {
	console.error('Database connection error', err);
});

module.exports = db;