var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/sinon/pkg/sinon.js',
        'browser/app.js',
        'browser/**/*',
        'tests/browser/**/*.js'
    ];

    var excludeFiles = [
        'tests/browser/karma.conf.js'
    ];

    var configObj = {
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        basePath: path.join(__dirname, '../../'),
        files: filesCollection,
        exclude: excludeFiles,
        preprocessors: {
            'browser/directives/message.html': ['ng-html2js'],
        }
    };

    config.set(configObj);

};