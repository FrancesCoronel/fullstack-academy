var app = angular.module('FullstackMail', ['ui.router']);

app.config(function ($stateProvider) {

    $stateProvider.state('messageView', {
        url: '/message/:id',
        template: 'Message!'
    });

});