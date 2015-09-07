/**
 * should have enqueue, dequeue, and size methods
 * the correct item should be returned when dequeing
 * size should not be negative, if size is zero return undefined on dequeue
 * should correctly enqueue, dequeue, enqueue, dequeue
 */

var Queue = function() {

    var arr = [];
    // should have a size of 0 initially
    var size = 0;
    var head = 0;
    var tail = 0;

    this.enqueue = function(item) {
        arr[tail++] = item;
        // adding to the queue should increase size by 1
        size++;
    };

    this.dequeue = function() {
        if (size === 0) {
            return undefined;
        }
        var item = arr[head];
        // dequeuing one item should reduce size by 1
        size--;
        head++;
        return item;
    };

    this.size = function() {
        return size;
    };

};

// Alternate Solution

var Queue = function() {
    // this.size = 0;
    this.head = 0;
    this.tail = 0;
    this.memory = [];
};

Queue.prototype.enqueue = function(item) {
    // this.size++;
    this.memory[this.tail++] = item;
};

Queue.prototype.dequeue = function() {
    // this.size--;
    if (this.size === 0) {
        return undefined;
    }
    var item = this.memory[this.head];
    this.head++;
    return item;
};

Queue.prototype.size = function() {
    return this.tail - this.head;
};