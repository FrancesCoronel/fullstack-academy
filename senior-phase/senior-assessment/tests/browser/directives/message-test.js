describe('<message> directive', function () {

    beforeEach(module('FullstackMail', 'browser/directives/message.html'));

    var $compile, $rootScope, directiveDefinition, parentScope;
    beforeEach('Get tools', inject(function (_$compile_, _$rootScope_, $templateCache, messageDirective) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        directiveDefinition = messageDirective[0];
        parentScope = $rootScope.$new();
    }));

    xit('should be an element directive that uses\
        browser/directives/message.html as its templateUrl', function () {
        expect(directiveDefinition.restrict).to.be.equal('E');
        expect(directiveDefinition.templateUrl).to.be.equal('browser/directives/message.html');
    });

    describe('functionality', function () {

        beforeEach(function () {

            parentScope.theMessage = {
                _id: '5u2oijdlskf',
                from: {
                    email: 'instructors@fullstackacademy.com'
                },
                to: {
                    email: 'you@gmail.com'
                },
                subject: 'Hey, just wanted to let you know . . .',
                body: 'You\'re doing a great job and I realize this stuff is really tough and confusing, but I believe in you. You are awesome!'
            };

        });

        var directiveElement;
        beforeEach('Compile an instance of the directive', function () {
            var html = '<message email-message="theMessage"></message>';
            directiveElement = $compile(html)(parentScope);
            $rootScope.$digest();
        });

        // Reference the html in the above beforeEach for more information.
        xit('should use isolate scope that sets "emailMessage" from the parent scope', function () {
            var directivesIsolateScope = directiveElement.isolateScope();
            expect(directivesIsolateScope).to.be.an('object');
            expect(directivesIsolateScope.emailMessage).to.be.equal(parentScope.theMessage);
        });

        // IMPORTANT NOTE: ui-sref will not work here. Try something else.
        // HINT: Look at the template for this directive.
        xit('should go to a state called "messageView" with the message\'s _id as the $stateParams.id\
            when the full messages div is clicked', function (done) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                expect(toState.name).to.be.equal('messageView');
                expect(toStateParams.id).to.be.equal(parentScope.theMessage._id);
                done();
            });

            $(directiveElement).children('div').eq(0).triggerHandler('click');

        });

    });



});