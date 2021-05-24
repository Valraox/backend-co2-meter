'use strict'

var express = require('express');
var deviceController = require('../controllers/device');

var router = express.Router();

// Rutas de dispositivos
router.post('/save', deviceController.save);
router.get('/exists/:deviceId', deviceController.exists);
router.get('/get-all/:sort?', deviceController.getAllDevices);
router.get('/search', deviceController.searchDevices);

module.exports = router;