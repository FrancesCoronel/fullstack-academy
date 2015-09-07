var express = require('express');
var router = express.Router();
module.exports = router;

// WRITE SOME ROUTES HERE
// FEEL FREE TO SPLIT INTO MULTIPLE FILES AS NEEDED

var todos = require("../models/todos.js");

// to note: if you do not set the status code directly, it will default to '200' every time

// `/`
  // responds with empty array when app boots
  // responds with person after task has been added
router.get("/", function (req, res, next) {
  res.status(200).json(todos.listPeople());
});

// `/:person`
  // lists tasks for a user with a GET request
router.get("/:person", function (req, res, next) {
  res.status(200).json(todos.list(req.params.person));
});

  // adds to the person tasks list with a POST request
router.post("/:person", function (req, res, next) {
  res.status(201).json(todos.add(req.params.person, req.body));
});

// `/:person/:index`
  // marks a tasks as complete with a PUT request
router.put("/:person/:index", function (req, res, next) {
  res.status(201).json(todos.complete(req.params.person, req.params.index));
});

  // removes a task with a DELETE request
router.delete("/:person/:index", function (req, res, next) {
  res.status(201).json(todos.remove(req.params.person, req.params.index));
});