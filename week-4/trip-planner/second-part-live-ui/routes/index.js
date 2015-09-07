var express = require('express');
var router = express.Router();

var dbs = require('../models');
var Place = dbs.Place;
var Hotel = dbs.Hotel;
var Restaurant = dbs.Restaurant;
var ThingToDo = dbs.ThingToDo;

var APIkey = require('../mapsAPI.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	Promise.all([Hotel.find().exec(), Restaurant.find().exec(), ThingToDo.find().exec()])
		.then(function(data) {
			res.render('index', {
				hotels: data[0],
				restaurants: data[1],
				thingsToDo: data[2],
				APIkey: APIkey
			});
		});
});

module.exports = router;