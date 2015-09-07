/**
 * should have methods named 'addToTail', 'removeHead', and 'search'
 * should start out with head and tail undefined
 * should not add an undefined node
 * should have an Node class defined to repesent a node
 * Node class should take a value argument & define next and previous to be null
 * linkedlist should use Node class to add nodes
 * if a single node is added to head, it should be set to head and tail
 * should return the head on a 'removeHead
 * should make sure the previous of any newly appointed head is null
 * should make sure the next of any newly appointed TAIL is null
 * should be able to add to head or tail
 * should return the tail on a removeTail
 * should remove head and tail when last node is removed
 * should return the correct values for search
 * should be able to take strings and functions both as inputs
 * should be able to store and search for objects, not just strings
 */

// var Node = function(val) {
//     this.value = val;
//     this.next = null;
//     this.previous = null;
// };

// var LinkedList = function() {

//     var head = null;
//     var tail = null;

//     this.addToHead = function(item) {
//         var newNode = new Node(item);
//         var previousHead = this.head;
//         this.head = newNode;
//         if (this.head === null) {
//             this.tail = newNode;
//         }
//         // newNode.next = this.head;
//         // next is pointing to the address of the previous node
//         newNode = previousHead;
//         // head should point to newNode now
//         this.head = newNode;
//         this.previous = null;
//     };

//     this.addToTail = function(item) {
//         var newNode = new Node(head);
//         var previousTail = this.tail;
//         this.tail = newNode;
//         // if list is empty
//         if (head === null) {
//          // simply point head (which is null) to new item
//          this.head = newNode;
//         }
//         // while (temp.next !== null) {
//         //  temp = temp.next;
//         // }
//         // temp.next = new Node(item);
//     };

//     this.removeHead = function() {
//         // if list is empty
//         if (head === null) {
//          // just return null
//          return null;
//         }
//         var temp = head;
//         head = head.next;
//         return temp.value;
//     };

//     this.removeTail = function() {
//         if (head === null) {
//          return null;
//         }
//         var temp = head;
//         while (temp.next.next !== null) {
//          temp = temp.next;
//         }
//         temp.next = null;
//         return temp.value;
//     };

//     this.search = function(val) {
//         var temp = head;
//         while (temp !== null && temp.val !== temp) {
//             temp = temp.next;
//         }
//         return temp;
//     };

// };

// Alternate Solution

var Node = function(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
};

var LinkedList = function() {

};

LinkedList.prototype.empty = function() {
    return (typeof(this.head) === 'undefined' && typeof(this.tail) === 'undefined');
};

LinkedList.prototype.addToTail = function(value) {
    // this.tail = this.head = new Node(value);
    if (!value) return undefined;
    var n = new Node(value);
    if (this.empty()) {
        this.head = n;
    } else {
        n.previous = this.tail;
        this.tail.next = n;
    }
    this.tail = n;
};

LinkedList.prototype.addToHead = function(value) {
    var n = new Node(value);
    if (this.empty()) {
        this.tail = n;
    } else {
        n.next = this.head;
        this.head.previous = n;
    }
    this.head = n;
};

LinkedList.prototype.removeHead = function() {
    if (this.empty()) {
        return;
    }
    var n = this.head.value;
    if (this.head === this.tail) {
        delete this.head;
        delete this.tail;
        return n;
    }
    this.head = this.head.next;
    this.head.previous = null;
    return n.value;
};

LinkedList.prototype.removeTail = function() {
    if (this.empty()) {
        return;
    }
    var n = this.tail.value;
    if (this.tail === this.head) {
        delete this.head;
        delete this.tail;
        return n;
    }
    this.tail = this.tail.previous;
    this.tail.next = null;
    return n.value;
};

// LinkedList.prototype.search = function(val) {
    // var n = this.tail;
    // while (n !== null && n.val !== n) {
    //     n = n.next;
    // }
    // return n;
// };

LinkedList.prototype.search = function(searchValueOrFunction, currentNode) {
    currentNode = currentNode || this.head;
    if (typeof(searchValueOrFunction) === 'function') {
        if (searchValueOrFunction(currentNode.value)
    }
    if (currentNode.searchValue === searchValueOrFunction) {
        return currentNode.value;
    }
    if (!currentNode.next) {
        return;
    }
    return this.search(searchValueOrFunction, currentNode.next);
};