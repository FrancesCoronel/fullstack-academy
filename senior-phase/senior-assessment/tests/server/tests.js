var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var supertest = require('supertest');
var dbConnection = mongoose.connection;
var Promise = require('bluebird');

describe('Server tests', function() {

    var User = require('../../server/models/user-model');
    var Message = require('../../server/models/message-model');

    before(function(done) {
        mongoose.connect('mongodb://localhost:27017/final-assessment-test');
        dbConnection.on('open', done);
        dbConnection.on('error', done);
    });

    describe('User Model', function() {

        it('should exist', function() {
            expect(User.find).to.be.a('function');
        });

        it('should have the expected schema definition', function() {
            var schemaDefinition = User.schema.tree;
            expect(schemaDefinition.email.type).to.be.equal(String);
        });

        describe('validations', function() {

            it('should require email', function(done) {
                var user = new User();
                user.validate(function(err) {
                    expect(err).to.be.an('object');
                    expect(err.errors.email).to.exist;
                    expect(err.errors.email.kind).to.be.equal('required');
                    done();
                });
            });

        });

    });

    describe('Message Model', function() {

        it('should exist', function() {
            expect(Message.find).to.be.a('function');
        });

        describe('definition', function() {

            var schemaDefinition = Message.schema.tree;

            it('should have expected subject definition', function() {
                expect(schemaDefinition.subject.type).to.be.equal(String);
            });

            it('should have expected body definition', function() {
                expect(schemaDefinition.body.type).to.be.equal(String);
            });

            it('should have expected from definition', function() {
                expect(schemaDefinition.from.ref).to.be.equal('User');
            });

            it('should have expected to definition', function() {
                expect(schemaDefinition.to.ref).to.be.equal('User');
            });

        });

        describe('validations', function() {

            it('should default subject to "No Subject"', function() {
                var message = new Message();
                expect(message.subject).to.be.equal('No Subject');
            });

            it('should require a body', function(done) {
                var message = new Message();
                message.validate(function(err) {
                    expect(err).to.be.an('object');
                    expect(err.errors.body).to.exist;
                    expect(err.errors.body.kind).to.be.equal('required');
                    done();
                });
            });

            it('should require a sender (from)', function(done) {
                var message = new Message();
                message.validate(function(err) {
                    expect(err).to.be.an('object');
                    expect(err.errors.from).to.exist;
                    expect(err.errors.from.kind).to.be.equal('required');
                    done();
                });
            });

            it('should require a recipient (to)', function(done) {
                var message = new Message();
                message.validate(function(err) {
                    expect(err).to.be.an('object');
                    expect(err.errors.to).to.exist;
                    expect(err.errors.to.kind).to.be.equal('required');
                    done();
                });
            });

        });

        describe('functionality', function() {

            var bobId;
            var joanId;
            beforeEach('Seed users', function(done) {
                var users = [{
                    email: 'bob@gmail.com'
                }, {
                    email: 'joan@gmail.com'
                }];
                User.create(users).then(function(createdUsers) {
                    bobId = createdUsers[0];
                    joanId = createdUsers[1];
                    done();
                }, done);
            });

            var bobFirstMessage;
            var joanFirstMessage;
            var bobSecondMessage;
            beforeEach('Seed messages', function(done) {

                var messages = [{
                    to: joanId,
                    from: bobId,
                    subject: 'Hey Joan!',
                    body: 'Coming to Jimmy\'s birthday tomorrow?'
                }, {
                    to: bobId,
                    from: joanId,
                    subject: 'Re: Hey Joan!',
                    body: 'How dare you, Bob.'
                }, {
                    to: joanId,
                    from: bobId,
                    subject: 'Re: Re: Hey Joan!',
                    body: 'wat'
                }];

                Message.create(messages).then(function(createdMessages) {
                    bobFirstMessage = createdMessages[0]._id;
                    joanFirstMessage = createdMessages[1]._id;
                    bobSecondMessage = createdMessages[2]._id;
                    done();
                }, done);

            });

            afterEach('Remove data', function() {
                return Promise.all([
                    User.remove({}).exec(),
                    Message.remove({}).exec()
                ]);
            });

            describe('statics', function() {

                describe('getAllWhereSender', function() {

                    it('should exist', function() {
                        expect(Message.getAllWhereSender).to.be.a('function');
                    });

                    it('should return a promise', function() {
                        expect(Message.getAllWhereSender(bobId).then).to.be.a('function');
                    });

                    it('should resolve to all the messages sent by Bob', function(done) {
                        Message.getAllWhereSender(bobId).then(function(messages) {
                            expect(messages.length).to.be.equal(2);
                            expect(messages[0]._id.toString()).to.be.equal(bobFirstMessage.toString());
                            expect(messages[1]._id.toString()).to.be.equal(bobSecondMessage.toString());
                            done();
                        }, done);
                    });

                    it('should resolve to all the messages sent by Joan', function(done) {
                        Message.getAllWhereSender(joanId).then(function(messages) {
                            expect(messages.length).to.be.equal(1);
                            expect(messages[0]._id.toString()).to.be.equal(joanFirstMessage.toString());
                            done();
                        }, done);
                    });

                    it('should have the full information of both the sender and receiver', function(done) {
                        Message.getAllWhereSender(joanId).then(function(messages) {

                            var theMessage = messages[0];

                            expect(theMessage.to).to.be.an('object');
                            expect(theMessage.to.email).to.be.equal('bob@gmail.com');

                            expect(theMessage.from).to.be.an('object');
                            expect(theMessage.from.email).to.be.equal('joan@gmail.com');

                            done();

                        }, done);
                    });

                });

            });

            describe('methods', function() {

                describe('truncateSubject', function() {

                    var testMessage;
                    beforeEach(function() {
                        testMessage = new Message({
                            subject: 'Hey friendo! There is a something I would like to share with you.',
                            from: bobId,
                            to: joanId,
                            body: 'Lorem ipsum baseball'
                        });
                    });

                    it('should exist', function() {
                        expect(testMessage.truncateSubject).to.be.a('function');
                    });

                    it('should return the message but with a limited subject\
                        text based on a passed in number to determine its length', function() {

                        var result = testMessage.truncateSubject(6);
                        expect(result).to.be.an('object');
                        expect(result.body).to.be.equal('Lorem ipsum baseball');
                        expect(result.subject).to.be.equal('Hey fr');

                    });

                    it('should add an ellipses (...) after the truncated text if\
                        true is passed as the second argument', function() {

                        expect(testMessage.truncateSubject(12, true).subject).to.be.equal('Hey friendo!...');

                    });

                });

            });

        });

    });

    describe('Server routes', function() {

        var app = require('../../server/app');
        var agent = supertest(app);

        describe('/', function() {

            beforeEach(function() {

            });

            it('should serve up index.html', function(done) {
                agent
                    .get('/')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        fs.readFile(path.join(__dirname, '../../server/index.html'), 'utf8', function(err, contents) {
                            if (err) return done(err);
                            expect(res.text).to.be.equal(contents);
                            done();
                        });
                    });
            });

            it('should static serve the node_modules directory', function(done) {
                agent
                    .get('/angular/angular.js')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        fs.readFile(path.join(__dirname, '../../node_modules/angular/angular.js'), 'utf8', function(err, contents) {
                            if (err) return done(err);
                            expect(res.text).to.be.equal(contents);
                            done();
                        });
                    });
            });

            describe('routes', function() {

                var obama;
                var biden;
                beforeEach('Seed users', function(done) {
                    var users = [{
                        email: 'obama@gmail.com'
                    }, {
                        email: 'biden@gmail.com'
                    }];
                    User.create(users).then(function(createdUsers) {
                        obama = createdUsers[0]._id.toString();
                        biden = createdUsers[1]._id.toString();
                        done();
                    }, done);
                });

                var obamaFirstMessage;
                var bidenFirstMessage;
                var obamaSecondMessage;
                beforeEach('Seed messages', function(done) {

                    var messages = [{
                        to: biden,
                        from: obama,
                        body: 'HEYOOOOOOO'
                    }, {
                        to: obama,
                        from: biden,
                        body: 'WAAASSUUUUPP??'
                    }, {
                        to: biden,
                        from: obama,
                        body: 'nmu?'
                    }];

                    Message.create(messages).then(function(createdMessages) {
                        obamaFirstMessage = createdMessages[0]._id.toString();
                        bidenFirstMessage = createdMessages[1]._id.toString();
                        obamaSecondMessage = createdMessages[2]._id.toString();
                        done();
                    }, done);

                });

                afterEach('Remove users', function(done) {
                    User.remove({}, done);
                });

                afterEach('Remove messages', function(done) {
                    Message.remove({}, done);
                });

                describe('users', function() {

                    it('should be implemented using a subrouter mounted on /users', function() {
                        var usersRoute = app._router.stack.filter(function(entry) {
                            return entry.regexp.toString().search('users') !== -1;
                        })[0].handle;
                        expect(usersRoute.name).to.be.equal('router');
                    });

                    it('should serve up all users on request to GET /', function(done) {
                        agent
                            .get('/users')
                            .expect(200)
                            .end(function(err, res) {
                                if (err) return done(err);
                                expect(res.body).to.be.an('array');
                                expect(res.body.length).to.be.equal(2);
                                expect(res.body[0]._id.toString()).to.be.equal(obama);
                                expect(res.body[1]._id.toString()).to.be.equal(biden);
                                done();
                            });
                    });

                    it('should update a user at PUT /{{usersId}}, send a 201 response', function(done) {
                        agent
                            .put('/users/' + obama)
                            .send({
                                email: 'potus@hotmail.com'
                            })
                            .expect(201)
                            .end(function(err, res) {
                                if (err) return done(err);
                                User.findById(obama).exec().then(function(user) {
                                    expect(user.email).to.be.equal('potus@hotmail.com');
                                    done();
                                }, done);
                            });
                    });

                });

                describe('messages', function() {

                    it('should be implemented using a subrouter mounted on /messages', function() {
                        var usersRoute = app._router.stack.filter(function(entry) {
                            return entry.regexp.toString().search('messages') !== -1;
                        })[0].handle;
                        expect(usersRoute.name).to.be.equal('router');
                    });

                    it('should serve up all messages (with filled in references) to a specific user on GET /to/{{recipientId}}', function(done) {
                        agent
                            .get('/messages/to/' + obama)
                            .expect(200)
                            .end(function(err, res) {
                                if (err) return done(err);
                                expect(res.body).to.be.an('array');
                                expect(res.body.length).to.be.equal(1);
                                expect(res.body[0].from.email).to.be.equal('biden@gmail.com');
                                expect(res.body[0].to.email).to.be.equal('obama@gmail.com');
                                expect(res.body[0].body).to.be.equal('WAAASSUUUUPP??');
                                done();
                            });
                    });

                    it('should serve up all messages from a specific sender on GET /from/{{senderId}}\
                        and use the Message model static getAllWhereSender in the process', function(done) {

                        var sinon = require('sinon');
                        var spy = sinon.spy(Message, 'getAllWhereSender');

                        agent
                            .get('/messages/from/' + obama)
                            .expect(200)
                            .end(function(err, res) {

                                if (err) return done(err);

                                expect(res.body).to.be.an('array');
                                expect(res.body.length).to.be.equal(2);

                                expect(spy.called).to.be.equal(true);
                                expect(spy.calledWith(obama)).to.be.equal(true);

                                spy.restore();
                                done();

                            });

                    });

                    it('should add a new message on POST /, respond with 201 and created message', function(done) {

                        agent
                            .post('/messages')
                            .send({
                                from: biden,
                                to: obama,
                                body: 'You are my best friend. I hope you know that.'
                            })
                            .expect(201)
                            .end(function(err, res) {
                                if (err) return done(err);
                                var createdMessage = res.body;
                                Message.findById(createdMessage._id).exec()
                                    .then(function(foundMessage) {
                                        expect(foundMessage.body).to.be.equal('You are my best friend. I hope you know that.');
                                        done();
                                    }, done);
                            });

                    });

                });

            });

        });

    });

});
