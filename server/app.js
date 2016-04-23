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

var schedule = scheduler.scheduleJob("0 0 0 1/1 * ? *", function () {
  // Find everything from one day back
  var today = moment().format("YYYY-MM-DD");
  var yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  
  Agenda.update({
    "date.raw": {$gte: new Date(yesterday), $lt: new Date(today)}, "played": false
  }, {
    played: true
  }, {
    multi: true
  }, function (err, response) {
    // Check for errors
    if (err) {
      console.log("Error updating played gigs: ", err);
      return;
    }
    
    console.log("Succeeded in updating played gigs. Mongo's response: ", response);
  });
});

// Expose app
exports = module.exports = app;