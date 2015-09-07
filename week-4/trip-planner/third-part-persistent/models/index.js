var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var placeSchema = new mongoose.Schema({
    address: String,
    city: String,
    state: String,
    phone: String,
    location: [Number]
});

var hotelSchema = new mongoose.Schema({
    name: String,
    place: [placeSchema],
    num_stars: {
        type: Number,
        min: 1,
        max: 5
    },
    amenities: String
});

var thingToDoSchema = new mongoose.Schema({
    name: String,
    place: [placeSchema],
    age_range: String
});

var restaurantSchema = new mongoose.Schema({
    name: String,
    place: [placeSchema],
    cuisine: String,
    price: {
        type: Number,
        min: 1,
        max: 5
    }
});

/**
 * To store data in the backend, we'll have to add a new model for "Day".
 * This model should be defined as follows:
 * Day
 * number - integer stating which day it is
 * hotel - An ObjectId corresponding to a specific hotel
 * restaurants - An array of restaurant ObjectIds
 * thingsToDo - An array of thingsToDo ObjectIds
 */
var daySchema = new mongoose.Schema({
    number: Number,
    hotels: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }],
    thingsToDo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ThingToDo'
    }]
});

module.exports = {
    Place: mongoose.model('Place', placeSchema),
    Hotel: mongoose.model('Hotel', hotelSchema),
    ThingToDo: mongoose.model('ThingToDo', thingToDoSchema),
    Restaurant: mongoose.model('Restaurant', restaurantSchema),
    // exporting Day Schema we defined above
    Day: mongoose.model('Day', daySchema)
};
