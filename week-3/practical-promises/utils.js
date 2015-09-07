'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var chalk = require('chalk');

var utils = {};

utils.readFile = function (filename, callback) {
	var randExtraTime = Math.random() * 200;
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
};

utils.promisifiedReadFile = function (filename) {
	return new Promise(function (resolve, reject) {
		utils.readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

// utils.promisifiedWriteFile = function(filename, str) {
// 	return new Promise(function(resolve, reject) {
// 		utils.writeFile(filename, data, function(err, str) {
// 			if (err) reject(err);
// 			else resolve(str);
// 		});
// 	});
// };

utils.green = function (text) {
	console.log(chalk.green(text));
};

utils.red = function (text) {
	console.error(chalk.red(text));
};

module.exports = utils;