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
  // Prep for storage
  req.params = prepForDB(req.params);
  
  // Add 'played' and 'cancelled' flags, set them to 'false'
  req.params.played = false;
  req.params.cancelled = false;

  Agenda.create(req.params, function(err, agenda) {
    if(err) { return handleError(res, err); }
    return res.json(201, agenda);
  });
};

// Updates an existing agenda in the DB.
exports.update = function(req, res) {
  if (req.params._id) { delete req.params._id; }
  // Prep for storage
  req.body = prepForDB(req.body);

  Agenda.findById(req.params.id, function (err, agenda) {
    if (err) { return handleError(res, err); }
    if(!agenda) { return res.send(404); }
    console.log(agenda.details);
    var updated = _.merge(agenda, req.body);
    console.log(agenda.details);
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

// Sets an agenda item to "cancelled"
exports.cancel = function(req, res) {
  Agenda.findById(req.params.id, function (err, agendaItem) {
    if (err) {
      return handleError(res, err);
    }

    if (!agendaItem) {
      return res.send(404);
    }

    // Cancelled must be set to true, so that we can merge the objects together and save it
    req.body.cancelled = true;
    var updated = _.merge(agendaItem, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(200, agendaItem);
    });
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

function handleError(res, err) {
  return res.send(500, err);
}