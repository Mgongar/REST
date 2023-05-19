require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection} = require('../database/config');


class Server{
    constructor(){
        this.app=express();
        this.port= process.env.PORT;

        //Mis usuarios
        this.usuariosPath= '/api/usuarios';
        this.authPath= '/api/auth';

        //Conectar a la Base de Datos
        this.conectarDB();

        //middleware
        this.middleware();

        //Rutas de la aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

   middleware(){

    //CORS
    this.app.use(cors());

    //Laectura y Parseo del body
    this.app.use(express.json());

    //Directorio Público
    this.app.use(express.static('public'));
   }
    
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`El puerto en el que se ejecuta es: `, this.port);
          })
    }

    
}

module.exports=Server;