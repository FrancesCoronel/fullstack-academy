// function httpGetSync (filePath) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'http://localhost:8080' + filePath, false);
// 	xhr.send();
// 	return xhr.responseText;
// }

// function preloadTemplate (path) {
// 	return inject(function ($templateCache) {
// 		var response = httpGetSync(path);
// 		$templateCache.put(path, response);
// 	});
// }



// describe('view', function () {

// 	beforeEach(preloadTemplate('/app/todos/list/todo.list.html'));
// 	beforeEach(preloadTemplate('/app/todos/item/todo.item.html'));

// 	var todoListElem, recalculate;
// 	beforeEach(inject(function ($templateCache, $compile) {
// 		var template = $templateCache.get('/app/todos/list/todo.list.html');
// 		template = '<div><div ng-repeat="todo in todos">xxx</div>';
// 		template = '<div><todo-item ng-repeat="todo in todos | filter: {complete: filterByCompleted}" the-todo="todo"></todo-item></div>';
// 		recalculate = function () {
// 			var container = $compile(template)($scope);
// 			console.log('todos', $scope.todos);
// 			$scope.$digest();
// 			console.log('container', container);
// 			todoListElem = container//.find('.todo-list');
// 			console.log('elem', todoListElem);
// 			setTimeout(function () {
// 				console.log('!!!!!!!');
// 				console.log('container', container);
// 				console.log('!!!!!!!')
// 			}, 1000);
// 		};
// 		recalculate();
// 	}));

// 	it('list of todos filters by category', function () {
// 		// debugger;
// 		// expect(todoListElem.children().length).to.equal(3);
// 	});

// });