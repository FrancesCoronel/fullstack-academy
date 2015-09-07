var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
	firstName: String,
	lastName: String
});

module.exports = mongoose.model('Author', authorSchema);