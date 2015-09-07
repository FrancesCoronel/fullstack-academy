describe("queue", function() {
  var queue;

  beforeEach(function() {
    queue = new Queue();
  });

  it('should have "enqueue", "dequeue", and "size" methods', function() {
    expect(queue.enqueue instanceof Function).toBeTruthy();
    expect(queue.dequeue instanceof Function).toBeTruthy();
    expect(queue.size instanceof Function).toBeTruthy();
  });

  it('should have a size of 0 initially', function() {
    expect(queue.size()).toEqual(0);
  });

  it('adding to the queue should increase size by 1', function() {
    queue.enqueue('first in line');
    expect(queue.size()).toEqual(1);
  });

  it('dequeueing one item should reduce size by one', function() {
    queue.enqueue('first');
    queue.enqueue('second');
    queue.enqueue('third');
    queue.dequeue();
    expect(queue.size()).toEqual(2);
  });

  it('the correct item should be returned when dequeing', function() {
    queue.enqueue('first');
    queue.enqueue('second');
    queue.enqueue('third');
    expect(queue.size()).toEqual(3);
    expect(queue.dequeue()).toEqual('first');
    expect(queue.size()).toEqual(2);
    expect(queue.dequeue()).toEqual('second');
    expect(queue.size()).toEqual(1);
    expect(queue.dequeue()).toEqual('third');
    expect(queue.size()).toEqual(0);
  });

  it('size should not be negative, if size is zero return undefined on dequeue', function() {
    queue.enqueue('first in line');
    expect(queue.size()).toEqual(1);
    expect(queue.dequeue()).toEqual('first in line');
    expect(queue.size()).toEqual(0);
    expect(queue.dequeue()).toEqual(undefined);
    expect(queue.size()).toEqual(0);
    expect(queue.dequeue()).toEqual(undefined);
    expect(queue.size()).toEqual(0);
  });

  it('should correctly enqueue, dequeue, enqueue, dequeue', function() {
    queue.enqueue('a');
    expect(queue.dequeue()).toEqual('a');
    queue.enqueue('b');
    expect(queue.dequeue()).toEqual('b');
  });

});
