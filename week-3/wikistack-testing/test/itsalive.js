var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);
chai.use(require('chai-things'));

var should = chai.should();
var expect = chai.expect;

describe('Testing Suite Capabilties', function() {
    it('tests basic arithmetic', function() {
        expect(2 + 2).to.equal(4);
    });
});

describe('Testing Asynchronous', function() {
    it('times out correctly', function(done) {
        var start = new Date();
        setTimeout(function() {
            expect(new Date() - start).to.be.closeTo(1000, 10);
            done();
        }, 1000);
    });
});

describe('Testing For Each', function() {
    var arr = [1, 2, 3, 4, 5];
    var spy = chai.spy(function(element) {
        return element * 2;
    });
    arr.forEach(spy);
    it('forEach call back - 5 times', function() {
        expect(spy).to.have.been.called.exactly(5);
    });
});

var models = require('../models');
var p;

describe('Page Model', function() {

    describe('Validations', function() {
        beforeEach(function() {
            p = new models.Page();
        });
        it('should err without title', function(done) {
            p.validate(function(err) {
                expect(err.errors).to.have.property('title');
                done();
            });
        });
        it('should err with title of zero length', function(done) {
            p.title = "";
            p.validate(function(err) {
                expect(err.errors.title.value).to.have.length(0);
                done();
            });
        });
        it('should err without body', function(done) {
            p.validate(function(err) {
                expect(err.errors).to.have.property('body');
                done();
            });
        });
    });

    describe('Statics', function() {
        describe('findBytag', function() {
            beforeEach(function(done) {
                models.Page.create({
                    title: "The Title",
                    body: "Some content",
                    tags: ["first", "second"]
                }, done);
            });
            it('should get pages with the search tag', function(done) {
                models.Page.findByTag("first", function(err, pages) {
                    expect(pages).to.have.length(pages.length);
                    done();
                });
            });
            it('should not get pages without the search tag', function(done) {
                models.Page.findByTag("", function(err, pages) {
                    expect(pages).to.have.length(0);
                    done();
                });
            });
        });
    });

    describe('Methods', function() {
        beforeEach(function(done) {
            models.Page.create([{
                title: "Base Page",
                body: "Some content",
                tags: ["a"]
            }, {
                title: "Shared Tag Page",
                body: "Some content",
                tags: ["a", "b"]
            }, {
                title: "No Shared Tags",
                body: "Some content",
                tags: ["c"]
            }], done);
        });
        afterEach(function(done){
          models.Page.remove({}, done);
        });
        describe('computeUrlName', function() {
            it('should convert non-word-like chars to underscores', function() {
                var newPage = new models.Page({
                    title: "The Very Long Title"
                });
                newPage.computeUrlName();
                expect(newPage.url_name).to.equal("The_Very_Long_Title");
            });
        });
        describe('getSimilar', function() {
            it('should never get itself', function(done) {
                var newPage = new models.Page({
                    title: "The Very Long Title",
                    tags: ["a"],
                    body: 'more content'
                });
                newPage.getSimilar(function(err, pages) {
                    pages.should.not.include({
                        title: "The Very Long Title"
                    });
                    done();
                });
            });
            it('should get other pages with any common tags', function(done) {
                var newPage = new models.Page({
                    title: "The Very Long Title",
                    tags: ["a"],
                    body: 'more content'
                });
                newPage.getSimilar(function(err, pages) {
                    pages.should.have.property(
                        'tags', ["a"]
                    );
                    done();
                });
            });
            it('should not get other pages without any common tags', function(done) {
                var newPage = new models.Page({
                    title: "The Very Long Title",
                    tags: ["a"],
                    body: 'more content'
                });
                newPage.getSimilar(function(err, pages) {
                    pages.should.not.include({
                        tag: ["c"]
                    });
                 done();
                });
            });
        });
    });

    describe('Virtuals', function() {
        describe('full_route', function() {
            it('should return the url_name prepended by "/wiki/"', function() {
              var newPage = new models.Page({
                    title: "The Very Long Title",
                    body: "more content",
                    url_name: "The_Very_Long_Title"
                });
              expect(newPage.full_route).to.equal('/wiki/' + newPage.url_name);
            });
        });
    });

    describe('Hooks', function() {
        it('should call computeUrlName before save', function(done) {
          var newPage = new models.Page({
                    title: "The Very Long Title",
                    body: "more content",
                    url_name: "The_Very_Long_Title"
            });
          newPage.computeUrlName = chai.spy(newPage.computeUrlName);
          newPage.save(function() {
            expect(newPage.computeUrlName).to.have.been.called.exactly(1);
            done();
          });
        });
   });
});
