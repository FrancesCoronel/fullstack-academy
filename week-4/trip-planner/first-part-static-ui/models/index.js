// requiring mongoose and connecting it
var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/trip-planner');

// creating a db variable
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

// Our Models
  // Place
  // Hotel
  // ThingToDo
  // Restaurant

/**
 * Place Schema
    * address
    * city
    * state
    * phone (string)
    * location (lat, lon number array)
 */
var placeSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number]
});

/**
 * Hotel Schema
     * name
     * place
     * num_stars (integer from 1-5)
     * amenities (comma delimited string list)
 */
var hotelSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  num_stars: {type: Number, min: 1, max: 5},
  amenities: String
});

/**
 * ThingToDo Schema
     * name
     * place
     * age_range (data-type string)
 */
var thingToDoSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  age_range: String
});

/**
 * Restaurant Schema
 * name
 * place
 * cuisine (comma delimited string list)
 * price (integer from 1-5 for how many dollar signs)
 */
var restaurantSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  cuisine: String,
  price: {type: Number, min: 1, max: 5}
});

// compiles schema

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

// exports

module.exports = {
  Place: Place,
  Hotel: Hotel,
  ThingToDo: ThingToDo,
  Restaurant: Restaurant
};