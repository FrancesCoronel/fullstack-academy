'use strict';

var chance = require('chance')(123),
	_ = require('lodash'),
	Promise = require('bluebird');

var db = require('./server/db');
var Todo = require('./server/api/todos/todo.model');

var numTodos = 10;

function randTodo () {
	return new Todo({
		complete: chance.bool(),
		title: chance.word(),
		description: chance.paragraph()
	});
}

function generateAll () {
	return _.times(numTodos, randTodo);
}

function seed () {
	var todos = generateAll();
	return Promise.map(todos, function (todo) {
		return todo.save();
	});
}

db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));

db.on('open', function () {
	db.drop()
	.then(function () {
		return seed();
	})
	.then(function () {
		console.log('Seeding successful');
	}, function (err) {
		console.error('Error while seeding');
		console.error(err.stack);
	})
	.then(function () {
		process.exit();
	});
});