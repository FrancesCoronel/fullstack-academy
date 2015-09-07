var express = require('express');
var socketio = require('socket.io');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var sequelize = require('sequelize');
var swig = require('swig');
var app = express();
var server = app.listen(3000);

var io = socketio.listen(server);

swig.setDefaults({ cache: false });

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require('./routes');
app.use('/', router(io));