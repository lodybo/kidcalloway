'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var moment = require("moment");
moment.locale("nl");

var AgendaSchema = new Schema({
  venueName: String,
  venueAddress: String,
  details: String,
  fbEvent: String,
  ticketLink: String,
  date: {
    raw: {type: Date, default: Date.now()}
  },
  time: String,
  played: Boolean,
  cancelled: Boolean
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

// *** Virtuals
// Format date
AgendaSchema
  .virtual("date.formatted")
  .get(function () {
      return moment(this.date.raw).format("LL");
  });

module.exports = mongoose.model('Agenda', AgendaSchema);