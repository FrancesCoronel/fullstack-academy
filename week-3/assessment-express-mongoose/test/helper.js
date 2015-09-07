var mongoose = require('mongoose'),
  async = require('async'),
  Article = mongoose.model('Article')

/**
 * Clear database
 *
 */

exports.clearDb = function(done) {
  async.parallel([
    function(cb) {
      Article.collection.remove(cb);
    }
  ], done);
};
