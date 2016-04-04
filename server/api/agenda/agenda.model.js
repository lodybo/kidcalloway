'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AgendaSchema = new Schema({
  venueName: String,
  venueAddress: String,
  details: String,
  fbEvent: String,
  ticketLink: String,
  date: Date,
  time: String,
  played: Boolean,
  cancelled: Boolean
});

module.exports = mongoose.model('Agenda', AgendaSchema);