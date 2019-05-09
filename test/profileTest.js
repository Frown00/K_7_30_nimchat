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
      personality: "Architect",
      profession: "",
      hobbies: 'Archery, Animation',
      bio: 'Test',
      motivation: "BORED",
      partnersProfilePreference: []
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
      personality: '',
      profession: 'Accountant',
      hobbies: 'Archery, Animation',
      bio: 'Test',
      motivation: "BORED",
      partnersProfilePreference: []
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
      personality: '',
      profession: 'Mechanical Engineer',
      hobbies: 'Archery, Animation',
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
      personality: 'Architect',
      profession: 'Mechanical Engineer',
      hobbies: 'Archery, Animation',
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
  describe('POST /api/profiles/preferences/add (add new partner preferences)', function () {

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
      name: "Test2",
      location: "Warszawa",
      sex: "MALE",
      age: '{"from": 2, "to":3}',
      maritalStatus: "SINGLE",
      personality: "Logistian",
      profession: "Mechanical Engineer",
      hobbies: "Archery,Acrobatic",
      motivation: "BORED",
      precedence: '[{"profileTraitName": "location", "precedence": 1, "isRequired": true}, {"profileTraitName": "personality", "precedence": 2, "isRequired": true}]'
    };
    it('respond with 200 partner profile preference was added',
      function (done) {
        request(app)
          .post('/api/profiles/preferences/add')
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
 * Name can't be the same as others profile preferences
 */
  describe('POST /api/profiles/preferences/add (duplicate name)', function () {

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
      name: "Test2",
      location: "Warszawa",
      sex: "MALE",
      age: '{"from": 2, "to":3}',
      maritalStatus: "SINGLE",
      personality: "Logistian",
      profession: "Mechanical Engineer",
      hobbies: "Archery,Acrobatic",
      motivation: "BORED",
      precedence: '[{"profileTraitName": "location", "precedence": 1, "isRequired": true}, {"profileTraitName": "personality", "precedence": 2, "isRequired": true}]'
    };
    it('respond with 400 duplicate name',
      function (done) {
        request(app)
          .post('/api/profiles/preferences/add')
          .send(data)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err) => {
            if (err) return done(err);
            done();
          });

      });
  });

}
module.exports = profileTest;

