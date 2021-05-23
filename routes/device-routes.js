'use strict'

var express = require('express');
var deviceController = require('../controllers/device');

var router = express.Router();

// Rutas de dispositivos
router.post('/save', deviceController.save);
router.get('/exits/:deviceId', deviceController.exits);

module.exports = router;