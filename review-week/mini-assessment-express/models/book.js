var mongoose = require('mongoose');
var Chapter = require('./chapter');

var bookSchema = new mongoose.Schema({
	title: String,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
	chapters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'}]
});

bookSchema.methods.addChapter = function (chapterData) {
	var book = this;
	var chapter;
	return Chapter.create(chapterData)
	.then(function (c) {
		chapter = c;
		book.chapters.addToSet(c._id);
		return book.save();
	})
	.then(function () {
		return chapter;
	});
};

bookSchema.methods.removeChapter = function (chapter) {
	var book = this;
	return chapter.remove()
	.then(function () {
		book.chapters.pull(chapter);
		return book.save();
	});
};

module.exports = mongoose.model('Book', bookSchema);