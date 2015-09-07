'use strict';

app.factory('Todo', function($http) {

  var todoCache = [];

    function Todo(props) {
      angular.extend(this, props);
    }

    Todo.url = '/api/todos/';

    Object.defineProperty(Todo.prototype, 'url', {
        get: function() {
            return Todo.url + this._id;
        }
    });

    Todo.prototype.getOne = function(id) {
        return $http.get(this.url + id).then(function(response) {
            return new Todo(response.data);
        });
    };

    Todo.getAll = function() {
      return $http.get(Todo.url).then(function(response) {
        return response.data.map(function (obj) {
          return new Todo(obj);
        }).then(function(todos) {
          todoCache = todos;
          return todos;
        });
      });
    };

    Todo.prototype.destroy = function(id) {
      return $http.delete(this.url + id).then(function(response) {
        return new Todo(response.data);
      }).then(function(data) {
        var filtered = todoCache.filter(function(todo) {
          return todo._id != id;
        });
        angular.copy(filtered, todoCache);
        return data;
      });
    };

    Todo.prototype.add = function() {
      return $http.post(this.url).then(function(response) {
        return new Todo(response.data);
      }).then(function(createdToDo) {
        todoCache.push(createdToDo);
        return createdToDo;
      });
    };

    Todo.prototype.update = function(id) {
      return $http.put(this.url + id).then(function(response) {
        return new Todo(response.data);
      });
    };

    return Todo;
});