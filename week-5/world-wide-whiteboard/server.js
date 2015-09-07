var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);

server.listen(1337, function() {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var socketio = require("socket.io");
var io = socketio(server);

var boards = [];

io.on('connection', function(socket) {
    // This function receives the newly connected socket.
    // This function will be called for EACH browser that connects to our server.
    console.log('A new client has connected!');
    console.log(socket.id);
    // boards.forEach(function(user) {
    //   socket.emit('draw', user.start, user.end, user.strokeColor);
    // });
    // socket.on('draw', function ( start, end, strokeColor) {
    //   boards.push( {
    //     start: start,
    //     end: end,
    //     strokeColor: strokeColor
    //   });
    //   socket.broadcast.emit('draw', start, end, strokeColor);
    // });
    for (var i = 0; i < boards.length; i++) {
        socket.emit('init', boards[i][0], boards[i][1], boards[i][2]);
    }
    socket.on("disconnect", function() {
        console.log('A client has disconnected.');
    });
    socket.on('draw', function(start, end, strokeColor) {
        boards.push([start, end, strokeColor]);
        socket.broadcast.emit('everyone', start, end, strokeColor);
    });
});

app.get('/kitchen', function(req, res) {
    var kitchen = io.of('/kitchen');
    kitchen.on('connection', function() {
        console.log('someone connected to the kitchen');
    });
    kitchen.emit('draw', 'everyone!');
});

app.get('/turing-hall', function(req, res) {
    // var turingHall = io.of('/turing-hall');
    var turingHall = io.of('/turing-hall');
    turingHall.on('connection', function() {
        console.log('someone connected to the turing hall');
    });
    turingHall.emit('draw', 'everyone!');
});

app.get('/grace-hopper-atrium', function(req, res) {
    var graceHopper = io.of('/grace-hopper-atrium');
    graceHopper.on('connection', function() {
        console.log('someone connected to the turing hall');
    });
    graceHopper.emit('draw', 'everyone!');
});
