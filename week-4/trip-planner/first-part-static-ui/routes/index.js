var express = require('express');
var router = express.Router();

var Place = require('../models/index.js').Place;
var Restaurant = require('../models/index.js').Restaurant;
var Hotel = require('../models/index.js').Hotel;
var ThingToDo = require('../models/index.js').ThingToDo;

/* GET home page. */
router.get('/', function(req, res, next) {
  var arr = [Restaurant.find({}).exec(), Hotel.find({}).exec(), ThingToDo.find({}).exec()];
  Promise.all(arr)
  .then(function(data){
    res.render("index", {
      restaurants: data[0],
      hotels: data[1],
      things: data[2]
    });
  });
});

module.exports = router;