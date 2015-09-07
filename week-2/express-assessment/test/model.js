var expect = require('chai').expect

var todos = require('../models/todos')
describe('Todo model', function() {

  beforeEach(function() {
    todos.reset()
  })

  describe('listPeople and add', function() {
    it('starts as an empty array', function() {
      expect(todos.listPeople()).to.eql([])
    })

    it('lists people after they have todos', function() {
      todos.add('zeke', { name: 'clean room' })
      expect(todos.listPeople()).to.eql(['zeke'])
    })
  })

  describe('add and list', function() {
    it('remembers who does what', function() {
      todos.add('zeke', { name: 'clean bath room' })
      expect(todos.list('zeke')).to.have.length(1)
      todos.add('omri', { name: 'clean living room' })
      expect(todos.list('omri')).to.have.length(1)
    })
  })

  describe('complete', function() {
    it('has a complete boolean set to false after adding tasks', function() {
      todos.add('zeke', { name: 'clean self' })
      expect(todos.list('zeke')[0].complete).to.be.false
    })

    it('sets the task\'s complete property to true when complete is called', function() {
      todos.add('zeke', { name: 'go to store' })
      todos.complete('zeke', 0)
      expect(todos.list('zeke')[0].complete).to.be.true
    })
  })
  
  describe('remove', function() {
    it('removes a person\'s task', function() {
       todos.add('zeke', { name: 'task 0' })
       todos.add('zeke', { name: 'task 1' })
       todos.add('zeke', { name: 'task 2' })
       todos.remove('zeke', 1)
       expect(todos.list('zeke')[1].name).to.equal('task 2')
    })
  })
})
