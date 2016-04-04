'use strict';

var _ = require('lodash');
var Agenda = require('./agenda.model');

// Get list of agendas
exports.index = function(req, res) {
  Agenda.find(function (err, agendas) {
    if(err) { return handleError(res, err); }
    return res.json(200, agendas);
  });
};

// Get a single agenda
exports.show = function(req, res) {
  Agenda.findById(req.params.id, function (err, agenda) {
    if(err) { return handleError(res, err); }
    if(!agenda) { return res.send(404); }
    return res.json(agenda);
  });
};

// Creates a new agenda in the DB.
exports.create = function(req, res) {
  Agenda.create(req.body, function(err, agenda) {
    if(err) { return handleError(res, err); }
    return res.json(201, agenda);
  });
};

// Updates an existing agenda in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Agenda.findById(req.params.id, function (err, agenda) {
    if (err) { return handleError(res, err); }
    if(!agenda) { return res.send(404); }
    var updated = _.merge(agenda, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, agenda);
    });
  });
};

// Deletes a agenda from the DB.
exports.destroy = function(req, res) {
  Agenda.findById(req.params.id, function (err, agenda) {
    if(err) { return handleError(res, err); }
    if(!agenda) { return res.send(404); }
    agenda.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}