'use strict'

var express = require('express');
var CO2MeasureController = require('../controllers/co2-measure');

var router = express.Router();

// Rutas para medidas de CO2
router.post('/save', CO2MeasureController.save);
router.get('/get-all/:sort?', CO2MeasureController.getAllMeasures);
router.get('/get-measures/:deviceId', CO2MeasureController.getDeviceMeasures);

module.exports = router;