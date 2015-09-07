// BUILD A MODULE THAT PASSES THE TESTS IN THE MODEL TEST FILE

/**
 * Todo model
  * listPeople and add
    * 1) starts as an empty array
    * 2) lists people after they have todos
  * add and list
    * 3) remembers who does what
  * complete
    * 4) has a complete boolean set to false after adding tasks
    * 5) sets the task's complete property to true when complete is called
  * remove
    * 6) removes a person's task
 */

// empty
var list = {};

module.exports = {

  listPeople: function() {
    // starts as an empty array
    return Object.keys(list);
  },

  // add and list
  // remembers who does what
  add: function(person, task) {
    // starts as an empty array
    if (!list[person]) {
      list[person] = [];
    }
    task.complete = false;
    list[person].push(task);
  },
  list: function(person) {
    return list[person];
  },

  // complete
  // has a complete boolean set to false after adding tasks
  complete: function(person, index) {
      // sets the tasks's complete property to true when complete is called
    list[person][index].complete = true;
  },

  // remove
  // removes a person's task
  remove: function(person, index) {
    list[person].splice(index, 1);
  },

  // reset
  // reverts list back to empty
  reset: function() {
    list = {};
  }
};