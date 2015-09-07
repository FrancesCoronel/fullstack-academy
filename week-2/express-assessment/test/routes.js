var request = require('supertest-as-promised')(require('../app'))
var expect = require('chai').expect
var todos = require('../models/todos')


describe('routes', function() {
  beforeEach(function() {
    todos.reset()
  })

  describe('`/`', function() {
    it('responds with an empty array when app boots', function() {
      /*
       * when we make requests to `/` we will get back an empty array
       * */
       return request
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.eql([])
        })
    })

    it('responds with a person after a task has been added', function() {
      todos.add('zeke', { name: 'a task' })
      return request
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.eql(['zeke'])
        })
    })

  })

  describe('`/:person`', function() {
    it('lists tasks for a user with a get request', function() {
      todos.add('bob', { name: 'task for bob' })
      return request
        .get('/bob')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.have.length(1)
          expect(res.body[0].name).to.equal('task for bob')
          expect(res.body[0].complete).to.equal(false)
        })
    })


    it('adds to the persons task list with a post request', function() {
      return request
        .post('/sarah')
        .send({ name: 'one of sarah\'s tasks'})
        .expect(201)
        .expect(function() {
          expect(todos.list('sarah')).to.have.length(1)
        })
    })

    describe('`/:index`', function()  {
      it('marks a task as complete with a put request', function() {
        todos.add('seema', {})
        todos.add('seema', {})
        todos.add('seema', {})

        return request
          .put('/seema/2')
          .expect(201)
          .expect(function() {
            expect(todos.list('seema')[2].complete).to.be.true
          })
      })

      it('removes a task with a delete request', function() {
        todos.add('david', {})
        todos.add('david', {})
        todos.add('david', {})

        return request
          .delete('/david/2')
          .expect(201)
          .expect(function() {
            expect(todos.list('david')).to.have.length(2)
          })
      })
    })
  })
 })
