# Create Functions

## Total Points: 8

Create a function, which returns an array of functions. Each function returns their index in the array.  Here is an example:

```
var arrayOfFunctions = createFunctions(5); // create an array, containing 5 functions

arrayOfFunctions[0](); // must return 0
arrayOfFunctions[3](); // must return 3
arrayOfFunctions[arrayOfFunctions.length - 1 ](); // must return 4
```
