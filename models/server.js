require("dotenv").config();
const express = require("express");
const cors = require("cors");

class Server {

    constructor(){
        // Declaración de variables
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());//habilitar cors
        this.app.use(express.json());//Configurar formato de entra de datos
        this.app.use(express.static('public'));//configurar carpeta publica
    }

    routes(){
        this.app.use(this.userPath,require("../routes/user.route"));
    }

    listen() {
        this.app.listen(this.port, ()=>{console.log(`Servidor corriendo en: http://localhost:${this.port}/api/users`)});
    }
}

module.exports = Server;