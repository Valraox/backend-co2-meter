'use strict'

// Cargar módulos de node para crear servidor
var express = require('express');

//Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
var api_routes = require('./routes/general-routes');
var co2_measure_routes = require('./routes/co2-measure-routes');
var device_routes = require('./routes/device-routes');

// Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// CORS

// Añadir prefijos a rutas / Cargar rutas
app.use('/api', api_routes);
app.use('/api/measures', co2_measure_routes);
app.use('/api/devices', device_routes);

//Exportar módulo (fichero actual)
module.exports = app;