app.config(function($stateProvider) {
  $stateProvider.state('todos.edit', {
    url: '/:id',
    templateUrl: '/browser/app/todos/edit/todo.edit.html',
    controller: 'TodoEditCtrl',
    resolve: {
      todos: function(Todo) {
        return Todo.getAll();
      }
    }
  });
});