
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home');
};

exports.contact = function(req, res) {
  res.render('contact');
};