'use strict';

var should = require('should');
var app = require('../../app');
var Agenda = require('./agenda.model');

var agenda = new Agenda({
    date: { raw: new Date() },
        time: "20:00",
        venueName: "Cafe De Kroeg",
        venueAddress: "Kroegseweg 12, Eindhoven",
        fbEvent: "https://www.facebook.com/events/123456789/",
        details: "Test gig",
        ticket: null,
        played: false,
        cancelled: false
    });

describe("Testing the Agenda Model", function () {
    before(function(done) {
        // Clear agenda before testing
        Agenda.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Agenda.remove().exec().then(function() {
            done();
        });
    });

    it("should start with 0 agenda being returned", function (done) {
        Agenda.find().exec().then(function (agenda) {
            agenda.should.have.length(0);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it("should find a requested agenda", function (done) {
        Agenda.create(agenda).then(function (newAgenda) {
            should.exist(newAgenda);

            return Agenda.findOne({ _id: newAgenda._id }).exec().then(function (agenda) {
                should.exist(agenda);
                agenda.should.have.property("_id");

                agenda._id.should.eql(newAgenda._id);
                agenda.time.should.eql(newAgenda.time);
                agenda.venueName.should.eql(newAgenda.venueName);
                agenda.venueAddress.should.eql(newAgenda.venueAddress);
                agenda.fbEvent.should.eql(newAgenda.fbEvent);
                agenda.details.should.eql(newAgenda.details);
                agenda.played.should.eql(newAgenda.played);
                agenda.cancelled.should.eql(newAgenda.cancelled);
                agenda.date.raw.should.eql(newAgenda.date.raw);
                
                done();
            });
        }).catch(function (err) {
            done(err);
        });
    });

    it("should be able to create a new agenda", function (done) {
        Agenda.create(agenda).then(function (newAgenda) {
            should.exist(newAgenda);
            newAgenda.should.have.property("_id");
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it("should be able to update a agenda", function (done) {
        Agenda.create(agenda).then(function (newAgenda) {
            should.exist(newAgenda);
            newAgenda.should.have.property("_id");

            newAgenda._id.should.eql(agenda._id);
            newAgenda.time.should.eql(agenda.time);
            newAgenda.venueName.should.eql(agenda.venueName);
            newAgenda.venueAddress.should.eql(agenda.venueAddress);
            newAgenda.fbEvent.should.eql(agenda.fbEvent);
            newAgenda.details.should.eql(agenda.details);
            newAgenda.played.should.eql(agenda.played);
            newAgenda.cancelled.should.eql(agenda.cancelled);
            newAgenda.date.raw.should.eql(agenda.date.raw);

            newAgenda.details = "Gig cancelled";
            newAgenda.cancelled = true;

            return newAgenda.save().then(function (updatedAgenda) {
                should.exist(updatedAgenda);
                updatedAgenda.should.have.property("_id");
                
                updatedAgenda._id.should.eql(agenda._id);
                updatedAgenda.time.should.eql(agenda.time);
                updatedAgenda.venueName.should.eql(agenda.venueName);
                updatedAgenda.venueAddress.should.eql(agenda.venueAddress);
                updatedAgenda.fbEvent.should.eql(agenda.fbEvent);
                updatedAgenda.played.should.eql(agenda.played);
                updatedAgenda.date.raw.should.eql(agenda.date.raw);
                updatedAgenda.cancelled.should.eql(true);
                updatedAgenda.details.should.eql("Gig cancelled");

                done(); 
            });
        }).catch(function (err) {
            done(err);
        });
    });
});