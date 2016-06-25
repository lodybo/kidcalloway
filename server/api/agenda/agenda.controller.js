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
  // Depending on the environment, we need to use different ways to add a date
  var rawDate = {raw: req.params.date};
  if (process.env.NODE_ENV === "production") {
    rawDate = {raw: {"$date": req.params.date}};
  }
  
  req.params.date = rawDate;
  // Remove the string "null" and change it into an actual null
  // For both the ticketLink as the details
  if (req.params.ticketLink === "null") {
    req.params.ticketLink = null;
  }
  
  if (req.params.details === "null") {
    req.params.details = null;
  }
  
  // Add 'played' and 'cancelled' flags, set them to 'false'
  req.params.played = false;
  req.params.cancelled = false;
  console.log("AGENDA -- CREATE: ", req.params);
  Agenda.create(req.params, function(err, agenda) {
    if(err) { return handleError(res, err); }
    return res.json(201, agenda);
  });
};

// Updates an existing agenda in the DB.
exports.update = function(req, res) {
  if(req.params._id) { delete req.params._id; }
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