/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settingss              ->  index
 */

'use strict';
var _ = require('lodash');
var Setting = require('./settings.model');

// GET ALL THE SETTINGS!
exports.index = function (req, res) {
  Setting.find({}, function (err, settings) {
    if (err) {
      return handleError(res, err);
    }

    if (!settings) {
      return res.send(404);
    }

    return res.json(200, settings);
  });
};

// Get a single setting
exports.get = function(req, res) {
  Setting.find({name: req.params.setting}, function (err, settings) {
    if(err) { return handleError(res, err); }
    if(!settings) { return res.send(404); }
    // Get the first setting from response
    var setting = settings[0];
    // Delete setting name from response, we don't need it because we already have the name
    // It's json, so 'delete setting.settingName' doesn't work, but setting it to 'undefined' does..
    if (setting && setting.name) {
      setting.name = undefined;
    }
    return res.json(200, setting);
  });
};

// Add new setting in the DB.
exports.add = function(req, res) {
  // Create new setting
  var setting = {
    name: req.params.setting,
    value: req.params.value
  };

  // Save it!
  Setting.create(setting, function (err, setting) {
    if (err) { return handleError(res, err); }
    return res.json(201, setting);
  });
};

// Updates an existing setting in the DB.
exports.update = function(req, res) {
  console.log("update, req:", req.params, "body:", req.body);
  Setting.find(req.params.setting, function (err, settings) {
    if (err) { return handleError(res, err); }
    if(!settings) { return res.send(404); }
    // Get the one setting
    var setting = settings[0];
    console.log("before update:", setting);
    // Update setting
    setting.value = req.params.value;
    console.log("after update:", setting);
    setting.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, setting);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}