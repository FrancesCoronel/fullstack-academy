var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	swig = require('swig'),
	sassMiddleware = require('node-sass-middleware'),
    // Requiring'routes/day.js'
    days = require('./routes/days');

var app = express();

// set up rendering with swig
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

// log and body parse
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// sass middleware
app.use(
    sassMiddleware({
        src: __dirname + '/assets',
        dest: __dirname + '/public',
        debug: true
    })
);

// serve static files
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

// serve root
app.use('/', require('./routes'));

// Plugging in 'routes/days.js'
// console.log(days);
app.use("/days", days);
//app.use("/days", days.attractionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render('error', {
    	error: err
    });
});

// listen on a port
var port = 3000;
app.listen(port, function () {
	console.log('The server is listening closely on port', port);
});