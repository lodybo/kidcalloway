'use strict';

var _ = require('lodash');
var Agenda = require('./agenda.model');

// Get list of agendas
exports.index = function(req, res) {
  Agenda.find({}).exec().then(function (agendas) {
    return res.json(200, agendas);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Get a single agenda
exports.show = function(req, res) {
  Agenda.findOne({ _id: req.params.id }).exec().then(function (agenda) {
    if(!agenda) { return res.send(404); }
    return res.json(agenda);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Creates a new agenda in the DB.
exports.create = function(req, res) {
  // Prep for storage
  req.params = prepForDB(req.params);
  
  // Add 'played' and 'cancelled' flags, set them to 'false'
  req.params.played = false;
  req.params.cancelled = false;

  Agenda.create(req.params).then(function (agenda) {
    return res.json(201, agenda);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Updates an existing agenda in the DB.
exports.update = function(req, res) {
  if (req.params._id) { delete req.params._id; }
  // Prep for storage
  req.body = prepForDB(req.body);
  
  Agenda.findOne({ _id: req.params.id }).exec().then(function (agenda) {
    if(!agenda) { return res.send(404); }
    
    var updated = _.merge(agenda, req.body);
    
    return updated.save();
  }).then(function (item) {
    return res.json(201, item);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Deletes a agenda from the DB.
exports.destroy = function (req, res) {
  Agenda.findOne({ _id: req.params.id }).exec().then(function (agenda) {
    if(!agenda) { return res.send(404); }
    return agenda.remove();
  }).then(function (item) {
    return res.send(204);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Sets an agenda item to "cancelled"
exports.cancel = function(req, res) {
  Agenda.findOne({ _id: req.params.id }).exec().then(function (agendaItem) {
    if (!agendaItem) {
      return res.send(404);
    }

    // Cancelled must be set to true, so that we can merge the objects together and save it
    req.body.cancelled = true;
    var updated = _.merge(agendaItem, req.body);
    return updated.save();
  }).then(function (updatedItem) {
    return res.json(200, updatedItem);
  }).catch(function (err) {
    handleError(err, res, req);
  });
};

// Prepare agenda item for storage/update in DB
function prepForDB(item) {
  // Convert date into an object
  var rawDate = {raw: item.date};
  item.date = rawDate;
  
  // Remove the string "null" and change it into an actual null
  // For the ticketLink, facebookLink and the details
  if (item.ticketLink === "null") {
    item.ticketLink = null;
  }

  if (item.fbEvent === "null") {
    item.fbEvent = null;
  }
  
  if (item.details === "null") {
    item.details = null;
  }

  return item;
}

function handleError(err, res, req) {
  rollbar.handleErrorWithPayloadData(err, {
    level: "error",
    response: res
  }, req);
  
  return res.send(500, err);
}