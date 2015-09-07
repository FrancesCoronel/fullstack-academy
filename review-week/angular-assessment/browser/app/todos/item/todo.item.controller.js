app.controller("TodoItemCtrl", function($scope, Todo, $state) {
  $scope.toggleComplete = function(){
    // if ($scope.theTodo.complete === true) {
    //   $scope.theTodo.complete = false;
    // } else {
    //   $scope.theTodo.complete = true;
    // }
    $scope.theToDo.complete = !$scope.theTodo.complete;
  };
  $scope.removeTodo = function(){
    Todo.destroy($scope.theTodo._id).then(function() {
      $state.go('todos');
    });
  };
});