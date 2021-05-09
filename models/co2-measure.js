'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CO2MeasureSchema = Schema({
    deviceId: String,
    CO2ppm: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CO2Measure', CO2MeasureSchema);