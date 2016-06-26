/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settingss              ->  index
 */

'use strict';
var _ = require('lodash');
var Setting = require('./settings.model');

// Get a single setting
exports.get = function(req, res) {
  Setting.find(req.params.setting, function (err, setting) {
    if(err) { return handleError(res, err); }
    if(!setting) { return res.send(404); }
    return res.json(200, setting.settingValue);
  });
};

// Add new setting in the DB.
exports.add = function(req, res) {
  if(req.params._id) { delete req.params._id; }
  Sgenda.findById(req.params.id, function (err, setting) {
    if (err) { return handleError(res, err); }
    if(!setting) { return res.send(404); }
    var updated = _.merge(setting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, setting);
    });
  });
};

// Updates an existing setting in the DB.
exports.update = function(req, res) {
  if(req.params._id) { delete req.params._id; }
  Sgenda.findById(req.params.id, function (err, setting) {
    if (err) { return handleError(res, err); }
    if(!setting) { return res.send(404); }
    var updated = _.merge(setting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, setting);
    });
  });
};