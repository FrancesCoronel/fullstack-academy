'use strict';

app.directive('ngEnter', ngEnterDirective = function() {
    // fill in here
    return {
        restrict: 'A',
        scope: {
            ngEnter: '&'
        },
        link: function(scope, elem, attrs) {
            elem.bind("keyPressEvent", function(event) {
                if (event.which === 13) {
                    scope.ngEnter();
                    return false;
                }
            });
        }
    };
});
