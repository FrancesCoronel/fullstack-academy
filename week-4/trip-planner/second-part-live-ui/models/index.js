// Make sue your `mongod` process is running!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trip-planner');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));

var placeSchema = new mongoose.Schema({
	address: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
	phone: {type: String, required: true},
	location: {type: [Number], required: true},
});

var hotelSchema = new mongoose.Schema({
	name: {type: String, required: true},
	place: {type: [placeSchema], required: true},
	num_stars: {type: Number, required: true, min: 1, max:5},
	amenities: {type: String, required: true},
});

var thingToDoSchema = new mongoose.Schema({
	name: {type: String, required: true},
	place: {type: [placeSchema], required: true},
	age_range: {type: String, required: true},
});

var restaurantSchema = new mongoose.Schema({
	name: {type: String, required: true},
	place: {type: [placeSchema], required: true},
	cuisine: {type: String, required: true},
	price: {type: Number, required: true, min:1, max:5},
});

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
	Place: Place,
	Hotel: Hotel,
	ThingToDo: ThingToDo,
	Restaurant: Restaurant
};
