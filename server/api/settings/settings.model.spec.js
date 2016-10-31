'use strict';

var should = require('should');
var app = require('../../app');
var Settings = require('./settings.model');

var setting = new Settings({
    name: 'it',
    value: 'works'
});

describe("Testing the Settings Model", function () {
    before(function(done) {
        // Clear settings before testing
        Settings.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Settings.remove().exec().then(function() {
            done();
        });
    });

    it("should start with 0 settings being returned", function (done) {
        Settings.find().exec().then(function (settings) {
            settings.should.have.length(0);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it("should find a requested setting", function (done) {
        Settings.create(setting).then(function (newSetting) {
            should.exist(newSetting);

            return Settings.findOne().exec().then(function (setting) {
                should.exist(setting);

                setting.name.should.eql("it");
                setting.value.should.eql("works");
                
                done();
            });
        }).catch(function (err) {
            done(err);
        });
    });

    it("should be able to create a new setting", function (done) {
        Settings.create(setting).then(function (newSetting) {
            should.exist(newSetting);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it("should be able to update a setting", function (done) {
        Settings.create(setting).then(function (newSetting) {
            should.exist(newSetting);

            newSetting.name.should.eql("it");
            newSetting.value.should.eql("works");

            newSetting.name = "settings";
            newSetting.value = "work!";

            return newSetting.save().then(function (updatedSetting) { 
                updatedSetting.name.should.eql("settings");
                updatedSetting.value.should.eql("work!");
                done(); 
            });
        }).catch(function (err) {
            done(err);
        });
    });
});