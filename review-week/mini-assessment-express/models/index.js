var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library-dev');
mongoose.connection.on('error', console.error.bind(console, 'database connection error'));

var Author = require('./author');
var Book = require('./book');
var Chapter = require('./chapter');

module.exports = {
	Author: Author,
	Book: Book,
	Chapter: Chapter
};