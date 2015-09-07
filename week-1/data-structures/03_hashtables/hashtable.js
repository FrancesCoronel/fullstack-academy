// var toHash = function(key, value) {
// 	this.key = key;
// 	this.value = value;
// };

// toHash.prototype.valueOf = function() {
// 	return this.key;
// };

// var Hash = function() {
// 	// should have 25 buckets
// 	this.numBuckets = 25;
// 	this.items = [];
// };

// // should store values
// // should handle collisions
// // should overwrite keys
// Hash.prototype.set = function(key, value) {
// 	if (typeof(key) !== "string") {
// 		throw Error("Keys must be strings");
// 	}
// 	// if (this.hasKey(key)) {
// 	// 	return this.items[key];
// 	// } else {
// 	// 	return undefined;
// 	// }
// 	// var toHash = this._hash(key);
// 	// this.items[toHash] = {key: value};
// 	var index = this._hash(key);
// 	var toHash = new Node({key:value});
// 	this.items[index] = toHash;
// };

// // should retrieve values
// // should handle collisions
// Hash.prototype.get = function(key) {
// 	// if (this.items.hasKey(key)) { //issue
// 	// 	return this.items[key];
// 	// }
// 	// if (this._has(key))
// 	var toHash = this._hash(key);
// 	return this.items[toHash].value.key;
// };

// // should return booleans for #hasKey
// Hash.prototype.hasKey = function(value) {
// 	for (var i = 0; i < this.items.length; i++) {
// 		if (this.items[i].key === value) {
// 			return false;
// 		}
// 	}
// 	return true;
// };

// Hash.prototype._hash = function(input) {
// 	var sum = 0;
// 	for (var i = 0; i < input.length; i++) {
// 		sum += input.charCodeAt(i);
// 	}
// 	return sum % 25;
// };

// Alternate Solution

var Hash = function() {
	this.numBuckets = 25;
	this.buckets = [];
};

var HashNode = function() {

};

Hash.prototype._hash = function(key) {
	// hash key by turning it into a number
	var sum = 0;
	for (var i = 0; i < key.length; i++) {
		sum += key.charCodeAt(i);
	}
	return sum % this.numBuckets;
};

Hash.prototype.set = function(key, value) {
	// store value at key for later retrieval
	if (typeof(key) !== "string") {
		throw TypeError("Keys must be strings");
	}
	var index = this._hash(key);
	if (!this.buckets[index]) {
		// starting implementation using Linked Lists
		this.buckets[index] = new LinkedList();
	}
	this.buckets[index].addToHead({
		name: key,
		data: value
	});
};

Hash.prototype.get = function(key) {
	// retrieve value
	var index = this._hash(key);
	this.buckets[index].search(function(node) {
		return (node.value.name = key);
	}).data;
};

Hash.prototype.hasKey = function(key) {
	// test if hash table has this key
	var index = this._hash(key);
	this.buckets[index].search(function(node) {
		return (node.value.name = key);
	}).data ? true: false;
	// alternative solution
	// Boolean.this.buckets[index].search(function(node) {
	// 	return (node.value.name = key);
	// }).data ? true: false;
};