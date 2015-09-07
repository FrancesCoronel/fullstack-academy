# Fullstack Foundations | Part 2

> Due **05-26-2015**

------

### [x] TestFirst 5 | [GitHub Repo](https://github.com/fvcproductions/FullstackTestFirst)

- [x] 05 Functions

### [x] Guessing Game Part 2 - Finished |  [GitHub Repo](https://github.com/fvcproductions/FullstackTestFirst)

------

------

# Learndot Platform Exercises

------

------

### Intro to jQuery

- [x] Complete the course [*Try jQuery*][1] on Code School.
- [ ] Complete the course [*jQuery Basics*][2] on Treehouse.
- [x] Complete the [*jQuery*][3] track on Codecademy.
- [ ] Read the following chapters of [Eloquent JavaScript](http://eloquentjavascript.net). *Optional?*
	- [Chapter 12 - JavaScript and the Browser](http://eloquentjavascript.net/12_browser.html)
	- [Chapter 13 - The Document Object Model](http://eloquentjavascript.net/13_dom.html)
	- [Chapter 14 - Handling Events](http://eloquentjavascript.net/14_event.html)
- [x] Answer Recap Questions.
  	- What is jQuery and why is it used?
  		- jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
  		- The purpose of jQuery is to make it much easier to use JavaScript on your website. jQuery takes a lot of common tasks that require many lines of JavaScript code to accomplish, and wraps them into methods that you can call with a single line of code.
  	- Is jQuery a replacement for JavaScript? Are they related?
  		- No. jQuery is simply one of the many specific libraries for JavaScript that allows you to use JavaScript in cool ways.
  	- What is the dollar sign (`$`) in jQuery? Does it have an alias?
  		- It just represents a jQuery object. You could use `jQuery` in place of it, and it would still work, but the dollar sign is better looking anyways.
  	- What is difference between `$(this)` and '`this`' in jQuery?
  		- `this` is an object coming from the DOM that you can call DOM methods on, but `$(this)` is actually referring to a jQuery wrapper that you can call jQuery methods on.
  	- What is `event.PreventDefault()` and `document.ready()`?
  		- The `event.PreventDefault()` method stops the default action of an element from happening while `document.ready()` checks to make sure functions are available afte the document is loaded.
  	- How do you use `prepend()` and `append()`?
  		- So let's say you have some text in your paragraph: `<p>some text</p>`. If you decided to `prepend("<p>Bro, </p>")`, then the pargraph would look like `<p>Bro, </p><p>some text</p>`. So instead if you decided you wanted to `append("<p>, Bro</p>")`, then the paragraph would look like `<p>some text</p><p>, Bro</p>` instead.
  	- How would you use jQuery to get a value from an input form after the user hits enter or clicks the submit button?
  		- You would just create a functon that would a function that grabs the value of the text once they click the submit button. So `$("#submit").on('click', function() {});` would work well for this and then for the enter key, you could create a separate function that would check for the enter keypress and just follow the submit click function.
  	- How could you use jQuery to create keyboard events such as left, right, up, down?
  		- Use the numerical values of those 4 key presses to check if the key pressed by the user is that numerical value in the function.

---

### Chrome Dev Tools

- [ ] Complete Levels 1 to 4 of [*Discover DevTools*][4] on Code School
- [x] Reference to Keyboard Shortcuts
  	- Open the Console `CMD + OPTION + J`
  	- View Page Source `CMD + OPTION + U`

---

[1]: http://try.jquery.com/	"Try jQuery on Code School"
[2]: http://teamtreehouse.com/library/jquery-basics	"jQuery Basics on Treehouse"
[3]: http://www.codecademy.com/tracks/jquery	"jQuery on Codecademy"
[4]: https://www.codeschool.com/courses/discover-devtools	"Discover DevTools on Code School"