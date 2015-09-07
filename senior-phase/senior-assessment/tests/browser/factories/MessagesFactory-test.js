describe('MessagesFactory', function () {

    beforeEach(module('FullstackMail'));

    var $httpBackend, MessagesFactory;
    beforeEach('Get tools', inject(function (_$httpBackend_, _MessagesFactory_) {
        $httpBackend = _$httpBackend_;
        MessagesFactory = _MessagesFactory_;
    }));

    xit('should be an object', function () {
        expect(MessagesFactory).to.be.an('object');
    });

    describe('getMessagesFrom', function () {

        var userId;
        var responseData;
        beforeEach(function () {

            userId = '5as93j230fj2303';
            responseData = [
                { from: userId, to: '582jv2cf', body: 'Sup!' }
            ];

            $httpBackend
                .expectGET('/messages/from/' + userId)
                .respond(responseData);

        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        xit('should make the expected request when called', function () {
            MessagesFactory.getMessagesFrom(userId);
            $httpBackend.flush();
        });

        xit('should return a promise that resolves to the data of the response', function (done) {
            MessagesFactory.getMessagesFrom(userId).then(function (messages) {
                expect(messages).to.be.deep.equal(responseData);
                done();
            });
            $httpBackend.flush();
        });

    });

    describe('sendMessage', function () {

        var messageDataToSend;
        beforeEach(function () {

            messageDataToSend = [
                { from: '5sjdfp2jf2', to: '582jv2cf', body: 'Sup!' }
            ];

            $httpBackend
                .expectPOST('/messages', messageDataToSend)
                .respond('Created!');

        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
        });

        xit('should make the expected POST request with expected data', function () {
            MessagesFactory.sendMessage(messageDataToSend);
            $httpBackend.flush();
        });

        xit('should return a promise that resolves once a response has been generated', function () {
            var promise = MessagesFactory.sendMessage(messageDataToSend);
            expect(promise.$$state.status).to.be.equal(0 /*Pending*/);
            $httpBackend.flush();
            expect(promise.$$state.status).to.be.equal(1 /*Resolved*/);
        });

    });

});