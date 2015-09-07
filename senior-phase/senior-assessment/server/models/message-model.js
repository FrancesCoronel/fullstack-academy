var mongoose = require('mongoose');
//var User = Promise.promisifyAll(mongoose.model("User"));

/**
 * Should exist
 * should have expected definitions for subject, body, from, and to
 * should default subjec to no subject
 * should require a body
 * should require a sender
 * should require a recipient
 */

var schema = new mongoose.Schema({
    subject: {
        type: String,
        default: "No Subject"
    },
    body: {
        type: String,
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

// SHOULD EXIST?

// Message.find = function() {

// };

// VALIDATIONS

// should default subject to "No Subject
// should require a body
// should require a sender (from)
// should require a recipient (to)
schema.path('subject').validate = function(value) {
    return value === "No subject";
};

schema.path('body').validate = function(value) {
    return value.kind === "required";
};

schema.path('from').validate = function(value) {
    return value.kind === "required";
};

schema.path('to').validate = function(value) {
    return value.kind === "required";
};

// FUNCTIONALITY

// should return a promise
// should resolve to all the messages sent by Bob
// should resolve to all the messages sent by Joan
// should have the full information of both the sender and receiver
schema.statics.getAllWhereSender = function(userId) {
    return this.find(userId)
        .populate({
            path: 'from',
            select: 'body',
            model: Message
        }).exec();
};

// METHODS

// should return the message but with a limited subject\ text based on a passed in number to determine its length
// should add an ellipses (...) after the truncated text if\true is passed as the second argument

schema.method('truncateSubject', function(args) {
    console.log("1st arg: " + arguments[0] + "2nd arg: " + arguments[1]);
    if (arguments[1]) return this.subject.substring(0, arguments[0]) + "...";
    else {
        return this.subject.substring(0, arguments[0]);
    }
    // return object
});

module.exports = mongoose.model('Message', schema);

module.exports = mongoose.model('Message', schema);
