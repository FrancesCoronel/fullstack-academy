'use strict';

var mongoose = require('mongoose');

var db = require('../../db');

var Todo = new mongoose.Schema({
	complete: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		required: true
	},
	description: String
});

module.exports = db.model('Todo', Todo);