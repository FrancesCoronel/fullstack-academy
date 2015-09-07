# Make a Promise

### Build a deferral-style implementation

**Javascript promises** are versatile tools for managing asynchronous results. They are portable and can attach handler functions to an eventual value, in multiple places. Compared to the dead end of standard async callbacks, they restore normal control flow — letting you chain results, `return` new values, and `catch` errors where most convenient.

One way to understand a thing is to build it yourself. This repo contains a [Jasmine 2.0](http://jasmine.github.io/2.0/introduction.html) test spec (split into thematic chapters). Following the spec in order, we will build a deferral-style promise library similar to [AngularJS's `$q` service](https://docs.angularjs.org/api/ng/service/$q) (based on [the `Q` library](https://github.com/kriskowal/q) by Kris Kowal & Domenic Denicola), which we will call `pledge.js`. Our promises will be named `$promise` to avoid triggering browser code. To focus on concepts, `pledge.js` will use public variables and not be standards-compliant (see below).

## Instructions

You'll need [Node.js](http://nodejs.org) and its package manager `npm` installed. Assuming that is true, you can globally-install the [Testem](https://github.com/airportyh/testem) spec runner with:

```shell
npm install -g testem
```

Next, you'll need to clone this repo to your local machine and `cd` into it:

```shell
git clone https://github.com/glebec/make-promise.git
cd make-promise
```

Then to execute the spec, simply run `testem` in that directory and open the link displayed in your terminal. You will see all the upcoming tests as "pending" (yellow). Start writing your own code in the `pledge.js` file. When you pass a test (green), change the next pending test from `xit` to `it` and save. This spec is iterative and opinionated; it is recommended that you do the tests in order.

## Associated learning materials

The repo contains the lecture slides and a `.then` flowchart, both in PDF format.

## $q and the state of the art

There are multiple proposed [CommonJS promise standards](http://wiki.commonjs.org/wiki/Promises), one leading standard [Promises/A+](https://www.promisejs.org), and upcoming native [ES6 browser implementations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Developers of the [MEAN stack](http://en.wikipedia.org/wiki/MEAN) should become familiar with **[AngularJS's $q service](https://docs.angularjs.org/api/ng/service/$q)**, a lightweight adaptation of [the Q library](https://github.com/kriskowal/q). [Bluebird](https://github.com/petkaantonov/bluebird) is also making waves as a highly-performant and powerful library.

Adding to the potential confusion, `$q` has two possible ways to generate promises: simplified ES6-style constructors, and CommonJS-style **deferreds.** We will study deferreds because they are more explicit and include a useful method, `.notify()`. If you can grasp the deferral model, the constructor model will be comparatively straightforward.

### Warning

jQuery gurus beware! While jQuery has a version of promises through `$.Deferred`, that implementation differs from current standards and is considered flawed. See [Kris Kowal’s guide.](https://github.com/kriskowal/q/wiki/Coming-from-jQuery)

## Technical note on non-compliance

Our `pledge.js` library is intended to be a learning exercise. Some of the [Promises/A+](https://promisesaplus.com) standards and general [OOP](http://en.wikipedia.org/wiki/Object-oriented_programming) principles that `pledge.js` will not cover include:

* Handler functions should always be called in an async wrapper (e.g. `setTimeout`). This makes their behavior more deterministic as they execute after a following synchronous code line.
* The `.then()` function should handle assimilation of promises from other libraries ("thenables"). That makes promises interoperable.
* A promise's state and value should not be directly editable (public), only influenced or accessed through the resolver functions and `.then()`.
* For simplicity's sake, `pledge.js` does not follow strict standards terminology. For example, it treats "resolved" and "fulfilled" as synonyms and only uses the former; similarly, it considers a pledge's `value` as meaning either its fulfilled `data` or rejected `reason`.

These and other technical details are important, but for someone just beginning to learn they distract from the core behavior and use patterns.

## External Resources for Further Reading

* [AngularJS documentation for $q](https://docs.angularjs.org/api/ng/service/$q)
* [Kris Kowal & Domenic Denicola: Q](https://github.com/kriskowal/q) (the library $q mimics; great examples & resources)
* [The Promises/A+ Standard](https://www.promisejs.org) (with use patterns and an example implementation)
* [HTML5 Rocks: Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) (deep walkthrough with use patterns)
* [Xebia: Promises and Design Patterns in AngularJS](http://blog.xebia.com/2014/02/23/promises-and-design-patterns-in-angularjs/)
* [AngularJS Corner: Using promises and $q to handle asynchronous calls](http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/)
* [DailyJS: Javascript Promises in Wicked Detail](http://dailyjs.com/2014/02/20/promises-in-detail/) (build an ES6-style implementation)
* [MDN: ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (upcoming native functions)
* [Promise Nuggets](http://spion.github.io/promise-nuggets/) (use patterns)
* [Promise Anti-Patterns](http://taoofcode.net/promise-anti-patterns/)
* [AngularJS / UI Router / Resolve](http://www.jvandemo.com/how-to-resolve-angularjs-resources-with-ui-router/)
