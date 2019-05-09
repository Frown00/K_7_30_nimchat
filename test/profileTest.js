////////// PROFILES ///////////

const profileTest = (app, request) => {
  /**
   * Creating profiles
   */

  describe('POST /api/profiles/edit (create)', function () {

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

    let data = {
      handle: '',
      sex: 'MALE',
      age: 10,
      location: 'Wrocław',
      maritalStatus: 'SINGLE',
      personality: {
      },
      profession: {

      },
      hobbies: [],
      bio: 'Test',
      motivation: "BORED"
    }
    it('respond with 201 account created',
      function (done) {
        request(app)
          .post('/api/profiles/edit')
          .send(data)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });

      });
  });

  describe('POST /api/profiles/edit (create)', function () {

    let token = null;
    let userData = {
      email: "test2@gmail.com",
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

    let data = {
      handle: '',
      sex: 'MALE',
      age: 10,
      location: 'Wrocław',
      maritalStatus: 'SINGLE',
      personality: {
      },
      profession: 'Accountant',
      hobbies: [],
      bio: 'Test',
      motivation: "BORED"
    };
    it('respond with 201 account created',
      function (done) {
        request(app)
          .post('/api/profiles/edit')
          .send(data)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });

      });
  });

  /**
  * Edit profiles
  */
  describe('POST /api/profiles/edit (edit)', function () {

    let token = null;
    let userData = {
      email: "test2@gmail.com",
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

    let data = {
      handle: '',
      sex: 'MALE',
      age: 10,
      location: 'Wrocław',
      maritalStatus: 'SINGLE',
      personality: 'Logistian',
      profession: 'Mechanical Engineer',
      hobbies: [],
      bio: 'Test',
      motivation: "BORED"
    };
    it('respond with 200 account editted',
      function (done) {
        request(app)
          .post('/api/profiles/edit')
          .send(data)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });

      });
  });

  /**
  * Edit profiles - check if user can have same traits
  */
  describe('POST /api/profiles/edit (edit - same)', function () {

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

    let data = {
      handle: '',
      sex: 'MALE',
      age: 10,
      location: 'Wrocław',
      maritalStatus: 'SINGLE',
      personality: 'Logistian',
      profession: 'Mechanical Engineer',
      hobbies: [],
      bio: 'Test',
      motivation: "BORED"
    };
    it('respond with 200 account editted',
      function (done) {
        request(app)
          .post('/api/profiles/edit')
          .send(data)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });

      });
  });

  /**
  * Add partner profile preference
  */
  describe('POST /api/profiles/edit (edit - same)', function () {

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

    let data = {
      handle: '',
      sex: 'MALE',
      age: 10,
      location: 'Wrocław',
      maritalStatus: 'SINGLE',
      personality: 'Logistian',
      profession: 'Mechanical Engineer',
      hobbies: [],
      bio: 'Test',
      motivation: "BORED"
    };
    it('respond with 200 account editted',
      function (done) {
        request(app)
          .post('/api/profiles/edit')
          .send(data)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            done();
          });

      });
  });

}
module.exports = profileTest;

