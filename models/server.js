require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { dbConnection} = require('../database/config');


class Server{
    constructor(){
        this.app=express();
        this.port= process.env.PORT;

        //Mis paths
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:   '/api/uploads',
        }

        

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

    //Fileupload - Carga de archivos
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));
   }
    
   routes() {
        
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.buscar, require('../routes/buscar'));
    this.app.use( this.paths.categorias, require('../routes/categorias'));
    this.app.use( this.paths.productos, require('../routes/productos'));
    this.app.use( this.paths.usuarios, require('../routes/usuarios'));
    this.app.use( this.paths.uploads, require('../routes/uploads'));
}

    listen(){
        this.app.listen(this.port, () => {
            console.log(`El puerto en el que se ejecuta es: `, this.port);
          })
    }

    
}

module.exports=Server;