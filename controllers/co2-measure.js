'use strict'

var validator = require('validator');
var CO2Measure = require('../models/co2-measure');

var controller = {
    /* 
     ** Método para almacenar en base de datos
     ** Parámetros POST: deviceId: String, CO2ppm: Number
     ** return HTTP response
     */
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
    },

    /*
     ** Método para devolver todas las unidades de medida
     ** GET
     ** URL params: sort?
     ** return HTTP response
     */
    getAllMeasures: (req, res) => {
        // Recoger variable de campo a ordenar de la URL
        var sort = req.params.sort;

        // Find
        CO2Measure.find({}).sort(sort).exec((err, measures) => {

            // Comprobar errores
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener las medidas'
                });
            }

            // Comprobar datos devueltos
            if (!measures) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay medidas de CO2'
                });
            } else {
                // Devolver respuesta con datos
                return res.status(200).send({
                    status: 'success',
                    measures
                });
            }
        });
    },

    /*
     ** Método para devolver todas las unidades de medida
     ** GET
     ** URL params: deviceId
     ** return HTTP response
     */
    getDeviceMeasures: (req, res) => {
        // Recoger id de dispositivo
        var deviceId = req.params.deviceId;

        // Buscar el artículo
        CO2Measure.find({
            deviceId: deviceId
        }).exec((err, measures) => {

            // Comprobar errores
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener las medidas del dispositivo ' + deviceId
                });
            }

            // Comprobar datos devueltos
            if (!measures) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay medidas de CO2 para el dispositivo ' + deviceId
                });
            } else {
                // Devolver una respuesta con datos
                return res.status(200).send({
                    status: 'success',
                    measures
                });
            }
        });
    },
};

module.exports = controller;