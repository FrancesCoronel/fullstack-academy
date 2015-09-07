/**
 * Notes
 * var person = new Mammal;
    * (1) new object created => {} (calling this person)
    * (2) person.__proto__ = Mammal.prototype
    * (3) Mammal.call(person)
    * (4) person returned
 */

/**
 * should take name as a parameter
 * should have an array called offspring
 * @param {String} name
 */
var Mammal = function(name) {
    this.name = name;
    this.offspring = [];
};

// Provided Solution

// var Mammal = function(name) {
//     this.name = name;
//     this.offspring = [];
// };

/**
 * should have a sayHello function on it's prototype
 * @return {String} "My name is " + name + ", I'm a Mammal"
 */
Mammal.prototype.sayHello = function() {
    return ("My name is " + this.name + ", I'm a Mammal");
};

// Provided Solution

// Mammal.prototype.sayHello = function() {
//     return "My name is" + this.name + ", I'm a Mammal";
// };

/**
 * should have a haveBaby function
 * @return {String} Baby + name
 */
Mammal.prototype.haveBaby = function() {
    // return this.offspring.push(new Mammal("Baby " + this.name));
    var newBabe = new Mammal("Baby " + this.name);
    this.offspring.push(newBabe);
    return newBabe;
};

// Provided Solution

// Mammal.prototype.haveBaby = function() {
//     var currentBaby = new this.constructor("Baby " + this.name, arguments[0]);
//     this.offspring.push(currentBaby);
//     return currentBaby;
// };

/**
 * calls the Mammal Constructor Function
 * should have an array called offspring and name property from the Mammal constructor function
 * should have a color in its constructor function
 * @param {String} name
 * @param {String} color
 */
var Cat = function(name, color) {
    Mammal.call(this, name);
    this.color = color;
};

// Provided Solution

// var Cat = function(name, color) {
//     Mammal.call(this, name);
//     this.color = color;
// };

/**
 * should use Object.create to inherit methods from Mammal
 * should have its prototype object and a constructor property that points back to Cat
    * Thank you MDN.
 */
Cat.prototype = Object.create(Mammal.prototype);
Cat.prototype.constructor = Cat;

// Provided Solution

// Cat.prototype = Object.create(Mammal.prototype);
// Cat.prototype.constructor = Cat;

/**
 * should have it's own haveBaby method that takes only a color
 * the cat haveBaby is actually a Cat and not a Mammal
 * @param  {String} color
 * @return {String} "Baby " + name
 */
Cat.prototype.haveBaby = function(color) {
    // return this.offspring.push(new Cat("Baby " + this.name, color));
    var newBabeCat = new Cat("Baby " + this.name, color);
    this.offspring.push(newBabeCat);
    return newBabeCat;
};

// Provided Solution

// Cat.prototype.haveBaby = function(color) {
//     return Mammal.prototype.haveBaby.call(this, color);
// };