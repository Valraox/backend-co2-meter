'use strict'

var express = require('express');
var APIController = require('../controllers/api');

var router = express.Router();

router.get('/test', APIController.test);

module.exports = router;