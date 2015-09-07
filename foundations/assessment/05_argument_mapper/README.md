# Argument Mapper 

## Total Points: 8

## Description: 

### *NOTE Read the TestSpecs closely.  This problem may seem confusing, but the TestSpecs will add a lot of insight.*

Create an Argument Mapper.

The createArgumentMap function receives a function object as the first parameter and an **unknown number** of arguments [zero to many]. Create a property for each argument on an object and assign the value to each individual argument value. Properties should follow the naming convention a0, a1, a2, etc:

```
// this is the object returned from the createArgumentMap Function

{ a0: arg0Value,
	a1: arg1Value,
	a2: arg2Value
}

```

Example:

```
function func1(arg1, arg2) { ... }

var map = createArgumentMap(func1,'valueOfArg1', 'valueOfArg2');
console.log(map['a0']);  // writes func1;
console.log(map['a1']);  // writes 'valueOfArg1'
console.log(map['a2']);  // writes 'valueOfArg2'

```

The passed values are in the same order as they appear in the function object.

# Key Adder

Create a Key Adder that loops over an Object's keys, finds all number values, and returns 
the sum of all the numbers.

Example:

```
// INPUT: {a0:0, a1:1, a2:2, a3:3, a4:4}
keyAdder.call({a0:0, a1:1, a2:2, a3:3, a4:4})
// OUTPUT: 10;

```


