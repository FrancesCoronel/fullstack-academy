app.config(function($stateProvider) {
    $stateProvider.state('todos', {
        url: '/todos',
        templateUrl: '/browser/app/todos/list/todo.list.html',
        controller: 'TodoListCtrl',
        resolve: {
            todo: function(Todo, $stateParams) {
                return Todo.getOne($stateParams.id);
            }
        }
    });
});
