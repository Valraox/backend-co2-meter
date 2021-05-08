'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var appUrl = 'http://localhost';
var port = 3800;

var mongoURL = 'mongodb://localhost:27017/api_rest_co2_meter';
var mongoDBOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, mongoDBOptions).then(() => {
    console.log('La conexión a la base de datos se ha realizado correctamente');

    // Crear servidor y escuchar peticiones http
    app.listen(port, () => {
        console.log('Servidor corriendo en ' + appUrl + ':' + port);
    });
});