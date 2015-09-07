app.config(function($stateProvider) {
    $stateProvider.state('todos.detail', {
        url: '/:id',
        templateUrl: 'browser/app/todos/detail/todo.detail.html',
        controller: 'TodoDetailCtrl',
        resolve: {
            todo: function(Todo, $stateParams) {
                return Todo.getOne($stateParams.id);
            }
        }
    });
});
