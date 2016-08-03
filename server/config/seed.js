/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// Get Classes and Objects from the Data Models
var User = require('../api/user/user.model');
var Agenda = require("../api/agenda/agenda.model");
var Settings = require("../api/settings/settings.model");

// Fill the Database
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Settings.find({}).remove(function() {
    Settings.create({
        provider: "local",
        name: "heroYouTubeID",
        value: "HXtCXE9jlbQ"
    }, function() {
      console.log('finished populating settings');
    });
});

Agenda.find({}).remove(function() {
    Agenda.create({
        provider: "local",
        venueName: "Kaffee Kroeg",
        venueAddress: "Kroegseweg 12 Nederland",
        details: "Kid Calloway @ Kroeg",
        fbEvent: "https://www.facebook.com/events/1666492276937175/",
        ticketLink: "",
        date: {raw: "2016-05-08"},
        time: "20:00",
        played: false,
        cancelled: false
    },{
        provider: "local",
        venueName: "Kaffee Lambiek",
        venueAddress: "Wilhelminapark 66, 5041 ED Tilburg, Netherlands",
        details: "Kid Calloway speelt samen met Endfield bij Kaffee Lambiek!",
        fbEvent: "https://www.facebook.com/events/1666492276937175/",
        ticketLink: "",
        date: {raw: new Date("2016-04-16")},
        time: "20:00",
        played: false,
        cancelled: false
    }, {
        provider: "local",
        venueName: "Kingsday at the <a href='http://www.bluecollarhotel.nl/'>Blue Collar Hotel</a>",
        venueAddress: "Klokgebouw 10 Strijp S Eindhoven",
        details: "Kom met Kid Calloway Koningsdag 2016 vieren in de parkeergarage tegenover het Blue Collar Hotel!",
        fbEvent: "https://www.facebook.com/events/443752132491052/",
        ticketLink: "",
        date: {raw: new Date("2016-04-27")},
        time: "Tussen 14:00 en 16:00",
        played: false,
        cancelled: false
    }, {
        provider: "local",
        venueName: "Velvet Music IN STORE",
        venueAddress: "Torenallee 60-02 unit 8, 5617 BD Eindhoven",
        details: "28 maart viert Velvet Music Pasen in haar splinternieuwe zaak in de Urban Shopper op Strijp-S en Kid Calloway is erbij, met wel een heel speciaal optreden!",
        fbEvent: "https://www.facebook.com/events/1740638226152484/",
        ticketLink: "",
        date: {raw: new Date("2016-03-28")},
        time: "15:00",
        played: true,
        cancelled: false
    }, {
        provider: "local",
        venueName: "Stage Music Cafe",
        venueAddress: "Stratumseind 25, 5611 EN Eindhoven",
        details: "Kid Calloway doet mee aan de 3e Rocktocht Eindhoven 2016",
        fbEvent: "https://www.facebook.com/events/922352567860696/",
        ticketLink: "",
        date: {raw: new Date("2016-03-06")},
        time: "16:30",
        played: true,
        cancelled: false
    }, {
        provider: "local",
        venueName: "Cafe 't Spektakel",
        venueAddress: "Prins Bernhardstraat 44, 5721 GC Asten",
        details: "Kid Calloway viert het weekend in Cafe 't Spektakel",
        fbEvent: "https://www.facebook.com/events/1678462842424757/",
        ticketLink: "",
        date: {raw: new Date("2016-02-20")},
        time: "21:30",
        played: false,
        cancelled: true
    }, function () {
        console.log("Finished populating agenda");
    });
});