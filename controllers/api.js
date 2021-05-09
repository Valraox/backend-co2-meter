'use strict'

var controller = {
    test: (req, res) => {
        var pjson = require('../package.json');
        return res.status(200).send({
            message: 'API RESTful de backend para dispositivos de medición de CO2',
            version: pjson.version
        });
    }
};

module.exports = controller;