const express = require('express')
const cors= require('cors'); //ayuda a restringir los dominios que pueden usar la API

const socketController = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express()
        this.puerto= process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server)
        
        this.path= {
            
        }


        //Middlewares
        this.middlewares()

        //Rutas de la app
        this.routes()

        //sockets
        this.sockets()
    }


    middlewares(){
        //cors
        this.app.use(cors())
       
        //Directorio público
        this.app.use(express.static('public'))

    }

    routes() {
        //this.app.use(this.path.auth, require('../routes/auth'))
    }

    sockets(){
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.puerto, () => {
            console.log(`Example app listening on port ${this.puerto}`)
        })
    }
}

module.exports= Server;