var mongoose = require('mongoose');

var chapterSchema = new mongoose.Schema({
	title: String,
	number: Number,
	text: String
});

module.exports = mongoose.model('Chapter', chapterSchema);