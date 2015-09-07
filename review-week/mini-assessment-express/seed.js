var models = require('./models'),
	Author = models.Author,
	Book = models.Book,
	Chapter = models.Chapter;
var async = require('async');
var chance = new require('chance')(123);
var _ = require('lodash');

var numAuthors = 20;
var numChapters = 400;
var chaptersPerBook = 10;
var numBooks = Math.ceil(numChapters / chaptersPerBook);

function randTitle () {
	return chance.sentence({
		words: chance.natural({min: 1, max: 6})
	}).slice(0, -1).replace(/\s\w/g, function (match) {
		return match.toUpperCase();
	});
}

function randAuthor () {
	return {
		firstName: chance.first(),
		lastName: chance.last()
	};
}

function randChapter () {
	return {
		title: randTitle(),
		text: chance.paragraph({
			sentences: chance.natural({min: 50, max: 200})
		})
	};
}

function randBook (n) {
	var auth = chance.pick(authors);
	var chaps = chapters.slice(n*chaptersPerBook, (n+1)*chaptersPerBook);
	chaps.forEach(function (chapter, idx) {
		chapter.number = idx + 1;
	});
	return {
		title: randTitle(),
		author: auth,
		chapters: chaps
	}
}

console.log('---seeding---');

console.log('-generating authors-');
var authors = _.times(numAuthors, randAuthor)
.map(function (datum) {
	return new Author(datum);
});
console.log('-done generating authors-');

console.log('-generating chapters-');
var chapters = _.times(numChapters, randChapter)
.map(function (datum) {
	return new Chapter(datum);
});
console.log('-done generating chapters-');

console.log('-generating books-');
var books = _.times(numBooks, randBook)
.map(function (datum) {
	return new Book(datum);
});
console.log('-done generating books-');

var all = books.concat(chapters).concat(authors);


console.log('-removing-')
async.each([Author, Book, Chapter],
	function (model, done) {
		model.remove({}, done);
	},
	function (err) {
		if (err) return console.error('error while removing documents', err);
		console.log('-done removing-');
		console.log('-saving-');
		async.each(all,
			function (doc, done) {
				doc.save(done);
			},
			function (err) {
				if (err) console.error('seed error', err);
				else console.log('-done saving-');
				console.log('---done seeding---');
				process.exit();
			}
		);
	}
);
