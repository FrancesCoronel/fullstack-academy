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

LinkedList.prototype.search = function(searchValueOrFunction, currentNode) {
    currentNode = currentNode || this.head;
    if (typeof(searchValueOrFunction) === 'function') {
        if (searchValueOrFunction(currentNode.value)) {
            return currentNode.value;
        }
    }
    if (currentNode.searchValue === searchValueOrFunction) {
        return currentNode.value;
    }
    if (!currentNode.next) {
        return;
    }
    return this.search(searchValueOrFunction, currentNode.next);
};