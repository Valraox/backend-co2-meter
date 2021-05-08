'use strict'

// Cargar módulos de node para crear servidor
var express = require('express');

//Ejecutar express (http)
var app = express();

// Cargar ficheros rutas

// Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// CORS

// Añadir prefijos a rutas

//Exportar módulo (fichero actual)
module.exports = app;