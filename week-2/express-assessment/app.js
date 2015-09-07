var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app; //this line is only used to make testing easier

// REMEMBER TO PLUGIN YOUR ROUTERS HERE!
var routes = require("./routes/");

// using bodyparser for JSON
app.use(bodyParser.json());

// GET request is made to the homepage
app.use("/", routes);

// app hosted on port 3000 of localhost
app.listen(process.env.PORT || 3000);