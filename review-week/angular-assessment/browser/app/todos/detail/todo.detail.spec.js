'use strict';

var expect = chai.expect;

describe('Todo detail', function () {

	beforeEach(module('angularAssessment'));

	describe('state', function () {

		var $state;
		beforeEach(inject(function (_$state_) {
			$state = _$state_;
		}));

		it('url compiles correctly', function () {
			var url = $state.href('todos.detail', {id: '123'});
			expect(url).to.equal('/todos/123');
		});

		it('resolves with given todo', function () {
			var Todo = {getOne: chai.spy(function (id) {
				return {_id: id};
			})};
			var todoDetailState = $state.get('todos.detail');
			var fn = todoDetailState.resolve.todo;
			expect(fn).to.be.a('function');
			var result = fn(Todo, {id: '123'});
			expect(Todo.getOne).to.have.been.called.once;
			expect(result).to.eql({_id: '123'});
		});

	});

});