// Make sure your `mongod` process is running!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assessjs');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));
//---------VVVV---------  your code below  ---------VVV----------

/**
 *   Articles
    - should have title and content fields of type String
    - should require content
    - should require title
    - should have a virtual 23-character snippet field appended with "..."
    - should have an instance method to truncate the content
    - should have a static method to findByTitle
    - should have a tags field with a custom getter
 */

var articleSchema = new mongoose.Schema({
  /**
   * --- setting up the schema
      * ✓ should have title and content fields of type String
      * ✓ should require content
      * ✓ should require title
      * ✓ should have a tags field with a custom getter
   */

  title: { type: String , required: true },
  content: { type: String, required: true  },
  tags: { type: Array, get: getTags }
});

// ✓ should have an instacne method to truncate the content

articleSchema.methods.truncate = function(num) {
  this.content = this.content.substring(0, num);
};

// ✓ should have a virtual 23-character snippet field appended with "..."

articleSchema.virtual('snippet').get(function () {
  return this.content.substring(0, 23) + "...";
});

// ✓ should have a static method to findByTitle

articleSchema.statics.findByTitle = function(title, done) {
  this.find({ title: title }, function(err, articles) {
    done(err, articles[0]);
  });
};

// ✓ should have a tags field with a custom getter

function getTags(arr) {
  return arr.join(", ");
}

//---------^^^---------  your code above  ---------^^^----------
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
