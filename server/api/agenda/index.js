'use strict';

var express = require('express');
var controller = require('./agenda.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/id/:id', controller.show);
router.get('/:id', controller.show);
router.post('/date/:date/time/:time/venueName/:venueName/venueAddress/:venueAddress/fbEvent/:fbEvent/ticketLink/:ticketLink/details/:details', controller.create);
router.post('/id/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;