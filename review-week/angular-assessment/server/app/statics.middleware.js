'use strict';

var express = require('express'),
	middleware = require('composable-middleware')(),
	path = require('path');

var rootPath = path.join(__dirname, '..', '..');

var publicPath = path.join(rootPath, 'public');
middleware.use(express.static(publicPath));

var browserPath = path.join(rootPath, 'browser');
middleware.use(express.static(browserPath));

var bowerPath = path.join(rootPath, 'bower_components');
middleware.use(express.static(bowerPath));

module.exports = middleware;