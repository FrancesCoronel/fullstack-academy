describe('NewMessageController', function () {

    beforeEach(module('FullstackMail'));

    var $rootScope;
    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    var MessagesFactory;
    beforeEach('Create MessagesFactory mock', inject(function ($q) {

        // MessagesFactory, when injected into the controller,
        // will expose a .sendMessage method that is a mocked
        // sinon function
        MessagesFactory = {
            sendMessage: sinon.stub()
        };

        // When this method gets called, it will return a promise
        // that resolves to the passed in object.
        MessagesFactory.sendMessage.returns($q.when({
            from: {email: 'joe@gmail'},
            to: {email: 'you@gmail'},
            body: 'Hello there!'
        }));

    }));

    var controllersScope;
    beforeEach(inject(function ($controller) {
        controllersScope = $rootScope.$new();
        $controller('NewMessageController', {
            $scope: controllersScope,
            MessagesFactory: MessagesFactory
        });
    }));

    describe('initalization', function () {

        xit('should put on $scope.messages an empty array', function () {
            expect(controllersScope.messages).to.be.an('array');
            expect(controllersScope.messages.length).to.be.equal(0);
        });

        xit('should put on $scope.submitMessage a function', function () {
            expect(controllersScope.submitMessage).to.be.a('function');
        });

    });

    describe('submitMessage function when invoked', function () {

        xit('should call MessagesFactory.sendMessage with $scope.currentMessage', function () {
            controllersScope.currentMessage = {body: 'Hey! Listen!'};
            controllersScope.submitMessage();
            expect(MessagesFactory.sendMessage.calledWith(controllersScope.currentMessage)).to.be.equal(true);
        });

        xit('should use the resolved value from MessagesFactory.sendMessage\
            and add it to the messages array', function () {
            controllersScope.currentMessage = {body: 'Hullllooooo'};
            controllersScope.submitMessage();
            $rootScope.$digest();
            expect(controllersScope.messages.length).to.be.equal(1);
            expect(controllersScope.messages[0]).to.be.deep.equal({
                from: {email: 'joe@gmail'},
                to: {email: 'you@gmail'},
                body: 'Hello there!'
            });
        });

    });

});