'use strict';

app.directive('todoItem', todoItemDirective = function($state, $rootScope) {
    // fill in here
    return {
        restrict: 'E',
        templateUrl: '/browser/app/todos/item/todo.item.html',
        scope: {
            theTodo: '='
        },
        controller: 'TodoItemCtrl',
        link: function(scope, elem, attrs) {}
    };
});
