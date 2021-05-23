'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = Schema({
    deviceId: String,
    location: String,
    IPAdress: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('device', deviceSchema);