'use strict'

var validator = require('validator');
var deviceModel = require('../models/device');

var controller = {
    /* 
     ** Método para almacenar en base de datos
     ** Parámetros POST: deviceId: String, location: String, IPAdress: String
     ** return HTTP response
     */
    save: (req, res) => {
        // Obtener parámetros POST
        var params = req.body;
        // Conseguir dirección IP de la request
        var IP = req.connection.remoteAddress;

        // Validar datos (validator)
        try {
            var validate_device_id = !validator.isEmpty(params.deviceId);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Fallo de validación, faltan datos por enviar'
            });
        }

        if (validate_device_id) {
            // Comprobar que existe el dispositivo en la colección
            var deviceId = params.deviceId;
            deviceModel.exists({
                deviceId: deviceId
            }, (err, result) => {
                if (err) {
                    return res.status(200).send({
                        status: 'error',
                        message: err
                    });
                } else {
                    // Devolver que ya existe el dispositivo
                    if (result) {
                        return res.status(200).send({
                            status: 'success',
                            message: 'El dispositivo ya está en el sistema'
                        });
                    } else {
                        // Crear el objeto a guardar
                        var device = new deviceModel();

                        // Asignar valores
                        device.deviceId = deviceId;
                        device.IPAdress = IP;

                        // Guardar dispositivo
                        device.save((err, deviceStored) => {
                            if (err || !deviceStored) {
                                return res.status(500).send({
                                    status: 'error',
                                    message: 'El dispositivo no se ha almacenado'
                                });
                            }

                            // Devolver una respuesta
                            return res.status(200).send({
                                status: 'success',
                                device: deviceStored
                            });
                        });
                    }
                }
            });
        }
    },
    /*
     ** Método para devolver si existe un dispositivo en colección
     ** GET
     ** URL params: deviceId
     ** return HTTP response
     */
    exits: (req, res) => {
        // Recoger id de dispositivo
        var deviceId = req.params.deviceId;

        deviceModel.exists({
            deviceId: deviceId
        }, (err, result) => {
            if (err) {
                return res.status(200).send({
                    status: 'error',
                    message: err
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    exits: result
                });
            }
        });
    }
}

module.exports = controller;