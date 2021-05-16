# backend-co2-meter
Backend de NodeJS y MongoDB para gestión de datos de sensores de CO2

## Requisitos
Tener instalado NodeJS en el equipo:

https://nodejs.org/es/download/

Tener instalado y corriendo MongoDB:

https://www.mongodb.com/try/download/community

Instalar git para la descarga del proyecto:

https://git-scm.com/downloads

# Configuración
Nos situamos en la carpeta donde queramos ejecutar el servidor en la línea de comandos con el comando `cd` y ejecutamos 

`git clone https://github.com/Valraox/backend-co2-meter.git`

Una vez clonado el repositorio nos situaremos en la carpeta creada por defecto con `cd backend-co2-meter` e instalaremos las dependencias de node con el comando

`npm install`

# Ejecución del servidor
Para poner a la escucha el servidor de Node ejecutaremos

`npm start`

El servidor estará a la escucha en el puerto 3800. Si queremos ejecutar para desarrollo con watcher para los cambios en los archivos utilizando nodemon usaremos

`npm run dev`
