'use strict';

var router = require('express').Router();
var _ = require('lodash');

var Todo = require('./todo.model');
var HttpError = require('../../utils/HttpError');

router.param('id', function (req, res, next, id) {
	Todo.findById(id).exec()
	.then(function (todo) {
		if (todo) {
			req.todo = todo;
			next();
		} else {
			throw HttpError(404);
		}
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	Todo.find({}).exec()
	.then(function (todos) {
		res.json(todos);
	})
	.then(null, next);
});

router.get('/:id', function (req, res, next) {
	res.json(req.todo);
});

router.post('/', function (req, res, next) {
	Todo.create(req.body)
	.then(function (todo) {
		res.status(201).json(todo);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	delete req.body._id;
	_.extend(req.todo, req.body);
	req.todo.save()
	.then(function (updatedTodo) {
		res.json(updatedTodo);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.todo.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;