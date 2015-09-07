var express = require('express');
var router = express.Router();
var User = require('./models/user-model');
module.exports = router;

/**
 * should be implemented using a subrouter mounted on /users
 */

router.param('userId', function(req, res, next, userId) {
    User.findById(userId).exec()
        .then(function(user) {
            if (!user) throw new Error("User doesn't exist.");
            else {
                req.user = user;
                next();
            }
        })
        .then(null, next);
});

/**
 * should serve up all users on request to GET /
 */

router.get('/users', function(req, res) {
    User.find(req.query).then(function(users) {
        res.send(users);
        res.status(200).end();
    }, function(err) {
        console.log(err);
        res.status(403).end();
    });
});

/**
 * should update a user at PUT /{{usersId}}, send a 201 response
 */

router.put('/:userId', function(req, res, next) {
    req.user.save()
        .then(function(savedUser) {
            res.json(savedUser);
            res.status(201).end();
        }).then(null, next);
});