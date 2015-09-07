var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();

var models = require('../models');

                                // GET /days
                                dayRouter.get('/', function(req, res, next) {
                                    console.log('duuude')
                                    // serves up all days as json
                                    models.Day.find().sort({number: 1}).populate("hotels restaurants thingsToDo")
                                            .exec(function(err, result){

                                                console.log(err)
                                                console.log(result)
                                                res.json(result)
                                            })
                                });
                                // POST /days
                                dayRouter.post('/', function(req, res, next) {
                                    // creates a new day and serves it as json
                                    models.Day.find().count(function(err, numDays){
                                            var newDay = new models.Day( {number: numDays+1} )
                                            newDay.save(function(err, dayObj){
                                                res.json(dayObj)
                                            })
                                        })
                                });
                                // GET /days/:id
                                // id refers to the day number
                                dayRouter.get('/:id', function(req, res, next) {
                                    // serves a particular day as json
                                    var id = req.param.id;
                                    models.Day.findById(id)
                                        .exec(function(err, day) {
                                            res.json(day)
                                        });
                                });
                                // DELETE /days/:id
                                dayRouter.delete('/:id', function(req, res, next) {
                                    // deletes a particular day
                                    var id = req.param.id;
                                    models.Day.remove( {number: id} )
                                    next();
                                });

                                dayRouter.use('/:id', attractionRouter);
                                // POST /days/:id/hotel
                                attractionRouter.post('/hotel', function(req, res, next) {
                                    // creates a reference to the hotel
                                    var id = req.param.id;
                                    models.Day.findOneAndUpdate({number: id},function(err, day){
                                        day.hotel = req.body.hotel;
                                        day.save();
                                        res.send();
                                    })
                                });
                                // DELETE /days/:id/hotel
                                attractionRouter.delete('/hotel', function(req, res, next) {
                                    // deletes the reference of the hotel
                                    var id = req.param.id;
                                    models.Day.findOneAndUpdate({number: id},function(err, day){
                                        day.hotel = undefined;
                                        day.save();
                                        res.send();
                                    })
                                });
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function(req, res, next) {
    // creates a reference to a restaurant
    var id = req.param.id;
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function(req, res, next) {
    // deletes a reference to a restaurant
    var id = req.param.id;
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function(req, res, next) {
    // creates a reference to a thing to do
    var id = req.param.id;
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function(req, res, next) {
    // deletes a reference to a thing to do
    var id = req.param.id;
});

module.exports = dayRouter;





