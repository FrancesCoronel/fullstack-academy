var Sequelize = require('sequelize');

module.exports = function(db) {
    var Tweet = db.define('Tweet', {
        tweet: Sequelize.STRING
    }, {
        timestamps: false // this will deactivate the time columns
    });

    return Tweet;
};