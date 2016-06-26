'use strict';

var app = require('../..');
import request from 'supertest';

describe('Settings API:', function() {

  describe('GET /api/settingss', function() {
    var settingss;

    beforeEach(function(done) {
      request(app)
        .get('/api/settingss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          settingss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      settingss.should.be.instanceOf(Array);
    });

  });

});
