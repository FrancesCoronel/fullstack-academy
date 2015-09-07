var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
				FILL IN THE FOLLOWING ROUTES
 */

/**
 * Articles Route:
    GET /articles
      - responds with an array via JSON
      - returns an article if there is one in the DB
      - returns another article if there is one in the DB
    GET /articles/:id
      - returns the JSON of the article based on the id
      - returns a 500 error if the ID is not correct
    POST /articles
      - creates a new article
      - does not create a new article without a body
      - saves the article to the DB
    PUT /articles/:id
      - updates an article
 */

// Respond with a list of all articles.

/**
 * GET /articles
    * ✓ responds with an array via JSON
    * ✓ returns an article if there is one in the DB
    * ✓ returns another article if there is one in the DB
 */

router.get('/articles', function(req, res, next) {
  Article.find(function(err, articles) {
    // if there's an error, send the error status code 500
    if (err) {
      res.send(500);
    }
    // otherwise, just send the articles back
    res.send(articles);
  });
});

/**
 *  GET /articles/:id
    * ✓ returns the JSON of the article based on the id
    * ✓ returns a 500 error if the ID is not correct
 */

// Respond with one article.
router.get('/articles/:id', function(req, res, next) {
  Article.findById(req.params.id, function(err, article) {
    // if there's an error, send the error status code 500
    if (err) {
      res.send(500);
    }
    // otherwise send the article with given ID
    res.send(article);
  });
});

/**
 * POST /articles
    * creates a new article
    * does not create a new article without a body
    * saves the article to the DB
 */

// Use the request to create an article.
router.post('/articles', function (req, res, next) {
  // if the title or body is undefined, send an error status code of 500
  if (req.body.content === undefined || req.body.title === undefined) {
    res.sendStatus(500);
  } else {
    // but if the content and title are defined
    // then we can go ahead and create the new article
    var newArticle = new Article({
      'title' : req.body.title,
      'content' : req.body.content,
      'tags' : req.body.tags
    });
    // saving article to database
    newArticle.save();
    // relaying message (success)
    // sending success status code of 200
    res.send(200, {
      message : 'Created successfully',
      article : newArticle
    });
  }
});

// Use the request to update a specific article.
router.put('/articles/:id', function (req, res, next) {
  // find article with given ID
  Article.findById(req.params.id, function(err, updatedArticle) {
    // if there's an error, send the error status code 500
    if (err) {
      res.send(500);
    }
    // for each parameter in article, update it with given params
    for (var param in req.body) {
      updatedArticle[param] = req.body[param];
    }
    // sending success message with success status code of 200
    // also making sure to save updatedArticle in database
    res.send(200, {
      message : 'Updated successfully',
      article : updatedArticle
    });
  });
});

module.exports = router;
