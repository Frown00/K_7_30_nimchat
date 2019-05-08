////// CLEANING ///////

const clean = (app, request) => {
  /**
   * Delete test users
   */
  describe('POST /api/users/delete', function () {

    let token1 = null;
    let token2 = null
    let userData1 = {
      email: "test@gmail.com",
      password: "tomasz321",
    }
    let userData2 = {
      email: "test2@gmail.com",
      password: "tomasz321",
    }

    before(function (done) {
      request(app)
        .post('/api/users/login')
        .send(userData1)
        .end(function (err, res) {
          token1 = res.body.token;
          done();
        });
    });

    it('respond with 204 delete account',
      function (done) {
        request(app)
          .post('/api/users/delete')
          .set('Authorization', token1)
          .expect(204, done)
      });

    before(function (done) {
      request(app)
        .post('/api/users/login')
        .send(userData2)
        .end(function (err, res) {
          token2 = res.body.token;
          done();
        });
    });

    it('respond with 204 delete account',
      function (done) {
        request(app)
          .post('/api/users/delete')
          .set('Authorization', token2)
          .expect(204, done)
      });
  });
}

module.exports = clean;
