'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Testing the Settings API', function (done) {
  describe('GET /api/settings', function (done) {
    it('should respond with JSON array when called with /api/settings', function (done) {
      request(app)
        .get('/api/settings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it('should return only one setting if a name is passed: /api/settings/name/it', function (done) {
      request(app)
        .post('/api/settings/name/it/value/works')
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);

          request(app)
            .get('/api/settings/name/it')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);

              res.body.should.have.property("value");
              res.body.value.should.equal("works");

              done();
            });
        });
    });

    it('should return Rollbar settings if /rollbarsettings endpoint is hit', function (done) {
      request(app)
        .get('/api/settings/rollbarsettings')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.should.have.property("token");
          res.body.token.should.equal(process.env.ROLLBAR_CLIENT_TOKEN);

          res.body.should.have.property("environment");
          res.body.environment.should.equal(process.env.NODE_ENV);

          done();
        });
    });
  });

  describe('POST /api/settings with name=test & value=setting', function (done) {
    it('should save a setting', function (done) {
      request(app)
        .post('/api/settings/name/test/value/setting')
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.should.have.property("name");
          res.body.should.have.property("value");

          res.body.name.should.equal("test");
          res.body.value.should.equal("setting");
          done();
        });
    });
  });
  
  describe('PUT /api/settings with updated value', function () {
    it('should update a given setting', function (done) {
      request(app)
        .post('/api/settings/name/its/value/an-setting')
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);

          request(app)
            .get('/api/settings/name/its')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);

              res.body.should.have.property("value");

              res.body.value.should.equal("an-setting");

              request(app)
                .put('/api/settings/name/its/value/a-setting')
                .expect(201)
                .end(function (err, res) {
                  if (err) return done(err);

                  res.body.should.have.property("value");

                  res.body.value.should.equal("a-setting");
                  done();
                });
            });
        });
    });
  });
});