function greet (name) {
  console.log('Hello, ' + name);
}

function shout (name) {
  console.log('HELLO ' + name + '!');
}

module.exports = { greet: greet, shout: shout};

// ES6
// module.exports = {greet, shout};

//console.log(module);