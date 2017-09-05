/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settingss              ->  index
 */

'use strict';
var _ = require('lodash');
var Setting = require('./settings.model');
var rollbar = require("rollbar");

// GET ALL THE SETTINGS!
exports.index = function (req, res) {
  Setting.find({}).exec().then(function (settings) {
    if (!settings) {
      return res.send(404);
    }

    return res.status(200).json(settings);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Get a single setting
exports.get = function(req, res) {
  Setting.find({ name: req.params.setting }).exec().then(function (settings) {
    if (!settings) { throw Error("No setting found"); }
    // Get the first setting from response
    var setting = settings[0];
    // Delete setting name from response, we don't need it because we already have the name
    // It's json, so 'delete setting.settingName' doesn't work, but setting it to 'undefined' does..
    if (setting && setting.name) {
      setting.name = undefined;
    }
    return res.status(200).json(setting);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Get Rollbar settings
exports.getRollbarSettings = function (req, res) {
  var rollbarSettings = {
    token: process.env.ROLLBAR_CLIENT_TOKEN,
    environment: process.env.NODE_ENV
  };

  return res.status(200).json(rollbarSettings);
};

// Add new setting in the DB.
exports.add = function(req, res) {
  // Create new setting
  var setting = {
    name: req.params.setting,
    value: req.params.value
  };

  // Save it!
  Setting.create(setting).then(function (setting) {
    return res.status(201).json(setting);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Updates an existing setting in the DB.
exports.update = function(req, res) {
  Setting.find(req.params.setting).exec().then(function (settings) {
    if (!settings) { return res.send(404); }
    // Get the one setting
    var setting = settings[0];
    // Update setting
    setting.value = req.params.value;
    return setting.save();
  }).then(function (setting) {
    return res.status(201).json(setting);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

function handleError(err, res, req) {
  rollbar.handleErrorWithPayloadData(err, {
    level: "error",
    response: res
  }, req);
  
  return res.send(500, err);
}