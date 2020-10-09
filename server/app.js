/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var rollbar = require('rollbar');

// Set up Rollbar for NodeJS
rollbar.init(process.env.ROLLBAR_TOKEN, {
  environment: process.env.NODE_ENV,
  root: process.env.ROOT,
  reportLevel: "debug"
});
rollbar.handleUncaughtExceptionsAndRejections();

// Disable Rollbar when on test
if (process.env.NODE_ENV === "test") {
  rollbar.enabled = false;
  console.log("Rollbar disabled due to test environment");
}

// Set promise
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options).then(() => {
  console.log(`after connect, success`);
}, (error) => {
  console.log(`after connect, error: ${error}`);
});

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);

// Redirect root domain to https://www on production
if (process.env.NODE_ENV === 'production') {
  app.all('/', function(req, res, next) {
    console.log('In redirect', req.headers.host, req.headers.host.slice(0, 3));
    // if (req.headers.host.slice(0, 3) !== 'www') {
      if (req.headers.host === 'kidcalloway.nl') {
      res.redirect(301, 'https://www.' + req.headers.host + req.url);
    } else {
      next();
    }
  });
}

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  rollbar.reportMessageWithPayloadData("Express server is listening", {
    level: "info",
    app: {
      port: config.port,
      environment: app.get('env')
    }
  });
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Setup scheduler for the agenda
var scheduler = require("node-schedule");
var Agenda = require("./api/agenda/agenda.model");
var moment = require("moment");

rollbar.reportMessageWithPayloadData("Setting up scheduler", {
  level: "info"
});

var schedule = new scheduler.RecurrenceRule();
schedule.hour = 0;
schedule.minute = 1;

var cron = scheduler.scheduleJob(schedule, function () {
  // Find everything from one day back
  var today = moment().format("YYYY-MM-DD");
  var yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  // Now set the times for both days to 0:00
  // For this, we're doing a "dirty"" string concatenation
  var todayMidnightString = today + "T00:00:00.000Z";
  var yesterdayMidnightString = yesterday + "T00:00:00.000Z";

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
      rollbar.handleError(err);
      return;
    }

    rollbar.reportMessageWithPayloadData("Succeeded in updating played gigs", {
      level: "info",
      mongoResponse: response
    });
  });
}

// Expose app
exports = module.exports = app;
