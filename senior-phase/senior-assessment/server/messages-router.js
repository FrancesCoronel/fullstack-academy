var express = require('express');
var router = express.Router();
var Message = require('./models/message-model');
module.exports = router;

/**
 * should be implemented using a subrouter mounted on /messages
 */

router.get('/messages', function(req, res) {
    Message.find(req.query).then(function(messages) {
        res.send(messages);
    }, function(err) {
        console.log(err);
        res.status(403).end();
    });
});

/**
 * should serve up all messages (with filled in references) to a specific user on GET /to/{{recipientId}}
 */

router.get('messages/to/:userId', function(req, res) {
    Message.findById(userId).exec()
        .then(function(messages) {
            req.json(messages);
        });
});

/**
 * should serve up all messages from a specific sender on GET /from/{{senderId}}\ and use the Message model static getAllWhereSender in the process
 */

router.get('messages/from/:userId', function(req, res) {
    Message.getAllWhereSender(userId).then(function(messages) {
        res.json(messages);
        res.status(200).end();
    });
});

/**
 * should add a new message on POST /, respond with 201 and created message
 */
router.post('messages', function(req, res) {
    Message.create(req.body)
        .then(function(message) {
            res.status(201).json(message);
        }, function(err) {
            console.log(err);
            res.send(err);
        });
});
