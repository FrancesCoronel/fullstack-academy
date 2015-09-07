var express = require('express');
var app = express();
var path = require('path');

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
});

// should serve up index.html

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// should static serve node_modules directory
app.use(express.static(path.join(__dirname, '../node_modules')));

//app.use(require('messages-router.js'));
//app.user(require('user-router.js'));

//require('./models');

module.exports = app;