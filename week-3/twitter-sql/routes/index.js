var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');

module.exports = function(io) {
    router.get('/', function (req, res) {
        tweetBank.list(function(tweets) {
            res.render('index', {
                title: 'Twitter.js',
                tweets: tweets,
                showForm: true
            });
        });
    });

    router.get('/users/:name', function (req, res) {
        var name = req.params.name;

        tweetBank.find({
            name : name
        }, function(tweets) {
            res.render('index', {
                title: 'Twitter.js - Posts by ' + name,
                tweets: tweets
            });
        });
    });

    router.get('/users/:name/tweets/:id', function (req, res) {
        var name = req.params.name;
        var id = parseInt(req.params.id, 10);

        tweetBank.find({
            name : name,
            "Tweet.id" : id
        }, function(tweets) {
            res.render('index', {
                title: 'Twitter.js - Tweet by ' + name,
                tweets: tweets
            });
        });
    });

    router.post('/submit', function(req, res) {
        var name = req.body.name;
        var text = req.body.text;

        tweetBank.add(name, text, function(tweet) {
            if (tweet) {
                io.sockets.emit('new_tweet', { /* tweet info */ });
                res.redirect('/');
            }
        });
    });

    return router;
};