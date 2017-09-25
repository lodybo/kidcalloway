'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var agendaItem = "/api/agenda/date/" + new Date().toISOString() + "/time/20:30/venueName/De+Kroeg/venueAddress/Kroegseweg+21/fbEvent/abc/ticketLink/abc/details/Test+details";

describe("Testing the Agenda API", function () {
  describe('GET /api/agenda', function () {
    it('should respond with JSON array', function (done) {
      request(app)
        .get('/api/agenda')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it('should get one agenda item', function (done) {
      request(app)
        .get('/api/agenda/next')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.should.be.instanceof(Object);
          done();
        });
    });

    it("should get a specific agenda item", function (done) {
      request(app)
        .post(agendaItem)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);

          request(app)
            .get("/api/agenda/id/" + res.body.id)
            .expect(200)
            .end(function (err, item) {
              if (err) return done(err);

              item.body.id.should.eql(res.body.id);
              item.body.venueName.should.eql(res.body.venueName);

              done();
            });
        });
    });
  });

  describe("POST'ing a new agenda item", function () {
    it("should add a new agenda item", function (done) {
      request(app)
      .post(agendaItem)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);

        res.body.venueName.should.eql("De+Kroeg");
        res.body.fbEvent.should.eql("abc");

        done();
      });
    });
  });
  
  describe("Updating agenda items", function () {
    var itemID;

    beforeEach(function (done) {
      request(app)
        .post(agendaItem)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.venueName.should.eql("De+Kroeg");
          res.body.fbEvent.should.eql("abc");
          
          itemID = res.body.id;

          done();
        });
    });

    it("should update an agenda item", function (done) {
      request(app)
        .put("/api/agenda/id/" + itemID)
        .send({
          venueName: "Cafe+Kroeg",
          fbEvent: "def"
        })
        .expect(201)
        .end(function (err, item) {
          if (err) return done(err);

          item.body.venueName.should.eql("Cafe+Kroeg");
          item.body.fbEvent.should.eql("def");

          done();
        });
    });

    it("should cancel an agenda item", function (done) {
      request(app)
        .put("/api/agenda/id/" + itemID + "/cancel/true")
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.cancelled.should.eql(true);

          done();
        });
    });
  });

  describe("DELETE'ing and agenda item", function () {
    it("should delete a given agenda item", function (done) {
      request(app)
        .post(agendaItem)
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);

          res.body.venueName.should.eql("De+Kroeg");
          res.body.fbEvent.should.eql("abc");
          
          request(app)
            .delete("/api/agenda/id/" + res.body.id)
            .expect(204)
            .end(function (err, res) {
              if (err) return done(err);

              done();
            });
        });
    });
  });  
});