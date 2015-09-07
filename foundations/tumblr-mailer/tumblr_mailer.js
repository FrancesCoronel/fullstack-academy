// file I/O
var fs = require('fs');

// setting up APIs
var ejs = require('ejs');
var tumblr = require('tumblr.js');
var mandrill = require('mandrill-api/mandrill');
// var mandrill_client = new mandrill.Mandrill('BXKWUGLb9KgqcUAAuIHVSw');
var mandrill_client = new mandrill.Mandrill('XXXXXXXXXXXXXX');

// pulling data from CSV & HTML files within repo
var csvFile = fs.readFileSync("friend_list.csv", "utf8");
var template = fs.readFileSync('email_template.ejs', 'utf-8');

// Authenticate via OAuth

/**
	var tumblr = require('tumblr.js');
	var client = tumblr.createClient({
	  consumer_key: 'EpQg43b3hETQXWnMGDmZ5vFyCLsTj93iluVSZEVtHH9CwjvWzm',
	  consumer_secret: '3T3CQ3pdCJSL3fDeO7vcBrAOyucpw1dNnUaKWvW0bM1pWugu8d',
	  token: 'NXVXxT4kU0R0uzURhYMcmH9BwfP7vhOpzJ5NUQ4I12ln9ZBfB5',
	  token_secret: 'uWNkhpwhM9cWhRzGg4N1l6LLOw37EoYonYKeMJhLauW2wDuFMR'
	});

	// Make the request
	client.userInfo(function (err, data) {
	    // ...
	});
**/

// creating fake client for authentication using Tumblr API
var client = tumblr.createClient({
  consumer_key: 'XXXXXXXXXXXXXX',
  consumer_secret: 'XXXXXXXXXXXXXX',
  token: 'XXXXXXXXXXXXXX',
  token_secret: 'XXXXXXXXXXXXXX'
});

// generates array of objects that contain contact info
// basically just getting the formatted info from the CSV file within repo
var csvParse = function(csvFile) {
    var data = [];
    var fileArray = csvFile.split('\n');
    var headers = fileArray.shift().split(',');
    fileArray.forEach(function(contact) {
        var arrayedContacts = contact.split(',');
        var contactObject = {};
        for (var i = 0; i < arrayedContacts.length; i++) {
            contactObject[headers[i]] = arrayedContacts[i];
        }
        data.push(contactObject);
    });
    return data;
};

// gets blog post date from all posts in my Tumblr blog
// checks if blog posts are less than 7 days old
// pushes them to array of blog posts
// sends array of newer blog posts in emails
// specifically sends to 'friends' within CSV file
// utilizes Tumblr API
var friendList = csvParse(csvFile);
console.log(friendList);
var latestPosts = [];

client.posts('fvcproductions1618.tumblr.com', function(err, data) {
    for (var i = 0; i < data.posts.length; i++) {
        var dateDiff = data.posts[i].date.substring(8, 10) - 18;
        if (dateDiff < 7) {
            latestPosts.push(data.posts[i]);
        }
    }
    friendList.forEach(function(row) {
        var customisedTemplate = ejs.render(template, {
            firstName: row.firstName,
            numMonthsSinceContact: row.numMonthsSinceContact,
            latestPosts: latestPosts
        });

        sendEmail(row.firstName, row.emailAddress, 'Violet Siegius', 'fvcproductions@gmail.com', 'Hello There', customisedTemplate);
    });
});

// send custom emails once generated using Mandrill API
function sendEmail(to_name, to_email, from_name, from_email, subject, message_html) {
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
            "email": to_email,
            "name": to_name
        }],
        "important": false,
        "track_opens": true,
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Tumblr"
        ]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({
        "message": message,
        "async": async,
        "ip_pool": ip_pool
    }, function(result) {
        // console.log(message);
        // console.log(result);
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
}