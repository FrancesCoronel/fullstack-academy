# Fullstack Foundations | Tumblr Mailer

> Due June 7, 2015

------

### OBJECTIVES

Using the Tumblr blog you created in Part 1, you will create a node.js script file that will email a list of contacts your most recent blog posts.

### CONCEPTS

This is your first project in Node where you will be using various libraries to accomplish your goals. When learning a new library, there is always a learning curve.

This is a typical cycle of exploring a new API:

- play with the syntax
- assume that something is messed up
- read the documentation and see why the developer built it a certain way
- assume that something is messed up
- read the source code and realize that the developer was actually right all along

It can frustrating to use new libraries but don't worry - you will get through it!

### OVERVIEW

Here's a high-level overview of tasks we'll be accomplishing:

- Create another JavaScript file that can pull data from your Tumblr Blog
- Read in a CSV file of your friends' emails
- Load the content from some time-period of posts from your Tumblr blog
- Populate an email template with your blog content and mail merge it with your friends data
- Send the email using the Mandrill API
- By the end of the project, you should be able to run a JavaScript file that will send out an email newsletter to a list of friends and family in your CSV file.