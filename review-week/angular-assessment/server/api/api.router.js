'use strict';

var router = require('express').Router();

router.use('/todos', require('./todos/todo.router'));

module.exports = router;