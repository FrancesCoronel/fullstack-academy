var mongoose = require('mongoose');

/**
 * Should Exist
 * Should Have expected schema definition
 * Should require email
 */

function find() {

}

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('User', schema);