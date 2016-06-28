'use strict';

var express = require('express');
var controller = require('./settings.controller');

var router = express.Router();

router.get("/", controller.index);
router.get('/name/:setting', controller.get);
router.post("/name/:setting/value/:value", controller.add);
router.put("/name/:setting/value/:value", controller.update);

module.exports = router;
