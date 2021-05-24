# backend-co2-meter
Backend de NodeJS y MongoDB para gestión de datos de sensores de CO2

## Requisitos
Tener instalado NodeJS en el equipo:

https://nodejs.org/es/download/

Tener instalado y corriendo MongoDB:

https://www.mongodb.com/try/download/community

Instalar git para la descarga del proyecto:

https://git-scm.com/downloads

# Instalación
Nos situamos en la carpeta donde queramos ejecutar el servidor en la línea de comandos con el comando `cd` y ejecutamos 

```
git clone https://github.com/Valraox/backend-co2-meter.git
```

Una vez clonado el repositorio nos situaremos en la carpeta creada por defecto con `cd backend-co2-meter` e instalaremos las dependencias de node con el comando
```
npm install
```
Con las dependencias instaladas copiaremos el archivo de ejemplo de configuración con el comando
```
cp ./config.example.js ./config.js
```
Por defecto se configuran los siguientes parámetros:

- `appURL: 'http://localhost'` : la URL de de la API
- `port: 3800`: el puerto de escucha de la API
- `mongoURL: 'mongodb://localhost:27017/'` : la URL de conexión a MongoDB
- `dbName: 'api_rest_co2_meter'` : el nombre de la base de datos en MongoDB

# Ejecución del servidor
Para poner a la escucha el servidor de Node ejecutaremos
```
npm start
```

El servidor estará a la escucha en el puerto 3800. Si queremos ejecutar para desarrollo con watcher para los cambios en los archivos utilizando nodemon usaremos
```
npm run dev
```
## Rutas de la API
Las rutas disponibles por la API parten de la ruta con el servidor en ejecución `http://<ipaddres>:<puerto>/api`

### Rutas de medidas de CO2
- `/measures/save`: (POST) almacena una medida en la base de datos. Los parámetros del body que requiere son `deviceId` y `CO2ppm`
- `/get-all/:sort?`: (GET) devuelve todas las medidas. Parámetro de URL opcional con campo a ordenar (añadir - al nombre del campo para ordenación descendente)
- `/get-measures/:deviceId`: (GET) devuelve todas las medidas de un dispositivo. Parámetro de URL obligatorio con el identificador del dispositivo a buscar
- `/search`: (GET) devuelve las medidas buscadas mediante parámetros GET. Admite los parámetros `deviceID`, `dateStart`, `dateEnd` y `date`

### Rutas de dispositivos
- `/devices/save`: (POST) almacena un dispositivo nuevo en la base de datos. El único parámetro del body que requiere es `deviceId`
- `/devices/exists/:deviceId`: (GET) devuelve si existe el identificado de dispositivo que recibe como parámetro de la URL obligatorio
- `/devices/get-all/:sort?`: (GET) devuelve todos los dispositivos. Parámetro de URL opcional con campo a ordenar (añadir - al nombre del campo para ordenación descendente)
- `/devices/search`: (GET) devuelve los dispositivos buscados mediante parámetros GET. Admite los parámetros `deviceID`, `dateStart`, `dateEnd`, `date`, `location` y `IPAddress`
