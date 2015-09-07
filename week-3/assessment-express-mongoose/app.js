var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var chalk = require('chalk');
// var async = require('async');

var routes = require('./routes/index');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

// custom error handling to remove stack trace
app.use('/', function(err, req, res, next){
  console.log(chalk.magenta('      ' + err.message));
  res.status( err.status || 500 ).end();
});

module.exports = app;
