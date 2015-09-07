'use strict';

var expect = chai.expect;

// if you are curious how this is being used, check out line 6 of todo.item.html
describe('ng-enter directive', function () {

	beforeEach(module('angularAssessment'));

	var ddo;
	before(function () {
		ddo = ngEnterDirective();
	});

	it('is an attribute directive', function () {
		expect(ddo.restrict).to.equal('A');
	});

	it('has isolate scope', function () {
		expect(ddo.scope).to.be.truthy;
	});
	
	it('accepts its namesake parameter as an expression', function () {
		expect(ddo.scope).to.be.an('object');
		expect(ddo.scope.ngEnter).to.equal('&');
	});

	it('triggers expression evaluation upon "enter" keypress', function () {
		inject(function ($compile, $rootScope) {
			var scope = $rootScope.$new();
			scope.doSomething = chai.spy();
			var element = $compile('<div ng-enter="doSomething()"></div>')(scope);
			var keyPressEvent = angular.element.Event('keydown');
			keyPressEvent.which = 13;
			element.trigger(keyPressEvent);
			expect(scope.doSomething).to.have.been.called.once;
		});
	});
	
});