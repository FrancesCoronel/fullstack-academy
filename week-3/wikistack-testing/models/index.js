var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Page, User;
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title: { type: String, required: true },
  url_name: String,
  owner_id:   String,
  body:   { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: Number,
  tags: [String]
});

// Omri and I added this so that we wouldn't have to check
// the length of title in various parts of the code - ZO
pageSchema.path('title').validate(function(v) {
	return v && v.length > 0
}, "The title must have a length greater than zero")

pageSchema.methods.computeUrlName = function() {
	this.url_name = this.title.replace(/[\W\s]/g, '_');
}

pageSchema.statics.findByTag = function(tag, cb) {
	this.find({ tags: { $elemMatch: { $eq: tag} } }, cb)
}

pageSchema.methods.getSimilar = function(cb) {
	this.constructor.find({
		_id: { $ne: this._id },
		tags: {
			$elemMatch: { 
				$in: this.tags
			}
		}
	}, cb)
}

pageSchema.pre('save', function(next) {
	this.computeUrlName()
	next()
})

pageSchema.virtual('full_route').get(function() {
	return "/wiki/" + this.url_name;
})

var userSchema = new Schema({
  name:  {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
  email: { type: String, required: true }
});

Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {
	Page: Page, 
	User: User
};