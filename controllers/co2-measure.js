'use strict'

var validator = require('validator');
var CO2Measure = require('../models/co2-measure');

var controller = {
    save: (req, res) => {
        // Recoger parámetros por post
        var params = req.body;

        // Validar datos (validator)
        try {
            var validate_device_id = !validator.isEmpty(params.deviceId);
            var validate_co2_measure = !validator.isEmpty(params.CO2ppm);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Fallo de validación, faltan datos por enviar'
            });
        }

        if (validate_device_id && validate_co2_measure) {
            // Crear el objeto a guardar
            var measure = new CO2Measure();

            // Asignar valores
            measure.deviceId = params.deviceId;
            measure.CO2ppm = params.CO2ppm;

            // Guardar la medida de CO2
            measure.save((err, measureStored) => {
                if (err || !measureStored) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'La medida de CO2 no se ha almacenado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    CO2measure: measureStored
                });
            });
        }
    }
};

module.exports = controller;