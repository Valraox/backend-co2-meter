'use strict'

var controller = {
    test: (req, res) => {
        var IP = req.connection.remoteAddress;

        var pjson = require('../package.json');
        return res.status(200).send({
            message: 'API RESTful de backend para dispositivos de medición de CO2',
            clientIP: IP,
            version: pjson.version
        });
    }
};

module.exports = controller;