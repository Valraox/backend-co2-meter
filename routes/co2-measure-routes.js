'use strict'

var express = require('express');
var CO2MeasureController = require('../controllers/co2-measure');

var router = express.Router();

// Rutas para medidas de CO2
router.post('/save', CO2MeasureController.save);

module.exports = router;