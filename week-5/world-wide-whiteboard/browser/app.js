// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function() {
    console.log('I have made a persistent two-way connection to the server!');
});
// whiteboard.on('draw', function(start, end, strokeColor){
//     socket.emit("draw",start, end, strokeColor);
// });
// socket.on('draw',function(start, end, strokeColor){
//     window.whiteboard.draw(start,end,strokeColor);
// });
whiteboard.on('draw', function(start, end, strokeColor) {
    socket.emit('draw', start, end, strokeColor);
});

socket.on('everyone', function(start, end, strokeColor) {
    window.whiteboard.draw(start, end, strokeColor);
});

socket.on('init', function(start, end, strokeColor) {
    window.whiteboard.draw(start, end, strokeColor);
});

// var socket = io('/kitchen');
var kitchen = io.connect("/kitchen");
var turingHall = io.connect("/turing-hall");
var graceHopper = io.connect("/grace-hopper-atrium");
// kitchen.on("connection", function() {
//   console.log("hello");
// });
kitchen.on('kitchen', function() {
  console.log('Welcome to the kitchen.');
});

turingHall.on('kitchen', function() {
  console.log('Welcome to Turing Hall.');
});

graceHopper.on('kitchen', function() {
  console.log('Welcome to Grace Hopper.');
});