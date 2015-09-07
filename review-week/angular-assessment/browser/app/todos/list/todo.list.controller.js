'use strict';

app.controller("TodoListCtrl", function($scope, todos, Todo, $state) {
            $scope.setCategory = function(category) {
                // $scope.category = category;
            };
            $scope.isActiveCategory = function(category) {
                return $scope.category === category;
            };
            $scope.addTodo = function() {
                Todo.add($scope.toAdd).then(function(createdToDo) {
                        $scope.toAdd = {};
                    }
                    $state.go('todos.edit');
                });
            };
})