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
    exists: (req, res) => {
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
                    result
                });
            }
        });
    },

    /*
     ** Método para devolver todos los dispositivos
     ** GET
     ** URL params: sort?
     ** return HTTP response
     */
    getAllDevices: (req, res) => {
        // Recoger variable de campo a ordenar de la URL
        var sort = req.params.sort;

        // Find
        deviceModel.find({}).sort(sort).exec((err, devices) => {
            // Comprobar errores
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener las medidas'
                });
            }

            // Comprobar datos devueltos
            if (!devices) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay dispositivos'
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    devices
                });
            }
        });
    },

    /*
     ** Método para buscar dispositivos
     ** GET params: deviceId, dateStart, dateEnd
     ** return HTTP response
     */
    searchDevices: (req, res) => {
        // Recoger parámetros GET
        var deviceId = req.query.deviceId;
        var IPAddress = req.query.IPAddress;
        var location = req.query.location;
        var dateStart = req.query.dateStart;
        var dateEnd = req.query.dateEnd;
        var dateFind = req.query.date;
        
        // Validar datos (validator)
        if (dateStart && !validator.isDate(dateStart, {
                format: 'YYYY-MM-DD'
            })) {
            return res.status(200).send({
                status: 'error',
                message: 'Fallo de validación, el formato de la fecha no es válido, debe ser YYYY-MM-DD'
            });
        }
        if (dateEnd && !validator.isDate(dateEnd, {
                format: 'YYYY-MM-DD'
            })) {
            return res.status(200).send({
                status: 'error',
                message: 'Fallo de validación, el formato de la fecha no es válido, debe ser YYYY-MM-DD'
            });
        }
        if (dateFind && !validator.isDate(dateFind, {
                format: 'YYYY-MM-DD'
            })) {
            return res.status(200).send({
                status: 'error',
                message: 'Fallo de validación, el formato de la fecha no es válido, debe ser YYYY-MM-DD'
            });
        }

        // Crear objeto JSON para búsqueda
        var findQuery = {};

        if (deviceId) {
            findQuery.deviceId = deviceId;
        }

        if (IPAddress) {
            findQuery.IPAddress = IPAddress;
        }

        if (location) {
            findQuery.location = location;
        }

        if (dateStart && dateEnd) {
            findQuery.date = {
                $gte: dateStart,
                $lte: dateEnd
            };
        } else if (dateStart) {
            findQuery.date = {
                $gte: dateStart
            };
        } else if (dateEnd) {
            findQuery.date = {
                $lte: dateEnd
            };
        } else if (dateFind) {
            findQuery.date = {
                $gte: new Date(dateFind).setHours(0, 0, 0),
                $lte: new Date(dateFind).setHours(23, 59, 59)
            };
        }

        deviceModel.find(findQuery, (err, devices) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    findQuery,
                    message: 'Error al obtener los dispositivos'
                });
            }

            return res.status(200).send({
                status: 'success',
                devices,
            });
        });
    }
}

module.exports = controller;