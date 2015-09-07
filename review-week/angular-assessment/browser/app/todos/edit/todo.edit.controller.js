app.controller("TodoEditCtrl", function($scope, Todo, $state, todo) {
    $scope.todo = todo;
    $scope.keepChanges = function() {
        Todo.update($scope.todo._id, {
            description: $scope.todo.description
        }).then(function() {
          $state.go('todos.detail');
        });
    };
});
