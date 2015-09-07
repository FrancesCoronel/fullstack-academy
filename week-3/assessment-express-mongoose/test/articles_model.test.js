var mongoose = require('mongoose'),
    expect = require('chai').expect,
    Article = require('../models/article');
/**
 *
 * Start here!
 *
 * These tests describe the model that you'll be writing in models/article.js
 *
 */

describe('Articles', function () {

  var fullText = 'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.';

  /**
   * Your model should have two fields (both required): `title` and `content`.
   *
   * http://mongoosejs.com/docs/api.html#schematype_SchemaType-required
   */
  it('should have title and content fields of type String', function (done) {
    var article = new Article({
      title: 'Migratory Birds',
      content: fullText
    });
    article.save(function (err, savedArticle) {
      expect( savedArticle.title ).to.equal( 'Migratory Birds' );
      expect( savedArticle.content ).to.equal( fullText );
      done(err);
    });
  });

  it('should require content', function (done) {
    var article = new Article({
      title: 'My Second Article'
    });
    article.save(function(err, savedArticle) {
      expect( err.message ).to.equal( 'Validation failed' );
      done();
    });
  });

  it('should require title', function (done) {
    var article = new Article({
      content: 'Some more wonderful text'
    });
    article.save(function(err, savedArticle) {
      expect( err.message ).to.equal( 'Validation failed' );
      done();
    });
  });

  /**
   * Set up a virtual field (check out mongoose virtuals) called `snippet`
   * that returns the first 23 characters of the content followed by "...".
   *
   * http://mongoosejs.com/docs/guide.html#virtuals
   */
  it('should have a virtual 23-character snippet field appended with "..."', function(done) {
    Article.findOne({title: 'Migratory Birds'}, function(err, article) {
      expect( article.content ).to.equal( fullText );
      expect( article.snippet ).to.equal( 'The South African cliff...' );
      done(err);
    });
  });

  /**
   * Set up an instance method (check out mongoose .methods) called `truncate`
   * that will permanently shorten the article content to a passed-in length.
   *
   * http://mongoosejs.com/docs/guide.html#methods
   */
  it('should have an instance method to truncate the content', function(done) {
    Article.findOne({title: 'Migratory Birds'}, function(err, article) {
      expect( article.content ).to.equal( fullText );
      article.truncate(12);
      expect( article.content ).to.equal( 'The South Af' );
      // not saving the article, so the change won't persist to the next test.
      done(err);
    });
  });

 /**
  * Set up a static method called findByTitle that's a convenience
  * method to find a *single* document by its title.
  *
  * http://mongoosejs.com/docs/guide.html#statics
  */
  it('should have a static method to findByTitle', function(done) {
    Article.findByTitle('Migratory Birds', function(err, article) {
      expect( article ).not.to.be.an.instanceof( Array );
      expect( article.content ).to.equal( fullText );
      done(err);
    });
  });


  /** EXTRA CREDIT
   * Your Article model should have a tag field that's an array, but when we
   * access it, we should get one string: the tags joined by a comma and space
   *
   * Look at Schema getters:
   * http://mongoosejs.com/docs/api.html#schematype_SchemaType-get
   *
   * To activate this spec, change `xit` to `it`
   */
  it('should have a tags field with a custom getter', function (done) {
    var article = new Article({ title: 'Taggy', content: 'So Taggy' });
    article.tags = ['tag1', 'tag2', 'tag3'];
    expect( article.tags ).to.equal( 'tag1, tag2, tag3' );
    done();
  });

});
