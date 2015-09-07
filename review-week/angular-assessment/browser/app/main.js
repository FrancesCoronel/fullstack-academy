'use strict';

var app = angular.module('angularAssessment', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
});

// globals needed for the specs - don't delete!
var todoItemDirective = function () {};
var ngEnterDirective = function () {};

// these are simply defined here to reduce the number of
// initial errors in the specs when starting out
// you can ignore these if you wish
app.factory('Todo', function () {return {}});
app.controller('TodoListCtrl', function () {});
app.controller('TodoItemCtrl', function () {});
app.directive('todoItem', function () {return {}});
app.controller('TodoDetailCtrl', function () {});
app.controller('TodoEditCtrl', function () {});
app.directive('ngEnter', function () {return {}});