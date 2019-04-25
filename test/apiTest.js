const request = require('supertest');
const app = require('../server');

// ==== user API test ====

/**
 * Testing test route
 */
describe('GET /api/users/test', function () {
  it('check test route',
    function (done) {
      request(app)
        .get('/api/users/test')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);

    });
});

/**
 * Register user
 */
describe('GET /api/users/register', function () {
  let data = {
    name: "test",
    email: "test@gmail.com",
    password: "tomasz321",
    confirmedPassword: "tomasz321"
  }
  it('respond with 201 account created',
    function (done) {
      request(app)
        .post('/api/users/register')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });

    });
});

/**
 * User exists
 */
describe('GET /api/users/register', function () {
  let data = {
    name: "test1",
    email: "test@gmail.com",
    password: "tomasz32",
    confirmedPassword: "tomasz321"
  }
  it('respond with 400 not valid account',
    function (done) {
      request(app)
        .post('/api/users/register')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          done();
        });

    });
});

/**
 * Test login
 */
describe('GET /api/users/login', function () {
  let userData = {
    email: "test@gmail.com",
    password: "tomasz321",
  }
  it('respond with 200 logged in',
    function (done) {
      request(app)
        .post('/api/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });

    });
});


describe('GET /api/users/delete', function () {

  let token = null;
  let userData = {
    email: "test@gmail.com",
    password: "tomasz321",
  }
  before(function (done) {
    request(app)
      .post('/api/users/login')
      .send(userData)
      .end(function (err, res) {
        token = res.body.token;
        done();
      });
  });

  it('respond with 204 delete account',
    function (done) {
      request(app)
        .post('/api/users/delete')
        .set('Authorization', token)
        .expect(204, done)


    });
});