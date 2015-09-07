'use strict';

var expect = chai.expect;

describe('Todo factory', function () {

	beforeEach(module('angularAssessment'));

	var $httpBackend;
	beforeEach(inject(function (_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	var Todo;
	beforeEach(inject(function (_Todo_) {
		Todo = _Todo_;
	}));

	it('.getOne fetches an existing todo', function (done) {
		$httpBackend.expect('GET', '/api/todos/xyz123').respond(200, {title: 'Thing'});
		Todo.getOne('xyz123')
		.then(function (todo) {
			expect(todo.title).to.equal('Thing');
		})
		.catch(done);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		done();
	});

	it('.getAll fetches all todos', function (done) {
		$httpBackend.expect('GET', '/api/todos').respond(200, [{}, {}, {}, {}]);
		Todo.getAll()
		.then(function (todos) {
			expect(todos).to.have.length(4);
		})
		.catch(done);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		done();
	});

	it('.destroy deletes an existing todo', function (done) {
		$httpBackend.expect('DELETE', '/api/todos/abc123').respond(204);
		Todo.destroy('abc123').catch(done);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		done();
	});

	it('.add creates a new todo', function (done) {
		$httpBackend.expect('POST', '/api/todos').respond(201, {title: 'ThingX', _id: '123'});
		Todo.add({title: 'ThingX'})
		.then(function (todo) {
			expect(todo._id).to.equal('123');
		})
		.catch(done);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		done();
	});

	it('.update updates an existing todo', function (done) {
		$httpBackend.expect('PUT', '/api/todos/def123').respond(200, {_id: 'def123', complete: true});
		Todo.update('def123', {complete: true})
		.then(function (todo) {
			expect(todo.complete).to.equal(true);
		})
		.catch(done);
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
		done();
	});

	// ------------
	// extra credit
	// ------------
	describe('cached todo list', function () {

		var cachedTodos;
		beforeEach(function (done) {
			$httpBackend.when('GET', '/api/todos')
			.respond(200, [
				{title: 'Thing1', _id: 'a1xxxxxxxxxxxxxxxxxxxxxx'},
				{title: 'Thing2', _id: 'b2xxxxxxxxxxxxxxxxxxxxxx'},
				{title: 'Thing3', _id: 'c3xxxxxxxxxxxxxxxxxxxxxx'}
			]);
			Todo.getAll().then(function (all) {
				cachedTodos = all;
			}).catch(done);
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
			done();
		});

		it('addition adds to cache', function (done) {
			var fakeObjFromBackend = {title: 'Thing4', _id: 'd4xxxxxxxxxxxxxxxxxxxxxx'};
			$httpBackend.when('POST', '/api/todos').respond(201, fakeObjFromBackend);
			Todo.add().catch(done);
			$httpBackend.flush();
			expect(cachedTodos.pop().title).to.equal('Thing4');
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
			done();
		});

		it('destruction deletes from cache', function (done) {
			var firstInCache = cachedTodos[0];
			$httpBackend.when('DELETE', '/api/todos/a1xxxxxxxxxxxxxxxxxxxxxx').respond(204);
			Todo.destroy('a1xxxxxxxxxxxxxxxxxxxxxx').catch(done);
			$httpBackend.flush();
			expect(cachedTodos).to.not.contain(firstInCache);
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
			done();
		});

	});

});