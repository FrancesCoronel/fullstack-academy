var Sequelize = require('sequelize');

module.exports = function(db) {
    var User = db.define('User', {
        name: Sequelize.STRING,
        pictureUrl: Sequelize.STRING
    }, {
        timestamps: false  // this will deactivate the time columns
    });

    return User;
};