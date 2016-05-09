/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Setup scheduler for the agenda
var scheduler = require("node-schedule");
var Agenda = require("./api/agenda/agenda.model");
var moment = require("moment");

console.log(">> Setting up scheduler..");
var schedule = new scheduler.RecurrenceRule();
// schedule.hour = 0;
// schedule.minute = 1;
schedule.second = [0, 10, 20, 30, 40, 50];

var cron = scheduler.scheduleJob(schedule, function () {
  // Find everything from one day back
  var today = moment().format("YYYY-MM-DD");
  var yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  
  // Now set the times for both days to 0:00
  // For this, we're doing a "dirty"" string concatenation
  var todayMidnightString = today + "T00:00:00.000Z";
  var yesterdayMidnightString = yesterday + "T00:00:00.000Z";
  
  console.log(">> Running scheduler.. generated days: [yesterday: " + yesterdayMidnightString + ", today: " + todayMidnightString + "]");
  
  updateAgenda(yesterdayMidnightString, todayMidnightString);
});

// Logic for updating the agenda
function updateAgenda(yesterday, today) {
  Agenda.update({
    "date.raw": {$gte: new Date(yesterday), $lt: new Date(today)}, "played": false
  }, {
    played: true
  }, {
    multi: true
  }, function (err, response) {
    // Check for errors
    if (err) {
      console.log(">> Error updating played gigs: ", err);
      return;
    }
    
    console.log(">> Succeeded in updating played gigs. Mongo's response: ", response);
  });
}

// For testing the agenda updating logic...
// console.log("******** Preparing to update agenda...");
// var timeOut = setTimeout(function () {
  // console.log("******** Setup for updating agenda...");
  // var today = moment().format("YYYY-MM-DD");
  // var yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  // console.log("yesterday: " + yesterday, "today: " + today);
  // updateAgenda(yesterday, today);
  // Agenda.find({"date.raw": {$gte: new Date(yesterday), $lt: new Date(today)}, "played": false}, {}, function (err, res) {
  //   console.log("* Agenda.find", err, res);
  // });
// }, 5000);

// Expose app
exports = module.exports = app;