'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var moment = require("moment");
moment.locale("nl");

var SettingsSchema = new Schema({
  settingName: String,
  settingValue: String
});

module.exports = mongoose.model('Settings', SettingsSchema);